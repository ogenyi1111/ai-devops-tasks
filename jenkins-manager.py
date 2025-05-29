#!/usr/bin/env python3

import requests
import json
from typing import Dict, List, Optional
from dataclasses import dataclass
from urllib.parse import urljoin
import sys
import getpass
from datetime import datetime

@dataclass
class JenkinsBuild:
    number: int
    status: str
    timestamp: datetime
    duration: int
    url: str

class JenkinsManager:
    def __init__(self, jenkins_url: str, username: str = None, api_token: str = None):
        """
        Initialize Jenkins manager with URL and credentials.
        
        Args:
            jenkins_url: Base URL of Jenkins instance
            username: Jenkins username (optional)
            api_token: Jenkins API token (optional)
        """
        self.jenkins_url = jenkins_url.rstrip('/')
        self.username = username
        self.api_token = api_token
        self.session = requests.Session()
        
        if username and api_token:
            self.session.auth = (username, api_token)
        
        # Verify connection
        try:
            response = self.session.get(f"{self.jenkins_url}/api/json")
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"Failed to connect to Jenkins: {str(e)}")

    def list_jobs(self) -> List[Dict]:
        """
        List all Jenkins jobs.
        
        Returns:
            List of job information dictionaries
        """
        try:
            response = self.session.get(f"{self.jenkins_url}/api/json?tree=jobs[name,url,color]")
            response.raise_for_status()
            return response.json()['jobs']
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to list jobs: {str(e)}")

    def get_job_status(self, job_name: str) -> Optional[JenkinsBuild]:
        """
        Get the status of the latest build for a specific job.
        
        Args:
            job_name: Name of the Jenkins job
            
        Returns:
            JenkinsBuild object with build information or None if no builds exist
        """
        try:
            response = self.session.get(
                f"{self.jenkins_url}/job/{job_name}/lastBuild/api/json",
                params={'tree': 'number,result,timestamp,duration,url'}
            )
            
            if response.status_code == 404:
                return None
                
            response.raise_for_status()
            build_data = response.json()
            
            return JenkinsBuild(
                number=build_data['number'],
                status=build_data['result'] or 'RUNNING',
                timestamp=datetime.fromtimestamp(build_data['timestamp'] / 1000),
                duration=build_data['duration'],
                url=build_data['url']
            )
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to get job status: {str(e)}")

    def trigger_job(self, job_name: str, parameters: Dict = None) -> int:
        """
        Trigger a Jenkins job build.
        
        Args:
            job_name: Name of the Jenkins job
            parameters: Optional dictionary of build parameters
            
        Returns:
            Build number of the triggered job
        """
        try:
            if parameters:
                # Trigger parameterized build
                response = self.session.post(
                    f"{self.jenkins_url}/job/{job_name}/buildWithParameters",
                    data=parameters
                )
            else:
                # Trigger simple build
                response = self.session.post(
                    f"{self.jenkins_url}/job/{job_name}/build"
                )
            
            response.raise_for_status()
            
            # Get the queue item URL from the response headers
            queue_url = response.headers.get('Location')
            if not queue_url:
                raise RuntimeError("No queue URL in response")
            
            # Wait for the build to start and get its number
            while True:
                queue_response = self.session.get(f"{self.jenkins_url}{queue_url}/api/json")
                queue_response.raise_for_status()
                queue_data = queue_response.json()
                
                if 'executable' in queue_data:
                    return queue_data['executable']['number']
                
                if queue_data.get('cancelled', False):
                    raise RuntimeError("Build was cancelled")
                
                time.sleep(1)
                
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to trigger job: {str(e)}")

def main():
    # Get Jenkins URL and credentials
    jenkins_url = input("Enter Jenkins URL: ").strip()
    username = input("Enter Jenkins username (press Enter to skip): ").strip() or None
    
    if username:
        api_token = getpass.getpass("Enter Jenkins API token: ").strip()
    else:
        api_token = None

    try:
        # Initialize Jenkins manager
        jenkins = JenkinsManager(jenkins_url, username, api_token)
        
        while True:
            print("\nJenkins Manager Menu:")
            print("1. List all jobs")
            print("2. Check job status")
            print("3. Trigger job")
            print("4. Exit")
            
            choice = input("\nEnter your choice (1-4): ").strip()
            
            if choice == "1":
                jobs = jenkins.list_jobs()
                print("\nAvailable Jobs:")
                for job in jobs:
                    print(f"- {job['name']} (Status: {job['color']})")
                    
            elif choice == "2":
                job_name = input("Enter job name: ").strip()
                build = jenkins.get_job_status(job_name)
                if build:
                    print(f"\nLatest build for {job_name}:")
                    print(f"Build number: {build.number}")
                    print(f"Status: {build.status}")
                    print(f"Timestamp: {build.timestamp}")
                    print(f"Duration: {build.duration}ms")
                    print(f"URL: {build.url}")
                else:
                    print(f"No builds found for {job_name}")
                    
            elif choice == "3":
                job_name = input("Enter job name: ").strip()
                try:
                    build_number = jenkins.trigger_job(job_name)
                    print(f"Successfully triggered build #{build_number}")
                except Exception as e:
                    print(f"Failed to trigger job: {str(e)}")
                    
            elif choice == "4":
                print("Goodbye!")
                break
                
            else:
                print("Invalid choice. Please try again.")
                
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()

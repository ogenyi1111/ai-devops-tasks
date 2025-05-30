graph TD
    Start([Pipeline Start]) --> Checkout[Checkout Code]
    Checkout --> Build[Build Application]
    Build --> Test[Unit Tests]
    Test --> StaticAnalysis[Static Code Analysis]
    StaticAnalysis --> SecurityChecks[Security Checks]
    SecurityChecks --> DockerBuild[Build Docker Image]
    DockerBuild --> IntegrationTests[Integration Tests]
    
    %% Staging Deployment
    IntegrationTests --> StagingDeploy{Deploy to Staging?}
    StagingDeploy -->|Yes| Staging[Deploy to Staging]
    Staging --> StagingTests[Staging Tests]
    StagingTests --> StagingApproval{Staging Approval?}
    
    %% Production Deployment
    StagingApproval -->|Approved| ProductionDeploy{Deploy to Production?}
    ProductionDeploy -->|Yes| Production[Deploy to Production]
    Production --> ProductionTests[Production Tests]
    ProductionTests --> End([Pipeline End])
    
    %% Failure Paths
    Test -->|Failed| TestFailure[Test Failure]
    StaticAnalysis -->|Failed| AnalysisFailure[Analysis Failure]
    SecurityChecks -->|Failed| SecurityFailure[Security Failure]
    IntegrationTests -->|Failed| IntegrationFailure[Integration Failure]
    StagingTests -->|Failed| StagingFailure[Staging Failure]
    ProductionTests -->|Failed| ProductionFailure[Production Failure]
    
    %% Styling
    classDef success fill:#d4edda,stroke:#c3e6cb,color:#155724
    classDef failure fill:#f8d7da,stroke:#f5c6cb,color:#721c24
    classDef process fill:#e2e3e5,stroke:#d6d8db,color:#383d41
    classDef decision fill:#fff3cd,stroke:#ffeeba,color:#856404
    
    class Start,End success
    class TestFailure,AnalysisFailure,SecurityFailure,IntegrationFailure,StagingFailure,ProductionFailure failure
    class Checkout,Build,Test,StaticAnalysis,SecurityChecks,DockerBuild,IntegrationTests,Staging,StagingTests,Production,ProductionTests process
    class StagingDeploy,StagingApproval,ProductionDeploy decision

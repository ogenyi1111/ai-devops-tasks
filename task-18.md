```
# 5 Key Security Practices for Docker Applications in Production

## 1. Use Non-Root Users
```dockerfile
# Bad Practice
FROM node:latest
COPY . /app
RUN npm install
CMD ["node", "app.js"]

# Good Practice
FROM node:latest
COPY . /app
RUN npm install
USER node  # Switch to non-root user
CMD ["node", "app.js"]
```
- Never run containers as root
- Create and use dedicated non-root users
- Set proper file permissions
- Use `USER` directive in Dockerfile
- Benefits:
  - Limits potential damage from container breaches
  - Follows principle of least privilege
  - Reduces attack surface

## 2. Scan Images for Vulnerabilities
```bash
# Using Docker Scan
docker scan myapp:latest

# Using Trivy
trivy image myapp:latest

# Using Clair
clair-scanner --ip <container-ip> myapp:latest
```
- Regularly scan images for known vulnerabilities
- Integrate scanning into CI/CD pipeline
- Use multiple scanning tools
- Keep base images updated
- Benefits:
  - Identifies security issues early
  - Prevents deployment of vulnerable images
  - Maintains security compliance

## 3. Implement Resource Limits
```yaml
# docker-compose.yml
services:
  app:
    image: myapp:latest
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```
- Set CPU and memory limits
- Use resource quotas
- Monitor resource usage
- Benefits:
  - Prevents resource exhaustion attacks
  - Ensures fair resource distribution
  - Improves system stability

## 4. Use Secrets Management
```yaml
# docker-compose.yml
services:
  app:
    image: myapp:latest
    secrets:
      - db_password
      - api_key

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    external: true
```
- Never hardcode secrets in images
- Use Docker secrets or external secret managers
- Rotate secrets regularly
- Benefits:
  - Protects sensitive data
  - Follows security best practices
  - Enables secret rotation

## 5. Implement Network Security
```yaml
# docker-compose.yml
services:
  app:
    image: myapp:latest
    networks:
      - frontend
      - backend
    expose:
      - "3000"

networks:
  frontend:
    driver: bridge
  backend:
    internal: true  # No external access
    driver: bridge
```
- Use internal networks
- Implement network segmentation
- Limit container communication
- Use reverse proxies
- Benefits:
  - Reduces attack surface
  - Controls container communication
  - Improves network security

## Additional Best Practices

1. **Regular Updates**
   - Keep Docker Engine updated
   - Update base images regularly
   - Apply security patches promptly

2. **Logging and Monitoring**
   - Implement centralized logging
   - Monitor container behavior
   - Set up alerts for suspicious activity

3. **Image Minimization**
   - Use multi-stage builds
   - Remove unnecessary packages
   - Keep images small and focused

4. **Health Checks**
   - Implement container health checks
   - Monitor container status
   - Automate recovery procedures

5. **Backup and Recovery**
   - Regular backups of persistent data
   - Test recovery procedures
   - Document disaster recovery plans
```


# 5 Key Security Practices for Docker Applications in Production

## 1. Use Non-Root Users

### Dockerfile Implementation
```dockerfile
# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Set proper permissions
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Docker Compose Implementation
```yaml
version: '3.8'

services:
  app:
    build: .
    user: "1000:1000"  # Use specific UID:GID
    # OR
    # user: "appuser:appgroup"  # Use named user/group
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Implementation Steps

1. **Create Non-Root User in Dockerfile**
   ```dockerfile
   # For Alpine-based images
   RUN addgroup -S appgroup && adduser -S appuser -G appgroup

   # For Debian/Ubuntu-based images
   RUN groupadd -r appgroup && useradd -r -g appgroup appuser
   ```

2. **Set Proper Permissions**
   ```dockerfile
   # Set ownership of application files
   RUN chown -R appuser:appgroup /app

   # Set specific file permissions if needed
   RUN chmod 755 /app
   RUN chmod 644 /app/config.json
   ```

3. **Switch to Non-Root User**
   ```dockerfile
   # Switch to non-root user
   USER appuser
   ```

4. **Handle Volume Permissions**
   ```yaml
   # docker-compose.yml
   services:
     app:
       volumes:
         - ./data:/app/data:rw,uid=1000,gid=1000
   ```

### Common Issues and Solutions

1. **Permission Denied Errors**
   ```dockerfile
   # If you need to run commands as root, do it before switching users
   RUN apt-get update && apt-get install -y some-package
   USER appuser
   ```

2. **Volume Mount Issues**
   ```yaml
   # docker-compose.yml
   services:
     app:
       volumes:
         - type: bind
           source: ./data
           target: /app/data
           consistency: delegated
   ```

3. **File Ownership**
   ```dockerfile
   # Ensure proper ownership of mounted volumes
   RUN mkdir -p /app/data && chown -R appuser:appgroup /app/data
   ```

### Best Practices

1. **Use Specific UIDs**
   ```yaml
   # docker-compose.yml
   services:
     app:
       user: "1000:1000"  # Match host system user
   ```

2. **Minimal Permissions**
   ```dockerfile
   # Only give necessary permissions
   RUN chmod 755 /app
   RUN chmod 644 /app/config.json
   ```

3. **Environment Variables**
   ```yaml
   # docker-compose.yml
   services:
     app:
       environment:
         - USER_ID=1000
         - GROUP_ID=1000
   ```

### Verification

1. **Check Running User**
   ```bash
   # Inside container
   whoami
   id
   ```

2. **Check File Permissions**
   ```bash
   # Inside container
   ls -la /app
   ```

3. **Test Application Access**
   ```bash
   # Test file operations
   touch /app/test.txt
   echo "test" > /app/test.txt
   ```

## 2. Scan Images for Vulnerabilities
```bash
# Using Docker Scan
docker scan myapp:latest

# Using Trivy
trivy image myapp:latest

# Using Clair
clair-scanner --ip <container-ip> myapp:latest
```
- Regularly scan images for known vulnerabilities
- Integrate scanning into CI/CD pipeline
- Use multiple scanning tools
- Keep base images updated
- Benefits:
  - Identifies security issues early
  - Prevents deployment of vulnerable images
  - Maintains security compliance

## 3. Implement Resource Limits
```yaml
# docker-compose.yml
services:
  app:
    image: myapp:latest
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```
- Set CPU and memory limits
- Use resource quotas
- Monitor resource usage
- Benefits:
  - Prevents resource exhaustion attacks
  - Ensures fair resource distribution
  - Improves system stability

## 4. Use Secrets Management
```yaml
# docker-compose.yml
services:
  app:
    image: myapp:latest
    secrets:
      - db_password
      - api_key

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    external: true
```
- Never hardcode secrets in images
- Use Docker secrets or external secret managers
- Rotate secrets regularly
- Benefits:
  - Protects sensitive data
  - Follows security best practices
  - Enables secret rotation

## 5. Implement Network Security
```yaml
# docker-compose.yml
services:
  app:
    image: myapp:latest
    networks:
      - frontend
      - backend
    expose:
      - "3000"

networks:
  frontend:
    driver: bridge
  backend:
    internal: true  # No external access
    driver: bridge
```
- Use internal networks
- Implement network segmentation
- Limit container communication
- Use reverse proxies
- Benefits:
  - Reduces attack surface
  - Controls container communication
  - Improves network security

## Additional Best Practices

1. **Regular Updates**
   - Keep Docker Engine updated
   - Update base images regularly
   - Apply security patches promptly

2. **Logging and Monitoring**
   - Implement centralized logging
   - Monitor container behavior
   - Set up alerts for suspicious activity

3. **Image Minimization**
   - Use multi-stage builds
   - Remove unnecessary packages
   - Keep images small and focused

4. **Health Checks**
   - Implement container health checks
   - Monitor container status
   - Automate recovery procedures

5. **Backup and Recovery**
   - Regular backups of persistent data
   - Test recovery procedures
   - Document disaster recovery plans

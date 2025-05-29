```
[Component Labels]
Client Layer    <--->    Application Layer    <--->    Data Layer

+-------------+     HTTP/HTTPS     +------------------+     Database     +------------+
|             |  <------------->   |                  |  <------------>  |            |
|   Client    |                    | Application      |                  |  Database  |
|  (Browser)  |                    |    Server        |                  |            |
|             |                    |                  |                  |            |
+-------------+                    +------------------+                  +------------+
        |                                  |                                   |
        |                                  |                                   |
        v                                  v                                   v
    Sends Request                    Processes Request                    Stores Data
    (GET, POST, etc.)                (Business Logic)                    (CRUD Operations)

[Data Flow]
Request Flow:  Client → Application Server → Database
Response Flow: Database → Application Server → Client

+--------+      +--------+      +--------+
|        |      |        |      |        |
| Client | ---> | Server | ---> |  DB    |
|        |      |        |      |        |
+--------+      +--------+      +--------+
     ^              ^              ^
     |              |              |
     +--------------+--------------+
          Response Flow

[Docker Service Check Script]
```bash
#!/bin/bash

# Check if Docker service is running
if systemctl is-active --quiet docker; then
    echo "Docker service is already running"
else
    echo "Docker service is not running. Starting Docker..."
    sudo systemctl start docker
    
    # Verify if Docker started successfully
    if systemctl is-active --quiet docker; then
        echo "Docker service started successfully"
    else
        echo "Failed to start Docker service"
        exit 1
    fi
fi
```
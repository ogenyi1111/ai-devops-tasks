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

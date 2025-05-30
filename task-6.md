flowchart LR
    ClientLayer <---> ApplicationLayer <---> DataLayer

    subgraph ComponentLabels
        ClientLayer
        ApplicationLayer
        DataLayer
    end

    ClientLayer -->|HTTP/HTTPS| ApplicationLayer
    ApplicationLayer -->|Database| DataLayer

    subgraph DataFlow
        Client --> ApplicationServer --> Database
        Database --> ApplicationServer --> Client
    end

    subgraph CI/CD_Pipeline
        A[Commit Code] --> B[Build]
        B --> C[Run Tests]
        C -->|Tests Pass| D[Deploy]
        C -->|Tests Fail| A
        D --> E[Production]

        style A fill:#f9f,stroke:#333,stroke-width:2px
        style B fill:#bbf,stroke:#333,stroke-width:2px
        style C fill:#bfb,stroke:#333,stroke-width:2px
        style D fill:#fbb,stroke:#333,stroke-width:2px
        style E fill:#fbf,stroke:#333,stroke-width:2px
    end


![Mermaid generated](image/Editor _ Mermaid.png)


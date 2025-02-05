# NexusMind DeSci Lab Architecture

## High-Level Architecture Diagram

```mermaid
graph TD
    A[User] -->|Interacts with| B[Frontend - Next.js]
    B -->|API Requests| C[Backend - Node.js/Express]
    C -->|Queries/Updates| D[Database - MongoDB]
    C -->|Smart Contract Interactions| E[Blockchain - Ethereum]
    C -->|AI Processing| F[AI Module - TensorFlow.js]
    E -->|Token Transactions| G[Token Economics]
    B -->|Web3 Interactions| E

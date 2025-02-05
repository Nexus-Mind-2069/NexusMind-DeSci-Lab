# Contributing to NexusMind DeSci Lab

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Workflow](#development-workflow)
- [Branching Strategy](#branching-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Security](#security)

## Code of Conduct

We are committed to fostering an open and welcoming environment. By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development Workflow

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

### Prerequisites

- Node.js (v16.0.0 or higher)
- Python (v3.8 or higher)
- Phantom Wallet
- Git

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/<your-username>/NexusMind-DeSci-Lab.git

# Add upstream remote
git remote add upstream https://github.com/Nexus-Mind-2069/NexusMind-DeSci-Lab.git

# Install dependencies
npm install

# Create .env file
cp .env.example .env

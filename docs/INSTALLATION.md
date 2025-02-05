# Installation Guide

## Prerequisites

- Node.js and npm (or yarn)
- Git
- A code editor (VS Code recommended)
- Phantom wallet (for Solana blockchain interactions)


## Installation Steps

1. Clone the repository:
   \`\`\`bash
   git clone <repository_url>
   \`\`\`

2. Navigate to the project directory:
   \`\`\`bash
   cd <project_directory>
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

4. Configure environment variables (refer to `.env.example` for details):
   \`\`\`bash
   cp .env.example .env
   \`\`\`

5. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

6. Set up Phantom Wallet:
   - Install the Phantom wallet extension for your browser
   - Create a new Solana wallet or import an existing one
   - Ensure you have some SOL for transaction fees


## Running the Application

1. Connect to Solana Devnet:
   - Open Phantom wallet
   - Go to Settings > Change Network > Select 'Devnet'
2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Troubleshooting

1. **Dependency Issues:**
   - Ensure all dependencies are correctly installed. Run `npm install` again if necessary.
2. **Build Errors:**
   - Check the console for specific error messages.
3. **Environment Variables:**
   - Verify that your `.env` file is correctly configured.
4. **Network Connectivity:**
   - Ensure you have a stable internet connection.
5. **Phantom Wallet Connection Issues**
   - Ensure Phantom wallet is installed and unlocked
   - Check if you're connected to the correct Solana network (Devnet for testing)
   - Verify you have sufficient SOL balance for transactions


const express = require('express');
const app = express();
const port = 3000;
const { Connection, PublicKey } = require('@solana/web3.js');
const { Program, Provider } = require('@project-serum/anchor');
const idl = require('./idl.json');

app.use(express.json());

const programID = new PublicKey(idl.metadata.address);
const network = 'https://api.devnet.solana.com';
const connection = new Connection(network, 'confirmed');
const provider = new Provider(connection, null, {});
const program = new Program(idl, programID, provider);

app.get('/tasks', async (req, res) => {
  const tasks = await program.account.task.all();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { description, reward, ipfsHash } = req.body;
  const task = web3.Keypair.generate();
  await program.rpc.createTask(description, reward, ipfsHash, {
    accounts: {
      task: task.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [task],
  });
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
import React, { useState, useEffect } from 'react';
import { Button, TextField, Card, CardContent, Typography, Tabs, Tab, Box } from '@mui/material';
import './App.css';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './idl.json';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', reward: 0, ipfsHash: '' });
  const [walletAddress, setWalletAddress] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Anchor setup
  const programID = new PublicKey(idl.metadata.address);
  const network = clusterApiUrl('devnet');
  const opts = { preflightCommitment: 'processed' };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(connection, window.solana, opts);
    return provider;
  };

  useEffect(() => {
    const connectWallet = async () => {
      if (window.solana) {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
      }
    };
    connectWallet();
  }, []);

  const createTask = async () => {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    await program.rpc.createTask(newTask.description, newTask.reward, newTask.ipfsHash, {
      accounts: {
        task: web3.Keypair.generate().publicKey,
        user: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
    });
    alert('Task created successfully!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>NexusMind DeSci Lab</h1>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Tasks" />
        </Tabs>
        <Box hidden={tabValue !== 0}>
          <TextField
            label="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            label="Reward (Nemi)"
            type="number"
            value={newTask.reward}
            onChange={(e) => setNewTask({ ...newTask, reward: parseInt(e.target.value) })}
          />
          <TextField
            label="IPFS Hash"
            value={newTask.ipfsHash}
            onChange={(e) => setNewTask({ ...newTask, ipfsHash: e.target.value })}
          />
          <Button variant="contained" onClick={createTask}>
            Create Task
          </Button>

          {tasks.map((task) => (
            <Card key={task.publicKey.toString()}>
              <CardContent>
                <Typography>{task.description}</Typography>
                <Typography>Reward: {task.reward} Nemi</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </header>
    </div>
  );
}

export default App;
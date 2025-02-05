const axios = require('axios');

async function submitPaper(paperData) {
  try {
    const response = await axios.post('http://localhost:5000/api/papers', paperData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_JWT_TOKEN'
      }
    });
    console.log('Paper submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting paper:', error.response.data);
    throw error;
  }
}

// Example usage
const paperData = {
  title: "Quantum Entanglement in Decentralized Networks",
  abstract: "This paper explores the potential applications of quantum entanglement in improving the security and efficiency of decentralized networks.",
  content: "Full paper content...",
  authors: ["0x1234...5678", "0x9876...5432"]
};

submitPaper(paperData)
  .then(result => console.log('Submission result:', result))
  .catch(error => console.error('Submission error:', error));

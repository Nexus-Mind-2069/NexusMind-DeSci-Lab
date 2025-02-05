import { Connection, PublicKey } from '@solana/web3.js';
import { ReviewProgram } from '@nexusmind/review-program';
import { TokenProgram } from '@nexusmind/token-program';

class PeerReviewSystem {
  constructor() {
    this.connection = new Connection('https://api.devnet.solana.com');
    this.reviewProgram = new ReviewProgram();
    this.tokenProgram = new TokenProgram();
  }

  async submitPeerReview(paperHash, review) {
    try {
      // 1. Stake tokens for review
      const stakeAmount = 100; // NXM tokens
      await this.tokenProgram.stake(stakeAmount);

      // 2. Submit anonymous review
      const reviewData = {
        paperId: paperHash,
        score: review.score,
        comments: review.comments,
        recommendations: review.recommendations,
        timestamp: Date.now(),
        reviewerId: await this.generateAnonymousId()
      };

      const reviewHash = await this.reviewProgram.submitReview(reviewData);
      console.log('Review submitted successfully:', reviewHash);

      // 3. Verify reviewer credentials
      await this.reviewProgram.verifyCredentials({
        expertise: review.expertise,
        publications: review.publications
      });

      return {
        success: true,
        reviewHash,
        timestamp: reviewData.timestamp
      };

    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  }

  async generateAnonymousId() {
    // Generate a random keypair for anonymous identification
    const anonymousKeypair = await window.phantom.solana.createRandomKeypair();
    return anonymousKeypair.publicKey.toString();
  }
}

// Example usage
const reviewSystem = new PeerReviewSystem();

const exampleReview = {
  score: 4.5,
  comments: "Excellent methodology and innovative approach. The research demonstrates thorough understanding of quantum computing principles in decentralized systems.",
  recommendations: [
    "Consider expanding the discussion on quantum resistance",
    "Add more experimental data to support conclusions"
  ],
  expertise: ["Quantum Computing", "Blockchain Technology"],
  publications: [
    "Quantum Computing in Distributed Systems, 2024",
    "Blockchain Scalability Solutions, 2023"
  ]
};

// Submit the review
reviewSystem.submitPeerReview("QmHash123...", exampleReview)
  .then(result => console.log('Review submission result:', result))
  .catch(error => console.error('Error:', error));

export default PeerReviewSystem;

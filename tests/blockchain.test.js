const { ethers } = require("hardhat");

describe("ResearchPaper", function () {
  it("Should submit a new research paper", async function () {
    const ResearchPaper = await ethers.getContractFactory("ResearchPaper");
    const researchPaper = await ResearchPaper.deploy();
    await researchPaper.deployed();

    const submitTx = await researchPaper.submitPaper("Test Paper", "QmTest...");
    await submitTx.wait();

    const paperCount = await researchPaper.getPaperCount();
    expect(paperCount).to.equal(1);
  });

  it("Should start peer review process", async function () {
    const ResearchPaper = await ethers.getContractFactory("ResearchPaper");
    const researchPaper = await ResearchPaper.deploy();
    await researchPaper.deployed();

    await researchPaper.submitPaper("Test Paper", "QmTest...");
    const startReviewTx = await researchPaper.startPeerReview(0);
    await startReviewTx.wait();

    const paperStatus = await researchPaper.getPaperStatus(0);
    expect(paperStatus).to.equal(1); // 1 represents "Under Review" status
  });
});

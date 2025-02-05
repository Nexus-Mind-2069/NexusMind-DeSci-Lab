const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NexusToken", function () {
  it("Should return the new token name once it's changed", async function () {
    const NexusToken = await ethers.getContractFactory("NexusToken");
    const nexusToken = await NexusToken.deploy("NexusToken", "NXT");
    await nexusToken.deployed();

    expect(await nexusToken.name()).to.equal("NexusToken");

    const setTokenNameTx = await nexusToken.setName("NewNexusToken");
    await setTokenNameTx.wait();

    expect(await nexusToken.name()).to.equal("NewNexusToken");
  });
});

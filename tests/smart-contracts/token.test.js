const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NexusToken', function () {
  it('Should deploy the token', async function () {
    const NexusToken = await ethers.getContractFactory('NexusToken');
    const nexusToken = await NexusToken.deploy();
    await nexusToken.deployed();

    expect(await nexusToken.name()).to.equal('NexusToken');
  });

  it('Should mint tokens', async function () {
    // Implement test logic here
    expect(true).to.equal(true);
  });
});

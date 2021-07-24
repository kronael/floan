/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");

task("create-offer", "Creates an offer").setAction(async () => {
  let floan;
  /************* DEPLOY CONTRACTS ******************/

  // get contract
  floanAddress = utils.getAddress("0x30121E67D3b2ef44A545dE4Dde5F3Cfc0319dc68");
  floan = await ethers.getContractAt("Floan", floanAddress);

  // parameters
  const principal = utils.parseEther("1");
  const repayment = utils.parseEther("1");
  const duration = utils.parseEther("1");
  const validUntil = utils.parseEther("1");

  await floan.requestLoan(principal, repayment, duration, validUntil);
});

module.exports = {};

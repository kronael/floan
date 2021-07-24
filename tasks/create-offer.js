/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");

task("create-offer", "Creates an offer").setAction(async () => {
  let floan;
  /************* DEPLOY CONTRACTS ******************/

  // get contract
  floanAddress = utils.getAddress("0xa5b271Eb7dAed08eD76EDd794c13A6113B6aA2Cd");
  floan = await ethers.getContractAt("Floan", floanAddress);

  // parameters
  const principal = utils.parseEther("1");
  const repayment = utils.parseEther("1");
  const duration = utils.parseEther("1");
  const validUntil = utils.parseEther("1");

  await floan.requestLoan(principal, repayment, duration, validUntil);
});

module.exports = {};

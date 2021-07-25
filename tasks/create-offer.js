/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");
const { getContract } = require("../helper/getContract");

task("create-offer", "Creates an offer").setAction(async () => {
  /************* DEPLOY CONTRACTS ******************/
  const accounts = await hre.ethers.getSigners();

  // get contract
  const floan = await getContract();

  // parameters
  const principal = utils.parseEther("1");
  const repayment = utils.parseEther("1");
  const duration = utils.parseEther("1");
  const validUntil = utils.parseEther("1");

  const pohAddress = await floan.getPOHAddress();
  console.log("pohAddress is ", pohAddress);

  const canRequestLoan = await floan.canUsePlattform();
  console.log("canRequestLoan is ", canRequestLoan);
  await floan.requestLoan(principal, repayment, duration);
});

module.exports = {};

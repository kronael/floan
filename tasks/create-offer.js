/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");
const { getContract } = require("../helper/getContract");

task("create-offer", "Creates an offer").setAction(async () => {
  /************* DEPLOY CONTRACTS ******************/

  // get contract
  const floan = await getContract();

  // parameters
  const principal = utils.parseEther("1");
  const repayment = utils.parseEther("1");
  const duration = utils.parseEther("1");
  const validUntil = utils.parseEther("1");

  await floan.requestLoan(principal, repayment, duration, validUntil);
});

module.exports = {};

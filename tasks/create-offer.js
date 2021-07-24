/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");

task("offer", "Creates an offer").setAction(async () => {
  let floan;
  /************* DEPLOY CONTRACTS ******************/

  // get contract
  floanAddress = utils.getAddress("0xC01001E17E3f0bcDFe67e0b4bD02B0B13075EA82");
  floan = await ethers.getContractAt("Floan", floanAddress);

  // parameters
  const principal = utils.parseEther("1");
  const repayment = utils.parseEther("1");
  const duration = utils.parseEther("1");
  const validUntil = utils.parseEther("1");

  await floan.requestLoan(principal, repayment, duration, validUntil);
  console.log("msgis ", msg, "\n\n");
});

module.exports = {};

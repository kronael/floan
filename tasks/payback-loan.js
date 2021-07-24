/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");

task("withdraw", "Withdraw loan").setAction(async () => {
  let floan;

  floanAddress = utils.getAddress("0xa5b271Eb7dAed08eD76EDd794c13A6113B6aA2Cd");
  floan = await ethers.getContractAt("Floan", floanAddress);

  await floan.paybackLoan();
});

module.exports = {};

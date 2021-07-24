/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");
const { getContract } = require("../helper/getContract");

task("draw-loan", "Draw loan").setAction(async () => {
  const floan = await getContract();
  await floan.drawLoan();
});

module.exports = {};

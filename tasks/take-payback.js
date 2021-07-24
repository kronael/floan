/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");
const { getContract, getToken } = require("../helper/getContract");

task("take-payback", "Take payback")
  .addParam("loanid", "The Id of the loan")
  .setAction(async (taskArgs) => {
    const floan = await getContract();
    await floan.takePayback(taskArgs.loanid);
  });

module.exports = {};

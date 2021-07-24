/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");
const { getContract, getToken } = require("../helper/getContract");

task("payback-loan", "Payback loan")
  .addParam("loanid", "The Id of the loan")
  .setAction(async (taskArgs) => {
    const floan = await getContract();
    const token = await getToken();

    await token.approve(floan.address, utils.parseEther("1"));
    await floan.paybackLoan(taskArgs.loanid);
  });

module.exports = {};

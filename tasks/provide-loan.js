/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
require("@nomiclabs/hardhat-web3");

const { utils } = require("ethers");
const { getContract, getToken } = require("../helper/getContract");

task("provide-loan", "Provides an loan given id")
  .addParam("loanid", "The Id of the loan")
  .setAction(async (taskArgs) => {
    /************* DEPLOY CONTRACTS ******************/

    // get contract
    const floan = await getContract();
    const token = await getToken();

    // parameters
    await token.approve(floan.address, utils.parseEther("1"));
    await floan.provideLoan(taskArgs.loanid);
  });

module.exports = {};

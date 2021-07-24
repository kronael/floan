require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const infuraProjectId = process.env.INFURA_ID;
const mnemonic = process.env.DEV_MNEMONIC;
const alchemyAPI = process.env.ALCHEMY_API;
const etherscanAPI = process.env.ETHERSCAN_API;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        // fix block number to speed up forkings
        url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyAPI}`,
        blockNumber: 12748115,
      },
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
      accounts: { mnemonic: mnemonic },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraProjectId}`,
      accounts: { mnemonic: mnemonic },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${infuraProjectId}`,
      accounts: { mnemonic: mnemonic },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraProjectId}`,
      accounts: { mnemonic: mnemonic },
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraProjectId}`,
      accounts: { mnemonic: mnemonic },
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraProjectId}`,
      accounts: { mnemonic: mnemonic },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: etherscanAPI,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  solidity: "0.8.4",
};

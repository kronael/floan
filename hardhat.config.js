require("path");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// load tasks
const normalizedPath = require("path").join(__dirname, "tasks");
require("fs")
  .readdirSync(normalizedPath)
  .forEach(function(file) {
    require("./tasks/" + file);
  });

// load private data
const infuraProjectId = process.env.INFURA_ID;
const portal_ID = process.env.portal_ID;
const mnemonic = process.env.DEV_MNEMONIC;
const alchemyAPI = process.env.ALCHEMY_API;
const etherscanAPI = process.env.ETHERSCAN_API;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const DEFAULT_NETWORK = "kovan";
module.exports = {
  defaultNetwork: DEFAULT_NETWORK,
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
      url: `https://poa-kovan.gateway.pokt.network/v1/lb/${portal_ID}`,
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
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.17",
        settings: {},
      },
    ],
  },
};

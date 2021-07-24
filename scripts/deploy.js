/* code from scaffold-eth (https://github.com/austintgriffith/scaffold-eth) */
/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { ethers } = require("hardhat");
const { utils } = require("ethers");

const main = async () => {
  console.log("\n\n 📡 Deploying...\n");

  /************* DEPLOY CONTRACTS ******************/

  linkAddress = utils.getAddress("0x326c977e6efc84e512bb9c30f76e30c160ed06fb");
  token = await ethers.getContractAt("Floan", linkAddress);

  //const floan = await deploy("Floan", [tokenAddress]);
  const floan = await deploy("Floan", [token.address]);

  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};

const deploy = async (
  contractName,
  _args = [],
  overrides = {},
  libraries = {}
) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractArtifacts = await ethers.getContractFactory(contractName, {
    libraries: libraries,
  });
  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);

  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);

  let extraGasInfo = "";
  if (deployed && deployed.deployTransaction) {
    const gasUsed = deployed.deployTransaction.gasLimit.mul(
      deployed.deployTransaction.gasPrice
    );
    extraGasInfo = `${utils.formatEther(gasUsed)} ETH, tx hash ${
      deployed.deployTransaction.hash
    }`;
  }

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address)
  );
  console.log(" ⛽", chalk.grey(extraGasInfo));

  return deployed;
};

// ------ utils -------

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

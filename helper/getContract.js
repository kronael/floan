//const { floanAddressRaw } = require("../react-app/Floan.address");
const { utils } = require("ethers");

const getContract = async () => {
  // get contract
  const floanAddress = utils.getAddress(
    "0xAF2A62634f1021f36559CC0a3e0767E06488e9e7"
  );
  const floan = await ethers.getContractAt("Floan", floanAddress);
  //console.log(floan);
  return floan;
};

const getToken = async () => {
  // get contract
  const tokenAddress = utils.getAddress(
    "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd"
  );
  const token = await ethers.getContractAt("Token", tokenAddress);
  return token;
};

const getPOH = async () => {
  // get contract
  const POHAddress = utils.getAddress(
    "0x73BCCE92806BCe146102C44c4D9c3b9b9D745794"
  );
  const poh = await ethers.getContractAt("IProofOfHumanity", POHAddress);
  return poh;
};

module.exports = { getContract, getToken, getPOH };

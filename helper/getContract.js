//const { floanAddressRaw } = require("../react-app/Floan.address");
const { utils } = require("ethers");

const getContract = async () => {
  // get contract
  const floanAddress = utils.getAddress(
    "0x55f7Be297800584d9311341EDfB19788407AB72f"
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

module.exports = { getContract, getToken };

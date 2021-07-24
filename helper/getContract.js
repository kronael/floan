//const { floanAddressRaw } = require("../react-app/Floan.address");
const { utils } = require("ethers");

const getContract = async () => {
  // get contract
  const floanAddress = utils.getAddress(
    "0xa5b271Eb7dAed08eD76EDd794c13A6113B6aA2Cd"
  );
  const floan = await ethers.getContractAt("Floan", floanAddress);
  console.log(Floan);
  return float;
};

module.exports = { getContract };

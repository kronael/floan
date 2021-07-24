//const { floanAddressRaw } = require("../react-app/Floan.address");
const { utils } = require("ethers");

const getContract = async () => {
  // get contract
  const floanAddress = utils.getAddress(
    "0x55f7Be297800584d9311341EDfB19788407AB72f"
  );
  const floan = await ethers.getContractAt("Floan", floanAddress);
  console.log(floan);
  return floan;
};

module.exports = { getContract };

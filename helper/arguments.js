const { utils } = require("ethers");

const tokenAddress = utils.getAddress(
  "0xff795577d9ac8bd7d90ee22b6c1703490b6512fd"
); // dai
const pohAddress = utils.getAddress(
  "0x73BCCE92806BCe146102C44c4D9c3b9b9D745794"
);

module.exports = [tokenAddress, pohAddress];

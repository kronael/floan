const { expect } = require("chai");
/// @dev Take over another address (see: https://hardhat.org/guides/mainnet-forking.html for reference)
const impersonateAddress = async (address) => {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });

  const signer = await ethers.provider.getSigner(address);
  signer.address = signer._address;

  return signer;
};

/// @dev Steal ERC20 tokens from address
const stealTokens = async (new_owner, transferAmount, token, whale) => {
  // take over whale account
  const whaleSigner = await impersonateAddress(whale);
  expect(await token.balanceOf(whaleSigner.address)).to.be.above(
    transferAmount
  );

  // send token to owner address
  let oldBalance = await token.balanceOf(new_owner.address);
  await token.connect(whaleSigner).transfer(new_owner.address, transferAmount);
  let newBalance = oldBalance + transferAmount;
  //expect(await token.balanceOf(new_owner.address)).to.be.equal(newBalance); Check fails if tokens are stolen multiple times

  return newBalance;
};
module.exports = { impersonateAddress, stealTokens };

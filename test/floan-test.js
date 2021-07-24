const { expect } = require("chai");
const { utils } = require("ethers");
describe("Greeter", function () {
  let floan, token;
  beforeEach("Set up", async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(utils.parseEther("100"), "token", "mock token");

    const Floan = await ethers.getContractFactory("Floan");
    floan = await Floan.deploy(token.address);
  });
  it("Should give the correct token address to contract", async function () {
    expect(await floan.getTokenAddress()).to.be.equal(token.address);
  });
});

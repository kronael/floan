const { expect } = require("chai");
const { utils } = require("ethers");
describe("Floan", function() {
  let floan, token;
  beforeEach("Set up", async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(utils.parseEther("100"), "token", "mock token");

    const Floan = await ethers.getContractFactory("Floan");
    floan = await Floan.deploy(token.address);
  });
  it("Should give the correct token address to contract", async function() {
    expect(await floan.getTokenAddress()).to.be.equal(token.address);
  });

  it("Should request a loan", async function() {
    // parameters
    const principal = utils.parseEther("1");
    const repayment = utils.parseEther("1");
    const duration = utils.parseEther("1");
    const validUntil = utils.parseEther("1");

    await floan.requestLoan(principal, repayment, duration, validUntil);
  });
  it("Should provide the loan", async function() {
    // parameters
    const principal = utils.parseEther("1");
    const repayment = utils.parseEther("1");
    const duration = utils.parseEther("1");
    const validUntil = utils.parseEther("1");

    await floan.requestLoan(principal, repayment, duration, validUntil);

    await token.approve(floan.address, utils.parseEther("1"));
    await floan.provideLoan(0);
  });
  it("Should payback and take the loan", async function() {
    // parameters
    const principal = utils.parseEther("1");
    const repayment = utils.parseEther("1");
    const duration = utils.parseEther("1");
    const validUntil = utils.parseEther("1");

    await floan.requestLoan(principal, repayment, duration, validUntil);

    await token.approve(floan.address, utils.parseEther("1"));
    await floan.provideLoan(0);

    await token.approve(floan.address, utils.parseEther("1"));
    await floan.paybackLoan(0);

    await floan.takePayback(0);
  });
});

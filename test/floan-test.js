const { expect } = require("chai");
const { utils } = require("ethers");
const {
  impersonateAddress,
  stealTokens,
} = require("./helper/impersonateAddress.js");

describe("Should set up contract", function() {
  let floan, token, registeredUser;
  beforeEach("Set up", async () => {
    const accounts = await hre.ethers.getSigners();

    const poh = await ethers.getContractAt(
      "IProofOfHumanity",
      utils.getAddress("0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb")
    );

    token = await ethers.getContractAt(
      "Token",
      utils.getAddress("0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2")
    );
    const Floan = await ethers.getContractFactory("Floan");
    floan = await Floan.deploy(token.address, poh.address);

    registeredUser = await impersonateAddress(
      "0xEd38f503Bbb3b2bb3469D6818B42e53fd28D1602"
    );

    await stealTokens(
      registeredUser,
      utils.parseEther("100"),
      token,
      "0x05E793cE0C6027323Ac150F6d45C2344d28B6019"
    );
    //
    // 0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6
  });
  it("Should give the correct token address to contract", async function() {
    expect(await floan.getTokenAddress()).to.be.equal(token.address);

    expect(await floan.getPOHAddress()).to.be.equal(
      utils.getAddress("0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb")
    );
  });

  it("Should request a loan", async function() {
    const hasAccount = await floan.connect(registeredUser).canUsePlattform();
    console.log("hasAccount is", hasAccount.toString());
    // parameters
    const principal = utils.parseEther("1");
    const repayment = utils.parseEther("1");
    const duration = utils.parseEther("1");
    const validUntil = utils.parseEther("1");

    await floan
      .connect(registeredUser)
      .requestLoan(principal, repayment, duration, validUntil);
  });
  it("Should payback the loan", async function() {
    // parameters
    const principal = utils.parseEther("1");
    const repayment = utils.parseEther("1");
    const duration = utils.parseEther("1");
    const validUntil = utils.parseEther("1");

    await floan
      .connect(registeredUser)
      .requestLoan(principal, repayment, duration, validUntil);

    await token
      .connect(registeredUser)
      .approve(floan.address, utils.parseEther("1"));
    const userApproval = await token.allowance(
      registeredUser.address,
      floan.address
    );
    console.log("userApproval is ", utils.formatEther(userApproval));
    const userBalance = await token.balanceOf(registeredUser.address);
    console.log("userBalance is ", utils.formatEther(userBalance));
    await floan.connect(registeredUser).provideLoan(0);
  });
});

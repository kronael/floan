const { expect } = require("chai");
const { utils } = require("ethers");
const {
  impersonateAddress,
  stealTokens,
} = require("./helper/impersonateAddress.js");

describe("Should set up contract", function() {
  let floan, token, registeredUser;
  beforeEach("Set up", async () => {
    [owner, bob, alice, ...addrs] = await ethers.getSigners();

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

    // fund forking account
    registeredUser = await impersonateAddress(
      "0xEd38f503Bbb3b2bb3469D6818B42e53fd28D1602"
    );

    await stealTokens(
      registeredUser,
      utils.parseEther("100"),
      token,
      "0x05E793cE0C6027323Ac150F6d45C2344d28B6019"
    );
    await stealTokens(
      owner,
      utils.parseEther("100"),
      token,
      "0x05E793cE0C6027323Ac150F6d45C2344d28B6019"
    );
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
    const [owner, user1, user2, ...other] = await hre.ethers.getSigners();
    // parameters
    const principal = utils.parseEther("1");
    const repayment = utils.parseEther("1");
    const duration = utils.parseEther("1");

    await floan
      .connect(registeredUser)
      .requestLoan(principal, repayment, duration);

    const userCredit = await floan.getCredit(0);
    console.log("userCredit is", userCredit.toString()[0]);
  });
  it("Should provide the loan", async function() {
    // parameters
    const principal = utils.parseEther("1");
    const repayment = utils.parseEther("1");
    const duration = utils.parseEther("1");

    await floan
      .connect(registeredUser)
      .requestLoan(principal, repayment, duration);

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
  /*
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
  */
});

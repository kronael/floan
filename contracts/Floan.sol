//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {FloanTypes} from "./lib/FloanTypes.sol";
import {IFloan} from "./IFloan.sol";
import {IProofOfHumanity} from "./ProofOfHumanity.sol";
import {console} from "hardhat/console.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Floan is IFloan, Ownable {
    /********************* events *********************/
    event LogRequestLoan(
        address indexed requester,
        uint256 indexed loanID,
        uint256 principal,
        uint256 repayment,
        uint256 duration,
        uint256 validUntil
    );
    event LogProvideLoan(address indexed matcher, uint256 indexed loanID);
    event LogDrawLoan(address indexed requestor, uint256 indexed loanID);
    event LogPaybackLoan(address indexed requestor, uint256 indexed loanID);
    event LogSlashDebtor(uint256 indexed loanID);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    /********************* states *********************/
    IERC20 public token;
    IProofOfHumanity constant proofOfHumanity =
        IProofOfHumanity(address(0x73BCCE92806BCe146102C44c4D9c3b9b9D745794));
    mapping(uint256 => FloanTypes.credit) credits;
    uint256 loanNum;

    /********************* modifiers *********************/

    function setNewToken(address _newTokenAddress) public onlyOwner() {
        token = IERC20(_newTokenAddress);
    }

    /********************* function *********************/

    // core logic
    function requestLoan(
        uint256 _principal,
        uint256 _repayment,
        uint256 _duration,
        uint256 _validUntil
    ) external override {
        require(_validUntil >= block.number, "Back in time call");
        // add credit to orderbook
        credits[loanNum] = FloanTypes.credit({
            requester: msg.sender,
            lender: address(0),
            principal: _principal,
            repayment: _repayment,
            duration: uint48(_duration),
            validUntil: uint48(_validUntil),
            isFilled: false,
            isWithdrawn: false,
            isPayedBack: false,
            isClosed: false
        });
        // log action
        emit LogRequestLoan(
            msg.sender,
            loanNum,
            _principal,
            _repayment,
            _duration,
            _validUntil
        );
        // update credit information
        loanNum += 1;
    }

    function provideLoan(uint256 loanID) external override {
        require(credits[loanID].principal > 0, "Must be larger than 0");
        SafeERC20.safeTransferFrom(
            token,
            msg.sender,
            address(this),
            credits[loanID].principal
        );
        credits[loanID].isFilled = true;
        credits[loanID].lender = msg.sender;
        emit LogProvideLoan(msg.sender, loanID);
    }

    function drawLoan(uint256 loanID) external override {
        FloanTypes.credit memory userCredit = credits[loanID];
        require(userCredit.isFilled, "Request not filled");
        require(!userCredit.isWithdrawn, "Money has been withdrawn");

        SafeERC20.safeTransfer(token, msg.sender, userCredit.principal);
        credits[loanID].isWithdrawn = true;
        emit LogDrawLoan(msg.sender, loanID);
    }

    function paybackLoan(uint256 loanID) external override {
        SafeERC20.safeTransferFrom(
            token,
            msg.sender,
            address(this),
            credits[loanID].repayment
        );
        credits[loanID].isPayedBack = true;
        emit LogPaybackLoan(msg.sender, loanID);
    }

    function takePayback(uint256 loanID) external override {
        require(credits[loanID].lender == msg.sender, "Not original lender.");
        require(credits[loanID].isPayedBack, "Not paid back");
        SafeERC20.safeTransfer(token, msg.sender, credits[loanID].repayment);
        credits[loanID].isClosed = true;
    }

    function slashDebtor(uint256 loanID) external override {
        require(credits[loanID].isPayedBack == false, "Is payed back");
        require(
            uint256(credits[loanID].validUntil) <= block.number,
            "Period is not over"
        );
        console.log("You are a bad boy");
        emit LogSlashDebtor(loanID);
    }

    /********************* getter function *********************/
    function getTokenAddress() public view returns (address) {
        return address(token);
    }

    /**function getDebtID() public view returns (uint256) {
        return debtors[msg.sender];
    }

    function getCreditID() public view returns (uint256) {
        return creditors[msg.sender];
    }**/

    function getCredit(uint256 _loanId)
        public
        view
        returns (FloanTypes.credit memory)
    {
        return credits[_loanId];
    }

    function getloanNum() public view returns (uint256) {
        return loanNum;
    }
}

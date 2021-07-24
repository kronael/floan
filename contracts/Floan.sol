//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {FloanTypes} from "./lib/FloanTypes.sol";
import {IFloan} from "./IFloan.sol";
import {console} from "hardhat/console.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Floan is IFloan {
    /********************* events *********************/
    event LogRequestLoan(
        address indexed requester,
        uint256 indexed loanID,
        uint256 principal,
        uint256 repayment,
        uint256 duration,
        uint256 validUntil
    );
    event LogMatchLoan(
        address indexed matcher,
        uint256 indexed loanID,
        uint256 principal,
        uint256 repayment,
        uint256 duration,
        uint256 validUntil
    );
    event LogWithdrawLoan(address indexed requestor, address indexed loanID);
    event LogPaybackLoan(address indexed requestor, address indexed loanID);
    event LogSlashDebor(
        address indexed requestor,
        address indexed matcher,
        address indexed loanID
    );

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    /********************* states *********************/
    IERC20 token;
    mapping(address => uint256) creditIDs;
    mapping(uint256 => FloanTypes.credit) credits;
    uint256 loanNum;

    /********************* modifiers *********************/

    modifier isValid(uint256 validUntil) {
        require(block.timestamp >= validUntil);
        _;
    }

    /********************* function *********************/

    // core logic
    function requestLoan(
        uint256 _principal,
        uint256 _repayment,
        uint256 _duration,
        uint256 _validUntil
    ) external override {
        // add credit to orderbook
        credits[loanNum] = FloanTypes.credit({
            requester: msg.sender,
            principal: _principal,
            repayment: _repayment,
            duration: _duration,
            validUntil: _validUntil,
            isFilled: false,
            isWithdrawn: false,
            isPayedBack: false
        });
        creditIDs[msg.sender] = loanNum;
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

    function matchLoan(uint256 loanID) external override {
        SafeERC20.safeTransferFrom(
            token,
            msg.sender,
            address(this),
            credits[loanID].principal
        );
        credits[loanID].isFilled = true;
    }

    function withdrawLoan() external override {
        uint256 loanID = creditIDs[msg.sender];
        FloanTypes.credit memory userCredit = credits[loanID];
        require(userCredit.isFilled, "Request not filled");
        require(!userCredit.isWithdrawn, "Money has been withdrawn");

        SafeERC20.safeTransfer(token, msg.sender, userCredit.principal);
        credits[loanID].isWithdrawn = true;
    }

    function paybackLoan(uint256 loanID) external override {
        SafeERC20.safeTransferFrom(
            token,
            msg.sender,
            address(this),
            credits[loanID].repayment
        );
        credits[loanID].isPayedBack = true;
    }

    function slashDebtor(uint256 loanID) external override {
        require(credits[loanID].isPayedBack = false, "Is payed back");
        require(
            credits[loanID].validUntil <= block.number,
            "Period is not over"
        );
        console.log("You are a bad boy");
    }
}

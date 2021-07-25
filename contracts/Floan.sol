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
        uint256 duration
    );
    event LogProvideLoan(address indexed matcher, uint256 indexed loanID);
    event LogDrawLoan(address indexed requestor, uint256 indexed loanID);
    event LogPaybackLoan(address indexed requestor, uint256 indexed loanID);
    event LogSlashDebtor(address indexed requestor, uint256 indexed loanID);

    constructor(address _tokenAddress, address _pohAddress) {
        token = IERC20(_tokenAddress);
        proofOfHumanity = IProofOfHumanity(_pohAddress);
    }

    /********************* states *********************/
    IERC20 public token;
    IProofOfHumanity immutable proofOfHumanity;
    mapping(uint256 => FloanTypes.credit) credits;
    uint256 loanNum;

    /********************* modifiers *********************/

    function setNewToken(address _newTokenAddress) public onlyOwner() {
        token = IERC20(_newTokenAddress);
    }

    /********** return submissions  *****************/
    function canUsePlattform() public view returns (bool) {
        return proofOfHumanity.isRegistered(msg.sender);
    }

    function getPOHAddress() public view returns (address) {
        return address(proofOfHumanity);
    }

    /********************* function *********************/

    // core logic
    function requestLoan(
        uint256 _principal,
        uint256 _repayment,
        uint256 _duration
    ) external override {
        require(_duration > 0, "Back in time call");
        require(
            proofOfHumanity.isRegistered(msg.sender),
            "Must be registered on ProofOfHumanity"
        );
        // add credit to orderbook
        credits[loanNum] = FloanTypes.credit({
            requester: msg.sender,
            lender: address(0),
            principal: _principal,
            repayment: _repayment,
            duration: uint48(_duration),
            startBlock: 0,
            state: FloanTypes.State.open
        });
        // log action
        emit LogRequestLoan(
            msg.sender,
            loanNum,
            _principal,
            _repayment,
            _duration
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
        credits[loanID].state = FloanTypes.State.filled;
        credits[loanID].lender = msg.sender;
        emit LogProvideLoan(msg.sender, loanID);
    }

    function drawLoan(uint256 loanID) external override {
        FloanTypes.credit memory userCredit = credits[loanID];
        require(
            userCredit.state == FloanTypes.State.filled,
            "Request not filled"
        );

        SafeERC20.safeTransfer(token, msg.sender, userCredit.principal);
        credits[loanID].state = FloanTypes.State.withdrawn;
        credits[loanID].startBlock = uint48(block.number);
        emit LogDrawLoan(msg.sender, loanID);
    }

    function paybackLoan(uint256 loanID) external override {
        SafeERC20.safeTransferFrom(
            token,
            msg.sender,
            address(this),
            credits[loanID].repayment
        );
        credits[loanID].state = FloanTypes.State.payedBack;
        emit LogPaybackLoan(msg.sender, loanID);
    }

    function takePayback(uint256 loanID) external override {
        require(credits[loanID].lender == msg.sender, "Not original lender.");
        require(
            credits[loanID].state == FloanTypes.State.payedBack,
            "Not paid back"
        );
        SafeERC20.safeTransfer(token, msg.sender, credits[loanID].repayment);
        credits[loanID].state = FloanTypes.State.closed;
    }

    function slashDebtor(uint256 loanID) external override {
        require(
            credits[loanID].state == FloanTypes.State.withdrawn,
            "Is payed back"
        );
        require(
            credits[loanID].startBlock + credits[loanID].duration <
                uint48(block.number),
            "Period is not over"
        );
        console.log("You are a bad boy");
        emit LogSlashDebtor(credits[loanID].requester, loanID);
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

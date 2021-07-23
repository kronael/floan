//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {FloanTypes} from "./lib/FloanTypes.sol";
import {IFloan} from "./IFloan.sol";
import {console} from "hardhat/console.sol";

contract Floan is IFloan {
    /********************* events *********************/
    event LogRequestLoan(
        address indexed requester,
        uint256 indexed loanID,
        uint256 principal,
        uint256 repayment,
        uint256 duration
    );
    event LogMatchLoan(
        address indexed matcher,
        uint256 indexed loanID,
        uint256 principal,
        uint256 repayment,
        uint256 duration
    );
    event LogWithdrawLoan(address indexed requestor, address indexed loanID);
    event LogPaybackLoan(address indexed requestor, address indexed loanID);
    event LogSlashDebor(
        address indexed requestor,
        address indexed matcher,
        address indexed loanID
    );

    constructor() {}

    /********************* states *********************/
    mapping(address => FloanTypes.credit) credits;

    /********************* function *********************/

    // core logic
    function requestLoan(
        uint256 principal,
        uint256 repayment,
        uint256 duration,
        uint256 validUntil
    ) external override {}

    function matchLoan(uint256 loanId) external override {}

    function withdrawLoan() external override {}

    function paybackLoan(uint256 loanId) external override {}

    function slashDebtor(uint256 loanId) external override {}
}

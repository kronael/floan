//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IFloan {
    /********************* functions *********************/

    /// @notice Request a loan
    function requestLoan(
        uint256 principal,
        uint256 repayment,
        uint256 duration,
        uint256 validUntil
    ) external;

    /// @notice Accept loan offer
    function matchLoan(uint256 loanId) external;

    /// @notice withdraw loaned amount
    function withdrawLoan() external;

    /// @notice payback loan amount (with intererest)
    function paybackLoan(uint256 loanId) external;

    /// @notice slash debtor incase he defaults
    function slashDebtor(uint256 loanId) external;

    /********************* getter *********************/
}
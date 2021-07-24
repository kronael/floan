//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library FloanTypes {
    struct credit {
        address requester;
        address lender;
        uint256 principal;
        uint256 repayment;
        uint48 duration;
        uint48 validUntil;
        bool isFilled;
        bool isWithdrawn;
        bool isPayedBack;
        bool isClosed;
    }
}

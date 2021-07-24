//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library FloanTypes {
    struct credit {
        address requester;
        uint256 principal;
        uint256 repayment;
        uint256 duration;
        uint256 validUntil;
        bool isFilled;
        bool isWithdrawn;
        bool isPayedBack;
        bool isClosed;
    }
}

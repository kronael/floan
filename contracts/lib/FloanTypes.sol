//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library FloanTypes {
    struct credit {
        address debtor;
        uint256 principal;
        uint256 repayment;
        uint256 duration;
        bool isFilled;
    }
}

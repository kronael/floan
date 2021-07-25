//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library FloanTypes {
    enum State {
        open,
        filled,
        withdrawn,
        payedBack,
        closed
    }

    struct credit {
        address requester;
        address lender;
        uint256 principal;
        uint256 repayment;
        uint48 duration;
        uint48 startBlock;
        State state;
    }
}

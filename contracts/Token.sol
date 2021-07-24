//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(
        uint256 initialSupply,
        string memory shortName,
        string memory longName
    ) ERC20(shortName, longName) {
        _mint(msg.sender, initialSupply);
    }
}

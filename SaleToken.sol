// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SaleToken is ERC20 {
    constructor() ERC20("Project Alpha", "ALPHA") {
        // Mint supply to deployer (who will move it to Auction)
        _mint(msg.sender, 2000000 * 10 ** decimals());
    }
}

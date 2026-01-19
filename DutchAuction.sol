// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DutchAuction is Ownable, ReentrancyGuard {
    IERC20 public token;
    
    uint256 public constant DURATION = 1 hours;
    uint256 public immutable startTime;
    uint256 public immutable startPrice;
    uint256 public immutable discountRate;
    
    // Total tokens for sale
    uint256 public constant SALE_AMOUNT = 1000000 * 1e18; 

    event Bought(address indexed buyer, uint256 amount, uint256 price);

    constructor(
        address _token,
        uint256 _startPrice,
        uint256 _discountRate
    ) Ownable(msg.sender) {
        token = IERC20(_token);
        startPrice = _startPrice;
        discountRate = _discountRate;
        startTime = block.timestamp;
    }

    function getPrice() public view returns (uint256) {
        if (block.timestamp < startTime) {
            return startPrice;
        }
        uint256 timeElapsed = block.timestamp - startTime;
        uint256 discount = discountRate * timeElapsed;
        
        if (discount >= startPrice) {
            return 0; // Or floor price
        }
        return startPrice - discount;
    }

    function buy(uint256 tokenAmount) external payable nonReentrant {
        require(block.timestamp < startTime + DURATION, "Sale ended");
        
        uint256 price = getPrice();
        uint256 cost = (tokenAmount * price) / 1e18; // Assuming 18 decimals

        require(msg.value >= cost, "Insufficient ETH");

        // Refund excess ETH
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }

        token.transfer(msg.sender, tokenAmount);
        emit Bought(msg.sender, tokenAmount, price);
    }

    function withdrawETH() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    // Admin recovers unsold tokens
    function withdrawTokens() external onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }
}

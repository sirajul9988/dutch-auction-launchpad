const { ethers } = require("ethers");

function calculateTotalCost(amountTokens, pricePerToken) {
    // Both 18 decimals
    // (Tokens * Price) / 1e18
    return (BigInt(amountTokens) * BigInt(pricePerToken)) / BigInt("1000000000000000000");
}

module.exports = { calculateTotalCost };

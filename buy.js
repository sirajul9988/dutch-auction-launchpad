const { ethers } = require("hardhat");
const config = require("./auction_config.json");

async function main() {
    const [_, buyer] = await ethers.getSigners();
    const auction = await ethers.getContractAt("DutchAuction", config.auction, buyer);
    const token = await ethers.getContractAt("SaleToken", config.token, buyer);

    const amountToBuy = ethers.parseEther("1000"); // Buy 1000 tokens
    
    // Calculate cost safely (add a small buffer for price decay/slippage or get current price)
    const currentPrice = await auction.getPrice();
    const estimatedCost = (amountToBuy * currentPrice) / ethers.parseEther("1");
    
    console.log(`Buying 1000 tokens at ${ethers.formatEther(currentPrice)} each...`);
    console.log(`Total Cost: ${ethers.formatEther(estimatedCost)} ETH`);

    const tx = await auction.buy(amountToBuy, { value: estimatedCost });
    await tx.wait();

    const bal = await token.balanceOf(buyer.address);
    console.log(`Purchase Successful! New Balance: ${ethers.formatEther(bal)} ALPHA`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

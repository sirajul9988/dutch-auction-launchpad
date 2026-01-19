const { ethers } = require("hardhat");
const config = require("./auction_config.json");

async function main() {
    const auction = await ethers.getContractAt("DutchAuction", config.auction);

    // Simulate time passing (e.g., 30 minutes in)
    // await ethers.provider.send("evm_increaseTime", [1800]);
    // await ethers.provider.send("evm_mine");

    const price = await auction.getPrice();
    console.log(`Current Token Price: ${ethers.formatEther(price)} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

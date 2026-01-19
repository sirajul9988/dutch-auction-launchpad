const { ethers } = require("hardhat");
const config = require("./auction_config.json");

async function main() {
    const [admin] = await ethers.getSigners();
    const auction = await ethers.getContractAt("DutchAuction", config.auction, admin);

    const balance = await ethers.provider.getBalance(config.auction);
    console.log(`Auction Contract Balance: ${ethers.formatEther(balance)} ETH`);

    console.log("Withdrawing Proceeds...");
    const tx = await auction.withdrawETH();
    await tx.wait();

    console.log("Funds withdrawn to Admin wallet.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

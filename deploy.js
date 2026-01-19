const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);

    // 1. Deploy Token
    const Token = await ethers.getContractFactory("SaleToken");
    const token = await Token.deploy();
    await token.waitForDeployment();
    const tokenAddr = await token.getAddress();

    // 2. Configure Auction
    // Start at 0.1 ETH per token, drop by 0.00001 per second
    const startPrice = ethers.parseEther("0.001"); 
    const discountRate = ethers.parseEther("0.0000002"); 

    const Auction = await ethers.getContractFactory("DutchAuction");
    const auction = await Auction.deploy(tokenAddr, startPrice, discountRate);
    await auction.waitForDeployment();
    const auctionAddr = await auction.getAddress();

    console.log(`Auction Deployed: ${auctionAddr}`);

    // 3. Fund Auction
    const saleAmount = ethers.parseEther("1000000");
    await token.transfer(auctionAddr, saleAmount);
    console.log("Auction funded with 1,000,000 Tokens");

    // Save Config
    const config = { auction: auctionAddr, token: tokenAddr };
    fs.writeFileSync("auction_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

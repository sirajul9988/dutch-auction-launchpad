# Dutch Auction Launchpad

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![Mechanism](https://img.shields.io/badge/style-Dutch_Auction-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**Dutch Auction Launchpad** prevents gas wars and bot sniping. Instead of a fixed price where everyone rushes in at once, the price drops every second.

* **Start Price**: High (e.g., 1 ETH).
* **End Price**: Low (e.g., 0.1 ETH).
* **Duration**: Fixed time (e.g., 1 hour).
* **Mechanism**: Price = StartPrice - (DiscountRate * TimeElapsed).

## Usage

```bash
# 1. Install
npm install

# 2. Deploy Auction & Token
npx hardhat run deploy.js --network localhost

# 3. Check Current Price (Run repeatedly to see decay)
node get_price.js

# 4. Buy Tokens (When price is right)
node buy.js

# 5. Admin Withdraws ETH (After sale)
node admin_withdraw.js

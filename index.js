#!/usr/bin/env node

const WalletInsights = require('web3-wallet-insights');
const yargs = require('yargs');
const dotenv = require('dotenv');

dotenv.config();

const args = yargs
 .option('wallet', {
   alias: 'w',
   description: 'The wallet address to inspect',
   type: 'string',
 })
 .help()
 .alias('help', 'h')
 .argv;

const insights = new WalletInsights(process.env.WEB3_PROVIDER, process.env.ETHERSCAN_API_KEY);

async function displayWalletInsights(walletAddress) {
    console.log(`Fetching insights for wallet: ${walletAddress}\n`);

    try {
        const balance = await insights.getBalance(walletAddress);
        console.log(`Balance: ${balance} ETH`);

        const transactionsCount = await insights.getTransactionCount(walletAddress);
        console.log(`Transactions: ${transactionsCount}`);

        const gasSpent = await insights.getGasSpent(walletAddress);
        console.log(`Gas Spent: ${gasSpent} ETH`);
    } catch (error) {
        console.error(`Error fetching insights: ${error.message}`);
    }
}

if(args.wallet) {
    displayWalletInsights(args.wallet);
} else {
    console.log('Please provide a wallet address using --wallet or -w flag.');
}

# Harmony NFT Example

This example will include the process of creating a simple NFT demo on Harmony Testnet, using NFT.Storage to store off-chain NFT data on IPFS and Filecoin to achieve the total decentralization of your NFT.


### What's incldued in this example:

+ HRC721/NFT smart contract
+ Connecting to Harmony blockchain via MetaMask
+ Uploading NFT assets via NFT.Storage
+ Invoking NFT smart contract to mint NFT via MetaMask

### Pre-requirement
This example requires basic knowledge about harmony blockchain, HRC721/ERC721, Truffle and MetaMask. Before you start this tutorial, make sure you have installed the necessary tools.

+ Node.js
+ Truffle
+ Metamask browser extension fill with Harmony TestNet Token (ONE)
+ [NFT.Storage](https://nft.storage/) Account for API key

### Quick Start

1. Clone Project

   ```shell
   git clone https://github.com/longfeiWan9/harmony-nft-demo.git
   cd harmony-nft-demo
   ```

2. Modify the smart contract `contracts\HarmonyNFT.sol` according to your preference.

   ```solidity
   //Deply EPC721 with name and description specified.
   constructor() ERC721 ("ETH on Harmony using NFT.Storage", "HNFT-L") {}
   ```

3. Export you Harmony wallet private key and add it into `truffle-config.js` for smart contract deployment

   ```javascript
   const privateKeyTest = '<HARMONY-WALLET-PRIVATE-KEY>';
   ```

4. Install the dependencies.

   ```shel
   npm install
   ```

5. Compile and deploy your smart contract

   ```shell
   truffle deploy --network harmonyTestnet
   ```

   copy the deployed smart contract address to `src\components\MintNFT.js`

   ```javascript
   const nftContractAddress = '<YOUR-NFT-SMART-CONTRACT-ADDRESS>';
   ```

6. Get an NFT.Storage API key from  [NFT.Storage](https://nft.storage/) and add it in `src\components\MintNFT.js`

   ```javascript
   const APIKEY = '<YOUR-NFTSTORAGE-API-KEY>';
   ```

7. Start the front end and try it out

   ```shell
   npm start
   ```

   


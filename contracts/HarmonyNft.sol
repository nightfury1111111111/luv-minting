// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HarmonyNFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewHarmonyNFT(address sender, uint256 tokenId, string tokenURI);

    //Deply EPC721 with name and description specified.
    constructor() ERC721 ("ETH on Harmony using NFT.Storage", "HNFT-L") {}

    //mint a new NFT Item and update its tokenURI with IPFS link.
    function mintItem(string memory tokenURI) public{
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit NewHarmonyNFT(msg.sender, newItemId, tokenURI);
    }
}
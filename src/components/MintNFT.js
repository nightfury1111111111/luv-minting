import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import HarmonyNFT from "../abi/HarmonyNFT.json";
import { ethers } from "ethers";
const APIKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdhMzc2OEJBNDI1RDdEZmFFQjkwNkQzRTA2NzE0ZjhEODZEM2QyRmYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NDU3MjYwMzU5MywibmFtZSI6ImRyYWdvbiJ9.2o97SzibzFeVNJR8go85Qrm3K5QYnD_ooNP3gYv90xI";
const nftContractAddress = "0xc64bBCf5a75A078Fb899952733B26Bb85d3a2FCb";

const MintNFT = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();

  const handleFileUpload = (event) => {
    console.log("file is uploaded");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };
  const mintNFTToken = async (event, uploadedFile) => {
    event.preventDefault();
    //1. upload NFT content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    //2. Mint a NFT token on Harmony
    const mintNFTTx = await sendTxToHarmony(metaData);

    //3. preview the minted nft
    previewNFT(metaData, mintNFTTx);
  };

  const uploadNFTContent = async (inputFile) => {
    const nftStorage = new NFTStorage({ token: APIKEY });
    try {
      setTxStatus("Uploading NFT to IPFS & Filecoin via NFT.storage.");
      const metaData = await nftStorage.store({
        name: "Harmony NFT collection",
        description:
          "This is a Harmony NFT collenction stored on IPFS & Filecoin.",
        image: inputFile,
      });
      setMetaDataURl(getIPFSGatewayURL(metaData.url));
      return metaData;
    } catch (error) {
      setErrorMessage("Could not save NFT to NFT.Storage - Aborted minting.");
      console.log(error);
    }
  };

  const sendTxToHarmony = async (metadata) => {
    try {
      setTxStatus("Sending mint transaction to Harmony Blockchain.");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const connectedContract = new ethers.Contract(
        nftContractAddress,
        HarmonyNFT.abi,
        provider.getSigner()
      );
      const mintNFTTx = await connectedContract.mintItem(metadata.url);
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Harmony.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    let imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL("https://explorer.pops.one/tx/" + mintNFTTx.hash);
    setTxStatus("NFT is minted successfully!");
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  return (
    <div className="MintNFT">
      <form>
        <h3>Mint your NFT on Harmony & Filecoin/IPFS</h3>
        <input type="file" onChange={handleFileUpload}></input>
        <button onClick={(e) => mintNFTToken(e, uploadedFile)}>Mint NFT</button>
      </form>
      {txStatus && <p>{txStatus}</p>}
      {imageView && (
        <img className="NFTImg" src={imageView} alt="NFT preview" />
      )}
      {metaDataURL && (
        <p>
          <a href={metaDataURL}>Metadata on IPFS</a>
        </p>
      )}
      {txURL && (
        <p>
          <a href={txURL}>See the mint transaction</a>
        </p>
      )}
      {errorMessage}
    </div>
  );
};
export default MintNFT;

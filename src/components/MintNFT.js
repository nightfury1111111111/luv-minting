import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import LuvNFT from "../abi/LuvNFT.json";
import { ethers } from "ethers";
const APIKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdhMzc2OEJBNDI1RDdEZmFFQjkwNkQzRTA2NzE0ZjhEODZEM2QyRmYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NDU3MjYwMzU5MywibmFtZSI6ImRyYWdvbiJ9.2o97SzibzFeVNJR8go85Qrm3K5QYnD_ooNP3gYv90xI";
const nftContractAddress = "0x7c9D35047469dA7C83Bf8b54bccDDe174D0b8d19";

const MintNFT = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  // const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [title, setTitle] = useState("");
  const [excert, setExcert] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState(0);
  const [area, setArea] = useState(0);
  const [rent, setRent] = useState(0);
  const [donation, setDonation] = useState(0);
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailURL, setThumbnailURL] = useState([]);
  const [original, setOriginal] = useState();
  const [originalURL, setOriginalURL] = useState([]);
  const [geometryType, setGeometryType] = useState("Point");
  const [longitude, setLongitude] = useState(0.0);
  const [latitude, setLatitude] = useState(0.0);
  const [price, setPrice]=useState(0);

  const handleThumbnailUpload = (event) => {
    console.log("file is uploaded");
    setThumbnail(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const handleOriginalUpload = (event) => {
    console.log("file is uploaded");
    setOriginal(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  // const addThumbnail = async (event, uploadedFile) => {
  //   event.preventDefault();
  //   //1. upload NFT content via NFT.storage
  //   const metaData = await uploadNFTContent(uploadedFile);

  //   //2. Mint a NFT token on Harmony
  //   const mintNFTTx = await sendTxToHarmony(metaData);

  //   //3. preview the minted nft
  //   previewNFT(metaData, mintNFTTx);
  // };

  const addThumbnail = async (event, thumbnail) => {
    event.preventDefault();
    const nftStorage = new NFTStorage({ token: APIKEY });
    try {
      setTxStatus("Uploading NFT to IPFS & Filecoin via NFT.storage.");
      const metaData = await nftStorage.store({
        name: "LUV NFT",
        description:
          "This is a Harmony NFT collenction stored on IPFS & Filecoin.",
        image: thumbnail,
      });
      const tmpThumbnailURL = thumbnailURL;
      tmpThumbnailURL.push(getIPFSGatewayURL(metaData.data.image.pathname));
      setThumbnailURL(tmpThumbnailURL);
      console.log(tmpThumbnailURL);
      return metaData;
    } catch (error) {
      setErrorMessage(
        "Could not save Thumbnail Image to NFT.Storage - Aborted minting."
      );
      console.log(error);
    }
  };

  const addOriginal = async (event, original) => {
    event.preventDefault();
    const nftStorage = new NFTStorage({ token: APIKEY });
    try {
      setTxStatus(
        "Uploading Original Image to IPFS & Filecoin via NFT.storage."
      );
      const metaData = await nftStorage.store({
        name: "LUV NFT",
        description:
          "This is a Harmony NFT collenction stored on IPFS & Filecoin.",
        image: original,
      });
      const tmpOriginalURL = originalURL;
      tmpOriginalURL.push(getIPFSGatewayURL(metaData.data.image.pathname));
      setOriginalURL(tmpOriginalURL);
      console.log(tmpOriginalURL);
      return metaData;
    } catch (error) {
      setErrorMessage("Could not save NFT to NFT.Storage - Aborted minting.");
      console.log(error);
    }
  };

  const check=async(event)=>{
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedContract = new ethers.Contract(
      nftContractAddress,
      LuvNFT.abi,
      provider.getSigner()
    );
    const id = await connectedContract.getTokenDetails(1);
    console.log(JSON.parse(id.nft_info))
  }

  // const sendTxToHarmony = async (metadata) => {
  //   try {
  //     setTxStatus("Sending mint transaction to Harmony Blockchain.");
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const connectedContract = new ethers.Contract(
  //       nftContractAddress,
  //       HarmonyNFT.abi,
  //       provider.getSigner()
  //     );
  //     const mintNFTTx = await connectedContract.mintItem(metadata.url);
  //     return mintNFTTx;
  //   } catch (error) {
  //     setErrorMessage("Failed to send tx to Harmony.");
  //     console.log(error);
  //   }
  // };

  // const previewNFT = (metaData, mintNFTTx) => {
  //   let imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
  //   setImageView(imgViewString);
  //   setMetaDataURl(getIPFSGatewayURL(metaData.url));
  //   setTxURL("https://explorer.pops.one/tx/" + mintNFTTx.hash);
  //   setTxStatus("NFT is minted successfully!");
  // };

  const getIPFSGatewayURL = (ipfsURL) => {
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  const mintNFTToken = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedContract = new ethers.Contract(
      nftContractAddress,
      LuvNFT.abi,
      provider.getSigner()
    );
    const id = await connectedContract.nextId();

    const images = [];
    if (thumbnailURL.length != originalURL.length) {
      alert("amount of thumbnail must be the same as original");
      return;
    }
    for (let i = 0; i < thumbnailURL.length; i++) {
      images.push({
        original: originalURL[i],
        thumbnail: thumbnailURL[i],
      });
    }
    const nftInfo = {
      type: "Feature",
      properties: {
        id: `item-${Number(id)}`,
        title,
        excert,
        description,
        images,
        type,
        rooms,
        area,
        rent,
        donation,
      },
      geometry: {
        type: geometryType,
        coordinates: [longitude, latitude],
      },
    };
    console.log(nftInfo)

    try {
      setTxStatus("Minting...");
      const mintNFTTx = await connectedContract.mint(JSON.stringify(nftInfo), price);
      setThumbnailURL([]);
      setOriginalURL([]);
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Harmony.");
      console.log(error);
    }
  };

  return (
    <div className="MintNFT">
      <form>
        <h3>Mint your NFT on Harmony & Filecoin/IPFS</h3>
        Title
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <br />
        Excert
        <input
          type="text"
          onChange={(e) => {
            setExcert(e.target.value);
          }}
          value={excert}
        />
        <br />
        Description
        <input
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <br />
        Type
        <input
          type="text"
          onChange={(e) => {
            setType(e.target.value);
          }}
          value={type}
        />
        <br />
        Rooms
        <input
          type="number"
          onChange={(e) => {
            setRooms(e.target.value);
          }}
          value={rooms}
        />
        <br />
        Area
        <input
          type="number"
          onChange={(e) => {
            setArea(e.target.value);
          }}
          value={area}
        />
        <br />
        Rent
        <input
          type="number"
          onChange={(e) => {
            setRent(e.target.value);
          }}
          value={rent}
        />
        <br />
        Donation
        <input
          type="number"
          onChange={(e) => {
            setDonation(e.target.value);
          }}
          value={donation}
        />
        <br />
        Geometry Type
        <input
          type="text"
          onChange={(e) => {
            setGeometryType(e.target.value);
          }}
          value={geometryType}
        />
        <br />
        Longitude
        <input
          type="number"
          onChange={(e) => {
            setLongitude(e.target.value);
          }}
          step="0.00001"
          value={longitude}
        />
        <br />
        Latitude
        <input
          type="number"
          onChange={(e) => {
            setLatitude(e.target.value);
          }}
          step="0.00001"
          value={latitude}
        />
        <br />
        Price
        <input
          type="number"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
        <br />
        <input type="file" onChange={handleThumbnailUpload} multiple></input>
        <button onClick={(e) => addThumbnail(e, thumbnail)}>
          Add Thumbnail
        </button>
        <br />
        <input type="file" onChange={handleOriginalUpload} multiple></input>
        <button onClick={(e) => addOriginal(e, original)}>Add Original</button>
        <br />
        <button onClick={mintNFTToken}>Mint NFT</button><br/>
        <button onClick={check}>Check Metadata</button>
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

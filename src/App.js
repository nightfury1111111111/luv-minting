import './assets/App.css';
import WalletConnect from './components/WalletConnect'
import MintNFT from './components/MintNFT';
import nftStorageLogo from "./assets/nftStorage.svg";
import harmonyLogo from "./assets/harmony.png"

function App() {
  return (
    <div className='App'>
      <div className='logos'>
        <img className='harmony' src={harmonyLogo} alt="Harmony Logo" height="100px"/>
        <img className='nftStorage' src={nftStorageLogo} alt="Harmony Logo" height="100px"/>
      </div>
      <WalletConnect/>
      <MintNFT/>
    </div>
  );
}

export default App;

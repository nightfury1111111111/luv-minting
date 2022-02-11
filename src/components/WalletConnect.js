import React, {useState} from 'react'

const WalletConnect = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [walletConnected, setWalletConnected] = useState(false);

	const connectWalletHandler = async() => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			try {
				const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
				accountChangedHandler(accounts[0]);
				setConnButtonText('Wallet Connected');
				setWalletConnected(true);

			} catch (error) {
				setErrorMessage(error.message);
			}

		} else {
            setWalletConnected(false);
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);
	
	return (
		<div className='walletConnect'>
		    <h3> {"Connection to MetaMask"} </h3>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
            {walletConnected?
            <div><p>Address: {defaultAccount}</p></div>:<p></p>}
			{errorMessage}
		</div>
	);
}

export default WalletConnect;
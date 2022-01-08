import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './WalletCard.css'

const WalletCardEthers = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Verify your whitelist spot');
	const [connButtonClass, setConnButtonClass] = useState('buttonConnect');
	const [provider, setProvider] = useState(null);
	var myList=["0xCeF3628D1410B71595B481F5f35a516b6bb34F67", "a", "c"];

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				if(myList.includes(result[0])){
					setConnButtonText('Whitelist confirmed');
					setConnButtonClass('buttonConnectConfirmed');
					
				}
				else{
					setConnButtonText('Whitelist unconfirmed');
					setConnButtonClass('buttonConnectUnconfirmed');
				}
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setConnButtonText('Install MetaMask');
		}
	}

useEffect(() => {
	if(defaultAccount){
	provider.getBalance(defaultAccount)
	.then(balanceResult => {
		setUserBalance(ethers.utils.formatEther(balanceResult));
	})
	};
}, [defaultAccount]);
	
	return (
		<div className='walletCard' className="walletCard">

		<button id='connect'  className={connButtonClass} onClick={connectWalletHandler}>{connButtonText}</button>
		</div>
	);
}

export default WalletCardEthers;
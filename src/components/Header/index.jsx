import React, { useState, useEffect, useContext } from 'react'

// Import list of chains
import { CHAINLIST } from '../../constants/chainlist.js'

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

// Import UI Component from MUI
import { Toolbar, Typography, Modal, Box, Container, Button } from '@mui/material'

// Import Contexts
import { WalletContext } from '../../contexts/walletContext.jsx'



function Header() {
	// States
	const { connected, setConnected } = useContext(WalletContext)
	const [showWalletModal, setShowWalletModal] = useState(false)
	const [walletInfo, setWalletInfo] = useState({
		account: null,
		chainId: null,
		networkName: null
	})

	//  Check if any wallet has been connected
	useEffect(() => {
		let isConnectedMetamask = window.localStorage.getItem('isConnectedMetamask')
		if (isConnectedMetamask === 'true') {
			connectWallet()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Connect to Metamask Wallet
	const connectWallet = async () => {
		try {
			// Connect wallet and get some parameters
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
			const _chainId = window.ethereum.networkVersion
			const chain = CHAINLIST.filter(chain => chain.id === parseInt(_chainId))[0]
			const _networkName = chain.name

			// Set states
			setWalletInfo({
				account: accounts[0],
				chainId: _chainId,
				networkName: _networkName
			})
			setConnected(true)
			window.localStorage.setItem('isConnectedMetamask', true)

		} catch (err) {
			alert(err.message)
		}
	}

	// Disconnect wallet
	const disconnect = () =>{
		setWalletInfo({
			account: null,
			chainId: null,
			networkName: null
		})
		setConnected(false)
		setShowWalletModal(false)
		window.localStorage.setItem('isConnectedMetamask', false)
	}

	// Style for Modal show Wallet information
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		bgcolor: '#fff',
		border: '1px solid #000',
		borderRadius: '10px',
		boxShadow: 25,
		p: 4,
	};

	return (
		<React.Fragment>
			<Toolbar>
				<Typography sx={{ flexGrow: 1 }}></Typography>
				{/* Wallet Button */}
				{
					connected ? (
						// Button to show Wallet information
						<Button 
							variant="contained"
							onClick={() => setShowWalletModal(true)}	
						>
							<FontAwesomeIcon icon={faWallet} />&nbsp;
							{walletInfo.account.substr(0, 4) + '***' + walletInfo.account.substr(-4)}
						</Button>
					) : (
						// Button to connect Wallet
						<Button variant="contained" onClick={connectWallet}>
							Connect
						</Button>
					)
				}
			</Toolbar>

			{/* Show Wallet information */}
			<Modal
				open={showWalletModal}
				onClose={() => setShowWalletModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Container>
						<Typography variant="h5" component="h2" align="center">
							Your wallet <hr/>
						</Typography>
						<Typography sx={{ mt: 2 }} variant="h6" align="center">{walletInfo.networkName}</Typography>
						<Typography>Chain ID: {walletInfo.chainId}</Typography><Typography>{walletInfo.account}</Typography>
						<Button
							variant="contained"
							fullWidth
							sx={{ mt: 2 }}
							onClick={disconnect}
						>
							Disconnect
						</Button>
					</Container>
				</Box>
			</Modal>
		</React.Fragment>
	)
}

export default Header;
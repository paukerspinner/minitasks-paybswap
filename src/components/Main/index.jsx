import { useState, useContext } from 'react';

// Import UI Component from MUI
import { CardContent, Card, Container, Typography, Box, Grid, TextField, Button } from '@mui/material';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// Import API
import * as API from '../../utils/api'

// Import Context
import { WalletContext } from '../../contexts/walletContext';



function Main() {
	// Get today in format 'yyyy-MM-dd'
	const today = new Date().toISOString().substr(0,10)

	// States
	const { connected } = useContext(WalletContext)
	const [dates, setDates] = useState({
		from: today,
		to: today
	})
	const [price, setPrice] = useState(null)
	const [loadingPrice, setLoadingPrice] = useState(false)

	// Handle on change range of date
	const onChangeDate = (event) => {
		setDates(_state => {
			return {
				..._state,
				[event.target.name]: event.target.value
			}
		})
	}

	// Get Price History of BNB from Coingecko API then calculate average price
	const getPrice = () => {
		setLoadingPrice(true)
		API.getPricesBnbInRange(dates.from, dates.to).then(res => {
			// Calculate average price
			let prices = res.data.prices
			let avgPrice = prices.reduce((sum, price) => sum + price[1], 0) / prices.length
			if (isNaN(avgPrice)) {
				alert('Invalid range of dates! Please try again!')
				return
			}
			// Set states
			setPrice(Math.round(avgPrice * 100) / 100)
			setLoadingPrice(false)
		}).catch(err => {
			const errorMessage = err.response ? err.response.data.error : err
			alert(`${errorMessage}! Please try again`)
		})
	}

	return (
		// Only display when the wallet is connected
		connected && (
			<Container component="main" maxWidth="sm" sx={{ mt: 20}}>
				<Typography component="h1" variant="h5" align="center" sx={{ mt: 3 }}>BNB Average Price</Typography>
				<Typography variant="span">Select range of date</Typography>
				{/* Form */}
				<Box component="form" sx={{ mt: 3}}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								name="from"
								id="date"
								label="From"
								type="date"
								fullWidth
								defaultValue={today}
								inputProps={{max: today}}
								onChange={onChangeDate}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name="to"
								id="date"
								label="To"
								type="date"
								fullWidth
								defaultValue={today}
								inputProps={{max: today}}
								onChange={onChangeDate}
							/>
						</Grid>
						
					</Grid>
					<Button
						onClick={getPrice}
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Check
					</Button>
				</Box>
				{/* Show price */}
				{
					(price != null || loadingPrice) && (
						<Card>
							<CardContent>
								<Typography component="p" variant="h1"  align="center">
									{loadingPrice? <FontAwesomeIcon icon={faSpinner} spin/> :`$${price}`}
								</Typography>
							</CardContent>
						</Card>
					)
				}
			</Container>
		)
	)
}

export default Main;
import Axios from 'axios'

export const getPricesBnbInRange = async (dateFrom, dateTo) => {
	// Convert date to UNIX Timestamp
	const from = new Date(new Date(dateFrom).setHours(0, 0, 0)).getTime() / 1000
	const to = new Date(new Date(dateTo).setHours(23, 59, 59)).getTime() / 1000
	// Set url and params
	const url = 'https://api.coingecko.com/api/v3/coins/binancecoin/market_chart/range'
	const params = {
		vs_currency: 'usd',
		from: from,
		to: to
	}
	// Request
	const res = await Axios.get(url, { params })
	return res
}
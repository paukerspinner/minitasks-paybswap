import { createContext, useState } from "react";

export const WalletContext = createContext()

const WalletContextProvider = ({ children }) => {
	const [connected, setConnected] = useState(false)


	const walletContextData = {
		connected,
		setConnected
	}

	return (
		<WalletContext.Provider value={walletContextData}>
			{children}
		</WalletContext.Provider>
	)
}

export default WalletContextProvider;
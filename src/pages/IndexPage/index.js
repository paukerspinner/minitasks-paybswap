import Header from "../../components/Header"
import Main from "../../components/Main"
import WalletContextProvider from "../../contexts/walletContext"

function IndexPage() {
	return (
		<div className="App">
			<WalletContextProvider>
				<Header />
				<Main />
			</WalletContextProvider>
		</div>
	)
}

export default IndexPage
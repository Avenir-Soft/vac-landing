import AboutCompany from '../components/AboutCompany'
import BookCallButton from '../components/BookCallButton'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Products from '../components/Products'
import TrustedPartners from '../components/TrustedPartners'

export const Home = () => {
	return (
		<>
			<Header />
			<AboutCompany />
			<Products />
			<TrustedPartners />
			<BookCallButton />
			<Footer />
		</>
	)
}

export default Home

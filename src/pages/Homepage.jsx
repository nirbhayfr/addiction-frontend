import AddictionMuktiCampaign from "../components/AddictionMuktiCampaign";
import Admission from "../components/Admission";
import CTABand from "../components/CTABand";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProductShowcase from "../components/ProductShowcase";
import SuccessTimelines from "../components/SuccessTimelines";
import WhyChooseUs from "../components/WhyChooseUs";

function Homepage() {
	return (
		<main className="font-serif bg-yellow-200 text-purple-700 uppercase font-bold">
			<Navbar />
			<ProductShowcase />
			<Hero />
			<WhyChooseUs />
			<AddictionMuktiCampaign />
			<Admission />
			<SuccessTimelines />
			<CTABand />
			<Footer />
		</main>
	);
}

export default Homepage;

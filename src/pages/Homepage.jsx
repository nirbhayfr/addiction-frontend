import AddictionMuktiCampaign from "../components/AddictionMuktiCampaign";
import Admission from "../components/Admission";
import CTABand from "../components/CTABand";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProductShowcase from "../components/ProductShowcase";
import BannerSlider from "../components/Slider";
import SuccessTimelines from "../components/SuccessTimelines";
import TestimonialsSection from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

function Homepage() {
	return (
		<main className="font-serif bg-yellow-200 text-purple-700 uppercase font-bold">
			<Navbar />
			<BannerSlider />
			<ProductShowcase />
			<WhyChooseUs />
			<Hero />
			<AddictionMuktiCampaign />
			<Admission />
			<SuccessTimelines />
			<TestimonialsSection />
			<CTABand />
			<Footer />
		</main>
	);
}

export default Homepage;

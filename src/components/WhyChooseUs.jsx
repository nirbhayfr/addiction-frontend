import { useEffect, useRef } from "react";
import { CalendarRange, Shield, Orbit, Leaf } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
	const sectionRef = useRef(null);
	const cardsRef = useRef([]);

	useEffect(() => {
		const cards = cardsRef.current.filter(Boolean);
		gsap.fromTo(
			cards,
			{ y: 50, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.65,
				stagger: 0.12,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
				},
			},
		);
	}, []);

	const addCard = (el, i) => {
		cardsRef.current[i] = el;
	};

	return (
		<section
			ref={sectionRef}
			className="py-20 bg-[#f0f5f1] border-y border-emerald-100"
		>
			<div className=" mx-auto px-6 w-full">
				<div className="text-center mb-16 space-y-3">
					<span className="text-base uppercase font-extrabold text-[#4a7c59] bg-[#d4ead9] px-3.5 py-1 rounded-full">
						विश्वास, देखभाल और नई शुरुआत
					</span>

					<h2 className="font-sans font-extrabold text-3xl md:text-4xl text-[#1a4731] pt-4">
						नशे को कहें अलविदा
					</h2>
					<p className="text-sm text-[#5a7a63] max-w-xl mx-auto leading-relaxed">
						नशा मुक्ति की ओर आपका पहला कदम। अनुभवी विशेषज्ञों
						के मार्गदर्शन, सुरक्षित वातावरण और निरंतर सहयोग के
						साथ हम आपको एक स्वस्थ और बेहतर जीवन की ओर बढ़ने
						में मदद करते हैं।
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-5">
					{/* Trusted Treatment */}
					<div
						ref={(el) => addCard(el, 0)}
						className="md:col-span-8 bg-white rounded-[32px] p-8 border border-[#c8d8cc] shadow-sm hover:-translate-y-1 transition-transform duration-300 flex flex-col md:flex-row gap-6 items-start"
					>
						<div className="flex-1">
							<div className="p-3 bg-[#e8f2ed] text-[#1a4731] rounded-xl w-fit mb-4">
								<CalendarRange className="w-5 h-5" />
							</div>

							<h3 className="font-sans font-extrabold text-xl text-[#1a4731]">
								विश्वसनीय और सुरक्षित उपचार
							</h3>

							<p className="font-sans font-bold text-sm text-[#4a7c59] mt-1">
								नशा छोड़ने की सही दिशा में मदद
							</p>

							<p className="text-sm text-[#5a7a63] leading-relaxed mt-3 max-w-md">
								हम अनुभवी विशेषज्ञों की देखरेख में नशा
								मुक्ति की सहायता प्रदान करते हैं। उपचार
								और परामर्श की मदद से व्यक्ति धीरे-धीरे
								स्वस्थ जीवन की ओर वापस बढ़ सकता है।
							</p>
						</div>

						<div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0">
							<img
								className="w-full h-full object-cover opacity-75"
								referrerPolicy="no-referrer"
								alt="नशा मुक्ति सहायता"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgGQbn2gRNeR4tXojr1AnpBeVoX233EkVQALPyayHyvGBCw6G4oXikx8KZO9egLBBA1EZOC5Lao7w8oRIt25oJILO3RaVZvsBE1GpFLohyPqV13mj7B3WIRud1f446BjHRbthahwa8eZmToBF0zTJ1UP_IY8hQWWkr0ohDGZVZTxmwJK64EdL7OdHghV0JchYg4huzCtw9Cr4CWbTYjoFHtRwRHN-28w8TmPMeQOWeZh8vV3uetpQGAbp7aKRdB8lrmJGglzVzAbY"
							/>
						</div>
					</div>

					{/* Confidentiality */}
					<div
						ref={(el) => addCard(el, 1)}
						className="md:col-span-4 bg-[#1a4731] text-white rounded-[32px] p-8 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300"
					>
						<div className="p-4 bg-white/10 rounded-full mb-4">
							<Shield className="w-6 h-6 text-white" />
						</div>

						<h3 className="font-sans font-extrabold text-xl">
							आपकी जानकारी पूरी तरह सुरक्षित
						</h3>

						<p className="text-base text-white/70 font-semibold mt-1">
							गोपनीय और भरोसेमंद सहायता
						</p>

						<p className="text-base text-white/75 leading-relaxed mt-3">
							आपकी सभी जानकारी और परामर्श पूरी तरह निजी रखे
							जाते हैं। हम सम्मान, विश्वास और सुरक्षा के
							साथ आपकी सहायता करते हैं।
						</p>
					</div>

					{/* Family Support */}
					<div
						ref={(el) => addCard(el, 2)}
						className="md:col-span-4 bg-[#d4ead9] rounded-[32px] p-8 border border-emerald-100 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
					>
						<div>
							<div className="p-3 bg-white/60 text-[#1a4731] rounded-xl w-fit mb-4">
								<Orbit className="w-5 h-5" />
							</div>

							<h3 className="font-sans font-extrabold text-lg text-[#1a4731]">
								परिवार के साथ नई शुरुआत
							</h3>

							<p className="font-sans font-bold text-base text-[#4a7c59] mt-1">
								परिवार का सहयोग, बेहतर परिणाम
							</p>

							<p className="text-base text-[#1a4731]/80 leading-relaxed mt-2.5">
								नशा मुक्ति की प्रक्रिया में परिवार की
								भूमिका बहुत महत्वपूर्ण होती है। हम
								परिवार और व्यक्ति के बीच बेहतर संवाद और
								समझ बनाने में सहायता करते हैं।
							</p>
						</div>

						<div className="mt-6 flex -space-x-2">
							{["A", "B", "C"].map((l, i) => (
								<div
									key={i}
									className={`w-9 h-9 rounded-full border-[3px] border-[#d4ead9] flex items-center justify-center text-white text-[10px] font-extrabold ${
										i === 0
											? "bg-[#1a4731]"
											: i === 1
												? "bg-[#4a7c59]"
												: "bg-[#8aaa91]"
									}`}
								>
									{l}
								</div>
							))}

							<div className="w-9 h-9 rounded-full border-[3px] border-[#d4ead9] bg-white flex items-center justify-center text-[#5a7a63] text-[9px] font-extrabold">
								+5k
							</div>
						</div>
					</div>

					{/* Environment */}
					<div
						ref={(el) => addCard(el, 3)}
						className="md:col-span-8 bg-white rounded-[32px] p-8 border border-[#c8d8cc] shadow-sm hover:-translate-y-1 transition-transform duration-300 flex flex-col md:flex-row gap-6 items-center"
					>
						<div className="flex-1">
							<div className="p-3 bg-[#e8f2ed] text-[#1a4731] rounded-xl w-fit mb-4">
								<Leaf className="w-5 h-5" />
							</div>

							<h3 className="font-sans font-extrabold text-xl text-[#1a4731]">
								शांत और सकारात्मक वातावरण
							</h3>

							<p className="font-sans font-bold text-sm text-[#4a7c59] mt-1">
								बेहतर रिकवरी के लिए सही माहौल
							</p>

							<p className="text-sm text-[#5a7a63] leading-relaxed mt-3">
								स्वच्छ, शांत और सुरक्षित वातावरण व्यक्ति
								को मानसिक शांति देता है। ऐसा माहौल नशे
								से दूर रहकर नई और स्वस्थ जीवनशैली अपनाने
								में मदद करता है।
							</p>
						</div>

						<div className="w-full md:w-52 h-36 rounded-2xl overflow-hidden shrink-0">
							<img
								className="w-full h-full object-cover"
								referrerPolicy="no-referrer"
								alt="शांत वातावरण"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-83L4jEDgmdi3Xc3IP9tXpaRh7SOmMvwBlmHHMaY4rlnX0brLGHDbvgBvxvIgaK6T4BgLbERV8zWsMkoH_OGjw5WRdgv6bUCkc1D-yfLPnV4uQmNa8iB-wb7TfXXbHc0pW1hajIDuZ-AXR9bvgRmLsdJUYVJe9k07-03CdJ9jyONz6CKAW653Lu4BIgYlWAwXP5Te-bTVyXDCjzB51iW7z6vB5K-oXS0WQbeOhKylkJ4sGZJUIrgu7BYBGOESO7Qe17rJu5BnV24"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

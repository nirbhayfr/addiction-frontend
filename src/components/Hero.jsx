import { useEffect, useRef } from "react";
import { Phone, ShieldAlert, HeartHandshake, Users } from "lucide-react";
import gsap from "gsap";

export default function Hero({ onTabChange }) {
	const onFocusForm = () => {
		document
			.getElementById("contact")
			?.scrollIntoView({ behavior: "smooth" });
	};
	const heroRef = useRef(null);
	const badgeRef = useRef(null);
	const titleRef = useRef(null);
	const descRef = useRef(null);
	const btnsRef = useRef(null);
	const cardRef = useRef(null);

	useEffect(() => {
		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
		tl.fromTo(
			badgeRef.current,
			{ y: 24, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.55 },
		)
			.fromTo(
				titleRef.current,
				{ y: 32, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.65 },
				"-=0.3",
			)
			.fromTo(
				descRef.current,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.55 },
				"-=0.35",
			)
			.fromTo(
				btnsRef.current,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.5 },
				"-=0.3",
			)
			.fromTo(
				cardRef.current,
				{ x: 40, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.7 },
				"-=0.5",
			);
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative min-h-[600px] flex items-center overflow-hidden py-8 bg-[#f7f9f7]"
		>
			<div className="absolute inset-0 -z-10">
				<img
					className="w-full h-full object-cover opacity-[0.22]"
					referrerPolicy="no-referrer"
					alt=""
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0Qd08gDMpCOoW5YdL4CXTFf47HII9SOEZ1RfcNXgiuVCgwZ3MCsyHbqusWJL452HCQOyBMKkHsrbjOnUdjiHBTJDh7M_EJOrGciBFMy9PdXXvQRmxk0QzyM7mqYr6jvCZmjNrJjbW3zi9hCxw-kj3k8HL6x56UvoH8xVBAOdH60AKa6c11EDKN0q8jRX_uwmrmteZrt2boCp11EFFwOYvMl45wgalJ3EWG6T23VUONlCAso2QZqnoSvp4MR2Xodr1tG5kXKw3tME"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-[#f7f9f7] via-[#f7f9f7]/85 to-transparent" />
			</div>

			<div className=" mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
				{/* Left */}
				<div className="lg:col-span-7 space-y-6 text-left">
					<div
						ref={badgeRef}
						className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-700 rounded-full font-sans text-xs font-bold shadow-sm border border-rose-200"
					>
						<ShieldAlert className="w-4 h-4 animate-bounce" />
						<span>तत्काल सहायता की आवश्यकता</span>
					</div>

					<h1
						ref={titleRef}
						className="font-sans font-extrabold text-3xl md:text-5xl text-[#1a4731] leading-tight max-w-2xl"
					>
						नशा इंसान से उसकी पहचान, रिश्ते और सुकून सब छीन
						लेता है।
						<span className="block mt-2 text-[#4a7c59] font-semibold text-2xl md:text-3xl font-sans">
							एक बेहतर कल के लिए आज ही कदम उठाएं
						</span>
					</h1>

					<p
						ref={descRef}
						className="text-sm md:text-base text-[#5a7a63] max-w-xl leading-relaxed"
					>
						{/* “जब नशे की आदत गहरी हो जाती है, तो जीवन के हर
						हिस्से पर असर पड़ता है। सही मार्गदर्शन, नियमित
						दिनचर्या और सहयोग के साथ Addiction Mukti आपकी
						बेहतर रिकवरी की ओर कदम बढ़ाने में मदद करता है।” */}
						<span className="block mt-2 font-sans font-medium italic text-[#4a7c59]">
							पुनर्प्राप्ति संभव है। हम नैदानिक विश्वास और
							जैविक देखभाल प्रदान करते हैं।
						</span>
					</p>

					<div
						ref={btnsRef}
						className="flex flex-wrap gap-4 pt-4"
					>
						<a
							href="tel:8700428833"
							onClick={() => onTabChange("crisis")}
							className="px-8 py-3.5 bg-[#1a4731] hover:bg-[#2d6b4f] text-white rounded-full font-sans font-extrabold text-xs md:text-sm hover:shadow-lg transition-all flex items-center gap-2.5 active:scale-95 shadow-md shadow-[#1a4731]/20"
						>
							<Phone className="w-4 h-4" />
							<span>तुरंत सहायता लें</span>
						</a>
						<button
							onClick={onFocusForm}
							className="px-8 py-3.5 border-2 border-[#4a7c59] text-[#4a7c59] hover:bg-[#4a7c59]/5 rounded-full font-sans font-extrabold text-xs md:text-sm transition-all active:scale-95"
						>
							निःशुल्क परामर्श | Order Now
						</button>
					</div>
				</div>

				{/* Right card */}
				<div ref={cardRef} className="lg:col-span-5">
					<div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[36px] border border-white/70 shadow-xl space-y-6 text-left">
						<div>
							<span className="text-[10px] uppercase font-sans tracking-widest font-extrabold bg-[#1a4731]/10 text-[#1a4731] px-2.5 py-1 rounded border border-[#1a4731]/10">
								तत्काल मानसिक स्वास्थ्य सहायता
							</span>

							<h3 className="font-sans font-extrabold text-2xl text-[#1a4731] mt-2">
								आपातकालीन हेल्पलाइन
							</h3>

							<h4 className="font-sans font-semibold text-sm text-[#4a7c59] mt-0.5">
								24×7 सहायता उपलब्ध
							</h4>
						</div>

						<a
							href="tel:1800ASHAHELP"
							className="flex p-5 bg-[#1a4731] hover:bg-[#2d6b4f] text-white rounded-[24px] items-center justify-between group transition-all duration-300 shadow-md active:scale-[0.98]"
						>
							<div>
								<p className="font-sans font-extrabold text-[10px] tracking-wider text-white/70 uppercase">
									24×7 सहायता उपलब्ध • Safe Dial
								</p>
								<a
									href="tel:8700428833"
									className="text-xl md:text-2xl font-sans font-extrabold tracking-tight mt-0.5 font-mono"
								>
									8700428833
								</a>
							</div>
							<div className="p-3 bg-white/10 rounded-full group-hover:scale-110 transition-transform">
								<Phone className="w-5 h-5 text-white fill-white" />
							</div>
						</a>

						<div className="space-y-4 pt-2">
							{[
								{
									Icon: HeartHandshake,
									title: "सहानुभूतिपूर्ण परामर्श",
									desc: "पूर्ण गोपनीयता के साथ हमारे विशेषज्ञों से बात करें।",
								},
								{
									Icon: Users,
									title: "चिकित्सीय सहायता",
									desc: "नशा मुक्ति के लिए तुरंत चिकित्सीय और मानसिक सहायता।",
								},
							].map(({ Icon, title, desc }) => (
								<div
									key={title}
									className="flex gap-4 items-start"
								>
									<div className="p-2.5 bg-[#d4ead9] text-[#4a7c59] rounded-xl">
										<Icon className="w-5 h-5" />
									</div>
									<div>
										<p className="font-sans font-extrabold text-xs text-[#1a4731]">
											{title}
										</p>
										<p className="text-[#5a7a63] leading-relaxed mt-1">
											{desc}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="pt-2 text-center">
							<span className="text-[9px] uppercase tracking-wider font-extrabold text-[#4a7c59]">
								✦ सटीक मूल्यांकन ✦
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

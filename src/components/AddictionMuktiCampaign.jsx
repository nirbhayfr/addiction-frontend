import { useEffect, useRef, useState } from "react";
import {
	Sprout,
	Leaf,
	Check,
	ShoppingCart,
	Phone,
	Activity,
	CalendarRange,
	Heart,
	Info,
	Package,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AddictionMuktiCampaign({ onFocusForm }) {
	const sectionRef = useRef(null);
	const leftRef = useRef(null);
	const rightRef = useRef(null);
	const overlayRef = useRef(null);
	const modalRef = useRef(null);

	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
	const [checkoutStep, setCheckoutStep] = useState(1);
	const [selectedPack, setSelectedPack] = useState("recommended");
	const [checkoutName, setCheckoutName] = useState("");
	const [checkoutPhone, setCheckoutPhone] = useState("");
	const [checkoutAddress, setCheckoutAddress] = useState("");
	const [checkoutPincode, setCheckoutPincode] = useState("");
	const [checkoutPayment, setCheckoutPayment] = useState("cod");
	const [orderId] = useState(() =>
		Math.floor(10000 + Math.random() * 90000),
	);

	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
		});
		tl.fromTo(
			leftRef.current,
			{ x: -40, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
		).fromTo(
			rightRef.current,
			{ x: 40, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
			"-=0.5",
		);
	}, []);

	// Modal open/close animations
	useEffect(() => {
		if (isCheckoutOpen && overlayRef.current && modalRef.current) {
			gsap.fromTo(
				overlayRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.3, ease: "power2.out" },
			);
			gsap.fromTo(
				modalRef.current,
				{ opacity: 0, scale: 0.94, y: 20 },
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.4,
					ease: "power3.out",
				},
			);
		}
	}, [isCheckoutOpen]);

	const closeModal = () => {
		if (overlayRef.current && modalRef.current) {
			gsap.to(modalRef.current, {
				opacity: 0,
				scale: 0.95,
				y: 10,
				duration: 0.25,
				ease: "power2.in",
			});
			gsap.to(overlayRef.current, {
				opacity: 0,
				duration: 0.25,
				onComplete: () => setIsCheckoutOpen(false),
			});
		} else {
			setIsCheckoutOpen(false);
		}
	};

	const handleOpenCheckout = (packType = "recommended") => {
		setSelectedPack(packType);
		setCheckoutStep(1);
		setIsCheckoutOpen(true);
	};

	const handleCheckoutSubmit = (e) => {
		e.preventDefault();
		if (
			!checkoutName.trim() ||
			!checkoutPhone.trim() ||
			!checkoutAddress.trim()
		)
			return;
		setCheckoutStep(2);
	};

	const packMap = {
		trial: {
			name: "Trial Pack (1 Month | १ महीना)",
			price: 1250,
			bottles: 1,
		},
		recommended: {
			name: "Asha Premium Freedom Plan (3 Months | ३ महीने)",
			price: 2999,
			bottles: 3,
		},
		family: {
			name: "Family Reclamation System (5 Months | ५ महीने)",
			price: 4499,
			bottles: 5,
		},
	};
	const pack = packMap[selectedPack] || packMap.recommended;
	const finalPrice =
		checkoutPayment === "upi" ? Math.round(pack.price * 0.9) : pack.price;

	const features = [
		{
			Icon: Activity,
			title: "प्रारंभिक परामर्श",
			sub: "पहला कदम",
		},
		{
			Icon: CalendarRange,
			title: "मूल्यांकन एवं मार्गदर्शन",
			sub: "सही दिशा",
		},
		{
			Icon: Heart,
			title: "उपचार एवं पुनर्वास",
			sub: "नई शुरुआत",
		},
	];

	return (
		<section
			ref={sectionRef}
			className="py-20 bg-emerald-50/25 border-y border-emerald-100 relative overflow-hidden"
		>
			{/* Decorative */}
			<div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 pointer-events-none opacity-10">
				<Sprout className="w-full h-full text-[#4a7c59] rotate-12" />
			</div>
			<div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 pointer-events-none opacity-10">
				<Leaf className="w-full h-full text-[#4a7c59] -rotate-45" />
			</div>

			<div className=" mx-auto px-6 w-full relative z-10">
				<div className="text-center mb-12 space-y-2">
					<span className="text-base uppercase font-extrabold text-[#436555] bg-emerald-100 px-3.5 py-1 rounded-full">
						विश्वास, देखभाल और सहयोग
					</span>
					<h2 className="font-sans font-extrabold text-2xl md:text-4xl text-[#004349] pt-4">
						नशा छोड़ें, नई ज़िंदगी अपनाएं
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
					{/* LEFT */}
					<div
						ref={leftRef}
						className="lg:col-span-7 bg-white rounded-[40px] border border-[#d4dbdd]/40 p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group"
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full blur-3xl opacity-60 pointer-events-none" />
						<div className="space-y-6">
							<div className="space-y-2">
								<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-100 text-[#436555] font-sans font-extrabold text-[10px] uppercase tracking-wider">
									🔥 विशेष जन स्वास्थ्य अभियान
								</span>
								<h1 className="font-sans font-black text-3xl md:text-5xl text-slate-900 leading-tight">
									आज ही शुरुआत करें और नशों को कहें
									अलविदा–{" "}
									<span className="text-[#436555] relative">
										Navjeev Restore Drops
										<span className="absolute bottom-1 left-0 w-full h-2 bg-emerald-200/50 -z-10" />
									</span>
								</h1>
							</div>

							<div className="space-y-4 font-sans font-medium text-slate-800">
								{[
									{
										hi: "नशे की इच्छा को पीछे छोड़ें, आत्मविश्वास अपनाएँ",
										en: "Leave behind addiction urges and embrace natural resilience & confidence.",
									},
									{
										hi: "नशे को अलविदा कहें और अपनी सेहत वापस पाएं",
										en: "Reclaim your liver vitality, peaceful lungs, and robust mental strength.",
									},
									{
										hi: "जड़ी-बूटियों की प्राकृतिक शक्ति, नशामुक्त जीवन की ओर साथ",
										en: "Pure herbal extracts forming a continuous safety net for sober rehabilitation.",
									},
								].map((item, i) => (
									<div
										key={i}
										className="flex items-start gap-3"
									>
										<div className="w-6 h-6 rounded-full bg-emerald-100 text-[#436555] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-all">
											<Check className="w-3.5 h-3.5 stroke-[3]" />
										</div>
										<div>
											<p className="text-base font-extrabold text-slate-900">
												{item.hi}
											</p>
											{/* <p className="text-base text-slate-500">
												{item.en}
											</p> */}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-8 border-t border-slate-100 pt-6">
							{features.map(({ Icon, title, sub }) => (
								<div
									key={title}
									className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex items-center gap-3 shadow-inner hover:bg-emerald-50/40 transition-colors"
								>
									<div className="p-2.5 bg-white text-emerald-700 rounded-xl shadow-sm shrink-0">
										<Icon className="w-5 h-5" />
									</div>
									<div className="text-left">
										<h4 className="font-extrabold text-[13px] text-slate-900 leading-tight">
											{title}
										</h4>
										<p className="text-[10px] text-slate-500 font-medium">
											{sub}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* RIGHT */}
					<div
						ref={rightRef}
						className="lg:col-span-5 rounded-[40px] border border-[#d4dbdd]/40 p-6 md:p-8 shadow-xl flex flex-col justify-between text-left relative overflow-hidden"
						style={{
							backgroundImage: "url('/doctor.png')",
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
							<Sprout className="w-20 h-20 text-[#436555]" />
						</div>

						<div className="space-y-4">
							<div>
								<span className="text-base font-bold uppercase tracking-wider text-[#436555] block">
									🛡️ प्रमाणित विशेषज्ञों की देखरेख
								</span>
								<h3 className="font-sans font-extrabold text-xl text-[#004349] leading-snug mt-1">
									एक सही कदम, और नशे से हमेशा की
									आज़ादी !
								</h3>
								<p className="text-base text-white font-sans leading-relaxed mt-1">
									प्राकृतिक जड़ी-बूटियों और सही
									मार्गदर्शन के साथ नशामुक्त जीवन की
									नई शुरुआत।
								</p>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3.5 mt-8 pt-4 border-t border-slate-200/40">
							{[
								{
									hi: "शांत दिनचर्या",
									en: "दैनिक आसान कदम",
								},
								{
									hi: "सही मार्गदर्शन",
									en: "सहायता टीम उपलब्ध",
								},
							].map((item, i) => (
								<div
									key={i}
									className="p-3 bg-white/70 rounded-2xl border border-emerald-500/20 flex items-center gap-2.5"
								>
									<div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
										<Check className="w-3 h-3 stroke-[3]" />
									</div>
									<div className="text-left leading-tight">
										<span className="block text-base font-black text-slate-900">
											{item.hi}
										</span>
										<span className="text-[9px] text-slate-400 font-medium">
											{item.en}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Checkout Modal */}
			{isCheckoutOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						ref={overlayRef}
						onClick={closeModal}
						className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
					/>
					<div
						ref={modalRef}
						className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden border border-[#d4dbdd]/40 p-6 md:p-8 shadow-2xl relative z-10 text-left max-h-[90vh] overflow-y-auto"
					>
						<button
							onClick={closeModal}
							className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors font-bold text-sm"
						>
							✕
						</button>

						{checkoutStep === 1 ? (
							<div className="space-y-5">
								<div>
									<span className="text-[9px] uppercase tracking-widest font-extrabold text-[#436555] bg-emerald-100 px-2 py-0.5 rounded">
										Secured COD Shipping Gateway
									</span>
									<h3 className="text-xl font-bold text-[#004349] mt-1">
										Complete Your Medicine Booking
									</h3>
									<p className="text-base text-slate-500 font-sans mt-1">
										All products ship in discreet
										HIPAA-compliant health safety
										boxes. Zero descriptive
										markings.
									</p>
								</div>

								{/* Package selector */}
								<div className="space-y-2">
									<label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
										Choose Treatment Duration
									</label>
									<div className="grid grid-cols-1 gap-2">
										{[
											{
												id: "trial",
												title: "Trial Pack (1 Month | 1 Box)",
												desc: "Assess chemical tolerance & baseline detox",
												price: "₹1,250",
											},
											{
												id: "recommended",
												title: "Asha Premium Freedom Plan (3 Months | 3 Boxes)",
												desc: "Complete dopamine reset & pathway regeneration",
												price: "₹2,999",
												badge: "RECOMMENDED",
											},
											{
												id: "family",
												title: "Family Reclamation System (5 Months | 5 Boxes)",
												desc: "Unshakable biological sobriety & integration counseling",
												price: "₹4,499",
											},
										].map((p) => (
											<button
												key={p.id}
												onClick={() =>
													setSelectedPack(
														p.id,
													)
												}
												className={`p-3 rounded-xl border text-left transition-all flex justify-between items-center relative overflow-hidden ${
													selectedPack ===
													p.id
														? "border-emerald-500 bg-emerald-50/20 text-[#004349] font-bold"
														: "border-slate-200 hover:bg-slate-50 text-slate-700"
												}`}
											>
												{p.badge && (
													<div className="absolute top-0 right-0 bg-emerald-500 text-white font-black text-[7px] uppercase tracking-widest px-1.5 py-0.5 rounded-bl">
														{p.badge}
													</div>
												)}
												<div>
													<span className="block text-base font-extrabold">
														{p.title}
													</span>
													<span className="block text-[10px] text-slate-500">
														{p.desc}
													</span>
												</div>
												<span className="text-base font-black text-emerald-700 ml-3 shrink-0">
													{p.price}
												</span>
											</button>
										))}
									</div>
								</div>

								<form
									onSubmit={handleCheckoutSubmit}
									className="space-y-3 pt-1 text-left"
								>
									<div className="grid grid-cols-2 gap-3">
										{[
											{
												label: "Full Name / नाम",
												type: "text",
												value: checkoutName,
												set: setCheckoutName,
												placeholder:
													"Your Name",
											},
											{
												label: "Phone Number / नंबर",
												type: "tel",
												value: checkoutPhone,
												set: setCheckoutPhone,
												placeholder: "+91",
											},
										].map((f) => (
											<div
												key={f.label}
												className="space-y-1"
											>
												<label className="text-[10px] font-bold text-slate-900 font-sans block uppercase">
													{f.label}
												</label>
												<input
													type={f.type}
													required
													value={f.value}
													onChange={(
														e,
													) =>
														f.set(
															e
																.target
																.value,
														)
													}
													placeholder={
														f.placeholder
													}
													className="w-full bg-[#f4fafd] rounded-lg px-3 py-2 text-base font-semibold outline-none focus:ring-2 focus:ring-emerald-500 border border-transparent"
												/>
											</div>
										))}
									</div>
									<div className="grid grid-cols-3 gap-3">
										<div className="col-span-2 space-y-1">
											<label className="text-[10px] font-bold text-slate-900 font-sans block uppercase">
												Shipping Address /
												पता
											</label>
											<input
												type="text"
												required
												value={
													checkoutAddress
												}
												onChange={(e) =>
													setCheckoutAddress(
														e.target
															.value,
													)
												}
												placeholder="House No, Road, City"
												className="w-full bg-[#f4fafd] rounded-lg px-3 py-2 text-base font-semibold outline-none focus:ring-2 focus:ring-emerald-500 border border-transparent"
											/>
										</div>
										<div className="space-y-1">
											<label className="text-[10px] font-bold text-slate-900 font-sans block uppercase">
												Pincode
											</label>
											<input
												type="text"
												required
												maxLength={6}
												value={
													checkoutPincode
												}
												onChange={(e) =>
													setCheckoutPincode(
														e.target
															.value,
													)
												}
												placeholder="110001"
												className="w-full bg-[#f4fafd] rounded-lg px-3 py-2 text-base font-semibold outline-none focus:ring-2 focus:ring-emerald-500 border border-transparent"
											/>
										</div>
									</div>

									<div className="space-y-1">
										<label className="text-[10px] font-bold text-slate-900 font-sans block uppercase">
											Select Payment Mode
										</label>
										<div className="grid grid-cols-2 gap-3">
											{[
												{
													id: "cod",
													label: "Cash on Delivery",
													Icon: Package,
												},
												{
													id: "upi",
													label: "UPI Option (10% Off)",
													Icon: Check,
												},
											].map(
												({
													id,
													label,
													Icon,
												}) => (
													<button
														key={id}
														type="button"
														onClick={() =>
															setCheckoutPayment(
																id,
															)
														}
														className={`p-2.5 rounded-lg border text-base font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
															checkoutPayment ===
															id
																? "bg-[#004349] text-white border-transparent"
																: "bg-slate-50 border-slate-200 text-slate-700"
														}`}
													>
														<Icon className="w-3.5 h-3.5" />{" "}
														{label}
													</button>
												),
											)}
										</div>
									</div>

									<div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-500 flex items-start gap-2 mt-4">
										<Info className="w-4 h-4 shrink-0 text-amber-500" />
										<p>
											Delivery within India
											takes 2–4 working days.
											COD means you only pay
											when the parcel is handed
											to you.
										</p>
									</div>

									<button
										type="submit"
										className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-black text-sm rounded-2xl transition-all shadow-md mt-4"
									>
										Confirm Booking: Pay ₹
										{finalPrice}/-
									</button>
								</form>
							</div>
						) : (
							<div className="space-y-6 text-center py-4">
								<div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold animate-bounce shadow">
									✓
								</div>
								<div>
									<h3 className="text-2xl font-black text-[#004349]">
										Order Placed Successfully!
									</h3>
									<p className="text-base text-slate-500 max-w-sm mx-auto mt-2">
										Congratulations {checkoutName}
										! Your priority de-addiction
										system has been reserved under
										ID ASHA-OCT-{orderId}.
									</p>
								</div>
								<div className="bg-slate-50 rounded-2xl border border-slate-200/40 p-5 space-y-4 text-left">
									<span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block border-b border-slate-100 pb-1.5">
										LIVE TRACKING PROGRESS
									</span>
									<div className="relative pl-6 space-y-5">
										<div className="absolute left-1.5 top-1 bottom-1 w-[1px] bg-emerald-500" />
										{[
											{
												title: "Order Booked & Confirmed",
												sub: `100% Securely locked at ${new Date().toLocaleTimeString()}`,
												active: false,
												done: true,
											},
											{
												title: "Custom Herbal Sourcing & Lab Check",
												sub: "Compounding pure extract dropper bottle now...",
												active: true,
												done: false,
											},
											{
												title: "Dispatched with Express Tracking Code",
												sub: "Ready for logistics handoff (Delhivery/DTDC)",
												active: false,
												done: false,
												dim: true,
											},
										].map((step, i) => (
											<div
												key={i}
												className={`relative ${step.dim ? "opacity-40" : ""}`}
											>
												<span
													className={`absolute -left-[22px] top-0.5 w-3 h-3 rounded-full ${step.active ? "bg-emerald-500 animate-ping" : step.done ? "bg-emerald-500" : "bg-slate-300"}`}
												/>
												{step.active && (
													<span className="absolute -left-[22px] top-0.5 w-3 h-3 rounded-full bg-emerald-500" />
												)}
												<span className="block text-base font-bold text-[#004349]">
													{step.title}
												</span>
												<span
													className={`block text-[9px] ${step.done ? "text-emerald-700" : "text-slate-400"} font-medium`}
												>
													{step.sub}
												</span>
											</div>
										))}
									</div>
								</div>
								<div className="p-4 bg-[#f4fafd] rounded-2xl border border-[#d4dbdd]/40 text-left flex gap-3.5 items-center">
									<div className="w-10 h-10 rounded-full bg-[#004349] text-white flex items-center justify-center font-bold text-base shrink-0">
										R
									</div>
									<div>
										<span className="block text-[10px] uppercase font-bold text-[#436555]">
											Your Appointed Support
											Advisor
										</span>
										<span className="block text-base font-black text-slate-900">
											Advisory Doctor Manish G.
										</span>
										<span className="block text-[9px] text-slate-500">
											He will contact you
											within 24 hours to guide
											product usage.
										</span>
									</div>
								</div>
								<button
									onClick={closeModal}
									className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-base font-sans font-bold rounded-xl transition-all"
								>
									Return to Homepage
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</section>
	);
}

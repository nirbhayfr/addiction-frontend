import { useEffect, useRef, useState } from "react";
import { ShieldAlert, Radio } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Admission({ formRef }) {
	const sectionRef = useRef(null);
	const leftRef = useRef(null);
	const rightRef = useRef(null);

	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [urgency, setUrgency] = useState("Immediate / Emergency");
	const [request, setRequest] = useState(null);
	const [queueState, setQueueState] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
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

	useEffect(() => {
		let t1, t2;
		if (request && queueState === 1)
			t1 = setTimeout(() => {
				setQueueState(2);
				setRequest((p) => ({
					...p,
					status: "assigned",
					assignedCounselor:
						"Dr. Sarah Kapur (M.D. Addictology)",
				}));
			}, 3000);
		if (request && queueState === 2)
			t2 = setTimeout(() => {
				setQueueState(3);
				setRequest((p) => ({ ...p, status: "completed" }));
			}, 4000);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, [request, queueState]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!fullName.trim() || !phoneNumber.trim()) return;

		setIsSubmitting(true);

		const requestData = {
			fullName,
			phoneNumber,
			urgency,
			submittedAt: new Date().toLocaleTimeString(),
			status: "connecting",
		};

		try {
			await fetch(
				"https://addiction-backend.onrender.com/api/requests",
				{
					// await fetch("http://localhost:5000/api/requests", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						fullName,
						phoneNumber,
						urgency,
						message: "Callback request",
						type: "callback",
					}),
				},
			);
		} catch (_) {
			// continue even if fetch fails
		}

		setIsSubmitting(false);
		setRequest(requestData);
		setQueueState(1);

		const message = `
REHABILITATION CENTER
NEW ADMISSION REQUEST

--------------------------------

Full Name:
${fullName}

Phone Number:
${phoneNumber}

Urgency Level:
${urgency}

Submitted At:
${requestData.submittedAt}

--------------------------------

This request was submitted through the website.
`.trim();

		const whatsappNumber = "917982217125";

		const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

		setTimeout(() => {
			window.open(whatsappURL, "_blank");
		}, 1200);
	};
	const handleReset = () => {
		setRequest(null);
		setQueueState(0);
		setFullName("");
		setPhoneNumber("");
	};

	const steps = [
		{
			title: "प्रारंभिक परामर्श",
			titleHn: "गोपनीय सहायता एवं मार्गदर्शन",
			desc: "24/7 हेल्पलाइन या कॉल बैक फॉर्म के माध्यम से हमारी विशेषज्ञ टीम से सुरक्षित एवं गोपनीय परामर्श प्राप्त करें।",
			descHn: "विशेषज्ञों द्वारा प्रारंभिक मूल्यांकन और सहायता।",
		},
		{
			title: "चिकित्सीय मूल्यांकन",
			titleHn: "व्यक्तिगत रिकवरी योजना",
			desc: "अनुभवी विशेषज्ञ व्यक्ति की स्थिति को समझकर मानसिक एवं शारीरिक सहायता हेतु उपयुक्त योजना तैयार करते हैं।",
			descHn: "सुरक्षित और संतुलित रिकवरी प्रक्रिया।",
		},
		{
			title: "सहयोगात्मक प्रवेश",
			titleHn: "परिवार एवं पुनर्वास सहयोग",
			desc: "परिवार के सहयोग और व्यवस्थित मार्गदर्शन के साथ सहज प्रवेश एवं निरंतर सहायता प्रदान की जाती है।",
			descHn: "दीर्घकालिक सुधार और सकारात्मक जीवनशैली की ओर कदम।",
		},
	];
	return (
		<section
			id="admission-section"
			ref={sectionRef}
			className="py-20 bg-white [overflow-x:clip]"
		>
			<div className=" mx-auto px-6 w-full">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
					{/* Left */}
					<div
						ref={leftRef}
						className="lg:col-span-7 space-y-12 text-left"
					>
						<div>
							<span className="text-base uppercase tracking-widest font-extrabold text-[#4a7c59] bg-[#d4ead9] px-3 py-1 rounded">
								सरल प्रक्रिया
							</span>

							<h2 className="font-sans font-extrabold text-3xl md:text-4xl text-[#1a4731] mt-3 leading-tight">
								सरल प्रवेश प्रक्रिया
								<span className="block text-[#4a7c59] font-semibold text-2xl mt-1">
									आसान एवं व्यवस्थित सहायता प्रणाली
								</span>
							</h2>

							<p className="text-sm text-[#5a7a63] mt-3 max-w-lg leading-relaxed">
								हमने सहायता और रिकवरी प्रक्रिया को सरल,
								सुरक्षित और सहज बनाया है ताकि व्यक्ति और
								परिवार बिना किसी कठिनाई के सही
								मार्गदर्शन प्राप्त कर सकें।
								<span className="block mt-1 font-sans font-semibold text-[#4a7c59]">
									त्वरित सहायता, गोपनीय परामर्श और
									सरल प्रवेश प्रक्रिया।
								</span>
							</p>
						</div>

						<div className="space-y-10 relative">
							<div className="absolute left-[21px] top-6 bottom-6 w-[2px] bg-[#c8d8cc] hidden md:block" />
							{steps.map((s, i) => (
								<div
									key={i}
									className="flex gap-6 items-start relative z-10"
								>
									<div className="w-11 h-11 rounded-full bg-[#1a4731] text-white flex items-center justify-center font-sans font-extrabold text-lg flex-shrink-0 shadow-md shadow-[#1a4731]/25">
										{i + 1}
									</div>
									<div>
										<h4 className="font-sans font-extrabold text-lg text-[#1a4731]">
											{s.titleHn}
										</h4>
										<p className="text-sm text-[#5a7a63] leading-relaxed mt-1.5">
											{s.desc}
										</p>
										<p className="text-base text-[#4a7c59] italic mt-1">
											{s.descHn}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right */}
					<div ref={rightRef} className="lg:col-span-5">
						<div
							ref={formRef}
							className="bg-[#f0f5f1] border border-[#c8d8cc] rounded-[40px] p-6 md:p-8 shadow-sm"
						>
							{!request ? (
								<div>
									<div className="text-center mb-6">
										<h3 className="font-sans font-extrabold text-2xl text-[#1a4731]">
											आज ही कदम उठाएँ
										</h3>

										<p className="text-base text-[#5a7a63] mt-1.5">
											हमारी टीम शीघ्र ही आपसे
											संपर्क करेगी।
										</p>
									</div>
									<form
										onSubmit={handleSubmit}
										className="space-y-4 text-left"
										id="contact"
									>
										{[
											{
												label: "Full Name | पूरा नाम",
												type: "text",
												value: fullName,
												onChange:
													setFullName,
												placeholder:
													"Your Name (आपका नाम)",
											},
											{
												label: "Phone Number | फोन नंबर",
												type: "tel",
												value: phoneNumber,
												onChange:
													setPhoneNumber,
												placeholder:
													"+91 00000 00000",
											},
										].map((f) => (
											<div
												key={f.label}
												className="space-y-1.5"
											>
												<label className="text-[10px] font-sans font-extrabold uppercase text-[#5a7a63] tracking-wider block">
													{f.label}
												</label>
												<input
													type={f.type}
													required
													value={f.value}
													onChange={(
														e,
													) =>
														f.onChange(
															e
																.target
																.value,
														)
													}
													placeholder={
														f.placeholder
													}
													className="w-full bg-white border border-transparent rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#1a4731] text-base font-semibold text-[#1a4731] focus:bg-white outline-none transition-all"
												/>
											</div>
										))}
										<div className="space-y-1.5">
											<label className="text-[10px] font-sans font-extrabold uppercase text-[#5a7a63] tracking-wider block">
												Urgency Level |
												तात्कालिकता
											</label>
											<select
												value={urgency}
												onChange={(e) =>
													setUrgency(
														e.target
															.value,
													)
												}
												className="w-full bg-white border border-transparent rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#1a4731] text-base font-semibold text-[#1a4731] outline-none transition-all"
											>
												<option>
													Immediate /
													Emergency
													(तत्काल सहायता)
												</option>
												<option>
													Seeking Counsel
													(सामान्य
													परामर्श)
												</option>
												<option>
													Planning for
													Future (भविष्य
													नियोजन)
												</option>
											</select>
										</div>
										<button
											type="submit"
											disabled={isSubmitting}
											className="w-full py-4 bg-[#1a4731] hover:bg-[#2d6b4f] disabled:opacity-75 disabled:cursor-not-allowed text-white rounded-xl font-sans font-extrabold text-sm hover:shadow-lg transition-all active:scale-[0.98] shadow-md shadow-[#1a4731]/20 flex items-center justify-center gap-2"
										>
											{isSubmitting ? (
												<>
													<svg
														className="w-4 h-4 animate-spin text-white/80"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														/>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
														/>
													</svg>
													<span>
														भेजा जा
														रहा है…
													</span>
												</>
											) : (
												<>
													Submit Request
													| अनुरोध भेजें
												</>
											)}
										</button>
										<p className="text-[9px] text-center text-[#8aaa91] uppercase tracking-widest font-extrabold">
											🔒 केवल विशेषज्ञ परामर्श
											सहायता। कोई प्रचारात्मक
											कॉल नहीं।
										</p>
									</form>
								</div>
							) : (
								<div className="space-y-5 text-left">
									<div className="text-center">
										<span className="px-3 py-1 bg-[#1a4731]/10 text-[#1a4731] border border-[#1a4731]/20 rounded-full text-[10px] tracking-widest font-extrabold inline-block">
											सुरक्षित सहायता अनुरोध
										</span>

										<h3 className="font-sans font-extrabold text-xl text-[#1a4731] mt-2">
											सक्रिय कॉल-बैक स्थिति
										</h3>
									</div>
									<div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
										<div
											className="bg-[#1a4731] h-full transition-all duration-500 rounded-full"
											style={{
												width:
													queueState ===
													1
														? "33%"
														: queueState ===
															  2
															? "67%"
															: "100%",
											}}
										/>
									</div>
									<div className="space-y-4 bg-white p-5 rounded-2xl border border-[#c8d8cc]">
										{[
											{
												label: "अनुरोध सुरक्षित रूप से दर्ज किया गया",
												sub: `${request.submittedAt} पर प्राप्त`,
												minState: 1,
											},
											{
												label: "विशेषज्ञ परामर्श टीम आवंटित की जा रही है",
												sub: request.assignedCounselor,
												minState: 2,
											},
											{
												label: "संपर्क प्रक्रिया प्रारंभ",
												sub:
													queueState >= 3
														? `परामर्शदाता ${request.phoneNumber} पर संपर्क कर रहे हैं`
														: "",
												minState: 3,
											},
										].map((item, i) => {
											const done =
												queueState >
												item.minState;
											const active =
												queueState ===
												item.minState;
											return (
												<div
													key={i}
													className="flex gap-3.5 items-start"
												>
													<div
														className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0 ${done || active ? "bg-[#1a4731] text-white" : "bg-slate-100 text-slate-300"}`}
													>
														{done ? (
															"✓"
														) : active ? (
															<div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
														) : (
															i + 1
														)}
													</div>
													<div>
														<span className="block text-base font-bold text-[#1a4731]">
															{
																item.label
															}
														</span>
														{(done ||
															active) &&
															item.sub && (
																<span className="block text-[10px] text-[#4a7c59] font-bold mt-0.5">
																	{
																		item.sub
																	}
																</span>
															)}
														{i ===
															2 &&
															queueState >=
																3 && (
																<span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-0.5 animate-pulse">
																	<Radio className="w-3.5 h-3.5" />{" "}
																	परामर्शदाता
																	अभी
																	संपर्क
																	कर
																	रहे
																	हैं
																</span>
															)}
													</div>
												</div>
											);
										})}
									</div>
									<div className="flex gap-2.5 items-start bg-amber-50 p-3.5 rounded-xl text-[10px] text-amber-900 border border-amber-200">
										<ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
										<p>
											अपना फ़ोन उपलब्ध रखें।
											गंभीर स्थिति में सीधे
											हेल्पलाइन पर संपर्क करें।
										</p>
									</div>
									<button
										onClick={handleReset}
										className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-base font-sans font-bold rounded-xl transition-all"
									>
										नया अनुरोध दर्ज करें
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

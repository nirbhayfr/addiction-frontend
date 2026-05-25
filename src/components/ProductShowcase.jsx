import { useRef, useState } from "react";

export default function ProductShowcase() {
	const headerRef = useRef(null);
	const leftRef = useRef(null);
	const rightRef = useRef(null);
	const cardsRef = useRef([]);

	const [calculatorResults, setCalculatorResults] = useState(null);

	const generateTimeline = () => {
		setCalculatorResults({
			title: "Moderate Recovery Plan",
			bottles: "3 Bottles",
			success: "92.4%",
			steps: [
				"Days 1-7: Initial detoxification support.",
				"Days 8-30: Craving stabilization begins.",
				"Days 31-90: Long-term recovery reinforcement.",
			],
		});
	};

	const cards = [
		{
			id: "01",
			title: "100% आयुर्वेदिक एवं प्राकृतिक",
		},
		{
			id: "02",
			title: "बिना रसायन एवं बिना दुष्प्रभाव",
		},
		{
			id: "03",
			title: "सुरक्षित एवं प्रभावी फॉर्मूला",
		},
		{
			id: "04",
			title: "परिवारों का विश्वसनीय भरोसा",
		},
	];

	return (
		<section className="relative overflow-hidden py-12 md:py-16 bg-white">
			<div className="max-w-[1240px] mx-auto px-4 sm:px-6">
				{/* HEADER */}
				<div
					ref={headerRef}
					className="text-center mb-14 space-y-4"
				>
					<span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black">
						आयुर्वेदिक पुनर्वास सहायता
					</span>

					<h2 className="text-4xl md:text-6xl font-black text-[#004349] pt-6">
						रिस्टोर ड्रॉप्स
					</h2>

					<p className="max-w-2xl mx-auto text-slate-500 text-sm leading-8">
						100% आयुर्वेदिक एवं प्राकृतिक हर्बल रिकवरी
						फॉर्मूला।
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
					{/* LEFT */}
					<div
						ref={leftRef}
						className="lg:col-span-6 flex flex-col items-center"
					>
						<img
							src="/product.jpeg"
							alt="product"
							className="rounded-sm"
						/>
					</div>

					{/* RIGHT */}
					<div ref={rightRef} className="lg:col-span-6">
						<h3 className="text-2xl font-black text-[#004349] mb-6">
							आयुर्वेदिक गुण एवं प्रमाणित विशेषताएँ
						</h3>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{cards.map((card, index) => (
								<div
									key={card.id}
									ref={(el) => {
										if (el)
											cardsRef.current[index] =
												el;
									}}
									className="rounded-2xl border border-slate-200 p-5 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all"
								>
									<div className="flex items-center gap-3">
										<div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center font-black text-[#436555] shrink-0">
											{card.id}
										</div>

										<h4 className="font-black text-sm text-[#004349] leading-tight">
											{card.title}
										</h4>
									</div>
								</div>
							))}
						</div>

						{/* DIAGNOSTIC TOOL */}
						<div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
							<div className="mb-4">
								<span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[9px] tracking-[0.25em] font-black">
									रिकवरी मूल्यांकन उपकरण
								</span>

								<h3 className="mt-2 text-lg font-black text-[#004349]">
									सहायता आवश्यकता कैलकुलेटर
								</h3>

								<p className="mt-1 text-xs text-slate-500">
									आदत की गंभीरता के अनुसार अनुमानित
									सहायता योजना जानें।
								</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
								<select
									className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500"
									defaultValue="alcohol"
								>
									<option value="alcohol">
										शराब की लत
									</option>

									<option value="nicotine">
										निकोटीन / स्मोकिंग
									</option>

									<option value="gutka">
										तंबाकू / गुटखा
									</option>
								</select>

								<select
									className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500"
									defaultValue="1-3"
								>
									<option value="under-1">
										1 वर्ष से कम
									</option>

									<option value="1-3">
										1 से 3 वर्ष
									</option>

									<option value="4-10">
										4 से 10 वर्ष
									</option>

									<option value="chronic">
										लंबे समय से
									</option>
								</select>

								<select
									className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500"
									defaultValue="moderate"
								>
									<option value="mild">
										सामान्य
									</option>

									<option value="moderate">
										मध्यम
									</option>

									<option value="severe">
										गंभीर
									</option>
								</select>
							</div>

							<button
								onClick={generateTimeline}
								className="mt-4 w-full rounded-xl bg-[#004349] hover:bg-[#0d5c63] py-3 text-xs font-black text-white transition-all"
							>
								रिकवरी योजना तैयार करें
							</button>

							{calculatorResults && (
								<div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
												Program
											</p>

											<h4 className="text-sm font-black text-slate-900 mt-1">
												{
													calculatorResults.title
												}
											</h4>
										</div>

										<div className="text-right">
											<p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
												Bottles
											</p>

											<h4 className="text-sm font-black text-emerald-600 mt-1">
												{
													calculatorResults.bottles
												}
											</h4>
										</div>
									</div>

									<div className="mt-4">
										<div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2">
											<span className="text-xs font-bold text-[#004349]">
												Projected Success
												Rate
											</span>

											<span className="text-xs font-black text-emerald-600">
												{
													calculatorResults.success
												}
											</span>
										</div>
									</div>

									<div className="mt-4 space-y-3">
										{calculatorResults.steps.map(
											(step, index) => (
												<div
													key={index}
													className="flex gap-2 text-xs text-slate-600"
												>
													<div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />

													<p className="leading-6">
														{step}
													</p>
												</div>
											),
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

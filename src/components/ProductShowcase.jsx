import { useRef, useState } from "react";
import ProductPopup from "./Popup";

function BeforeAfterSlider({ before, after }) {
	const [position, setPosition] = useState(50);
	const containerRef = useRef(null);
	const dragging = useRef(false);

	const updatePosition = (clientX) => {
		const rect = containerRef.current.getBoundingClientRect();
		const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
		setPosition((x / rect.width) * 100);
	};

	const onMouseDown = () => {
		dragging.current = true;
	};
	const onMouseMove = (e) => {
		if (dragging.current) updatePosition(e.clientX);
	};
	const onMouseUp = () => {
		dragging.current = false;
	};
	const onTouchMove = (e) => updatePosition(e.touches[0].clientX);

	return (
		<div
			ref={containerRef}
			className="relative w-full aspect-square overflow-hidden rounded-sm select-none cursor-col-resize"
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
			onTouchMove={onTouchMove}
		>
			{/* AFTER (bottom layer) */}
			<img
				src={after}
				alt="after"
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* BEFORE (clipped top layer) */}
			<div
				className="absolute inset-0 overflow-hidden"
				style={{ width: `${position}%` }}
			>
				<img
					src={before}
					alt="before"
					className="absolute inset-0 w-full h-full object-cover"
				/>
			</div>

			{/* DIVIDER */}
			<div
				className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
				style={{ left: `${position}%` }}
			>
				<div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path
							d="M7 5l-4 5 4 5M13 5l4 5-4 5"
							stroke="#004349"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>

			{/* LABELS */}
			<span className="absolute top-3 left-3 bg-black/50 text-white text-[10px] font-black px-2 py-1 rounded-full">
				BEFORE
			</span>
			<span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-full">
				AFTER
			</span>
		</div>
	);
}

export default function ProductShowcase() {
	const headerRef = useRef(null);
	const leftRef = useRef(null);
	const rightRef = useRef(null);
	const cardsRef = useRef([]);

	const [calculatorResults, setCalculatorResults] = useState(null);
	const images = [
		"/product.jpeg",
		"/product-2.jpeg",
		"/product-3.jpeg",
		"/product-4.jpeg",
	];
	const [current, setCurrent] = useState(0);
	const [openPopup, setOpenPopup] = useState(false);

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
			<ProductPopup
				open={openPopup}
				onClose={() => setOpenPopup(false)}
			/>
			;
			<div className=" mx-auto px-4 sm:px-6">
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
						className="lg:col-span-6 flex flex-col items-center gap-4"
					>
						<div className="relative w-full h-[450px] md:h-[600px] lg:h-[750px] overflow-hidden rounded-sm">
							<img
								src={images[current]}
								alt="product"
								className="absolute inset-0 w-full h-full object-contain"
							/>
							<button
								onClick={() =>
									setCurrent(
										(prev) =>
											(prev -
												1 +
												images.length) %
											images.length,
									)
								}
								className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow"
							>
								‹
							</button>
							<button
								onClick={() =>
									setCurrent(
										(prev) =>
											(prev + 1) %
											images.length,
									)
								}
								className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow"
							>
								›
							</button>
						</div>
					</div>
					{/* RIGHT */}
					<div ref={rightRef} className="lg:col-span-6">
						<h3 className="text-2xl font-black text-[#004349] mb-6">
							आयुर्वेदिक गुण एवं प्रमाणित विशेषताएँ
						</h3>

						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-2">
								{cards.map((card, index) => (
									<div
										key={card.id}
										ref={(el) => {
											if (el)
												cardsRef.current[
													index
												] = el;
										}}
										className="flex items-center gap-3 rounded-2xl border border-[#d1e8e2] bg-white px-4 py-3.5 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all"
									>
										<div className="w-10 h-10 rounded-xl bg-[#e6f2ee] flex items-center justify-center font-black text-sm text-[#436555] shrink-0">
											{card.id}
										</div>
										<h4 className="font-extrabold text-[13px] text-[#004349] leading-snug">
											{card.title}
										</h4>
									</div>
								))}
							</div>

							<button
								onClick={() => setOpenPopup(true)}
								className="w-full rounded-2xl bg-[#004349] hover:bg-[#0d5c63] py-4 text-[15px] font-black text-white tracking-wide transition-all"
							>
								अभी खरीदें →
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

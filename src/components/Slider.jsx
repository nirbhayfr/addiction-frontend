import { useState, useEffect, useRef } from "react";

const banners = [
	{
		desktop: "/banner-3.png",
		mobile: "/banner-1.jpeg",
	},
	{
		desktop: "/banner-4.png",
		mobile: "/banner-2.jpeg",
	},
];

export default function BannerSlider() {
	const [current, setCurrent] = useState(0);
	const [dragging, setDragging] = useState(false);
	const dragStartX = useRef(null);
	const timerRef = useRef(null);

	const resetTimer = () => {
		clearInterval(timerRef.current);
		timerRef.current = setInterval(() => {
			setCurrent((prev) => (prev + 1) % banners.length);
		}, 4000);
	};

	useEffect(() => {
		resetTimer();
		return () => clearInterval(timerRef.current);
	}, []);

	const goTo = (index) => {
		setCurrent(index);
		resetTimer();
	};

	const prev = () => goTo((current - 1 + banners.length) % banners.length);
	const next = () => goTo((current + 1) % banners.length);

	// Drag / swipe
	const onDragStart = (clientX) => {
		dragStartX.current = clientX;
		setDragging(true);
	};
	const onDragEnd = (clientX) => {
		if (!dragging || dragStartX.current === null) return;
		const diff = dragStartX.current - clientX;
		if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
		setDragging(false);
		dragStartX.current = null;
	};

	return (
		<section
			className="relative w-full overflow-hidden bg-black"
			style={{ height: "100svh" }}
			onMouseDown={(e) => onDragStart(e.clientX)}
			onMouseUp={(e) => onDragEnd(e.clientX)}
			onMouseLeave={() => setDragging(false)}
			onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
			onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
		>
			{/* Slides */}
			<div
				className="flex h-full transition-transform duration-700 ease-in-out"
				style={{ transform: `translateX(-${current * 100}%)` }}
			>
				{banners.map((banner, i) => (
					<div
						key={i}
						className="relative w-full h-full shrink-0"
					>
						<picture className="block w-full h-full">
							<source
								media="(max-width: 767px)"
								srcSet={banner.mobile}
							/>
							<img
								src={banner.desktop}
								alt={`Banner ${i + 1}`}
								className="w-full h-full object-cover select-none"
								draggable={false}
							/>
						</picture>
					</div>
				))}
			</div>

			{/* Prev / Next arrows */}
			<button
				onClick={prev}
				className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-all"
				aria-label="Previous"
			>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
					<path
						d="M11 4L6 9l5 5"
						stroke="#ffffff"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<button
				onClick={next}
				className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-all"
				aria-label="Next"
			>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
					<path
						d="M7 4l5 5-5 5"
						stroke="#ffffff"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			{/* Dot indicators */}
			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
				{banners.map((_, i) => (
					<button
						key={i}
						onClick={() => goTo(i)}
						className="transition-all duration-300"
						aria-label={`Go to slide ${i + 1}`}
						style={{
							width: i === current ? "24px" : "8px",
							height: "8px",
							borderRadius: "999px",
							background:
								i === current
									? "#004349"
									: "rgba(0,0,0,0.3)",
						}}
					/>
				))}
			</div>
		</section>
	);
}

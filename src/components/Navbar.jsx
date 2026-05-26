import { useEffect, useRef } from "react";
import { PhoneCall, Radio } from "lucide-react";
import gsap from "gsap";

export default function Navbar({ currentTab, onTabChange }) {
	const navRef = useRef(null);

	useEffect(() => {
		gsap.fromTo(
			navRef.current,
			{ y: -80, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
		);
	}, []);

	const tabs = [
		{ id: "home", label: "Home", labelHn: "आवास" },
		{ id: "programs", label: "Programs", labelHn: "कार्यक्रम" },
		{ id: "stories", label: "Stories", labelHn: "कहानियाँ" },
		{ id: "about", label: "About", labelHn: "हमारे बारे में" },
	];

	return (
		<header
			ref={navRef}
			className="sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-3.5 w-full bg-white/90 backdrop-blur-md border-b border-emerald-100/60"
		>
			<div
				className="flex items-center gap-3 cursor-pointer"
				onClick={() => onTabChange("home")}
			>
				{/* <div className="w-10 h-10 rounded-full bg-[#1a4731] flex items-center justify-center text-white font-extrabold text-base select-none shadow-md shadow-[#1a4731]/20">
					A
				</div> */}
				<div>
					<span className="font-sans font-extrabold text-xl text-[#1a4731] tracking-tight leading-none">
						Navjeev{" "}
						<span className="text-[#9D8542]">
							Restore Drops
						</span>
					</span>
					<span className="block text-[9px] uppercase tracking-widest font-extrabold text-[#4a7c59]">
						तत्काल मानसिक स्वास्थ्य सहायता
					</span>
				</div>
			</div>

			{/* <nav className="flex flex-wrap justify-center items-center gap-1 md:gap-2 my-3 md:my-0">
				{tabs.map((t) => (
					<button
						key={t.id}
						onClick={() => onTabChange(t.id)}
						className={`px-3 py-1.5 rounded-full font-sans font-bold text-xs transition-all duration-200 ${
							currentTab === t.id
								? "bg-[#1a4731] text-white shadow-sm"
								: "text-[#5a7a63] hover:text-[#1a4731] hover:bg-emerald-50"
						}`}
					>
						{t.label}
					</button>
				))}
				<button
					onClick={() => onTabChange("crisis")}
					className={`px-3 py-1.5 rounded-full font-sans font-bold text-xs transition-all flex items-center gap-1.5 ${
						currentTab === "crisis"
							? "bg-rose-600 text-white shadow-sm"
							: "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
					}`}
				>
					<Radio className="w-3.5 h-3.5" />
					<span>Crisis | हॉटलाइन</span>
				</button>
			</nav> */}

			<a
				href="tel:8700428833"
				className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#1a4731] text-white rounded-full font-sans font-extrabold text-xs hover:bg-[#2d6b4f] transition-all shadow-md shadow-[#1a4731]/20"
			>
				<PhoneCall className="w-4 h-4 fill-white animate-bounce" />
				<span>+91 8700428833</span>
			</a>
		</header>
	);
}

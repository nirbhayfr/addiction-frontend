import { useEffect, useRef, useState } from "react";
import {
	Wind,
	Play,
	Pause,
	RefreshCw,
	CheckCircle2,
	Star,
	Heart,
} from "lucide-react";
import gsap from "gsap";

const configs = {
	box: { inhale: 4, hold: 4, exhale: 4, rest: 4 },
	calm: { inhale: 4, hold: 7, exhale: 8, rest: 0 },
};

const stateInfo = {
	inhale: {
		label: "Inhale Slowly",
		labelHn: "धीरे-धीरे सांस लें",
		bg: "bg-[#1a4731]",
	},
	hold: {
		label: "Hold & Contain",
		labelHn: "सांस को रोकें",
		bg: "bg-emerald-600",
	},
	exhale: {
		label: "Exhale Peacefully",
		labelHn: "सांस छोड़ें",
		bg: "bg-[#4a7c59]",
	},
	rest: {
		label: "Observe Silence",
		labelHn: "मौन का अनुभव",
		bg: "bg-slate-500",
	},
};

export default function CopingBreathing() {
	const [isActive, setIsActive] = useState(false);
	const [breathState, setBreathState] = useState("inhale");
	const [secondsLeft, setSecondsLeft] = useState(4);
	const [cycles, setCycles] = useState(0);
	const [pattern, setPattern] = useState("box");

	const circleRef = useRef(null);
	const ringRef = useRef(null);
	const breathAnim = useRef(null);

	// Animate circle on state change
	useEffect(() => {
		if (!isActive) {
			gsap.to(circleRef.current, {
				scale: 0.88,
				duration: 0.4,
				ease: "power2.out",
			});
			return;
		}
		const dur = configs[pattern][breathState] || 4;
		const targetScale =
			breathState === "inhale" || breathState === "hold" ? 1.12 : 0.85;
		if (breathAnim.current) breathAnim.current.kill();
		breathAnim.current = gsap.to(circleRef.current, {
			scale: targetScale,
			duration: dur,
			ease: "power1.inOut",
		});
		gsap.to(ringRef.current, {
			scale: targetScale + 0.1,
			opacity: targetScale > 1 ? 0.4 : 0.15,
			duration: dur,
			ease: "power1.inOut",
		});
	}, [breathState, isActive, pattern]);

	useEffect(() => {
		if (!isActive) {
			setBreathState("inhale");
			setSecondsLeft(configs[pattern].inhale);
			return;
		}
		const timer = setInterval(() => {
			setSecondsLeft((prev) => {
				if (prev <= 1) {
					const cfg = configs[pattern];
					let next = "inhale";
					if (breathState === "inhale")
						next = cfg.hold > 0 ? "hold" : "exhale";
					else if (breathState === "hold") next = "exhale";
					else if (breathState === "exhale") {
						if (cfg.rest > 0) next = "rest";
						else {
							next = "inhale";
							setCycles((c) => c + 1);
						}
					} else if (breathState === "rest") {
						next = "inhale";
						setCycles((c) => c + 1);
					}
					setBreathState(next);
					return cfg[next] || 4;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, [isActive, breathState, pattern]);

	const info = stateInfo[breathState];
	const cfg = configs[pattern];

	return (
		<div className="bg-[#f0f5f1] border border-[#c8d8cc] rounded-[32px] p-6 md:p-8 max-w-4xl mx-auto">
			<div className="flex flex-col md:flex-row items-center gap-8">
				{/* Left controls */}
				<div className="flex-1 w-full md:pr-4 text-left space-y-5">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-[#1a4731]/10 text-[#1a4731] rounded-xl">
							<Wind className="w-6 h-6" />
						</div>
						<div>
							<span className="font-sans font-bold text-lg text-[#1a4731]">
								Guided Neuro-Grounding
							</span>
							<p className="text-base text-[#5a7a63]">
								Select a clinically verified breath
								routine
							</p>
						</div>
					</div>

					<div className="space-y-3">
						{[
							{
								id: "box",
								title: "Box Breathing (4-4-4-4)",
								desc: "Excellent for panic, racing thoughts & craving aversion.",
								Icon: Star,
							},
							{
								id: "calm",
								title: "Pranayama (4-7-8)",
								desc: "Reduces hyper-arousal and assists deep restful sleep.",
								Icon: Heart,
							},
						].map(({ id, title, desc, Icon }) => (
							<button
								key={id}
								onClick={() => {
									setPattern(id);
									setIsActive(false);
									setCycles(0);
								}}
								className={`w-full text-left p-4 rounded-2xl border transition-all flex justify-between items-center ${
									pattern === id
										? "bg-[#1a4731] border-[#1a4731] text-white shadow-md shadow-[#1a4731]/20"
										: "bg-white border-[#c8d8cc] hover:bg-[#f0f5f1] text-[#1a4731]"
								}`}
							>
								<div>
									<span className="block font-bold text-sm">
										{title}
									</span>
									<span
										className={`block text-base mt-1 ${pattern === id ? "text-white/70" : "text-[#5a7a63]"}`}
									>
										{desc}
									</span>
								</div>
								<Icon className="w-4 h-4 flex-shrink-0" />
							</button>
						))}
					</div>

					<div className="bg-white p-4 rounded-2xl border border-[#c8d8cc] flex items-center justify-between">
						<span className="text-base text-[#5a7a63] font-medium">
							Completed Cycles
						</span>
						<div className="flex items-center gap-2">
							<span className="font-mono text-xl font-bold text-[#1a4731]">
								{cycles}
							</span>
							<CheckCircle2 className="w-5 h-5 text-[#4a7c59]" />
						</div>
					</div>
				</div>

				{/* Visualizer */}
				<div className="w-full md:w-[360px] bg-white rounded-3xl p-6 border border-[#c8d8cc] flex flex-col items-center justify-center min-h-[400px]">
					<div className="relative w-64 h-64 flex items-center justify-center">
						{/* Ring */}
						<div
							ref={ringRef}
							className="absolute inset-0 rounded-full border-2 border-[#1a4731]/15 opacity-20"
						/>
						{/* Main circle */}
						<div
							ref={circleRef}
							className={`w-44 h-44 rounded-full flex flex-col items-center justify-center shadow-lg transition-colors duration-500 ${
								!isActive
									? "bg-slate-100 text-slate-400"
									: `${info.bg} text-white shadow-[#1a4731]/25`
							}`}
						>
							<span className="text-4xl font-mono font-extrabold tracking-tighter">
								{secondsLeft}s
							</span>
							<span className="text-base font-semibold uppercase tracking-widest mt-1 opacity-80">
								{breathState}
							</span>
						</div>
					</div>

					<div className="text-center mt-4 min-h-[60px] px-2">
						<h4 className="text-xl font-bold font-sans text-[#1a4731] transition-all duration-300">
							{info.label}
						</h4>
						<p className="text-sm text-[#5a7a63] mt-1">
							{info.labelHn}
						</p>
					</div>

					<div className="flex gap-4 mt-6">
						<button
							onClick={() => setIsActive((v) => !v)}
							className={`px-6 py-3 rounded-full font-sans font-bold flex items-center gap-2 active:scale-95 transition-all ${
								isActive
									? "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
									: "bg-[#1a4731] hover:bg-[#2d6b4f] text-white shadow-sm"
							}`}
						>
							{isActive ? (
								<>
									<Pause className="w-4 h-4" /> Pause
								</>
							) : (
								<>
									<Play className="w-4 h-4" /> Start
									Relief
								</>
							)}
						</button>
						<button
							onClick={() => {
								setIsActive(false);
								setCycles(0);
								setSecondsLeft(cfg.inhale);
								setBreathState("inhale");
							}}
							className="p-3 rounded-full hover:bg-slate-100 text-slate-500 border border-slate-200 transition-colors"
							title="Reset"
						>
							<RefreshCw className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

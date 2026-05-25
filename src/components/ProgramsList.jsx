import { useEffect, useRef, useState } from "react";
import {
	BookOpen,
	HelpCircle,
	Calendar,
	Activity,
	ChevronRight,
	FileText,
	Share2,
	ShieldAlert,
	Heart,
	Award,
	Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROGRAMS } from "../../data.js";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramsList() {
	const containerRef = useRef(null);
	const [selected, setSelected] = useState(PROGRAMS[0]);
	const [activeTab, setActiveTab] = useState("programs");
	const [surveyIndex, setSurveyIndex] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [surveyResult, setSurveyResult] = useState(null);
	const [waking, setWaking] = useState("Pranayama Deep Breathing");
	const [therapy, setTherapy] = useState(
		"Cognitive Re-mapping Shared Circle",
	);
	const [grounding, setGrounding] = useState(
		"Forest Canopy Walking Meditation",
	);
	const [evening, setEvening] = useState("Harmic Healing Sound Bath & Rest");

	useEffect(() => {
		gsap.fromTo(
			containerRef.current,
			{ y: 40, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.7,
				ease: "power3.out",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
				},
			},
		);
	}, []);

	const questions = [
		{
			q: "Do you or your loved one need larger amounts to feel peace or sleep?",
			qHn: "क्या अधिक मात्रा की आवश्यकता है?",
			scores: [0, 1, 2],
			choices: ["Rarely / No", "Sometimes", "Frequently / Yes"],
		},
		{
			q: "Have there been failed attempts to reduce or control habits?",
			qHn: "क्या नियंत्रण के प्रयास असफल रहे?",
			scores: [0, 1, 2],
			choices: ["No / Never", "Tried once or twice", "Multiple times"],
		},
		{
			q: "Does temporary stoppage spark anxiety or physical discomfort?",
			qHn: "क्या रोकने से बेचैनी होती है?",
			scores: [0, 2, 4],
			choices: ["No physical signs", "Mild strain", "Severe strain"],
		},
		{
			q: "How heavily is dependency affecting family and professional life?",
			qHn: "जीवन पर कितना प्रभाव?",
			scores: [0, 1, 3],
			choices: ["Slightly", "Periodic strain", "Severe disruption"],
		},
	];

	const handleAnswer = (score) => {
		const next = [...answers, score];
		setAnswers(next);
		if (surveyIndex < questions.length - 1)
			setSurveyIndex(surveyIndex + 1);
		else {
			const total = next.reduce((a, b) => a + b, 0);
			setSurveyResult(
				total >= 7
					? "urgent"
					: total >= 4
						? "holistic"
						: "guidance",
			);
		}
	};
	const resetSurvey = () => {
		setSurveyIndex(0);
		setAnswers([]);
		setSurveyResult(null);
	};

	const routineItems = [
		{
			time: "06:00 AM",
			label: "Biological Dawn Waking",
			value: waking,
			set: setWaking,
			note: "Oxygenation & cortisol re-balancing",
			options: [
				"Pranayama Deep Breathing",
				"Solar Sun Contemplation Walk",
				"Vitality Warm Herbal Cleanse",
			],
		},
		{
			time: "10:00 AM",
			label: "Clinical Therapeutic Focus",
			value: therapy,
			set: setTherapy,
			note: "Targeted behavior resolution",
			options: [
				"Cognitive Re-mapping Shared Circle",
				"Trauma Release EMDR Session",
				"Family Re-integration Seminar",
			],
		},
		{
			time: "03:00 PM",
			label: "Nature Grounding Activity",
			value: grounding,
			set: setGrounding,
			note: "Physical grounding & stress reduction",
			options: [
				"Forest Canopy Walking Meditation",
				"Horticulture Eco-Soil Therapy",
				"Artistic Ceramic Pottery",
			],
		},
		{
			time: "07:00 PM",
			label: "Evening Rhythm Rest",
			value: evening,
			set: setEvening,
			note: "Parasympathetic relaxation for sleep",
			options: [
				"Harmic Healing Sound Bath & Rest",
				"Silent Sunset Journal Sharing",
				"Organic Herb-restorative Tea",
			],
		},
	];

	const tabs = [
		{ id: "programs", label: "Clinical Programs", Icon: BookOpen },
		{ id: "survey", label: "Self-Assessment", Icon: HelpCircle },
		{ id: "routine", label: "Routine Builder", Icon: Calendar },
	];

	return (
		<div
			ref={containerRef}
			className="space-y-8 bg-white border border-[#c8d8cc] rounded-[40px] p-6 md:p-10 shadow-sm"
		>
			{/* Tabs */}
			<div className="flex flex-wrap justify-center border-b border-[#c8d8cc] pb-4 gap-2">
				{tabs.map(({ id, label, Icon }) => (
					<button
						key={id}
						onClick={() => setActiveTab(id)}
						className={`px-5 py-2.5 rounded-full font-sans font-bold text-sm transition-all flex items-center gap-2 ${
							activeTab === id
								? "bg-[#1a4731] text-white shadow-sm"
								: "text-[#5a7a63] hover:bg-[#f0f5f1]"
						}`}
					>
						<Icon className="w-4 h-4" />
						{label}
					</button>
				))}
			</div>

			{/* Programs Tab */}
			{activeTab === "programs" && (
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
					<div className="lg:col-span-5 space-y-2">
						<h3 className="font-sans font-extrabold text-[#1a4731] text-xl px-2 mb-4">
							Clinical Modules
						</h3>
						{PROGRAMS.map((p) => (
							<button
								key={p.id}
								onClick={() => setSelected(p)}
								className={`w-full text-left p-5 rounded-[24px] transition-all flex items-start gap-4 border ${
									selected.id === p.id
										? "bg-[#f0f5f1] border-[#1a4731]/20 shadow-sm"
										: "bg-white border-transparent hover:bg-slate-50"
								}`}
							>
								<div
									className={`p-2.5 rounded-lg flex items-center justify-center mt-1 transition-all ${selected.id === p.id ? "bg-[#1a4731] text-white" : "bg-slate-100 text-slate-500"}`}
								>
									<Activity className="w-4 h-4" />
								</div>
								<div>
									<h4 className="font-sans font-extrabold text-sm text-[#1a4731] leading-tight">
										{p.nameEn}
									</h4>
									<p className="text-xs text-[#4a7c59] font-semibold mt-1">
										{p.nameHn}
									</p>
									<div className="flex gap-3 mt-2 text-[10px] text-[#5a7a63] font-medium uppercase tracking-wider">
										<span>{p.duration}</span>
										<span>•</span>
										<span>{p.focus}</span>
									</div>
								</div>
							</button>
						))}
					</div>

					<div className="lg:col-span-7 bg-[#f0f5f1] border border-[#c8d8cc] rounded-[32px] p-6 md:p-8 flex flex-col justify-between">
						<div className="text-left">
							<span className="inline-block px-3 py-1 bg-[#d4ead9] text-[#4a7c59] font-sans text-xs font-bold rounded-full mb-3">
								{selected.focus}
							</span>
							<h3 className="font-sans font-extrabold text-2xl text-[#1a4731] leading-snug">
								{selected.nameEn}
							</h3>
							<h4 className="font-sans font-bold text-lg text-[#4a7c59] mt-1">
								{selected.nameHn}
							</h4>
							<div className="w-full h-[2px] bg-[#c8d8cc] my-5" />
							<p className="text-sm text-[#5a7a63] mb-6 leading-relaxed">
								{selected.descriptionEn}
								<span className="block italic text-[#4a7c59] font-medium mt-2">
									{selected.descriptionHn}
								</span>
							</p>
							<h4 className="font-sans font-extrabold text-xs text-[#1a4731] uppercase tracking-widest mb-4">
								Milestones ({selected.duration})
							</h4>
							<div className="space-y-3">
								{selected.steps.map((s, i) => (
									<div
										key={i}
										className="flex gap-3 items-start"
									>
										<div className="w-5 h-5 rounded-full bg-[#1a4731] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
											{i + 1}
										</div>
										<span className="text-xs text-[#5a7a63] font-medium leading-relaxed">
											{s}
										</span>
									</div>
								))}
							</div>
						</div>
						<div className="mt-8 pt-6 border-t border-[#c8d8cc] flex flex-col sm:flex-row items-center justify-between gap-4">
							<div className="flex gap-2 items-center">
								<div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
								<span className="text-xs text-[#5a7a63] font-bold">
									Active Intake Open
								</span>
							</div>
							<button
								onClick={() => {
									const el =
										document.getElementById(
											"admission-section",
										);
									if (el)
										el.scrollIntoView({
											behavior: "smooth",
										});
								}}
								className="px-6 py-2.5 bg-[#1a4731] hover:bg-[#2d6b4f] text-white text-xs font-sans font-bold rounded-full shadow-sm flex items-center gap-2 transition-all active:scale-95"
							>
								Request Enrollment{" "}
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Survey Tab */}
			{activeTab === "survey" && (
				<div className="max-w-2xl mx-auto pt-4">
					{!surveyResult ? (
						<div className="space-y-6">
							<div className="text-center">
								<span className="text-xs font-sans font-extrabold text-[#4a7c59] bg-[#d4ead9]/50 px-3 py-1 rounded-full uppercase tracking-widest">
									Step {surveyIndex + 1} of{" "}
									{questions.length}
								</span>
								<h3 className="font-sans font-extrabold text-2xl text-[#1a4731] mt-3 leading-snug">
									{questions[surveyIndex].q}
								</h3>
								<p className="font-sans font-semibold text-base text-[#4a7c59] mt-1">
									{questions[surveyIndex].qHn}
								</p>
							</div>
							<div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
								<div
									className="bg-[#1a4731] h-full transition-all duration-300"
									style={{
										width: `${((surveyIndex + 1) / questions.length) * 100}%`,
									}}
								/>
							</div>
							<div className="space-y-3 pt-4">
								{questions[surveyIndex].choices.map(
									(c, i) => (
										<button
											key={i}
											onClick={() =>
												handleAnswer(
													questions[
														surveyIndex
													].scores[i],
												)
											}
											className="w-full bg-slate-50 hover:bg-[#f0f5f1] border border-slate-200/60 hover:border-[#1a4731]/30 text-left p-5 rounded-2xl font-sans text-sm font-bold text-[#1a4731] transition-all flex items-center justify-between active:scale-[0.99]"
										>
											<span>{c}</span>
											<ChevronRight className="w-4 h-4 opacity-50" />
										</button>
									),
								)}
							</div>
							<p className="text-center text-xs text-slate-400">
								⚠️ Fully anonymous. Not a professional
								clinical assessment.
							</p>
						</div>
					) : (
						<div className="bg-[#f0f5f1] border border-[#c8d8cc] rounded-[32px] p-8 text-center space-y-6">
							<div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
								{surveyResult === "urgent" && (
									<ShieldAlert className="w-8 h-8 text-rose-600" />
								)}
								{surveyResult === "holistic" && (
									<Heart className="w-8 h-8 text-emerald-600" />
								)}
								{surveyResult === "guidance" && (
									<Award className="w-8 h-8 text-[#1a4731]" />
								)}
							</div>
							<h3
								className={`font-sans font-extrabold text-3xl ${surveyResult === "urgent" ? "text-rose-950" : surveyResult === "holistic" ? "text-emerald-950" : "text-[#1a4731]"}`}
							>
								{surveyResult === "urgent"
									? "Intervention Recommended"
									: surveyResult === "holistic"
										? "Holistic Reset Encouraged"
										: "Supportive Wellness Match"}
							</h3>
							<p className="text-sm text-slate-700 leading-relaxed max-w-lg mx-auto">
								{surveyResult === "urgent"
									? "Significant physiological signs matched clinical parameters. We strongly recommend speaking with an expert immediately."
									: surveyResult === "holistic"
										? "Moderate patterns indicate starting supportive therapy and routine alignments."
										: "Healthy baseline. A prevention consultation will help sustain positive rhythms."}
							</p>
							<div className="flex gap-3 justify-center pt-4 flex-wrap">
								<button
									onClick={resetSurvey}
									className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-sans font-bold rounded-full transition-colors"
								>
									Take Again
								</button>
								<button
									onClick={() => {
										const el =
											document.getElementById(
												"admission-section",
											);
										if (el)
											el.scrollIntoView({
												behavior: "smooth",
											});
									}}
									className="px-6 py-2.5 bg-[#1a4731] hover:bg-[#2d6b4f] text-white text-xs font-sans font-bold rounded-full shadow-sm"
								>
									Request Consultation
								</button>
							</div>
						</div>
					)}
				</div>
			)}

			{/* Routine Tab */}
			{activeTab === "routine" && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 text-left">
					<div className="space-y-5 bg-slate-50 p-6 rounded-3xl border border-slate-100">
						<div className="flex items-center gap-2">
							<Sparkles className="w-5 h-5 text-amber-500" />
							<h4 className="font-sans font-bold text-sm text-[#1a4731] uppercase tracking-wider">
								Select Daily Healing Blocks
							</h4>
						</div>
						{routineItems.map((item) => (
							<div key={item.time} className="space-y-1.5">
								<label className="block text-xs font-bold text-slate-600">
									{item.time} — {item.label}
								</label>
								<select
									value={item.value}
									onChange={(e) =>
										item.set(e.target.value)
									}
									className="w-full bg-white border border-[#c8d8cc] rounded-xl p-3 text-xs font-medium text-[#1a4731] outline-none focus:ring-2 focus:ring-[#1a4731]"
								>
									{item.options.map((o) => (
										<option key={o}>{o}</option>
									))}
								</select>
							</div>
						))}
					</div>

					<div className="bg-[#1a4731] text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg">
						<div className="space-y-6">
							<div>
								<span className="text-[10px] uppercase font-sans tracking-widest font-bold text-white/60">
									Tailored Healing Itinerary
								</span>
								<h4 className="font-sans font-extrabold text-2xl mt-1">
									Your Restoration Schedule
								</h4>
							</div>
							<div className="w-full h-[1px] bg-white/10" />
							<div className="space-y-4 text-xs font-sans">
								{routineItems.map((item) => (
									<div
										key={item.time}
										className="flex gap-4 items-start"
									>
										<span className="font-mono text-white/70 font-extrabold bg-white/10 px-2 py-1 rounded w-16 text-center shrink-0 text-[9px]">
											{item.time}
										</span>
										<div>
											<span className="block font-bold text-white">
												{item.value}
											</span>
											<span className="block text-[10px] text-white/55 mt-0.5">
												{item.note}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="mt-8 pt-4 border-t border-white/10 flex gap-2">
							<button
								onClick={() =>
									alert(
										"Routine saved! Our consultant will help lock in dates.",
									)
								}
								className="flex-1 bg-white hover:bg-slate-100 text-[#1a4731] p-3 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
							>
								<FileText className="w-4 h-4" /> Lock
								Routine Calendar
							</button>
							<button
								onClick={() => alert("Link copied!")}
								className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-colors"
							>
								<Share2 className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

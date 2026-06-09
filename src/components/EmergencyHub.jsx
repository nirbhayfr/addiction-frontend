import { useEffect, useRef, useState } from "react";
import {
	AlertCircle,
	Smartphone,
	UserCheck,
	MessageCircle,
	ShieldCheck,
	RefreshCw,
	Send,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopingBreathing from "./CopingBreathing.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function EmergencyHub() {
	const sectionRef = useRef(null);
	const [messages, setMessages] = useState([
		{
			id: "1",
			sender: "counselor",
			text: "Om Shanti. I am Rahul, on-duty clinical counselor under ASHA. You are in a safe, non-judgmental space. Tell me what is happening with you or your loved one?",
			timestamp: "Just now",
		},
	]);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const scrollRef = useRef(null);

	// useEffect(() => {
	//   gsap.fromTo(sectionRef.current, { y: 30, opacity: 0 }, {
	//     y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
	//     scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
	//   });
	// }, []);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (!input.trim()) return;
		const msg = {
			id: Date.now().toString(),
			sender: "user",
			text: input,
			timestamp: "Just now",
		};
		setMessages((p) => [...p, msg]);
		setInput("");
		setIsTyping(true);
		const lower = input.toLowerCase();
		setTimeout(() => {
			let reply =
				"We hear you. Please hold physical safety first. Let's take a deep breath together. Would you like a callback to your phone?";
			if (lower.match(/craving|alcohol|drug|smoke/))
				reply =
					"An acute chemical craving lasts 15–20 minutes before neural receptors calm. Try our breathing guide in the panel. You can do this.";
			else if (lower.match(/scared|anxious|panic|fear/))
				reply =
					"You are physically safe. Anxiety is a transient spike. Try the 4-4-4 box breathing — it works in 3 minutes. I'm right here with you.";
			else if (lower.match(/suicide|kill|die|emergency/))
				reply =
					"Please remain where you are. Call us directly at +91 1800-ASHA-HELP or dial 112 for instant responders. We care deeply about your life.";
			else if (lower.match(/cost|free|price/))
				reply =
					"All helpline consultation and initial assessments are 100% free. Your recovery is our priority.";
			setMessages((p) => [
				...p,
				{
					id: (Date.now() + 1).toString(),
					sender: "counselor",
					text: reply,
					timestamp: "Just now",
				},
			]);
			setIsTyping(false);
		}, 1500);
	};

	return (
		<div ref={sectionRef} className="space-y-12">
			{/* Crisis banner */}
			<div className="bg-rose-50 border border-rose-200 p-6 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6">
				<div className="flex gap-4 items-start text-left">
					<div className="p-3 bg-rose-600 text-white rounded-full flex items-center justify-center animate-pulse">
						<AlertCircle className="w-6 h-6" />
					</div>
					<div>
						<h3 className="font-sans font-extrabold text-xl text-rose-950">
							Crisis & De-escalation Hub
						</h3>
						<p className="text-base text-rose-900 mt-1 max-w-xl leading-relaxed">
							If someone is in acute distress or medical
							withdrawal shock, remain calm. We provide
							direct guidance, breathing stabilizers, and a
							fully private chat desk.
						</p>
					</div>
				</div>
				<div className="flex gap-3 shrink-0 flex-wrap">
					<a
						href="tel:1800ASHAHELP"
						className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-sans font-bold text-sm rounded-full shadow-md flex items-center gap-2 active:scale-95 transition-all"
					>
						<Smartphone className="w-4 h-4" /> Call Hotline
					</a>
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
						className="px-6 py-3 bg-white hover:bg-rose-100 text-rose-900 border border-rose-200 font-sans font-bold text-sm rounded-full transition-all"
					>
						Request Urgent Callback
					</button>
				</div>
			</div>

			{/* Breathing widget */}
			<CopingBreathing />

			{/* Status + Chat */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
				{/* Status panel */}
				<div className="lg:col-span-4 bg-white border border-[#c8d8cc] rounded-[40px] p-6 space-y-6">
					<div className="flex justify-between items-center border-b border-[#c8d8cc] pb-3">
						<h4 className="font-sans font-extrabold text-sm text-[#1a4731] uppercase">
							On-Duty Center Status
						</h4>
						<div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold">
							<span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
							<span>LIVE</span>
						</div>
					</div>
					<div className="space-y-3">
						{[
							{
								Icon: UserCheck,
								label: "Emergency Doctors",
								val: "2 Online",
							},
							{
								Icon: MessageCircle,
								label: "Counselors Active",
								val: "4 Live",
							},
							{
								Icon: ShieldCheck,
								label: "Confidentiality",
								val: "100% Encrypted",
							},
						].map(({ Icon, label, val }) => (
							<div
								key={label}
								className="flex items-center justify-between p-3 bg-[#f0f5f1] rounded-2xl"
							>
								<div className="flex gap-3 items-center">
									<Icon className="w-5 h-5 text-[#1a4731]" />
									<span className="text-base font-bold text-[#1a4731]">
										{label}
									</span>
								</div>
								<span className="text-base font-mono font-extrabold text-[#4a7c59] bg-white px-2 py-1 rounded">
									{val}
								</span>
							</div>
						))}
					</div>
					<div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
						<h5 className="font-sans font-bold text-base text-[#1a4731] mb-2">
							Biological Grounding Steps
						</h5>
						<p className="text-[11px] text-slate-500 leading-relaxed">
							1. Splash cold tap water on your closed
							eyelids (triggers parasympathetic
							de-escalation).
							<br />
							2. Firmly press your bare soles on the floor.
							<br />
							3. Trace 5 green objects in your sight line.
						</p>
					</div>
				</div>

				{/* Chat window */}
				<div className="lg:col-span-8 bg-white border border-[#c8d8cc] rounded-[40px] p-6 md:p-8 flex flex-col h-[480px]">
					<div className="flex justify-between items-center border-b border-[#c8d8cc] pb-3 mb-4">
						<div className="flex gap-3 items-center">
							<div className="w-9 h-9 rounded-full bg-[#1a4731] text-white flex items-center justify-center font-extrabold text-sm">
								RC
							</div>
							<div>
								<h5 className="font-sans font-extrabold text-[#1a4731] text-sm">
									De-escalation Companion Room
								</h5>
								<p className="text-[10px] text-slate-400 font-bold">
									Counselor: Rahul Chandra •
									Psychiatric Certified
								</p>
							</div>
						</div>
						<button
							onClick={() =>
								setMessages([
									{
										id: "0",
										sender: "counselor",
										text: "Om Shanti. I am here. Tell me what you are experiencing right now.",
										timestamp: "Just now",
									},
								])
							}
							className="p-2 text-slate-400 hover:text-[#1a4731] hover:bg-slate-50 rounded-full transition-colors outline-none"
							title="Reset Chat"
						>
							<RefreshCw className="w-4 h-4" />
						</button>
					</div>

					<div className="flex-1 overflow-y-auto py-2 space-y-4 px-1 scrollbar-none text-base">
						{messages.map((m) => (
							<div
								key={m.id}
								className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`p-4 rounded-3xl max-w-[85%] text-left text-base leading-relaxed ${
										m.sender === "user"
											? "bg-[#1a4731] text-white rounded-tr-none"
											: "bg-slate-100 text-[#1a4731] rounded-tl-none font-medium"
									}`}
								>
									<p>{m.text}</p>
									<span className="block text-[8px] opacity-55 text-right mt-1.5 font-mono">
										{m.timestamp}
									</span>
								</div>
							</div>
						))}
						{isTyping && (
							<div className="flex justify-start">
								<div className="p-3 bg-slate-100 rounded-3xl rounded-tl-none flex items-center gap-1.5">
									{[0, 150, 300].map((d) => (
										<span
											key={d}
											className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
											style={{
												animationDelay: `${d}ms`,
											}}
										/>
									))}
								</div>
							</div>
						)}
						<div ref={scrollRef} />
					</div>

					<form
						onSubmit={sendMessage}
						className="flex gap-2 pt-3 border-t border-[#c8d8cc] mt-2"
					>
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Type your feelings (panic, craving, question)..."
							className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-base font-semibold text-[#1a4731] focus:ring-2 focus:ring-[#1a4731] outline-none transition-all"
						/>
						<button
							type="submit"
							className="bg-[#1a4731] hover:bg-[#2d6b4f] text-white px-5 rounded-xl text-base font-sans font-bold flex items-center gap-1.5 active:scale-95 transition-all"
						>
							<Send className="w-4 h-4" /> Send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

import { useEffect, useRef, useState } from "react";
import {
	Heart,
	Bookmark,
	Quote,
	MessageCircle,
	Send,
	Check,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORIES } from "../../data";

gsap.registerPlugin(ScrollTrigger);

export default function SuccessTimelines() {
	const sectionRef = useRef(null);

	const [selected, setSelected] = useState(STORIES[0]);

	const [likes, setLikes] = useState({
		1: 48,
		2: 54,
	});

	const [liked, setLiked] = useState({});

	const [letters, setLetters] = useState([
		{
			id: 1,
			text: "आप एक नई और बेहतर ज़िंदगी के योग्य हैं। हर दिन खुद पर विश्वास बनाए रखें।",
			author: "एक माँ",
			date: "अभी",
		},
		{
			id: 2,
			text: "अंधेरा हमेशा सूरज निकलने से पहले सबसे शांत होता है। उम्मीद मत छोड़िए।",
			author: "आभारी पिता",
			date: "2 घंटे पहले",
		},
		{
			id: 3,
			text: "नशा छोड़ने के बाद मेरी ज़िंदगी में फिर से खुशी लौट आई। आज 4 साल पूरे हुए।",
			author: "रोहन",
			date: "1 दिन पहले",
		},
	]);

	const [newText, setNewText] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		gsap.fromTo(
			sectionRef.current,
			{
				y: 40,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.7,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
				},
			},
		);
	}, []);

	const handleLike = (id) => {
		setLiked((l) => ({
			...l,
			[id]: !l[id],
		}));

		setLikes((l) => ({
			...l,
			[id]: l[id] + (liked[id] ? -1 : 1),
		}));
	};

	const handleLetter = (e) => {
		e.preventDefault();

		if (!newText.trim()) return;

		const newLetter = {
			id: Date.now(),
			text: newText,
			author: newAuthor.trim() || "एक शुभचिंतक",
			date: "अभी",
		};

		setLetters([newLetter, ...letters]);

		setNewText("");
		setNewAuthor("");

		setSuccess(true);

		setTimeout(() => setSuccess(false), 3000);
	};

	return (
		<div ref={sectionRef} className="space-y-12 p-8">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
				{/* LEFT */}
				<div className="lg:col-span-4 space-y-4">
					<div className="flex items-center gap-2 px-1">
						<Heart className="w-5 h-5 text-[#4a7c59] fill-[#4a7c59]" />

						<h3 className="font-sans font-extrabold text-[#1a4731] text-lg">
							उम्मीद की प्रेरणादायक कहानियाँ
						</h3>
					</div>

					{STORIES.map((story) => (
						<button
							key={story.id}
							onClick={() => setSelected(story)}
							className={`w-full text-left p-5 rounded-[28px] transition-all border ${
								selected.id === story.id
									? "bg-[#d4ead9]/40 border-[#4a7c59] shadow-sm"
									: "bg-white border-[#c8d8cc] hover:bg-[#f0f5f1]"
							}`}
						>
							<div className="flex justify-between items-start">
								<div>
									<h4 className="font-sans font-extrabold text-[#1a4731] text-base">
										{story.name}
									</h4>

									<p className="text-base text-[#5a7a63] font-medium mt-0.5">
										{story.age} वर्ष •{" "}
										{story.recoverySpan}
									</p>
								</div>

								<Bookmark
									className={`w-4 h-4 ${
										selected.id === story.id
											? "text-[#4a7c59] fill-[#4a7c59]"
											: "text-slate-300"
									}`}
								/>
							</div>

							<p className="text-base text-slate-600 mt-3 line-clamp-2 italic leading-relaxed">
								{story.quoteHn}
							</p>
						</button>
					))}

					<div className="bg-[#1a4731] text-white p-6 rounded-[32px] space-y-3">
						<h4 className="font-sans font-bold text-sm text-white/80">
							हर कहानी देती है नई उम्मीद
						</h4>

						<p className="text-base text-white/70 leading-relaxed">
							हर रिकवरी की कहानी यह साबित करती है कि नशे से
							बाहर निकलना संभव है। सही सहयोग और मार्गदर्शन
							जीवन बदल सकता है।
						</p>
					</div>
				</div>

				{/* RIGHT */}
				<div className="lg:col-span-8 bg-white border border-[#c8d8cc] rounded-[40px] p-6 md:p-8 space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c8d8cc] pb-4">
						<div>
							<span className="text-[10px] uppercase font-sans tracking-widest font-bold text-[#4a7c59] bg-[#d4ead9] px-2.5 py-1 rounded">
								रिकवरी यात्रा
							</span>

							<h3 className="font-sans font-extrabold text-2xl text-[#1a4731] mt-1.5">
								{selected.name} की रिकवरी यात्रा
							</h3>
						</div>

						<button
							onClick={() => handleLike(selected.id)}
							className={`px-5 py-2 rounded-full font-sans font-bold text-base flex items-center gap-2 self-start transition-all ${
								liked[selected.id]
									? "bg-rose-50 text-rose-600 border border-rose-200"
									: "bg-slate-100 text-slate-600 hover:bg-slate-200"
							}`}
						>
							<Heart
								className={`w-4 h-4 ${
									liked[selected.id]
										? "fill-rose-500 text-rose-500"
										: ""
								}`}
							/>
							प्रेरणादायक ({likes[selected.id]})
						</button>
					</div>

					<div className="bg-[#f0f5f1] p-6 rounded-[24px] space-y-3">
						<Quote className="w-8 h-8 text-[#1a4731] opacity-20" />

						<p className="text-[#1a4731] font-bold text-sm md:text-base leading-relaxed">
							{selected.quoteHn}
						</p>

						<div className="w-full h-[1px] bg-[#c8d8cc] my-2" />

						<p className="text-slate-600 text-base leading-relaxed">
							{selected.summaryHn || selected.summaryEn}
						</p>
					</div>

					<h4 className="font-sans font-extrabold text-base text-[#1a4731] uppercase">
						रिकवरी के महत्वपूर्ण चरण
					</h4>

					<div className="relative border-l-2 border-[#c8d8cc] ml-4 pl-6 space-y-8 py-2">
						{selected.milestones.map((ms, idx) => (
							<div key={idx} className="relative">
								<div className="absolute -left-[35px] top-0.5 w-6 h-6 bg-[#1a4731] text-white rounded-full flex items-center justify-center shadow-sm">
									<Check className="w-3.5 h-3.5" />
								</div>

								<h5 className="font-sans font-extrabold text-sm text-[#1a4731]">
									{ms.title}
								</h5>

								<p className="text-base text-[#5a7a63] font-medium mt-1 leading-relaxed">
									{ms.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* LETTERS */}
			<div className="bg-[#f0f5f1] border border-[#c8d8cc] rounded-[40px] p-6 md:p-10 text-left">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<div className="lg:col-span-5 space-y-4">
						<div className="p-2 bg-[#d4ead9] text-[#4a7c59] rounded-xl w-fit">
							<MessageCircle className="w-5 h-5" />
						</div>

						<h3 className="font-sans font-extrabold text-2xl text-[#1a4731] leading-tight">
							उम्मीद भरा संदेश लिखें
						</h3>

						<p className="text-base text-[#5a7a63] leading-relaxed">
							रिकवरी से गुजर रहे लोगों के लिए अपना
							प्रेरणादायक संदेश साझा करें।
						</p>

						<form
							onSubmit={handleLetter}
							className="space-y-3 pt-2"
						>
							<textarea
								value={newText}
								onChange={(e) =>
									setNewText(e.target.value)
								}
								placeholder="अपना प्रेरणादायक संदेश लिखें..."
								maxLength={200}
								required
								className="w-full bg-white border border-[#c8d8cc] rounded-xl p-4 text-base font-medium text-[#1a4731] focus:ring-2 focus:ring-[#1a4731] resize-none h-24 outline-none transition-all"
							/>

							<div className="flex gap-2">
								<input
									type="text"
									value={newAuthor}
									onChange={(e) =>
										setNewAuthor(e.target.value)
									}
									placeholder="आपका नाम (या 'एक शुभचिंतक')"
									className="flex-1 bg-white border border-[#c8d8cc] rounded-xl px-3 py-2 text-base font-medium text-[#1a4731] focus:ring-2 focus:ring-[#1a4731] outline-none transition-all"
								/>

								<button
									type="submit"
									className="bg-[#1a4731] hover:bg-[#2d6b4f] text-white px-5 rounded-xl text-base font-sans font-bold flex items-center gap-1 active:scale-95 transition-all"
								>
									<Send className="w-3.5 h-3.5" />
									भेजें
								</button>
							</div>
						</form>

						{success && (
							<div className="p-3 bg-emerald-50 text-emerald-800 border-l-4 border-emerald-500 rounded-r-xl text-base font-bold flex items-center gap-2">
								<Check className="w-4 h-4" />
								आपका संदेश सफलतापूर्वक साझा किया गया।
							</div>
						)}
					</div>

					<div className="lg:col-span-7 space-y-4">
						<h4 className="font-sans font-extrabold text-base text-[#1a4731] uppercase tracking-widest px-1">
							प्रेरणादायक संदेश ({letters.length})
						</h4>

						<div className="space-y-3 max-h-[340px] overflow-y-auto pr-2">
							{letters.map((l) => (
								<div
									key={l.id}
									className="bg-white border border-[#c8d8cc]/60 p-4 rounded-2xl shadow-sm relative overflow-hidden"
								>
									<Quote className="absolute -top-1 -right-1 w-6 h-6 text-slate-100 opacity-50 rotate-180" />

									<p className="text-base text-[#1c2e24] leading-relaxed italic">
										"{l.text}"
									</p>

									<div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-50 text-[10px] font-bold">
										<span className="text-[#4a7c59]">
											{l.author}
										</span>

										<span className="text-slate-400">
											{l.date}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

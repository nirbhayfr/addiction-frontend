import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Star, ShieldCheck, MessageCircle, Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
	{
		id: 1,
		name: "रमेश कुमार",
		age: 36,
		location: "दिल्ली",
		category: "alcohol",
		recovery: "2 वर्ष नशामुक्त",
		image: "https://plus.unsplash.com/premium_photo-1689838026921-c09632fd77ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW5kaWFuJTIwd29ya2VycyUyMHBvdHJhaXR8ZW58MHx8MHx8fDA%3D",
		quote: "आशा केंद्र ने मुझे दोबारा जीना सिखाया। आज मैं अपने परिवार के साथ खुशहाल जीवन जी रहा हूँ।",
		story: "शराब की लत ने मेरा परिवार और काम दोनों छीन लिया था। यहाँ डॉक्टरों और थेरेपी टीम ने मुझे मानसिक और शारीरिक रूप से मजबूत बनाया। योग, ध्यान और नियमित परामर्श ने मेरी जिंदगी बदल दी।",
		likes: 122,
	},
	{
		id: 2,
		name: "पूजा शर्मा",
		age: 29,
		location: "जयपुर",
		category: "nicotine",
		recovery: "1 वर्ष धूम्रपान मुक्त",
		image: "https://plus.unsplash.com/premium_photo-1682145330467-ef7708e13f17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGluZGlhbiUyMHdvcmtlcnMlMjBwb3RyYWl0fGVufDB8fDB8fHww",
		quote: "मैंने कभी नहीं सोचा था कि मैं सिगरेट छोड़ पाऊँगी। अब मैं पूरी तरह स्वस्थ हूँ।",
		story: "तनाव और चिंता के कारण मुझे धूम्रपान की आदत लग गई थी। आशा के काउंसलिंग और थेरेपी सत्रों ने मुझे मानसिक शांति दी।",
		likes: 94,
	},
	{
		id: 3,
		name: "विक्रम सिंह",
		age: 32,
		location: "मुंबई",
		category: "substance",
		recovery: "3 वर्ष नशामुक्त",
		image: "https://images.unsplash.com/photo-1688308406213-f351dd3e51c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMHdvcmtlcnMlMjBwb3RyYWl0fGVufDB8fDB8fHww",
		quote: "यह सिर्फ इलाज नहीं था, यह मेरे जीवन की नई शुरुआत थी।",
		story: "मैं कई सालों तक गलत संगति और नशे में फँसा रहा। यहाँ परिवार जैसा माहौल मिला। अब मैं अपना व्यवसाय चला रहा हूँ।",
		likes: 140,
	},
];

export default function TestimonialsSection() {
	const sectionRef = useRef(null);
	const cardsRef = useRef([]);
	const [expanded, setExpanded] = useState(null);
	const [liked, setLiked] = useState({});

	const handleLike = (id) => {
		setLiked((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	return (
		<section
			ref={sectionRef}
			className="py-20 bg-[#f6f8f7] overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4">
				{/* Heading */}
				<div className="testimonial-heading text-center max-w-3xl mx-auto mb-14">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-5">
						<MessageCircle className="w-4 h-4" />
						हमारे मरीजों के अनुभव
					</div>

					<h2 className="text-4xl md:text-5xl font-black text-[#004349] leading-tight">
						नई जिंदगी की सच्ची कहानियाँ
					</h2>

					<p className="mt-5 text-slate-600 leading-relaxed text-sm md:text-base">
						हजारों परिवारों ने आशा के साथ अपने प्रियजनों को
						नशामुक्त और स्वस्थ जीवन की ओर लौटते देखा है।
					</p>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
					{testimonialsData.map((item, index) => {
						const isExpanded = expanded === item.id;

						return (
							<div
								key={item.id}
								ref={(el) =>
									(cardsRef.current[index] = el)
								}
								className="bg-white rounded-[28px] p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
							>
								{/* Top */}
								<div className="flex items-start justify-between gap-3">
									<div className="flex items-center gap-3">
										<img
											src={item.image}
											alt={item.name}
											className="w-14 h-14 rounded-full object-cover"
										/>

										<div>
											<h3 className="font-black text-[#004349]">
												{item.name}
											</h3>

											<p className="text-xs text-slate-500">
												{item.age} वर्ष •{" "}
												{item.location}
											</p>
										</div>
									</div>

									<div className="flex flex-col items-end">
										<div className="flex text-yellow-500">
											{[...Array(5)].map(
												(_, i) => (
													<Star
														key={i}
														className="w-3.5 h-3.5 fill-yellow-500"
													/>
												),
											)}
										</div>

										<div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 mt-1">
											<ShieldCheck className="w-3 h-3" />
											सत्यापित
										</div>
									</div>
								</div>

								{/* Badge */}
								<div className="mt-5">
									<span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
										{item.recovery}
									</span>
								</div>

								{/* Quote */}
								<p className="mt-5 text-[#004349] font-bold leading-relaxed">
									“{item.quote}”
								</p>

								{/* Expanded Story */}
								{isExpanded && (
									<div className="mt-5 pt-5 border-t border-slate-100">
										<p className="text-sm text-slate-600 leading-relaxed">
											{item.story}
										</p>
									</div>
								)}

								{/* Footer */}
								<div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
									<button
										onClick={() =>
											setExpanded(
												isExpanded
													? null
													: item.id,
											)
										}
										className="text-xs font-bold text-[#004349] hover:underline cursor-pointer"
									>
										{isExpanded
											? "कम पढ़ें"
											: "पूरी कहानी पढ़ें"}
									</button>

									<button
										onClick={() =>
											handleLike(item.id)
										}
										className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
											liked[item.id]
												? "bg-rose-50 text-rose-600 border-rose-200"
												: "bg-slate-50 text-slate-600 border-slate-200"
										}`}
									>
										<Heart
											className={`w-3.5 h-3.5 ${
												liked[item.id]
													? "fill-rose-500 text-rose-500"
													: ""
											}`}
										/>

										{liked[item.id]
											? item.likes + 1
											: item.likes}
									</button>
								</div>
							</div>
						);
					})}
				</div>

				{/* Bottom CTA */}
				<div className="mt-16 text-center">
					<button className="inline-flex items-center gap-2 bg-[#004349] hover:bg-[#06545b] text-white px-7 py-4 rounded-full font-bold text-sm transition-all">
						<Plus className="w-4 h-4" />
						अपनी कहानी साझा करें
					</button>
				</div>
			</div>
		</section>
	);
}

import { useEffect, useRef } from "react";
import { Phone, MessageCircle, Users2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTABand({ onTabChange }) {
	const ref = useRef(null);

	useEffect(() => {
		gsap.fromTo(
			ref.current,
			{ scale: 0.97, opacity: 0 },
			{
				scale: 1,
				opacity: 1,
				duration: 0.7,
				ease: "power3.out",
				scrollTrigger: { trigger: ref.current, start: "top 82%" },
			},
		);
	}, []);

	return (
		<section className="py-16 bg-[#f7f9f7]">
			<div className=" mx-auto px-6">
				<div
					ref={ref}
					className="bg-[#1a4731] rounded-[40px] p-8 md:p-14 text-center relative overflow-hidden shadow-xl"
				>
					<div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
					<div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#4a7c59]/20 rounded-full blur-2xl pointer-events-none" />

					<div className="relative z-10 space-y-6">
						<div className="flex items-center justify-center">
							<div className="p-3 bg-white/10 text-white rounded-full">
								<Users2 className="w-8 h-8" />
							</div>
						</div>

						<h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white max-w-3xl mx-auto leading-snug">
							"मदद लेने का सबसे अच्छा समय कल था। दूसरा सबसे
							अच्छा समय अभी है।"
						</h2>

						<p className="text-white/75 text-lg md:text-xl font-sans italic">
							"मदद मांगने का दूसरा सबसे अच्छा समय अभी है।"
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
							<a
								href="tel:7982217125"
								className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#1a4731] hover:bg-slate-50 rounded-full font-sans font-extrabold text-sm inline-flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
							>
								<Phone className="w-4 h-4 fill-[#1a4731]" />
								<span>अभी निःशुल्क कॉल करें</span>
							</a>

							<span className="text-xs text-white/40 font-bold hidden sm:block">
								या
							</span>

							<a
								href={`https://api.whatsapp.com/send?phone=7982217125&text=मुझे अपॉइंटमेंट बुक करना है`}
								onClick={() => onTabChange("crisis")}
								className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-full font-sans font-extrabold text-sm inline-flex items-center justify-center gap-2 transition-all"
							>
								<MessageCircle className="w-4 h-4" />
								<span>काउंसलर से चैट करें</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

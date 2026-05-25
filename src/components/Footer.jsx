"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin, Phone, Mail, HeartHandshake } from "lucide-react";

export default function Footer() {
	const footerRef = useRef(null);
	const headingRef = useRef(null);
	const descRef = useRef(null);
	const columnsRef = useRef([]);
	const socialRef = useRef([]);
	const bottomRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(headingRef.current, {
				opacity: 0,
				y: 40,
				duration: 1,
				ease: "power3.out",
			});

			gsap.from(descRef.current, {
				opacity: 0,
				y: 30,
				duration: 1,
				delay: 0.2,
			});

			gsap.from(columnsRef.current, {
				opacity: 0,
				y: 50,
				stagger: 0.2,
				duration: 1,
				delay: 0.4,
			});

			gsap.from(socialRef.current, {
				opacity: 0,
				scale: 0,
				stagger: 0.1,
				duration: 0.5,
				delay: 0.8,
			});

			gsap.from(bottomRef.current, {
				opacity: 0,
				y: 20,
				duration: 1,
				delay: 1,
			});
		}, footerRef);

		return () => ctx.revert();
	}, []);

	return (
		<footer
			ref={footerRef}
			className="relative overflow-hidden bg-brand-surface dark:bg-slate-950 border-t border-brand-dim/20"
		>
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/10 blur-3xl rounded-full" />
				<div className="absolute bottom-[-150px] right-[-100px] w-[300px] h-[300px] bg-brand-secondary/10 blur-3xl rounded-full" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-16 border-b border-brand-dim/20">
					<div className="lg:col-span-2">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
								<HeartHandshake className="w-7 h-7 text-brand-primary" />
							</div>

							<div>
								<h2
									ref={headingRef}
									className="text-3xl font-black tracking-wide text-brand-primary dark:text-white"
								>
									ADDICTION MUKTI
								</h2>

								<p className="text-xs uppercase text-brand-secondary font-bold mt-1">
									नशा मुक्ति एवं कल्याण केंद्र
								</p>
							</div>
						</div>

						<p
							ref={descRef}
							className="max-w-xl text-sm leading-8 text-brand-on-surface-variant dark:text-slate-400"
						>
							यह एक सुरक्षित स्थान है जहाँ पुनर्प्राप्ति,
							उपचार और मानसिक स्वास्थ्य पर ध्यान दिया जाता
							है। हम परामर्श और निरंतर समर्थन प्रदान करते
							हैं।
						</p>

						<p className="mt-4 text-sm leading-8 font-semibold text-brand-secondary">
							हम जीवन को फिर से स्वस्थ और संतुलित बनाने में
							सहायता करते हैं।
						</p>

						<div className="flex items-center gap-4 mt-8">
							{["A", "I", "Y"].map((label, index) => (
								<a
									key={index}
									ref={(el) =>
										(socialRef.current[index] =
											el)
									}
									href="#"
									className="w-11 h-11 rounded-xl border border-brand-primary/20 bg-white dark:bg-slate-900 flex items-center justify-center text-brand-primary font-bold"
								>
									{label}
								</a>
							))}
						</div>
					</div>

					<div>
						<h3 className="text-lg font-bold mb-6 text-brand-primary dark:text-white">
							संपर्क
						</h3>

						<div className="space-y-5 text-sm">
							<div className="flex items-start gap-3">
								<MapPin className="w-5 h-5 mt-0.5 text-brand-primary" />
								<p className="text-brand-on-surface-variant dark:text-slate-400">
									नई दिल्ली, भारत
									<br />
									24/7 सहायता उपलब्ध
								</p>
							</div>

							<a
								href="tel:+919999999999"
								className="flex items-center gap-3 text-brand-on-surface-variant dark:text-slate-400"
							>
								<Phone className="w-5 h-5 text-brand-primary" />
								+91 8700428833
							</a>

							<a
								href="mailto:help@addictionmukti.org"
								className="flex items-center gap-3 text-brand-on-surface-variant dark:text-slate-400"
							>
								<Mail className="w-5 h-5 text-brand-primary" />
								help@addictionmukti.org
							</a>
						</div>
					</div>
				</div>

				<div
					ref={bottomRef}
					className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
				>
					<p className="text-xs font-bold text-brand-secondary">
						© 2026 Addiction Mukti. सर्व अधिकार सुरक्षित।
					</p>

					<p className="text-xs text-brand-on-surface-variant dark:text-slate-500">
						करुणा, देखभाल और पुनर्प्राप्ति के साथ जीवन का
						पुनर्निर्माण।
					</p>
				</div>
			</div>
		</footer>
	);
}

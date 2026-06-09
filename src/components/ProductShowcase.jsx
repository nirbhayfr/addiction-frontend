import { useRef, useState } from "react";
import { ShieldCheck, Phone, Loader2 } from "lucide-react";

export default function ProductShowcase() {
	const images = [
		"/product.jpeg",
		"/product-2.jpeg",
		"/product-3.jpeg",
		"/product-4.jpeg",
	];
	const [current, setCurrent] = useState(0);

	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	const product = {
		name: "रिस्टोर ड्रॉप्स",
		price: 1599,
		image: "/product.jpeg",
		description: "100% आयुर्वेदिक एवं प्राकृतिक रिकवरी सहायता फॉर्मूला",
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!fullName.trim() || !phoneNumber.trim()) return;
		setIsSubmitting(true);

		const payload = {
			fullName,
			phoneNumber,
			urgency: "Product Order",
			type: "Product Order",
			message: `Product: ${product.name}\nPrice: ₹${product.price}\nQuantity: 1`,
		};

		try {
			await fetch(
				"https://addiction-backend.onrender.com/api/requests",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				},
			);

			const whatsappMessage = `RESTORE DROPS PRODUCT ORDER\n\n--------------------------------\n\nCustomer Name:\n${fullName}\n\nPhone Number:\n${phoneNumber}\n\n--------------------------------\n\nORDER DETAILS\n\nProduct:\n${product.name}\n\nPrice:\n₹${product.price}\n\nQuantity:\n1`;

			window.open(
				`https://wa.me/917982217125?text=${encodeURIComponent(whatsappMessage)}`,
				"_blank",
			);

			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
				setFullName("");
				setPhoneNumber("");
			}, 2500);
		} catch (err) {
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	const cards = [
		{ id: "01", title: "100% आयुर्वेदिक एवं प्राकृतिक" },
		{ id: "02", title: "बिना रसायन एवं बिना दुष्प्रभाव" },
		{ id: "03", title: "सुरक्षित एवं प्रभावी फॉर्मूला" },
		{ id: "04", title: "परिवारों का विश्वसनीय भरोसा" },
	];

	return (
		<section className="relative overflow-hidden py-12 md:pb-16 bg-white">
			<div className="mx-auto px-4 sm:px-6">
				{/* HEADER */}
				<div className="text-center mb-14 space-y-4">
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
					{/* LEFT — image carousel */}
					<div className="lg:col-span-6 flex flex-col items-center gap-4">
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

					{/* RIGHT — features + inline form */}
					<div className="lg:col-span-6 flex flex-col gap-5">
						{/* Inline order form */}
						<div className="rounded-2xl border border-[#d1e8e2] bg-[#eef5f0] p-5">
							<div className="flex items-center justify-between mb-1">
								<h3 className="text-lg font-black text-[#004349]">
									रिकवरी सहायता प्राप्त करें
								</h3>
								<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[9px] uppercase tracking-wider font-black">
									<ShieldCheck className="w-3 h-3" />
									विश्वसनीय
								</span>
							</div>

							<div className="flex items-end gap-2 mb-4">
								<span className="text-2xl font-black text-[#004349]">
									₹{product.price}
								</span>
								<span className="text-xs text-slate-400 line-through pb-0.5">
									₹2999
								</span>
							</div>

							{success ? (
								<div className="text-center py-6">
									<div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
										<Phone className="w-6 h-6 text-emerald-700" />
									</div>
									<h4 className="mt-3 text-base font-black text-[#004349]">
										अनुरोध सफलतापूर्वक भेजा गया
									</h4>
									<p className="mt-1 text-xs text-slate-500">
										हमारी टीम शीघ्र ही संपर्क
										करेगी।
									</p>
								</div>
							) : (
								<form
									onSubmit={handleSubmit}
									className="space-y-3"
								>
									<div>
										<label className="text-[10px] uppercase font-black text-slate-500 block mb-1.5">
											पूरा नाम
										</label>
										<input
											type="text"
											required
											value={fullName}
											onChange={(e) =>
												setFullName(
													e.target.value,
												)
											}
											placeholder="अपना नाम दर्ज करें"
											className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold outline-none focus:border-emerald-500 text-slate-700"
										/>
									</div>

									<div>
										<label className="text-[10px] uppercase font-black text-slate-500 block mb-1.5">
											फ़ोन नंबर
										</label>
										<input
											type="tel"
											required
											value={phoneNumber}
											onChange={(e) =>
												setPhoneNumber(
													e.target.value,
												)
											}
											placeholder="+91 00000 00000"
											className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold outline-none focus:border-emerald-500 text-slate-700"
										/>
									</div>

									<div className="rounded-xl border border-emerald-200 bg-white px-3.5 py-3">
										<div className="flex items-center justify-between gap-2">
											<span className="text-sm font-bold text-[#004349]">
												प्रोडक्ट ऑर्डर
											</span>
											<span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] uppercase tracking-wider font-black">
												प्राथमिकता
											</span>
										</div>
										<p className="mt-0.5 text-[11px] text-slate-400">
											सीधे खरीद सहायता अनुरोध
										</p>
									</div>

									<button
										type="submit"
										disabled={isSubmitting}
										className="w-full h-12 rounded-xl bg-[#004349] hover:bg-[#0b5d64] text-white font-black text-sm transition-all flex items-center justify-center gap-2"
									>
										{isSubmitting ? (
											<>
												<Loader2 className="w-4 h-4 animate-spin" />
												भेजा जा रहा है...
											</>
										) : (
											<>अभी खरीदें →</>
										)}
									</button>

									<p className="text-center text-[9px] uppercase font-black text-slate-800">
										100% सुरक्षित और गोपनीय
									</p>
								</form>
							)}
						</div>

						{/* Divider */}
						<hr className="border-emerald-100" />

						<div className="flex flex-col gap-1.5">
							{cards.map((card) => (
								<div
									key={card.id}
									className="flex items-center gap-2.5 rounded-xl border border-[#d1e8e2] bg-white px-3 py-2 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all"
								>
									<div className="w-6 h-6 rounded-lg bg-[#e6f2ee] flex items-center justify-center font-black text-[10px] text-[#436555] shrink-0">
										{card.id}
									</div>
									<h4 className="font-bold text-[12px] text-[#004349] leading-snug">
										{card.title}
									</h4>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

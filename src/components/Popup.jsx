import { useState } from "react";
import { X, ShieldCheck, Phone, Loader2 } from "lucide-react";

export default function ProductPopup({
	open,
	onClose,
	product = {
		name: "रिस्टोर ड्रॉप्स",
		price: 1599,
		image: "/product.jpeg",
		description: "100% आयुर्वेदिक एवं प्राकृतिक रिकवरी सहायता फॉर्मूला",
	},
}) {
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [urgency, setUrgency] = useState("Immediate / Emergency");

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	if (!open) return null;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!fullName.trim() || !phoneNumber.trim()) return;

		setIsSubmitting(true);

		const payload = {
			fullName,
			phoneNumber,

			urgency: "Product Order",

			type: "Product Order",

			message: `
Product: ${product.name}
Price: ₹${product.price}
Quantity: 1
		`.trim(),
		};

		try {
			await fetch(
				"https://addiction-backend.onrender.com/api/requests",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				},
			);

			const whatsappMessage = `
RESTORE DROPS PRODUCT ORDER

--------------------------------

Customer Name:
${fullName}

Phone Number:
${phoneNumber}

--------------------------------

ORDER DETAILS

Product:
${product.name}

Price:
₹${product.price}

Quantity:
1
		`.trim();

			window.open(
				`https://wa.me/917982217125?text=${encodeURIComponent(
					whatsappMessage,
				)}`,
				"_blank",
			);

			setSuccess(true);

			setTimeout(() => {
				onClose();
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

	return (
		<div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm overflow-y-auto">
			<div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
				<div className="relative w-full max-w-5xl bg-white rounded-[26px] md:rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
					{/* CLOSE */}
					<button
						onClick={onClose}
						className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg"
					>
						<X className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
					</button>

					{/* LEFT */}
					<div className="relative bg-[#eef5f0] p-5 sm:p-6 md:p-7 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-emerald-100">
						<div>
							<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-black">
								<ShieldCheck className="w-3.5 h-3.5" />
								विश्वसनीय रिकवरी सहायता
							</span>

							<h2 className="mt-4 text-2xl sm:text-3xl font-black text-[#004349] leading-tight">
								{product.name}
							</h2>

							<p className="mt-2 text-base sm:text-sm text-slate-600 leading-6 max-w-sm">
								{product.description}
							</p>

							<div className="mt-4 flex items-end gap-2">
								<span className="text-3xl sm:text-4xl font-black text-[#004349]">
									₹{product.price}
								</span>

								<span className="text-base sm:text-sm text-slate-400 line-through pb-1">
									₹2999
								</span>
							</div>
						</div>

						{/* IMAGE */}
						<div className="mt-5 sm:mt-6 flex justify-center">
							<div className="relative rounded-3xl bg-white p-3 sm:p-4 shadow-xl border border-emerald-100">
								<img
									src={product.image}
									alt={product.name}
									className="w-32 sm:w-40 md:w-52 object-contain"
								/>
							</div>
						</div>

						{/* FEATURES */}
						<div className="mt-5 grid grid-cols-2 gap-2">
							<div className="rounded-2xl bg-white/80 border border-emerald-100 px-3 py-2">
								<p className="text-[9px] uppercase tracking-wider text-slate-400 font-black">
									प्रकार
								</p>

								<p className="mt-1 text-base font-bold text-[#004349]">
									आयुर्वेदिक
								</p>
							</div>

							<div className="rounded-2xl bg-white/80 border border-emerald-100 px-3 py-2">
								<p className="text-[9px] uppercase tracking-wider text-slate-400 font-black">
									सहायता
								</p>

								<p className="mt-1 text-base font-bold text-[#004349]">
									24/7 उपलब्ध
								</p>
							</div>
						</div>
					</div>

					{/* RIGHT */}
					<div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
						{success ? (
							<div className="text-center py-8 sm:py-10">
								<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
									<Phone className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-700" />
								</div>

								<h3 className="mt-5 text-xl sm:text-2xl font-black text-[#004349]">
									अनुरोध सफलतापूर्वक भेजा गया
								</h3>

								<p className="mt-2 text-base sm:text-sm text-slate-500 leading-7">
									हमारी सहायता टीम शीघ्र ही आपसे
									संपर्क करेगी।
								</p>
							</div>
						) : (
							<>
								<div className="mb-5 sm:mb-6">
									<h3 className="text-xl sm:text-2xl font-black text-[#004349]">
										रिकवरी सहायता प्राप्त करें
									</h3>
								</div>

								<form
									onSubmit={handleSubmit}
									className="space-y-4"
								>
									<div>
										<label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 block mb-2">
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
											className="w-full h-12 sm:h-14 rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500"
										/>
									</div>

									<div>
										<label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 block mb-2">
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
											className="w-full h-12 sm:h-14 rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500"
										/>
									</div>

									{/* ORDER TYPE */}
									<div>
										<label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 block mb-2">
											अनुरोध प्रकार
										</label>

										<div className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
											<div className="flex items-center justify-between gap-2">
												<span className="text-sm font-bold text-[#004349]">
													प्रोडक्ट ऑर्डर
												</span>

												<span className="px-2 py-1 rounded-full bg-emerald-600 text-white text-[9px] sm:text-[10px] uppercase tracking-wider font-black whitespace-nowrap">
													प्राथमिकता
												</span>
											</div>

											<p className="mt-1 text-[11px] sm:text-base text-slate-500 leading-5">
												सीधे खरीद सहायता
												अनुरोध
											</p>
										</div>
									</div>

									<button
										type="submit"
										disabled={isSubmitting}
										className="w-full h-12 sm:h-14 rounded-2xl bg-[#004349] hover:bg-[#0b5d64] text-white font-black text-sm transition-all flex items-center justify-center gap-2"
									>
										{isSubmitting ? (
											<>
												<Loader2 className="w-4 h-4 animate-spin" />
												भेजा जा रहा है...
											</>
										) : (
											<>अनुरोध भेजें</>
										)}
									</button>

									<p className="text-center text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 leading-5">
										100% सुरक्षित और गोपनीय
									</p>
								</form>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

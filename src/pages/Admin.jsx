"use client";

import { useState } from "react";

const ADMIN_CODE = "1234"; // change this to your secret code

export default function AdminRequests() {
	const [code, setCode] = useState("");
	const [authorized, setAuthorized] = useState(false);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleVerify = () => {
		if (code === ADMIN_CODE) {
			setAuthorized(true);
			fetchRequests();
		} else {
			alert("Invalid Code");
		}
	};

	const fetchRequests = async () => {
		try {
			setLoading(true);

			const res = await fetch(
				"https://addiction-backend.onrender.com/api/requests",
			);

			if (!res.ok) throw new Error("Failed to fetch data");

			const result = await res.json();
			setData(result);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// ---------------- CSV EXPORT ----------------

	const exportCSV = () => {
		if (!data.length) return;

		const headers = [
			"Name",
			"Phone",
			"Urgency",
			"Message",
			"Type",
			"Date",
		];

		const rows = data.map((item) => [
			item.fullName || "",
			item.phoneNumber || "",
			item.urgency || "",
			item.message || "",
			item.type || "",
			new Date(item.createdAt).toLocaleString("en-IN"),
		]);

		const csvContent = [
			headers.join(","),
			...rows.map((row) =>
				row
					.map(
						(field) =>
							`"${String(field).replace(/"/g, '""')}"`,
					)
					.join(","),
			),
		].join("\n");

		// UTF-8 BOM for Hindi support in Excel
		const blob = new Blob(["\uFEFF" + csvContent], {
			type: "text/csv;charset=utf-8;",
		});

		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = `requests-${Date.now()}.csv`;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// ---------------- UI ----------------

	if (!authorized) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-50">
				<div className="bg-white p-8 rounded-xl shadow border w-full max-w-sm text-center space-y-4">
					<h1 className="text-xl font-black text-slate-800">
						Admin Access
					</h1>

					<p className="text-xs text-slate-500">
						Enter access code to continue
					</p>

					<input
						type="password"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						className="w-full border rounded-lg px-3 py-2 text-sm"
						placeholder="Enter code"
					/>

					<button
						onClick={handleVerify}
						className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold"
					>
						Unlock
					</button>
				</div>
			</div>
		);
	}

	if (loading)
		return (
			<div className="p-10 text-sm font-bold">Loading requests...</div>
		);

	if (error)
		return (
			<div className="p-10 text-red-600 text-sm font-bold">
				Error: {error}
			</div>
		);

	return (
		<div className="p-6 md:p-10 bg-slate-50 min-h-screen">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
				<h1 className="text-2xl font-black text-slate-800">
					Admin Panel - Requests
				</h1>

				<button
					onClick={exportCSV}
					className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
				>
					Export CSV
				</button>
			</div>

			<div className="overflow-x-auto bg-white rounded-xl shadow border">
				<table className="w-full text-sm">
					<thead className="bg-slate-100 text-left">
						<tr>
							<th className="p-3">Name</th>
							<th className="p-3">Phone</th>
							<th className="p-3">Urgency</th>
							<th className="p-3">Message</th>
							<th className="p-3">Type</th>
							<th className="p-3">Date</th>
						</tr>
					</thead>

					<tbody>
						{data.map((item) => (
							<tr
								key={item._id}
								className="border-t hover:bg-slate-50"
							>
								<td className="p-3 font-semibold">
									{item.fullName || "-"}
								</td>

								<td className="p-3">
									{item.phoneNumber}
								</td>

								<td className="p-3">{item.urgency}</td>

								<td className="p-3 max-w-[300px] truncate">
									{item.message || "-"}
								</td>

								<td className="p-3">{item.type}</td>

								<td className="p-3 text-xs text-slate-500">
									{new Date(
										item.createdAt,
									).toLocaleString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

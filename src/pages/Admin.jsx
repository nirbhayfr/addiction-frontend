"use client";

import { useState, useMemo } from "react";

const ADMIN_CODE = "1234";
const PAGE_SIZE = 10;

export default function AdminOrders() {
	const [code, setCode] = useState("");
	const [authorized, setAuthorized] = useState(false);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Filters & pagination
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [page, setPage] = useState(1);

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

	// ---- Filtered data ----
	const filteredData = useMemo(() => {
		return data.filter((item) => {
			const date = new Date(item.createdAt);
			if (fromDate && date < new Date(fromDate)) return false;
			if (toDate) {
				const to = new Date(toDate);
				to.setHours(23, 59, 59, 999);
				if (date > to) return false;
			}
			return true;
		});
	}, [data, fromDate, toDate]);

	const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const paginated = filteredData.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE,
	);

	const handleFromDate = (v) => {
		setFromDate(v);
		setPage(1);
	};
	const handleToDate = (v) => {
		setToDate(v);
		setPage(1);
	};
	const clearFilters = () => {
		setFromDate("");
		setToDate("");
		setPage(1);
	};

	// ---- CSV Export ----
	const exportCSV = () => {
		if (!filteredData.length) return;
		const headers = [
			"Name",
			"Phone",
			"Urgency",
			"Message",
			"Type",
			"Date",
		];
		const rows = filteredData.map((item) => [
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
		const blob = new Blob(["\uFEFF" + csvContent], {
			type: "text/csv;charset=utf-8;",
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `orders-${Date.now()}.csv`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const urgencyBadge = (urgency) => {
		const map = {
			high: "bg-red-100 text-red-700 border border-red-200",
			medium: "bg-amber-100 text-amber-700 border border-amber-200",
			low: "bg-green-100 text-green-700 border border-green-200",
		};
		const key = (urgency || "").toLowerCase();
		return (
			map[key] || "bg-slate-100 text-slate-600 border border-slate-200"
		);
	};

	// ---- Login screen ----
	if (!authorized) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-100">
				<div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm p-8 space-y-5">
					<div className="text-center space-y-1">
						<div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 mb-2">
							<svg
								className="w-6 h-6 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
						<h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
							Admin Access
						</h1>
						<p className="text-xs text-slate-400">
							Enter your access code to continue
						</p>
					</div>
					<input
						type="password"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						onKeyDown={(e) =>
							e.key === "Enter" && handleVerify()
						}
						className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
						placeholder="••••••••"
					/>
					<button
						onClick={handleVerify}
						className="w-full bg-slate-900 hover:bg-slate-700 text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
					>
						Unlock Dashboard
					</button>
				</div>
			</div>
		);
	}

	if (loading)
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-100">
				<div className="flex items-center gap-3 text-slate-500 text-sm font-semibold">
					<svg
						className="animate-spin w-5 h-5 text-slate-700"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v8H4z"
						/>
					</svg>
					Loading orders...
				</div>
			</div>
		);

	if (error)
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-100">
				<div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4 text-sm font-semibold">
					Error: {error}
				</div>
			</div>
		);

	// ---- Main dashboard ----
	return (
		<div className="min-h-screen bg-slate-100 p-4 md:p-8">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
				<div>
					<h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
						Orders
					</h1>
					<p className="text-sm text-slate-400 mt-0.5">
						{filteredData.length !== data.length
							? `Showing ${filteredData.length} of ${data.length} total orders`
							: `${data.length} total orders`}
					</p>
				</div>
				<button
					onClick={exportCSV}
					className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
						/>
					</svg>
					Export CSV
				</button>
			</div>

			{/* Stats + Filters row */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				{/* Total orders card */}
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
					<div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
						<svg
							className="w-5 h-5 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
					</div>
					<div>
						<p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
							Total Orders
						</p>
						<p className="text-2xl font-extrabold text-slate-900">
							{data.length}
						</p>
					</div>
				</div>

				{/* Filtered count card */}
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
					<div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
						<svg
							className="w-5 h-5 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
							/>
						</svg>
					</div>
					<div>
						<p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
							Filtered
						</p>
						<p className="text-2xl font-extrabold text-slate-900">
							{filteredData.length}
						</p>
					</div>
				</div>

				{/* From date */}
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col gap-1">
					<label className="text-xs text-slate-400 font-medium uppercase tracking-wide">
						From Date
					</label>
					<input
						type="date"
						value={fromDate}
						onChange={(e) => handleFromDate(e.target.value)}
						className="text-sm text-slate-700 font-semibold border-0 bg-transparent focus:outline-none w-full"
					/>
				</div>

				{/* To date */}
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col gap-1">
					<label className="text-xs text-slate-400 font-medium uppercase tracking-wide">
						To Date
					</label>
					<input
						type="date"
						value={toDate}
						onChange={(e) => handleToDate(e.target.value)}
						className="text-sm text-slate-700 font-semibold border-0 bg-transparent focus:outline-none w-full"
					/>
				</div>
			</div>

			{/* Clear filters pill */}
			{(fromDate || toDate) && (
				<div className="mb-4">
					<button
						onClick={clearFilters}
						className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-full px-3 py-1.5 transition-colors"
					>
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
						Clear filters
					</button>
				</div>
			)}

			{/* Table */}
			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-5">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="bg-slate-50 border-b border-slate-200">
								<th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
									#
								</th>
								<th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
									Name
								</th>
								<th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
									Phone
								</th>
								<th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
									Urgency
								</th>
								<th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
									Message
								</th>
								<th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
									Type
								</th>
								<th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
									Date
								</th>
							</tr>
						</thead>
						<tbody>
							{paginated.length === 0 ? (
								<tr>
									<td
										colSpan={7}
										className="px-4 py-12 text-center text-slate-400 text-sm font-medium"
									>
										No orders found for the
										selected date range.
									</td>
								</tr>
							) : (
								paginated.map((item, idx) => (
									<tr
										key={item._id}
										className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
									>
										<td className="px-4 py-3 text-xs text-slate-400 font-mono">
											{(currentPage - 1) *
												PAGE_SIZE +
												idx +
												1}
										</td>
										<td className="px-4 py-3 font-semibold text-slate-800">
											{item.fullName || "—"}
										</td>
										<td className="px-4 py-3 text-slate-600 font-mono text-xs">
											{item.phoneNumber}
										</td>
										<td className="px-4 py-3">
											<span
												className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${urgencyBadge(item.urgency)}`}
											>
												{item.urgency ||
													"—"}
											</span>
										</td>
										<td className="px-4 py-3 text-slate-500 max-w-[240px] truncate">
											{item.message || "—"}
										</td>
										<td className="px-4 py-3 text-slate-600 capitalize">
											{item.type || "—"}
										</td>
										<td className="px-4 py-3 text-xs text-slate-400">
											{new Date(
												item.createdAt,
											).toLocaleString(
												"en-IN",
											)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Pagination */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
				<p className="text-slate-400 text-xs">
					Page{" "}
					<span className="font-bold text-slate-700">
						{currentPage}
					</span>{" "}
					of{" "}
					<span className="font-bold text-slate-700">
						{totalPages}
					</span>{" "}
					&nbsp;·&nbsp; {filteredData.length} orders
				</p>
				<div className="flex items-center gap-1.5">
					<button
						onClick={() => setPage(1)}
						disabled={currentPage === 1}
						className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
					>
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 19l-7-7 7-7M18 19l-7-7 7-7"
							/>
						</svg>
					</button>
					<button
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={currentPage === 1}
						className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
					>
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					{/* Page number pills */}
					{Array.from({ length: totalPages }, (_, i) => i + 1)
						.filter(
							(p) =>
								p === 1 ||
								p === totalPages ||
								Math.abs(p - currentPage) <= 1,
						)
						.reduce((acc, p, i, arr) => {
							if (i > 0 && p - arr[i - 1] > 1)
								acc.push("...");
							acc.push(p);
							return acc;
						}, [])
						.map((p, i) =>
							p === "..." ? (
								<span
									key={`dots-${i}`}
									className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs"
								>
									…
								</span>
							) : (
								<button
									key={p}
									onClick={() => setPage(p)}
									className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold border transition-colors ${
										currentPage === p
											? "bg-slate-900 text-white border-slate-900"
											: "border-slate-200 text-slate-600 hover:bg-slate-50"
									}`}
								>
									{p}
								</button>
							),
						)}

					<button
						onClick={() =>
							setPage((p) => Math.min(totalPages, p + 1))
						}
						disabled={currentPage === totalPages}
						className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
					>
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
					<button
						onClick={() => setPage(totalPages)}
						disabled={currentPage === totalPages}
						className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
					>
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 5l7 7-7 7M6 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}

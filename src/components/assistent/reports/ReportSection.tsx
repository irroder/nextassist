import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { useApp } from "../../../context/AppContext";

interface ReportFormData {
	date: string;
	content: string;
}

const defaultReportForm: ReportFormData = {
	date: format(new Date(), "yyyy-MM-dd"),
	content: "",
};

interface ReportSectionProps {
	projectId: string;
}

export const ReportSection: React.FC<ReportSectionProps> = ({ projectId }) => {
	const { getProjectReports, addReport, user } = useApp();
	const [showReportModal, setShowReportModal] = useState(false);
	const [showReportsModal, setShowReportsModal] = useState(false);
	const [reportForm, setReportForm] =
		useState<ReportFormData>(defaultReportForm);

	const reports = getProjectReports(projectId);

	const handleSubmitReport = (e: React.FormEvent) => {
		e.preventDefault();

		addReport({
			projectId,
			date: reportForm.date,
			content: reportForm.content,
			createdBy: user.id,
		});

		setReportForm(defaultReportForm);
		setShowReportModal(false);
	};

	return (
		<div className="mb-4 bg-[#bcb4ff]/80 text-black rounded-lg overflow-hidden">
			<div className="px-6 py-4 flex justify-between items-center">
				<h2 className="text-base font-medium">Отчеты</h2>
				<div className="flex gap-2">
					<button
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-black hover:bg-[#e3ec45] h-8 px-3 text-xs font-semibold"
						onClick={() => setShowReportModal(true)}
					>
						Добавить отчет
					</button>
					<button
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black/10 text-black hover:bg-black/20 h-8 px-3 text-xs font-semibold"
						onClick={() => setShowReportsModal(true)}
					>
						Архив
					</button>
				</div>
			</div>

			{/* Add Report Modal */}
			{showReportModal && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full">
						<div className="px-6 py-4 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-800">
								Новый отчет
							</h3>
						</div>
						<form onSubmit={handleSubmitReport}>
							<div className="px-6 py-4 space-y-4">
								<div>
									<label
										htmlFor="date"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Дата отчета
									</label>
									<input
										type="date"
										id="date"
										name="date"
										value={reportForm.date}
										onChange={(e) =>
											setReportForm((prev) => ({
												...prev,
												date: e.target.value,
											}))
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="content"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Содержание отчета
									</label>
									<textarea
										id="content"
										name="content"
										value={reportForm.content}
										onChange={(e) =>
											setReportForm((prev) => ({
												...prev,
												content: e.target.value,
											}))
										}
										rows={5}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
										required
									/>
								</div>
							</div>
							<div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
								<button
									type="button"
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
									onClick={() => setShowReportModal(false)}
								>
									Отмена
								</button>
								<button
									type="submit"
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
								>
									Сохранить
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* View Reports Modal */}
			{showReportsModal && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-[#fffeec] rounded-xl shadow-xl max-w-2xl w-full">
						<div className="px-8 py-6 border-b border-[#2c2b2a]/10 flex justify-between items-center">
							<h3 className="text-xl font-semibold text-[#2c2b2a]">
								История отчетов
							</h3>
							<button
								className="text-[#2c2b2a] hover:opacity-70 transition-opacity"
								onClick={() => setShowReportsModal(false)}
								aria-label="Close"
							>
								✕
							</button>
						</div>
						<div className="px-8 py-6">
							{reports.length === 0 ? (
								<div className="text-center py-8">
									<p className="text-[#2c2b2a]/70 text-lg mb-4">
										Отчетов пока нет
									</p>
									<button
										className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-[#2c2b2a] hover:bg-[#e3ec45] h-8 px-3 text-xs font-semibold"
										onClick={() => {
											setShowReportsModal(false);
											setShowReportModal(true);
										}}
									>
										+ Создать первый отчет
									</button>
								</div>
							) : (
								<div className="space-y-6">
									<div className="flex justify-end">
										<button
											className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-[#2c2b2a] hover:bg-[#e3ec45] h-8 px-3 text-xs font-semibold"
											onClick={() => {
												setShowReportsModal(false);
												setShowReportModal(true);
											}}
										>
											+ Добавить отчет
										</button>
									</div>
									{reports
										.sort(
											(a, b) =>
												new Date(b.date).getTime() -
												new Date(a.date).getTime()
										)
										.map((report) => (
											<div
												key={report.id}
												className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
											>
												<div className="flex justify-between items-start mb-2">
													<div className="font-semibold text-[#2c2b2a] text-lg">
														{format(
															parseISO(
																report.date
															),
															"d MMMM yyyy"
														)}
													</div>
													<div className="text-sm text-[#2c2b2a]/60">
														{format(
															parseISO(
																report.createdAt
															),
															"HH:mm"
														)}
													</div>
												</div>
												<p className="text-[#2c2b2a]/80 whitespace-pre-wrap leading-relaxed">
													{report.content}
												</p>
											</div>
										))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

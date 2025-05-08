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
	const isAssistant = user?.role === "assistant";

	const handleSubmitReport = (e: React.FormEvent) => {
		e.preventDefault();

		if (!isAssistant) return;

		addReport({
			projectId,
			date: reportForm.date,
			summary: reportForm.content,
			createdBy: user?.id || "",
			achievements: [],
			challenges: [],
			nextDayPlans: [],
		});

		setReportForm(defaultReportForm);
		setShowReportModal(false);
		setShowReportsModal(true);
	};

	return (
		<div className="mb-4 bg-[#bcb4ff]/80 text-black rounded-lg overflow-hidden">
			<div className="px-6 py-4 flex justify-between items-center">
				<h2 className="text-base font-medium">Отчеты</h2>
				<div className="flex gap-2">
					{isAssistant && (
						<button
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-black hover:bg-[#e3ec45] h-8 px-3 text-xs font-semibold"
							onClick={() => setShowReportModal(true)}
						>
							Добавить отчет
						</button>
					)}
					<button
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-black hover:bg-[#e3ec45] h-8 px-3 text-xs font-semibold"
						onClick={() => setShowReportsModal(true)}
					>
						Архив
					</button>
				</div>
			</div>

			{/* Add Report Modal */}
			{showReportModal && isAssistant && (
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
				<div className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
						<div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
							<h3 className="text-lg sm:text-xl font-semibold text-foreground">
								История отчетов
							</h3>
							<button
								className="text-foreground/70 hover:text-foreground p-1"
								onClick={() => setShowReportsModal(false)}
								aria-label="Close"
							>
								✕
							</button>
						</div>
						<div className="flex-1 overflow-y-auto p-4 sm:p-6">
							{reports.length === 0 ? (
								<div className="text-center py-8">
									<p className="text-foreground/70 text-base sm:text-lg mb-4">
										Отчетов пока нет
									</p>
									{isAssistant && (
										<button
											className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-foreground hover:bg-[#edf64d]/90 h-8 px-3 shadow-sm"
											onClick={() => {
												setShowReportsModal(false);
												setShowReportModal(true);
											}}
										>
											+ Создать первый отчет
										</button>
									)}
								</div>
							) : (
								<div className="space-y-4 sm:space-y-6">
									{isAssistant && (
										<div className="flex justify-end">
											<button
												className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-foreground hover:bg-[#edf64d]/90 h-8 px-3 shadow-sm"
												onClick={() => {
													setShowReportsModal(false);
													setShowReportModal(true);
												}}
											>
												+ Добавить отчет
											</button>
										</div>
									)}
									{reports
										.sort(
											(a, b) =>
												new Date(b.date).getTime() -
												new Date(a.date).getTime()
										)
										.map((report) => (
											<div
												key={report.id}
												className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
											>
												<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 mb-2">
													<div className="font-medium text-foreground text-base sm:text-lg">
														{format(
															parseISO(
																report.date
															),
															"d MMMM yyyy"
														)}
													</div>
													<div className="text-xs sm:text-sm text-foreground/60">
														{format(
															parseISO(
																report.createdAt
															),
															"HH:mm"
														)}
													</div>
												</div>
												<p className="text-foreground/80 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
													{report.summary}
												</p>
												{report.achievements.length >
													0 && (
													<div className="mt-4">
														<h4 className="text-sm font-medium text-foreground/70 mb-2">
															Достижения:
														</h4>
														<ul className="list-disc list-inside text-foreground/80 text-sm sm:text-base">
															{report.achievements.map(
																(
																	achievement,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																	>
																		{
																			achievement
																		}
																	</li>
																)
															)}
														</ul>
													</div>
												)}
												{report.challenges.length >
													0 && (
													<div className="mt-4">
														<h4 className="text-sm font-medium text-foreground/70 mb-2">
															Сложности:
														</h4>
														<ul className="list-disc list-inside text-foreground/80 text-sm sm:text-base">
															{report.challenges.map(
																(
																	challenge,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																	>
																		{
																			challenge
																		}
																	</li>
																)
															)}
														</ul>
													</div>
												)}
												{report.nextDayPlans.length >
													0 && (
													<div className="mt-4">
														<h4 className="text-sm font-medium text-foreground/70 mb-2">
															Планы на следующий
															день:
														</h4>
														<ul className="list-disc list-inside text-foreground/80 text-sm sm:text-base">
															{report.nextDayPlans.map(
																(
																	plan,
																	index
																) => (
																	<li
																		key={
																			index
																		}
																	>
																		{plan}
																	</li>
																)
															)}
														</ul>
													</div>
												)}
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

import React from "react";
import { TrendingUp, Receipt, X, Wallet } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

const Balance: React.FC = () => {
	const [selectedPayment, setSelectedPayment] = React.useState<
		(typeof balanceData.recentPayments)[0] | null
	>(null);

	// This would come from your API/context in a real app
	const balanceData = {
		totalBalance: 145000,
		currentMonth: {
			earnings: 45000,
			projectCount: 3,
		},
		recentPayments: [
			{
				id: "1",
				projectId: "proj-1",
				projectName: "Редизайн платформы",
				managerName: "Светлана Иванова",
				amount: 35000,
				date: "2024-02-28",
				status: "completed",
			},
			{
				id: "2",
				projectId: "proj-2",
				projectName: "Разработка панели управления",
				managerName: "Михаил Чен",
				amount: 42000,
				date: "2024-02-15",
				status: "completed",
			},
			{
				id: "3",
				projectId: "proj-3",
				projectName: "Интеграция API",
				managerName: "Светлана Иванова",
				amount: 28000,
				date: "2024-02-01",
				status: "completed",
			},
		],
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("ru-RU", {
			style: "currency",
			currency: "RUB",
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return format(parseISO(dateString), "d MMMM yyyy", { locale: ru });
	};

	const handleOpenReceipt = (
		payment: (typeof balanceData.recentPayments)[0]
	) => {
		setSelectedPayment(payment);
	};

	const handleCloseReceipt = () => {
		setSelectedPayment(null);
	};

	return (
		<>
			<div className="mb-6 sm:mb-8">
				<h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
					Баланс
				</h1>
				<p className="text-sm sm:text-base text-foreground/70">
					Управление доходами и история выплат
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
				{/* Total Balance */}
				<div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5">
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 p-3 bg-[#edf64d]/10 rounded-lg">
							<Wallet className="text-[#edf64d] w-7 h-7" />
						</div>
						<div className="min-w-0">
							<p className="text-sm text-foreground/70">
								Общий баланс
							</p>
							<p className="text-2xl font-medium text-foreground truncate">
								{formatCurrency(balanceData.totalBalance)}
							</p>
						</div>
					</div>
				</div>

				{/* Current Month Earnings */}
				<div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5">
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 p-3 bg-[#bcb4ff]/10 rounded-lg">
							<TrendingUp className="text-[#bcb4ff] w-7 h-7" />
						</div>
						<div className="min-w-0">
							<p className="text-sm text-foreground/70">
								Активных проектов на сумму
							</p>
							<p className="text-2xl font-medium text-foreground truncate">
								{formatCurrency(
									balanceData.currentMonth.earnings
								)}
							</p>
							<p className="text-xs text-foreground/60">
								{balanceData.currentMonth.projectCount} проекта
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Payment History */}
			<div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
				<div className="px-4 sm:px-6 py-4 border-b border-gray-100">
					<h2 className="text-lg sm:text-xl font-semibold text-foreground">
						История выплат
					</h2>
				</div>
				<div className="divide-y divide-gray-100">
					{balanceData.recentPayments.map((payment) => (
						<div
							key={payment.id}
							className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors"
						>
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
								<div className="space-y-1">
									<h3 className="font-medium text-foreground">
										{payment.projectName}
									</h3>
									<p className="text-sm text-foreground/60">
										Руководитель: {payment.managerName}
									</p>
									<p className="text-xs text-foreground/50">
										ID: {payment.projectId}
									</p>
								</div>
								<div className="flex items-center justify-between sm:justify-end gap-4">
									<div className="text-right">
										<p className="font-medium text-foreground">
											{formatCurrency(payment.amount)}
										</p>
										<p className="text-sm text-foreground/60">
											{formatDate(payment.date)}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700">
											Выплачено
										</span>
										<button
											className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white shadow-sm hover:bg-[#faf6f1] h-8 w-8 p-0"
											onClick={() =>
												handleOpenReceipt(payment)
											}
										>
											<Receipt size={16} />
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Receipt Modal */}
			{selectedPayment && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-xl shadow-xl max-w-md w-full">
						<div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
							<h3 className="text-lg font-semibold text-foreground">
								Чек об оплате
							</h3>
							<button
								onClick={handleCloseReceipt}
								className="text-foreground/60 hover:text-foreground transition-colors p-1"
							>
								<X size={20} />
							</button>
						</div>
						<div className="p-4 sm:p-6 space-y-4">
							<div className="text-center mb-6">
								<h4 className="text-xl font-bold text-foreground mb-1">
									NextAssist
								</h4>
								<p className="text-sm text-foreground/60">
									Платформа для управления проектами
								</p>
							</div>

							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-foreground/70">
										Номер чека:
									</span>
									<span className="font-medium text-foreground">
										{selectedPayment.id}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-foreground/70">
										Дата:
									</span>
									<span className="font-medium text-foreground">
										{formatDate(selectedPayment.date)}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-foreground/70">
										Проект:
									</span>
									<span className="font-medium text-foreground">
										{selectedPayment.projectName}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-foreground/70">
										ID проекта:
									</span>
									<span className="font-medium text-foreground">
										{selectedPayment.projectId}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-foreground/70">
										Руководитель:
									</span>
									<span className="font-medium text-foreground">
										{selectedPayment.managerName}
									</span>
								</div>

								<div className="border-t border-gray-100 pt-3 mt-3">
									<div className="flex justify-between items-center">
										<span className="text-foreground font-semibold">
											Сумма:
										</span>
										<span className="text-xl font-bold text-foreground">
											{formatCurrency(
												selectedPayment.amount
											)}
										</span>
									</div>
								</div>
							</div>

							<div className="mt-6 pt-6 border-t border-gray-100">
								<button
									className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-foreground hover:bg-[#edf64d]/90 h-9 px-4 py-2 shadow-sm"
									onClick={() => {
										// Here you would implement the actual download/print functionality
										alert("Скачивание чека...");
									}}
								>
									Скачать чек
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Balance;

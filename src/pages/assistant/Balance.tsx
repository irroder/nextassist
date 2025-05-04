import React from "react";
import { Calendar, TrendingUp, Receipt, X } from "lucide-react";
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
		nextPayment: {
			amount: 50000,
			date: "2024-03-25",
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
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Баланс
				</h1>
				<p className="text-gray-600">
					Управление доходами и история выплат
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{/* Current Month Earnings */}
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="p-6">
						<div className="mb-4">
							<TrendingUp className="text-[#4A6EE0]" size={32} />
						</div>
						<div className="space-y-1">
							<p className="text-[#4A6EE0]/70 text-sm">
								Заработок за месяц
							</p>
							<p className="text-[32px] font-medium text-black">
								{formatCurrency(
									balanceData.currentMonth.earnings
								)}
							</p>
						</div>
					</div>
				</div>

				{/* Next Payment */}
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="p-2 bg-green-50 rounded-xl">
								<Calendar
									className="text-green-500"
									size={24}
								/>
							</div>
						</div>
						<div className="space-y-1">
							<p className="text-gray-500 text-sm">
								Следующая выплата
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{formatCurrency(balanceData.nextPayment.amount)}
							</p>
							<p className="text-sm text-gray-500">
								{formatDate(balanceData.nextPayment.date)}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Payment History */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-800">
						История выплат
					</h2>
				</div>
				<div className="px-6 py-4">
					<div className="divide-y divide-gray-200">
						{balanceData.recentPayments.map((payment) => (
							<div
								key={payment.id}
								className="py-4 first:pt-0 last:pb-0"
							>
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium text-gray-900">
											{payment.projectName}
										</h3>
										<p className="text-sm text-gray-500">
											Руководитель: {payment.managerName}
										</p>
									</div>
									<div className="text-right">
										<p className="font-medium text-gray-900">
											{formatCurrency(payment.amount)}
										</p>
										<p className="text-sm text-gray-500">
											{formatDate(payment.date)}
										</p>
									</div>
								</div>
								<div className="mt-2 flex items-center justify-between">
									<p className="text-sm text-gray-500">
										ID: {payment.projectId}
									</p>
									<div className="flex items-center gap-2">
										<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
											Выплачено
										</span>
										<button
											className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
											onClick={() =>
												handleOpenReceipt(payment)
											}
										>
											<Receipt size={16} />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Receipt Modal */}
			{selectedPayment && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full">
						<div className="flex items-center justify-between p-6 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-900">
								Чек об оплате
							</h3>
							<button
								onClick={handleCloseReceipt}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X size={20} />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div className="text-center mb-6">
								<h4 className="text-xl font-bold text-gray-900 mb-1">
									БезРук
								</h4>
								<p className="text-sm text-gray-500">
									Платформа для фрилансеров
								</p>
							</div>

							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-gray-600">
										Номер чека:
									</span>
									<span className="font-medium">
										{selectedPayment.id}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Дата:</span>
									<span className="font-medium">
										{formatDate(selectedPayment.date)}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">
										Проект:
									</span>
									<span className="font-medium">
										{selectedPayment.projectName}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">
										ID проекта:
									</span>
									<span className="font-medium">
										{selectedPayment.projectId}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">
										Руководитель:
									</span>
									<span className="font-medium">
										{selectedPayment.managerName}
									</span>
								</div>

								<div className="border-t border-gray-200 pt-3 mt-3">
									<div className="flex justify-between items-center">
										<span className="text-gray-900 font-semibold">
											Сумма:
										</span>
										<span className="text-xl font-bold text-gray-900">
											{formatCurrency(
												selectedPayment.amount
											)}
										</span>
									</div>
								</div>
							</div>

							<div className="mt-6 pt-6 border-t border-gray-200">
								<button
									className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
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

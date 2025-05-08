import React from "react";
import { AssistantCharge } from "../../../types";
import { Calendar, DollarSign, AlertCircle } from "lucide-react";
import { Button } from "../../ui/Button";

interface AssistantSpendingModalProps {
	charge: AssistantCharge;
	onClose: () => void;
}

const AssistantSpendingModal: React.FC<AssistantSpendingModalProps> = ({
	charge,
	onClose,
}) => {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("ru-RU", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	// Calculate days until next payment
	const daysUntilPayment = Math.ceil(
		(new Date(charge.nextPaymentDate).getTime() - new Date().getTime()) /
			(1000 * 3600 * 24)
	);

	// Calculate billing period progress
	const totalDaysInPeriod = 30; // Assuming 30-day billing period
	const daysElapsed = totalDaysInPeriod - daysUntilPayment;
	const progressPercentage = (daysElapsed / totalDaysInPeriod) * 100;

	// Mock current period spending
	const currentSpending = charge.amount * 0.7; // 70% of monthly amount spent
	const projectedSpending =
		(currentSpending / daysElapsed) * totalDaysInPeriod;
	const isOverBudget = projectedSpending > charge.amount;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
				<div className="p-6">
					<div className="flex justify-between items-start mb-6">
						<h2 className="text-2xl font-bold text-gray-800">
							{charge.assistantName}
						</h2>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600"
						>
							<svg
								className="w-6 h-6"
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
						</button>
					</div>

					<div className="mb-8">
						<div className="flex items-center justify-between mb-2">
							<h3 className="font-semibold text-gray-800">
								Текущий расчетный период
							</h3>
							<span className="text-sm text-gray-500">
								Осталось {daysUntilPayment} дней
							</span>
						</div>

						<div className="bg-gray-100 rounded-lg p-4">
							<div className="mb-4">
								<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
									<div
										className={`h-full rounded-full ${
											isOverBudget
												? "bg-red-500"
												: "bg-primary"
										}`}
										style={{
											width: `${progressPercentage}%`,
										}}
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-gray-500 mb-1">
										Потрачено
									</p>
									<p className="text-lg font-semibold text-gray-800">
										{formatCurrency(currentSpending)}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500 mb-1">
										Прогноз расходов
									</p>
									<div className="flex items-center">
										<p
											className={`text-lg font-semibold ${
												isOverBudget
													? "text-red-600"
													: "text-gray-800"
											}`}
										>
											{formatCurrency(projectedSpending)}
										</p>
										{isOverBudget && (
											<AlertCircle
												size={16}
												className="text-red-600 ml-2"
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
						<div className="bg-primary bg-opacity-10 rounded-lg p-4">
							<div className="flex items-center mb-2">
								<DollarSign
									className="text-text mr-2"
									size={20}
								/>
								<h3 className="font-semibold text-text">
									Текущая подписка
								</h3>
							</div>
							<p className="text-2xl font-bold text-text">
								{formatCurrency(charge.amount)}
							</p>
							<p className="text-sm text-gray-600">
								за период с 28 апреля по 28 мая
							</p>
						</div>

						<div className="bg-amber-50 rounded-lg p-4">
							<div className="flex items-center mb-2">
								<Calendar
									className="text-amber-600 mr-2"
									size={20}
								/>
								<h3 className="font-semibold text-amber-800">
									Следующая оплата
								</h3>
							</div>
							<p className="text-lg font-semibold text-amber-900">
								{formatDate(new Date(charge.nextPaymentDate))}
							</p>
						</div>
					</div>

					<div className="flex justify-end pt-4 border-t">
						<Button variant="outline" onClick={onClose}>
							Закрыть
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssistantSpendingModal;

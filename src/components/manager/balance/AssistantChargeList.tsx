import React from "react";
import { AssistantCharge } from "../../../types";
import { Calendar } from "lucide-react";
import AssistantSpendingModal from "./AssistantSpendingModal";

interface AssistantChargeListProps {
	charges: AssistantCharge[];
}

const AssistantChargeList: React.FC<AssistantChargeListProps> = ({
	charges,
}) => {
	const [selectedCharge, setSelectedCharge] =
		React.useState<AssistantCharge | null>(null);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	const totalMonthly = charges.reduce(
		(sum, charge) => sum + charge.amount,
		0
	);

	return (
		<>
			<div className="bg-white rounded-lg shadow-sm p-6">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
					<h2 className="text-lg md:text-xl font-semibold text-gray-800">
						Расходы на ассистентов
					</h2>
					<div className="text-gray-500 font-medium text-sm md:text-base">
						Всего в месяц:{" "}
						<span className="text-primary">
							{formatCurrency(totalMonthly)}
						</span>
					</div>
				</div>

				<div className="space-y-4">
					{charges.map((charge) => (
						<div
							key={charge.assistantId}
							className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors gap-2"
						>
							<div
								className="flex-1 cursor-pointer"
								onClick={() => setSelectedCharge(charge)}
							>
								<h3 className="font-medium text-gray-800">
									{charge.assistantName}
								</h3>
								<div className="flex items-center mt-1 text-xs sm:text-sm text-gray-500">
									<Calendar size={14} className="mr-1" />
									<span>
										Следующая оплата:{" "}
										{formatDate(
											new Date(charge.nextPaymentDate)
										)}
									</span>
								</div>
							</div>
							<div className="text-right">
								<span className="text-base sm:text-lg font-semibold text-primary">
									{formatCurrency(charge.amount)}
								</span>
								<p className="text-xs text-gray-500">в месяц</p>
							</div>
						</div>
					))}

					{charges.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							Нет активных подписок
						</div>
					)}
				</div>
			</div>

			{selectedCharge && (
				<AssistantSpendingModal
					charge={selectedCharge}
					onClose={() => setSelectedCharge(null)}
				/>
			)}
		</>
	);
};

export default AssistantChargeList;

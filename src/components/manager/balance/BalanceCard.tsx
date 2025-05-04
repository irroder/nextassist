import React from "react";
import { BalanceInfo } from "../../../types";
import { DollarSign } from "lucide-react";
import { Button } from "../../ui/Button";

interface BalanceCardProps {
	balance: BalanceInfo;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
			<h2 className="text-lg md:text-xl font-semibold text-gray-800">
				Ваш баланс
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
				<div className="bg-primary bg-opacity-10 rounded-lg p-4 flex items-center space-x-4">
					<div className="bg-primary bg-opacity-20 p-3 rounded-full">
						<DollarSign size={24} className="text-text" />
					</div>
					<div>
						<p className="text-sm text-text font-medium">Баланс</p>
						<p className="text-xl md:text-2xl font-bold text-text">
							{formatCurrency(balance.total)}
						</p>
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-6">
				<Button variant="default" size="lg" className="px-8">
					<DollarSign size={18} className="mr-1" />
					Пополнить баланс
				</Button>
			</div>
		</div>
	);
};

export default BalanceCard;

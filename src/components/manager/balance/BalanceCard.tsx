import React from "react";
import { BalanceInfo } from "../../../types";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
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
		<div className="bg-white rounded-lg shadow-sm shadow-sm p-8 border border-gray-100">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
							<Wallet size={24} className="text-primary" />
						</div>
						<div>
							<h2 className="text-lg font-medium text-foreground/70">
								Текущий баланс
							</h2>
							<p className="text-3xl font-bold text-foreground">
								{formatCurrency(balance.total)}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 text-sm text-foreground/70">
						<TrendingUp size={16} className="text-green-600" />
						<span>Баланс обновляется автоматически</span>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
					<Button
						variant="default"
						size="lg"
						className="w-full md:w-auto bg-primary hover:bg-primary/90"
					>
						<DollarSign size={18} className="mr-2" />
						Пополнить баланс
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="w-full md:w-auto hover:border-primary hover:text-primary"
					>
						История платежей
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BalanceCard;

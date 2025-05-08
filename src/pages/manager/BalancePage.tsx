import React from "react";
import { useApp } from "../../context/AppContext";
import BalanceCard from "../../components/manager/balance/BalanceCard";
import AssistantChargeList from "../../components/manager/balance/AssistantChargeList";
import { Download, Clock, DollarSign, FileText } from "lucide-react";
import { Transaction } from "../../types";
import { Button } from "../../components/ui/Button";

const BalancePage: React.FC = () => {
	const { balance } = useApp();

	// Mock transaction history
	const transactions: Transaction[] = [
		{
			id: "t1",
			type: "charge",
			description: "Monthly subscription",
			amount: -74.97,
			date: "2024-05-15",
			receiptUrl: "/receipts/t1.pdf",
		},
		{
			id: "t2",
			type: "payment",
			description: "Payment - Credit Card",
			amount: 100.0,
			date: "2024-05-10",
			receiptUrl: "/receipts/t2.pdf",
		},
		{
			id: "t3",
			type: "charge",
			description: "Marketing Assistant usage",
			amount: -5.5,
			date: "2024-05-05",
		},
		{
			id: "t4",
			type: "payment",
			description: "Payment - PayPal",
			amount: 200.0,
			date: "2024-04-25",
			receiptUrl: "/receipts/t4.pdf",
		},
	];

	const handleDownloadReceipt = (transaction: Transaction) => {
		if (transaction.receiptUrl) {
			// In a real app, this would trigger the receipt download
			console.log("Downloading receipt:", transaction.receiptUrl);
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			signDisplay: "exceptZero",
		}).format(amount);
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Баланс и оплата
				</h1>
				<p className="text-gray-600">
					Управление финансами и платежами
				</p>
			</div>

			<div className="mb-8">
				<BalanceCard balance={balance} />
			</div>

			<div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100 hover:border-primary/20 transition-colors">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
					<h2 className="text-lg font-semibold text-foreground">
						Ассистенты
					</h2>
					<Button
						variant="outline"
						className="mt-4 sm:mt-0 w-full sm:w-auto hover:border-primary hover:text-primary"
					>
						<Download size={16} className="mr-2" />
						Экспорт
					</Button>
				</div>
				<AssistantChargeList charges={balance.assistantCharges} />
			</div>

			<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-secondary/20 transition-colors">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
					<h2 className="text-lg font-semibold text-foreground">
						История транзакций
					</h2>
					<Button
						variant="outline"
						className="mt-4 sm:mt-0 w-full sm:w-auto hover:border-secondary hover:text-secondary"
					>
						<Download size={16} className="mr-2" />
						Экспорт
					</Button>
				</div>

				<div className="overflow-x-auto -mx-6 px-6">
					<table className="min-w-full">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">
									Дата
								</th>
								<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">
									Описание
								</th>
								<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">
									Тип
								</th>
								<th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider">
									Сумма
								</th>
								<th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider">
									Чек
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{transactions.map((transaction) => (
								<tr
									key={transaction.id}
									className="hover:bg-gray-50/50 transition-colors"
								>
									<td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-foreground/70">
										{formatDate(new Date(transaction.date))}
									</td>
									<td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
										{transaction.description}
									</td>
									<td className="px-3 md:px-6 py-4 whitespace-nowrap">
										{transaction.type === "payment" ? (
											<span className="flex items-center text-sm text-green-600">
												<DollarSign
													size={14}
													className="mr-1"
												/>
												Оплата
											</span>
										) : (
											<span className="flex items-center text-sm text-amber-600">
												<Clock
													size={14}
													className="mr-1"
												/>
												Списание
											</span>
										)}
									</td>
									<td
										className={`px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
											transaction.amount > 0
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{formatCurrency(transaction.amount)}
									</td>
									<td className="px-3 md:px-6 py-4 whitespace-nowrap text-right">
										{transaction.receiptUrl && (
											<button
												onClick={() =>
													handleDownloadReceipt(
														transaction
													)
												}
												className="text-foreground/50 hover:text-secondary transition-colors"
												title="Download receipt"
											>
												<FileText size={18} />
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default BalancePage;

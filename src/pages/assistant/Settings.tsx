import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
	CreditCard,
	Building2,
	User2,
	FileText,
	Download,
	CheckCircle,
} from "lucide-react";

const Settings: React.FC = () => {
	const { user } = useApp();
	const [showContractModal, setShowContractModal] = useState(false);

	// В реальном приложении эти данные должны храниться в базе данных
	const bankDetails = {
		fullName: "Морозов Алексей Петрович",
		inn: "526317984062",
		accountNumber: "40817810099910004312",
		bik: "044525225",
		bankName: "ПАО Сбербанк",
	};

	// В реальном приложении эти данные должны храниться в базе данных
	const contractDetails = {
		status: "unsigned", // unsigned, signed
		signedDate: null,
		contractNumber: null,
	};

	// These would be actual functions in a real application
	const handleResetPassword = () => {
		alert("Здесь будет реализована функция сброса пароля");
	};

	const handleSignContract = () => {
		setShowContractModal(true);
	};

	const handleToggleNotifications = () => {
		alert("Здесь будут сохранены настройки уведомлений");
	};

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Настройки
				</h1>
				<p className="text-gray-600">
					Управление настройками аккаунта и предпочтениями
				</p>
			</div>

			<div className="space-y-6">
				{/* Агентский договор */}
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-800">
							Агентский договор
						</h2>
					</div>
					<div className="px-6 py-4">
						{contractDetails.status === "unsigned" ? (
							<div className="space-y-4">
								<div className="flex items-start gap-4">
									<div className="p-2 bg-gray-50 rounded-lg">
										<FileText className="w-6 h-6 text-gray-600" />
									</div>
									<div className="flex-1">
										<h3 className="font-medium text-gray-900">
											Агентский договор
										</h3>
										<p className="text-sm text-gray-600 mt-1">
											Для начала работы необходимо
											подписать агентский договор.
											Пожалуйста, ознакомьтесь с условиями
											и подпишите документ.
										</p>
									</div>
								</div>
								<div className="flex gap-3">
									<button
										className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs"
										onClick={() =>
											alert("Скачивание договора...")
										}
									>
										<Download size={16} className="mr-2" />
										Скачать договор
									</button>
									<button
										className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3 text-xs"
										onClick={handleSignContract}
									>
										Подписать договор
									</button>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<div className="flex items-start gap-4">
									<div className="p-2 bg-emerald-50 rounded-lg">
										<CheckCircle className="w-6 h-6 text-emerald-600" />
									</div>
									<div className="flex-1">
										<h3 className="font-medium text-gray-900">
											Договор подписан
										</h3>
										<div className="text-sm text-gray-600 mt-1 space-y-1">
											<p>
												Номер договора:{" "}
												{contractDetails.contractNumber}
											</p>
											<p>
												Дата подписания:{" "}
												{contractDetails.signedDate}
											</p>
										</div>
									</div>
								</div>
								<button
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs"
									onClick={() =>
										alert("Скачивание договора...")
									}
								>
									<Download size={16} className="mr-2" />
									Скачать копию договора
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Банковские реквизиты */}
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-800">
							Банковские реквизиты
						</h2>
					</div>
					<div className="px-6 py-4 space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<div>
									<div className="flex items-center gap-2 mb-2">
										<User2
											size={18}
											className="text-gray-500"
										/>
										<h3 className="text-base font-medium text-gray-800">
											ФИО
										</h3>
									</div>
									<p className="text-gray-600 font-mono">
										{bankDetails.fullName}
									</p>
								</div>
								<div>
									<div className="flex items-center gap-2 mb-2">
										<CreditCard
											size={18}
											className="text-gray-500"
										/>
										<h3 className="text-base font-medium text-gray-800">
											ИНН
										</h3>
									</div>
									<p className="text-gray-600 font-mono">
										{bankDetails.inn}
									</p>
								</div>
							</div>
							<div className="space-y-4">
								<div>
									<div className="flex items-center gap-2 mb-2">
										<Building2
											size={18}
											className="text-gray-500"
										/>
										<h3 className="text-base font-medium text-gray-800">
											Банк
										</h3>
									</div>
									<p className="text-gray-600">
										{bankDetails.bankName}
									</p>
									<div className="mt-2 space-y-1">
										<p className="text-sm text-gray-500">
											БИК:{" "}
											<span className="font-mono">
												{bankDetails.bik}
											</span>
										</p>
										<p className="text-sm text-gray-500">
											Номер счета:{" "}
											<span className="font-mono">
												{bankDetails.accountNumber}
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="pt-4 border-t border-gray-100">
							<button
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs"
								onClick={() =>
									alert(
										"Здесь будет форма редактирования реквизитов"
									)
								}
							>
								Изменить реквизиты
							</button>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-800">
							Настройки аккаунта
						</h2>
					</div>
					<div className="px-6 py-4 space-y-6">
						<div>
							<h3 className="text-base font-medium text-gray-800 mb-2">
								Email адрес
							</h3>
							<div className="flex items-center justify-between">
								<p className="text-gray-600">
									{user?.email || "email@example.com"}
								</p>
								<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs">
									Изменить Email
								</button>
							</div>
						</div>

						<div>
							<h3 className="text-base font-medium text-gray-800 mb-2">
								Пароль
							</h3>
							<div className="flex items-center justify-between">
								<p className="text-gray-600">••••••••••••</p>
								<button
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs"
									onClick={handleResetPassword}
								>
									Сбросить пароль
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-800">
							Уведомления
						</h2>
					</div>
					<div className="px-6 py-4 space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-base font-medium text-gray-800">
									Email уведомления
								</h3>
								<p className="text-sm text-gray-600">
									Получать обновления о проектах и задачах по
									email
								</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
									defaultChecked
									onChange={handleToggleNotifications}
								/>
								<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-base font-medium text-gray-800">
									Напоминания о задачах
								</h3>
								<p className="text-sm text-gray-600">
									Получать напоминания о приближающихся сроках
									задач
								</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
									defaultChecked
									onChange={handleToggleNotifications}
								/>
								<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-base font-medium text-gray-800">
									Обновления проектов
								</h3>
								<p className="text-sm text-gray-600">
									Получать уведомления об изменениях в ваших
									проектах
								</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
									onChange={handleToggleNotifications}
								/>
								<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-800">
							Данные и конфиденциальность
						</h2>
					</div>
					<div className="px-6 py-4 space-y-4">
						<h3 className="text-base font-medium text-gray-800">
							Политика конфиденциальности
						</h3>
						<p className="text-sm text-gray-600">
							Ваши данные важны для нас. Мы никогда не передаем
							вашу личную информацию третьим лицам без вашего
							согласия. Ознакомьтесь с нашей{" "}
							<a
								href="#"
								className="text-black hover:text-gray-800"
							>
								Политикой конфиденциальности
							</a>
							.
						</p>
					</div>
				</div>
			</div>

			{/* Модальное окно подписания договора */}
			{showContractModal && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
						<div className="px-6 py-4 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-800">
								Подписание договора
							</h3>
						</div>
						<div className="px-6 py-4">
							<div className="space-y-4">
								<div className="p-4 bg-gray-50 rounded-lg">
									<p className="text-sm text-gray-600">
										Нажимая кнопку "Подписать", вы
										подтверждаете, что:
									</p>
									<ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
										<li>
											Ознакомились с условиями договора
										</li>
										<li>
											Согласны с условиями сотрудничества
										</li>
										<li>
											Подтверждаете достоверность
											предоставленных данных
										</li>
									</ul>
								</div>
								<div className="flex items-start gap-2">
									<input
										type="checkbox"
										id="agreement"
										className="mt-1"
									/>
									<label
										htmlFor="agreement"
										className="text-sm text-gray-600"
									>
										Я подтверждаю, что прочитал(а) и
										согласен(на) с условиями агентского
										договора и даю согласие на обработку
										персональных данных
									</label>
								</div>
							</div>
						</div>
						<div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
							<button
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
								onClick={() => setShowContractModal(false)}
							>
								Отмена
							</button>
							<button
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
								onClick={() => {
									alert("Договор подписан");
									setShowContractModal(false);
								}}
							>
								Подписать договор
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Settings;

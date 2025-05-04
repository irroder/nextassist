import React, { useState } from "react";
import { Bell, Lock, Globe, Shield, Moon, Sun } from "lucide-react";
import { Button } from "../../components/ui/Button";

const SettingsPage: React.FC = () => {
	const [notifications, setNotifications] = useState({
		email: true,
		push: true,
		marketing: false,
	});
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [language, setLanguage] = useState("ru");

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Настройки
				</h1>
				<p className="text-gray-600">
					Управление настройками аккаунта и предпочтениями
				</p>
			</div>

			<div className="space-y-6">
				<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-secondary/20 transition-colors">
					<div className="flex items-center mb-6">
						<div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mr-4">
							<Bell size={20} />
						</div>
						<div>
							<h2 className="text-lg font-semibold text-foreground">
								Уведомления
							</h2>
							<p className="text-sm text-foreground/70">
								Управление способами и временем получения
								уведомлений
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium text-foreground">
									Email уведомления
								</h3>
								<p className="text-sm text-foreground/70">
									Получать уведомления на email
								</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={notifications.email}
									onChange={(e) =>
										setNotifications({
											...notifications,
											email: e.target.checked,
										})
									}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
							</label>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium text-foreground">
									Push уведомления
								</h3>
								<p className="text-sm text-foreground/70">
									Получать уведомления в браузере
								</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={notifications.push}
									onChange={(e) =>
										setNotifications({
											...notifications,
											push: e.target.checked,
										})
									}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
							</label>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium text-foreground">
									Маркетинговые рассылки
								</h3>
								<p className="text-sm text-foreground/70">
									Получать новости и предложения
								</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={notifications.marketing}
									onChange={(e) =>
										setNotifications({
											...notifications,
											marketing: e.target.checked,
										})
									}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
							</label>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-primary/20 transition-colors">
					<div className="flex items-center mb-6">
						<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
							<Lock size={20} />
						</div>
						<div>
							<h2 className="text-lg font-semibold text-foreground">
								Безопасность
							</h2>
							<p className="text-sm text-foreground/70">
								Управление безопасностью аккаунта
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium text-foreground">
									Пароль
								</h3>
								<p className="text-sm text-foreground/70">
									Изменить пароль
								</p>
							</div>
							<Button
								variant="outline"
								className="hover:border-primary hover:text-primary"
							>
								Изменить
							</Button>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium text-foreground">
									Двухфакторная аутентификация
								</h3>
								<p className="text-sm text-foreground/70">
									Дополнительная защита аккаунта
								</p>
							</div>
							<Button
								variant="outline"
								className="hover:border-primary hover:text-primary"
							>
								Настроить
							</Button>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-secondary/20 transition-colors">
					<div className="flex items-center mb-6">
						<div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mr-4">
							<Globe size={20} />
						</div>
						<div>
							<h2 className="text-lg font-semibold text-foreground">
								Внешний вид
							</h2>
							<p className="text-sm text-foreground/70">
								Настройка интерфейса
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium text-foreground">
									Тема оформления
								</h3>
								<p className="text-sm text-foreground/70">
									Выберите предпочтительную тему
								</p>
							</div>
							<div className="flex items-center space-x-2">
								<button
									onClick={() => setTheme("light")}
									className={`p-2 rounded-lg ${
										theme === "light"
											? "bg-secondary/10 text-secondary"
											: "text-foreground/50 hover:text-foreground"
									}`}
								>
									<Sun size={20} />
								</button>
								<button
									onClick={() => setTheme("dark")}
									className={`p-2 rounded-lg ${
										theme === "dark"
											? "bg-secondary/10 text-secondary"
											: "text-foreground/50 hover:text-foreground"
									}`}
								>
									<Moon size={20} />
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium text-foreground">
									Язык интерфейса
								</h3>
								<p className="text-sm text-foreground/70">
									Выберите предпочтительный язык
								</p>
							</div>
							<select
								value={language}
								onChange={(e) => setLanguage(e.target.value)}
								className="px-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
							>
								<option value="ru">Русский</option>
								<option value="en">English</option>
							</select>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-primary/20 transition-colors">
					<div className="flex items-center mb-6">
						<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
							<Shield size={20} />
						</div>
						<div>
							<h2 className="text-lg font-semibold text-foreground">
								Конфиденциальность
							</h2>
							<p className="text-sm text-foreground/70">
								Управление настройками конфиденциальности
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium text-foreground">
									Данные аккаунта
								</h3>
								<p className="text-sm text-foreground/70">
									Управление личными данными
								</p>
							</div>
							<Button
								variant="outline"
								className="hover:border-primary hover:text-primary"
							>
								Настроить
							</Button>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium text-foreground">
									Удаление аккаунта
								</h3>
								<p className="text-sm text-foreground/70">
									Безвозвратное удаление аккаунта
								</p>
							</div>
							<Button
								variant="outline"
								className="text-red-600 hover:text-red-700 hover:border-red-600"
							>
								Удалить
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SettingsPage;

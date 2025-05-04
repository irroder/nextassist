import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Camera, Save } from "lucide-react";
import { Button } from "../../components/ui/Button";

const ProfilePage: React.FC = () => {
	const { user } = useApp();
	const [editMode, setEditMode] = useState(false);
	const [name, setName] = useState(user?.firstName || "");
	const [fullName, setFullName] = useState(user?.lastName || "");
	const [email, setEmail] = useState(user?.email || "");
	const [inn, setInn] = useState(user?.inn || "");
	const [hasAcceptedOffer, setHasAcceptedOffer] = useState(
		user?.hasAcceptedOffer || false
	);

	const handleSave = () => {
		// In a real app, this would update the user data
		setEditMode(false);
	};

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Профиль
				</h1>
				<p className="text-gray-600">
					Управление личными данными и настройками аккаунта
				</p>
			</div>

			<div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100 hover:border-secondary/20 transition-colors">
				<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
					<div className="relative">
						<div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-2xl font-bold">
							{user?.firstName?.charAt(0).toUpperCase()}
						</div>
						<button
							className="absolute bottom-0 right-0 bg-secondary text-text p-2 rounded-full shadow-sm hover:bg-secondary/90 transition-colors"
							title="Изменить фото"
						>
							<Camera size={18} />
						</button>
					</div>
					<div className="flex-1 space-y-4 w-full">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-foreground/70"
								>
									Имя
								</label>
								{editMode ? (
									<input
										type="text"
										id="name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
										placeholder="Введите ваше имя"
									/>
								) : (
									<p className="text-foreground font-medium">
										{user?.firstName}
									</p>
								)}
							</div>
							<div className="space-y-2">
								<label className="block text-sm font-medium text-foreground/70">
									ФИО
								</label>
								{editMode ? (
									<input
										type="text"
										value={fullName}
										onChange={(e) =>
											setFullName(e.target.value)
										}
										className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
										placeholder="Введите ваше полное имя"
									/>
								) : (
									<p className="text-foreground">
										{fullName || "Не указано"}
									</p>
								)}
							</div>
							<div className="space-y-2">
								<label className="block text-sm font-medium text-foreground/70">
									Email
								</label>
								{editMode ? (
									<input
										type="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
										placeholder="Введите ваш email"
									/>
								) : (
									<p className="text-foreground">
										{email || "Не указано"}
									</p>
								)}
							</div>
							<div className="space-y-2">
								<label className="block text-sm font-medium text-foreground/70">
									ИНН
								</label>
								{editMode ? (
									<input
										type="text"
										value={inn}
										onChange={(e) =>
											setInn(
												e.target.value
													.replace(/\D/g, "")
													.slice(0, 12)
											)
										}
										className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
										placeholder="Введите ваш ИНН"
										maxLength={12}
									/>
								) : (
									<p className="text-foreground">
										{inn || "Не указано"}
									</p>
								)}
							</div>
						</div>

						<div className="pt-4">
							<div className="flex items-center">
								{editMode ? (
									<label className="flex items-center space-x-2 text-sm text-foreground/70">
										<input
											type="checkbox"
											checked={hasAcceptedOffer}
											onChange={(e) =>
												setHasAcceptedOffer(
													e.target.checked
												)
											}
											className="h-4 w-4 text-secondary border-gray-300 rounded focus:ring-secondary"
										/>
										<span>
											Я принимаю условия{" "}
											<a
												href="#"
												className="text-secondary hover:text-secondary/90"
											>
												публичной оферты
											</a>
										</span>
									</label>
								) : (
									<div className="text-sm text-foreground/70">
										Согласие с офертой:{" "}
										<span
											className={
												hasAcceptedOffer
													? "text-green-600"
													: "text-red-600"
											}
										>
											{hasAcceptedOffer
												? "Принято"
												: "Не принято"}
										</span>
									</div>
								)}
							</div>
						</div>

						{editMode && (
							<div className="flex flex-col sm:flex-row gap-3 pt-6">
								<Button
									variant="default"
									onClick={handleSave}
									className="w-full sm:w-auto bg-secondary hover:bg-secondary/90"
								>
									<Save size={16} className="mr-2" />
									Сохранить изменения
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfilePage;

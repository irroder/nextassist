import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Edit, Upload, Camera, Save, Award } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { format, parseISO } from "date-fns";

const ProfilePage: React.FC = () => {
	const { user, userCourses } = useApp();
	const [editMode, setEditMode] = useState(false);
	const [name, setName] = useState(user?.firstName || "");
	const [fullName, setFullName] = useState(user?.lastName || "");
	const [email, setEmail] = useState(user?.email || "");
	const [inn, setInn] = useState(user?.inn || "");
	const [hasAcceptedOffer, setHasAcceptedOffer] = useState(
		user?.hasAcceptedOffer || false
	);

	const handleSave = () => {
		// Here you would typically make an API call to update the user data
		// For now, we'll just update the local state
		if (user) {
			user.firstName = name;
			user.lastName = fullName;
			user.email = email;
			user.inn = inn;
			user.hasAcceptedOffer = hasAcceptedOffer;
		}
		setEditMode(false);
	};

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Профиль
				</h1>
				<p className="text-gray-600">Управление личными данными</p>
			</div>

			{/* Profile Hero */}
			<div className="relative bg-secondary text-foreground rounded-xl overflow-hidden mb-8">
				<div className="relative z-10 px-8 py-12 md:px-12 md:py-16 lg:py-20">
					<div className="flex flex-col md:flex-row items-center md:items-start gap-8">
						<div className="relative group">
							<div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-md transition-transform hover:scale-105">
								{user?.avatar ? (
									<img
										src={user.avatar}
										alt={user.firstName}
										className="w-full h-full object-cover"
										onError={(e) => {
											const target =
												e.target as HTMLImageElement;
											target.style.display = "none";
											const initials = user.firstName
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase();
											const parent = target.parentElement;
											if (parent) {
												parent.innerHTML = `
													<div class="w-full h-full flex items-center justify-center bg-gray-400 text-white font-medium">
														${initials}
													</div>
												`;
											}
										}}
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center bg-gray-400 text-white font-medium text-2xl">
										{user?.firstName
											?.charAt(0)
											.toUpperCase()}
									</div>
								)}
							</div>
							<button
								className="absolute bottom-0 right-0 bg-primary text-foreground p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
								aria-label="Change profile photo"
							>
								<Camera size={16} />
							</button>
						</div>

						<div className="text-center md:text-left md:flex-1">
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
								<div>
									<h1 className="text-3xl font-bold">
										{user?.firstName}
									</h1>
									<p className="mt-2 text-foreground/80 max-w-2xl">
										{user?.bio || "Менеджер проектов"}
									</p>
								</div>

								<div className="flex flex-col sm:flex-row gap-3">
									<button
										className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-foreground text-foreground hover:bg-foreground/10 hover:border-foreground hover:text-foreground focus:ring-foreground h-8 px-3 text-xs"
										onClick={() => setEditMode(!editMode)}
									>
										<Edit size={16} className="mr-2" />
										Редактировать профиль
									</button>
									<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-foreground text-foreground hover:bg-foreground/10 hover:border-foreground hover:text-foreground focus:ring-foreground h-8 px-3 text-xs">
										<Upload size={16} className="mr-2" />
										Загрузить документы
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Personal Information Section */}
			<div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100 hover:border-secondary/20 transition-colors">
				<div className="flex items-center mb-6">
					<div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mr-4">
						<Edit size={20} />
					</div>
					<div>
						<h2 className="text-lg font-semibold text-foreground">
							Личная информация
						</h2>
						<p className="text-sm text-foreground/70">
							Управление личными данными
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
					<div className="space-y-2">
						<label className="block text-sm font-medium text-foreground/70">
							Имя
						</label>
						{editMode ? (
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
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
								onChange={(e) => setFullName(e.target.value)}
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
								onChange={(e) => setEmail(e.target.value)}
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

				{/* Offer Agreement */}
				<div className="border-t border-gray-100 pt-6">
					<div className="flex items-start space-x-3">
						<input
							type="checkbox"
							id="offer-agreement"
							checked={hasAcceptedOffer}
							onChange={(e) =>
								setHasAcceptedOffer(e.target.checked)
							}
							className="mt-1 h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
						/>
						<label
							htmlFor="offer-agreement"
							className="text-sm text-foreground/70"
						>
							Я принимаю условия{" "}
							<a
								href="/offer-agreement"
								target="_blank"
								rel="noopener noreferrer"
								className="text-secondary hover:underline"
							>
								договора оферты
							</a>
							. Ознакомлен и согласен с условиями использования
							сервиса, обработки персональных данных и политикой
							конфиденциальности.
						</label>
					</div>

					{!hasAcceptedOffer && (
						<p className="text-sm text-red-600 mt-2">
							Для полноценного использования сервиса необходимо
							принять условия договора оферты
						</p>
					)}
				</div>

				{editMode && (
					<div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 mt-6">
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

			{/* Courses Section */}
			<div className="bg-white rounded-2xl shadow-sm mb-8 border border-gray-100 hover:border-secondary/20 transition-colors">
				<div className="px-6 py-4 border-b border-gray-100">
					<h2 className="text-lg font-semibold text-foreground">
						Курсы и сертификаты
					</h2>
				</div>
				<div className="p-6">
					{userCourses.length === 0 ? (
						<div className="text-center py-8 text-foreground/70">
							<p>Курсы и сертификаты пока не добавлены</p>
						</div>
					) : (
						<div className="space-y-4">
							{userCourses.map((course) => (
								<div
									key={course.id}
									className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
								>
									<div className="flex items-start">
										<div className="p-2 bg-gray-50 rounded-xl mr-4">
											<Award
												className="text-black"
												size={20}
											/>
										</div>
										<div>
											<h3 className="font-medium text-foreground">
												{course.title}
											</h3>
											<p className="text-sm text-foreground/70 mt-1">
												Завершен{" "}
												{format(
													parseISO(
														course.completedDate
													),
													"MMMM d, yyyy"
												)}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ProfilePage;

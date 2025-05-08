import React, { useState } from "react";
import {
	Share2,
	Plus,
	Edit,
	Trash2,
	Calendar,
	Award,
	Upload,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { WorkExperience, Skill } from "../../types";
import { availableSkills } from "../../data/mockData";
import { format, parseISO } from "date-fns";

// Form Interfaces
interface ExperienceFormData {
	id?: string;
	company: string;
	position: string;
	startDate: string;
	endDate: string | null;
	description: string;
}

interface SkillFormData {
	id?: string;
	name: string;
	category: string;
}

const defaultExperienceForm: ExperienceFormData = {
	company: "",
	position: "",
	startDate: "",
	endDate: null,
	description: "",
};

const defaultSkillForm: SkillFormData = {
	name: "",
	category: "Frontend",
};

const categories = [
	"Frontend",
	"Backend",
	"Database",
	"DevOps",
	"UI/UX",
	"Other",
];

const Profile: React.FC = () => {
	const {
		user,
		experiences,
		userSkills,
		userCourses,
		addExperience,
		updateExperience,
		deleteExperience,
		addSkill,
		updateSkill,
		deleteSkill,
	} = useApp();

	// Experience Modal State
	const [showExperienceModal, setShowExperienceModal] = useState(false);
	const [experienceForm, setExperienceForm] = useState<ExperienceFormData>(
		defaultExperienceForm
	);
	const [isEditingExperience, setIsEditingExperience] = useState(false);

	// Skills Modal State
	const [showSkillModal, setShowSkillModal] = useState(false);
	const [skillForm, setSkillForm] = useState<SkillFormData>(defaultSkillForm);
	const [isEditingSkill, setIsEditingSkill] = useState(false);

	const handleShare = async () => {
		const shareUrl = `${window.location.origin}/profile`;

		if (navigator.share) {
			try {
				await navigator.share({
					title: "Профиль на БезРук",
					text: "Посмотрите мой профиль на платформе БезРук",
					url: shareUrl,
				});
			} catch (error) {
				console.log("Ошибка при попытке поделиться:", error);
			}
		} else {
			try {
				await navigator.clipboard.writeText(shareUrl);
				alert("Ссылка скопирована в буфер обмена");
			} catch (error) {
				console.log("Ошибка при копировании ссылки:", error);
			}
		}
	};

	// Experience Handlers
	const resetExperienceForm = () => {
		setExperienceForm(defaultExperienceForm);
		setIsEditingExperience(false);
	};

	const handleOpenExperienceModal = (experience?: WorkExperience) => {
		if (experience) {
			setExperienceForm({
				id: experience.id,
				company: experience.company,
				position: experience.position,
				startDate: experience.startDate,
				endDate: experience.endDate,
				description: experience.description,
			});
			setIsEditingExperience(true);
		} else {
			resetExperienceForm();
		}
		setShowExperienceModal(true);
	};

	const handleCloseExperienceModal = () => {
		setShowExperienceModal(false);
		resetExperienceForm();
	};

	const handleExperienceInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setExperienceForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleExperienceCheckboxChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (e.target.checked) {
			setExperienceForm((prev) => ({ ...prev, endDate: null }));
		} else {
			setExperienceForm((prev) => ({ ...prev, endDate: "" }));
		}
	};

	const handleExperienceSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (isEditingExperience && experienceForm.id) {
			updateExperience(experienceForm as WorkExperience);
		} else {
			addExperience(experienceForm);
		}

		handleCloseExperienceModal();
	};

	// Skills Handlers
	const resetSkillForm = () => {
		setSkillForm(defaultSkillForm);
		setIsEditingSkill(false);
	};

	const handleOpenSkillModal = (skill?: Skill) => {
		if (skill) {
			setSkillForm({
				id: skill.id,
				name: skill.name,
				category: skill.category,
			});
			setIsEditingSkill(true);
		} else {
			resetSkillForm();
		}
		setShowSkillModal(true);
	};

	const handleCloseSkillModal = () => {
		setShowSkillModal(false);
		resetSkillForm();
	};

	const handleSkillInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setSkillForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSkillSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (isEditingSkill && skillForm.id) {
			updateSkill(skillForm as Skill);
		} else {
			addSkill(skillForm);
		}

		handleCloseSkillModal();
	};

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "Present";
		return format(parseISO(dateString), "MMM yyyy");
	};

	return (
		<>
			<div className="flex justify-end mb-6">
				<div className="flex gap-3">
					<button
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-gray-50 h-9 px-4 py-2"
						onClick={handleShare}
					>
						<Share2 size={18} className="mr-2" />
						Поделиться профилем
					</button>
				</div>
			</div>

			{/* Profile Hero */}
			<div className="relative bg-secondary text-foreground rounded-xl overflow-hidden mb-8">
				<div className="relative z-10 px-8 py-12 md:px-12 md:py-16 lg:py-20">
					<div className="flex flex-col md:flex-row items-center md:items-start gap-8">
						<div className="relative group">
							<div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-md transition-transform hover:scale-105">
								<img
									src={user?.avatar}
									alt={user?.firstName}
									className="w-full h-full object-cover"
									onError={(e) => {
										const target =
											e.target as HTMLImageElement;
										target.style.display = "none";
										const initials = user?.firstName
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
							</div>
							<button
								className="absolute bottom-0 right-0 bg-primary text-foreground p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
								aria-label="Change profile photo"
							>
								<Edit size={16} />
							</button>
						</div>

						<div className="text-center md:text-left md:flex-1">
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
								<div>
									<h1 className="text-3xl font-bold">
										{user?.firstName}
									</h1>
									<p className="mt-2 text-foreground/80 max-w-2xl">
										{user?.bio}
									</p>
								</div>

								<div className="flex flex-col sm:flex-row gap-3">
									<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-foreground text-foreground hover:bg-foreground/10 hover:border-foreground hover:text-foreground focus:ring-foreground h-8 px-3 text-xs">
										<Edit size={16} className="mr-2" />
										Редактировать профиль
									</button>
									<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-foreground text-foreground hover:bg-foreground/10 hover:border-foreground hover:text-foreground focus:ring-foreground h-8 px-3 text-xs">
										<Upload size={16} className="mr-2" />
										Загрузить видео
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6">
					{/* Experience Section */}
					<div className="bg-white rounded-xl shadow-sm mb-8">
						<div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
							<h2 className="text-xl font-semibold text-gray-800">
								Опыт работы
							</h2>
							<button
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 text-xs"
								onClick={() => handleOpenExperienceModal()}
							>
								<Plus size={16} className="mr-2" />
								Добавить опыт
							</button>
						</div>
						<div className="p-6 space-y-6">
							{experiences.length === 0 ? (
								<div className="text-center py-8 text-gray-500">
									<p>Опыт работы пока не добавлен</p>
									<button
										className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs mt-2"
										onClick={() =>
											handleOpenExperienceModal()
										}
									>
										Добавить первый опыт работы
									</button>
								</div>
							) : (
								experiences.map((experience) => (
									<div
										key={experience.id}
										className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
									>
										<div className="flex justify-between items-start">
											<div>
												<h3 className="font-semibold text-lg text-gray-800">
													{experience.position}
												</h3>
												<p className="text-gray-700">
													{experience.company}
												</p>
												<div className="flex items-center text-gray-500 text-sm mt-1">
													<Calendar
														size={14}
														className="mr-1"
													/>
													<span>
														{formatDate(
															experience.startDate
														)}{" "}
														-{" "}
														{formatDate(
															experience.endDate
														)}
													</span>
												</div>
											</div>
											<div className="flex space-x-2">
												<button
													className="text-gray-400 hover:text-blue-600 transition-colors"
													onClick={() =>
														handleOpenExperienceModal(
															experience
														)
													}
													aria-label="Edit experience"
												>
													<Edit size={18} />
												</button>
												<button
													className="text-gray-400 hover:text-red-600 transition-colors"
													onClick={() =>
														deleteExperience(
															experience.id
														)
													}
													aria-label="Delete experience"
												>
													<Trash2 size={18} />
												</button>
											</div>
										</div>
										<p className="mt-2 text-gray-600 text-sm">
											{experience.description}
										</p>
									</div>
								))
							)}
						</div>
					</div>

					{/* Courses Section */}
					<div className="bg-white rounded-xl shadow-sm mb-8">
						<div className="px-6 py-4 border-b border-gray-100">
							<h2 className="text-xl font-semibold text-gray-800">
								Курсы и сертификаты
							</h2>
						</div>
						<div className="p-6">
							{userCourses.length === 0 ? (
								<div className="text-center py-8 text-gray-500">
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
													<h3 className="font-medium text-gray-800">
														{course.title}
													</h3>
													<p className="text-sm text-gray-500 mt-1">
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
				</div>

				<div>
					{/* Skills Section */}
					<div className="bg-white rounded-xl shadow-sm mb-8">
						<div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
							<h2 className="text-xl font-semibold text-gray-800">
								Навыки
							</h2>
							<button
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 text-xs"
								onClick={() => handleOpenSkillModal()}
							>
								<Plus size={16} className="mr-2" />
								Добавить навык
							</button>
						</div>
						<div className="p-6">
							<div className="space-y-4">
								{userSkills.length === 0 ? (
									<div className="text-center py-8 text-gray-500">
										<p>Навыки пока не добавлены</p>
										<button
											className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs mt-2"
											onClick={() =>
												handleOpenSkillModal()
											}
										>
											Добавить первый навык
										</button>
									</div>
								) : (
									userSkills.map((skill) => (
										<div
											key={skill.id}
											className="border border-gray-100 rounded-lg p-4 flex justify-between items-center hover:shadow-sm transition-shadow"
										>
											<div className="flex items-center gap-2">
												<h3 className="font-medium text-gray-800">
													{skill.name}
												</h3>
											</div>
											<div className="flex space-x-2">
												<button
													className="text-gray-400 hover:text-blue-600 transition-colors"
													onClick={() =>
														handleOpenSkillModal(
															skill
														)
													}
													aria-label="Edit skill"
												>
													<Edit size={18} />
												</button>
												<button
													className="text-gray-400 hover:text-red-600 transition-colors"
													onClick={() =>
														deleteSkill(skill.id)
													}
													aria-label="Delete skill"
												>
													<Trash2 size={18} />
												</button>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Experience Modal */}
			{showExperienceModal && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
						<div className="px-6 py-4 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-800">
								{isEditingExperience
									? "Редактировать опыт"
									: "Добавить опыт"}
							</h3>
						</div>
						<form onSubmit={handleExperienceSubmit}>
							<div className="px-6 py-4 space-y-4">
								<div>
									<label
										htmlFor="company"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Компания
									</label>
									<input
										type="text"
										id="company"
										name="company"
										value={experienceForm.company}
										onChange={handleExperienceInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="position"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Должность
									</label>
									<input
										type="text"
										id="position"
										name="position"
										value={experienceForm.position}
										onChange={handleExperienceInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="startDate"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Дата начала
									</label>
									<input
										type="date"
										id="startDate"
										name="startDate"
										value={experienceForm.startDate}
										onChange={handleExperienceInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div>
									<div className="flex items-center mb-2">
										<label
											htmlFor="endDate"
											className="block text-sm font-medium text-gray-700 mr-2"
										>
											Дата окончания
										</label>
										<div className="flex items-center">
											<input
												type="checkbox"
												id="currentlyWorking"
												checked={
													experienceForm.endDate ===
													null
												}
												onChange={
													handleExperienceCheckboxChange
												}
												className="mr-1"
											/>
											<label
												htmlFor="currentlyWorking"
												className="text-sm text-gray-600"
											>
												Я работаю здесь в настоящее
												время
											</label>
										</div>
									</div>
									{experienceForm.endDate !== null && (
										<input
											type="date"
											id="endDate"
											name="endDate"
											value={experienceForm.endDate || ""}
											onChange={
												handleExperienceInputChange
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									)}
								</div>
								<div>
									<label
										htmlFor="description"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Описание
									</label>
									<textarea
										id="description"
										name="description"
										value={experienceForm.description}
										onChange={handleExperienceInputChange}
										rows={3}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
										required
									/>
								</div>
							</div>
							<div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
								<button
									type="button"
									onClick={handleCloseExperienceModal}
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
								>
									Отмена
								</button>
								<button
									type="submit"
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
								>
									{isEditingExperience
										? "Сохранить"
										: "Добавить"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Skills Modal */}
			{showSkillModal && (
				<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full">
						<div className="px-6 py-4 border-b border-gray-200">
							<h3 className="text-lg font-semibold text-gray-800">
								{isEditingSkill
									? "Редактировать навык"
									: "Добавить навык"}
							</h3>
						</div>
						<form onSubmit={handleSkillSubmit}>
							<div className="px-6 py-4 space-y-4">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Выберите навык
									</label>
									<select
										id="name"
										name="name"
										value={skillForm.name}
										onChange={handleSkillInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									>
										<option value="">Выберите навык</option>
										{availableSkills
											.filter((skill) =>
												skillForm.category
													? skill.category ===
													  skillForm.category
													: true
											)
											.map((skill) => (
												<option
													key={skill.name}
													value={skill.name}
												>
													{skill.name}
												</option>
											))}
									</select>
								</div>
								<div>
									<label
										htmlFor="category"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Категория
									</label>
									<select
										id="category"
										name="category"
										value={skillForm.category}
										onChange={handleSkillInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										{categories.map((category) => (
											<option
												key={category}
												value={category}
											>
												{category}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
								<button
									type="button"
									onClick={handleCloseSkillModal}
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
								>
									Отмена
								</button>
								<button
									type="submit"
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
								>
									{isEditingSkill ? "Сохранить" : "Добавить"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;

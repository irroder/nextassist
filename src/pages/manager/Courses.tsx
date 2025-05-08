import React from "react";
import { useApp } from "../../context/AppContext";
import { BookOpen, Clock, Award } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const Courses: React.FC = () => {
	const { userCourses } = useApp();
	const navigate = useNavigate();

	// In a real app, these would come from an API
	const availableCourses = [
		{
			id: "course-1",
			title: "Основы проектного управления",
			description:
				"Изучите фундаментальные принципы управления проектами, методологии и лучшие практики.",
			duration: "6 недель",
			level: "Начальный",
			enrolled: false,
		},
		{
			id: "course-2",
			title: "Agile и Scrum для команд",
			description:
				"Погрузитесь в мир гибких методологий разработки и узнайте, как эффективно применять Scrum.",
			duration: "8 недель",
			level: "Средний",
			enrolled: true,
		},
		{
			id: "course-3",
			title: "Продвинутое управление рисками",
			description:
				"Научитесь идентифицировать, оценивать и управлять рисками в проектах любой сложности.",
			duration: "4 недели",
			level: "Продвинутый",
			enrolled: false,
		},
	];

	const formatDate = (dateString: string) => {
		return format(parseISO(dateString), "MMMM d, yyyy");
	};

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Курсы и обучение
				</h1>
				<p className="text-gray-600">
					Развивайте свои навыки с нашими специализированными курсами
				</p>
			</div>

			{/* Completed Courses Section */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-800">
						Завершенные курсы
					</h2>
				</div>
				<div className="px-6 py-4">
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
									<div className="flex-1">
										<div className="flex items-start justify-between">
											<div>
												<h3 className="font-medium text-gray-800">
													{course.title}
												</h3>
												<p className="text-sm text-gray-500 mt-1">
													Завершен{" "}
													{formatDate(
														course.completedDate
													)}
												</p>
											</div>
											<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
												Завершен
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Available Courses Section */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-800">
						Доступные курсы
					</h2>
				</div>
				<div className="px-6 py-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{availableCourses.map((course) => (
							<div
								key={course.id}
								className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
							>
								<div className="flex items-center justify-between mb-4">
									<div className="p-2 bg-gray-50 rounded-xl">
										<BookOpen
											className="text-black"
											size={20}
										/>
									</div>
									<span
										className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
											course.enrolled
												? "bg-primary text-primary-foreground"
												: "bg-secondary text-secondary-foreground"
										}`}
									>
										{course.enrolled
											? "Записаны"
											: "Доступен"}
									</span>
								</div>

								<h3 className="text-lg font-medium text-gray-800 mb-2">
									{course.title}
								</h3>
								<p className="text-gray-600 text-sm mb-4">
									{course.description}
								</p>

								<div className="space-y-2 mb-4">
									<div className="flex items-center text-sm text-gray-500">
										<Clock size={14} className="mr-2" />
										Длительность: {course.duration}
									</div>
									<div className="flex items-center text-sm text-gray-500">
										<BookOpen size={14} className="mr-2" />
										Уровень: {course.level}
									</div>
								</div>

								<button
									className={`w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 ${
										course.enrolled
											? "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
											: "bg-primary text-primary-foreground shadow hover:bg-primary/90"
									}`}
									onClick={() =>
										navigate(
											`/manager/courses/${course.id}/lessons`
										)
									}
								>
									{course.enrolled
										? "Продолжить обучение"
										: "Смотреть"}
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Courses;

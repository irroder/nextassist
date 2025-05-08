import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, CheckCircle } from "lucide-react";

const CourseLessons: React.FC = () => {
	// This would come from your API in a real application
	const courseLessons = [
		{
			id: "1",
			title: "Введение в курс",
			duration: "15:30",
			completed: true,
			videoUrl: "https://example.com/video1",
		},
		{
			id: "2",
			title: "Основные принципы",
			duration: "23:45",
			completed: true,
			videoUrl: "https://example.com/video2",
		},
		{
			id: "3",
			title: "Практическое применение",
			duration: "18:20",
			completed: false,
			videoUrl: "https://example.com/video3",
		},
		{
			id: "4",
			title: "Продвинутые техники",
			duration: "27:15",
			completed: false,
			videoUrl: "https://example.com/video4",
		},
	];

	const [selectedLesson, setSelectedLesson] = React.useState(
		courseLessons[0]
	);

	return (
		<>
			<div className="mb-8">
				<Link
					to="/assistant/courses"
					className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Назад к курсам
				</Link>
				<h1 className="text-2xl font-bold text-gray-900">
					Основы проектного управления
				</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Video Player Section */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
						<div className="aspect-video bg-gray-900 rounded-t-lg relative">
							<div className="absolute inset-0 flex items-center justify-center">
								<Play className="w-16 h-16 text-white opacity-80" />
							</div>
						</div>
						<div className="px-6 py-4">
							<h2 className="text-xl font-semibold mb-2">
								{selectedLesson.title}
							</h2>
							<p className="text-gray-600">
								Длительность: {selectedLesson.duration}
							</p>
						</div>
					</div>
				</div>

				{/* Lessons List */}
				<div>
					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						<div className="px-6 py-4 border-b border-gray-200">
							<h2 className="text-lg font-semibold">
								Уроки курса
							</h2>
						</div>
						<div className="p-0">
							<div className="divide-y divide-gray-100">
								{courseLessons.map((lesson) => (
									<button
										key={lesson.id}
										className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
											selectedLesson.id === lesson.id
												? "bg-gray-50"
												: ""
										}`}
										onClick={() =>
											setSelectedLesson(lesson)
										}
									>
										<div className="flex-shrink-0">
											{lesson.completed ? (
												<CheckCircle className="w-5 h-5 text-green-500" />
											) : (
												<Play className="w-5 h-5 text-gray-400" />
											)}
										</div>
										<div className="flex-grow text-left">
											<h3 className="font-medium text-gray-900">
												{lesson.title}
											</h3>
											<p className="text-sm text-gray-500">
												{lesson.duration}
											</p>
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseLessons;

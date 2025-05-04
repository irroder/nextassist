import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { TaskCard } from "../../components/assistent/projects/TaskCard";
import { TaskComments } from "../../components/both/TaskComments";
import { ReportSection } from "../../components/assistent/reports/ReportSection";
import { useApp } from "../../context/AppContext";
import { Task } from "../../types";

const ProjectDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { getProject, getProjectTasks } = useApp();

	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
	const [taskFilter, setTaskFilter] = useState<string | null>(null);

	const project = getProject(id || "");
	const tasks = getProjectTasks(id || "");

	if (!project) {
		return (
			<>
				<div className="text-center py-12">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Проект не найден
					</h2>
					<p className="text-gray-600 mb-6">
						Проект, который вы ищете, не существует или был удален.
					</p>
					<Link to="/assistant/projects">
						<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
							Вернуться к проектам
						</button>
					</Link>
				</div>
			</>
		);
	}

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "В процессе";
		return format(parseISO(dateString), "MMMM d, yyyy");
	};

	const handleTaskSelect = (task: Task) => {
		setSelectedTask(task);
		setShowTaskDetailModal(true);
	};

	const closeTaskDetailModal = () => {
		setSelectedTask(null);
		setShowTaskDetailModal(false);
	};

	const filteredTasks = tasks.filter((task) => {
		if (!taskFilter) return true;
		return task.status === taskFilter;
	});

	const taskStatusOptions = [
		{ value: null, label: "Все задачи" },
		{ value: "new", label: "Новые" },
		{ value: "in_progress", label: "В работе" },
		{ value: "completed", label: "Завершенные" },
	];

	return (
		<>
			<div className="mb-12">
				<Link
					to="/assistant/projects"
					className="inline-flex items-center text-[#2c2b2a] hover:opacity-80 transition-opacity mb-6"
				>
					<ArrowLeft size={16} className="mr-1" />
					Назад к проектам
				</Link>

				<div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
					<div className="flex-1">
						<h1 className="text-2xl md:text-3xl font-bold text-[#2c2b2a] mb-3">
							{project.title}
						</h1>
						<p className="text-[#2c2b2a]/80 text-base md:text-lg mb-4 max-w-2xl">
							{project.description}
						</p>
					</div>
					<span className="inline-flex items-center justify-center bg-[#edf64d] text-[#2c2b2a] font-medium px-4 py-2 rounded-lg self-start shadow-sm">
						{project.status === "active" ? "Активный" : "Завершен"}
					</span>
				</div>

				<div className="flex flex-wrap gap-4 text-sm mb-8">
					<div className="flex items-center text-[#2c2b2a]/70 bg-white/50 px-4 py-2 rounded-lg">
						<User size={16} className="mr-2" />
						<span>Руководитель: {project.managerName}</span>
					</div>
					<div className="flex items-center text-[#2c2b2a]/70 bg-white/50 px-4 py-2 rounded-lg">
						<Calendar size={16} className="mr-2" />
						<span>
							{formatDate(project.startDate)} -{" "}
							{formatDate(project.endDate)}
						</span>
					</div>
				</div>
			</div>

			<ReportSection projectId={id || ""} />

			<div className="bg-white shadow-sm border-0 rounded-lg">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 px-4 sm:px-6 py-4 gap-4">
					<h2 className="text-xl sm:text-2xl font-semibold text-[#2c2b2a]">
						Задачи
					</h2>
				</div>
				<div className="p-4 sm:p-6">
					<div className="mb-6 flex flex-wrap gap-2">
						{taskStatusOptions.map((option) => (
							<button
								key={option.value || "all"}
								className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 ${
									taskFilter === option.value
										? "bg-primary text-primary-foreground shadow-sm"
										: "bg-white text-foreground hover:bg-accent hover:text-accent-foreground border border-input"
								}`}
								onClick={() => setTaskFilter(option.value)}
							>
								{option.label}
							</button>
						))}
					</div>
					{filteredTasks.length === 0 ? (
						<div className="text-center py-12 bg-white/50 rounded-lg">
							<p className="text-lg text-muted-foreground mb-4">
								Задачи не найдены
							</p>
						</div>
					) : (
						<div className="space-y-3">
							{filteredTasks.map((task) => (
								<TaskCard
									key={task.id}
									task={task}
									onSelect={handleTaskSelect}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Task Detail Modal */}
			{showTaskDetailModal && selectedTask && (
				<div
					className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							closeTaskDetailModal();
						}
					}}
				>
					<div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
						<div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
							<h3 className="text-lg font-semibold text-gray-800">
								{selectedTask.title}
							</h3>
							<button
								className="text-gray-400 hover:text-gray-600 p-1"
								onClick={closeTaskDetailModal}
								aria-label="Close"
							>
								&times;
							</button>
						</div>
						<div className="px-4 sm:px-6 py-4 flex-1 overflow-y-auto">
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
								<div className="flex space-x-2">
									<span
										className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
											selectedTask.status === "completed"
												? "bg-green-100 text-green-800"
												: selectedTask.status === "new"
												? "bg-yellow-100 text-yellow-800"
												: "bg-blue-100 text-blue-800"
										}`}
									>
										{selectedTask.status === "new"
											? "Новая"
											: selectedTask.status ===
											  "in_progress"
											? "В работе"
											: "Завершена"}
									</span>
								</div>

								<div className="flex items-center text-sm text-gray-500">
									<Clock size={14} className="mr-1" />
									{selectedTask.deadline
										? format(
												parseISO(selectedTask.deadline),
												"MMM d, yyyy"
										  )
										: "Без срока"}
								</div>
							</div>

							<p className="text-gray-700 mb-6 whitespace-pre-wrap">
								{selectedTask.description}
							</p>

							<div className="border-t border-gray-200 pt-4 mt-4">
								<TaskComments task={selectedTask} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProjectDetail;

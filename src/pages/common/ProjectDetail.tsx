import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronDown, Plus } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { TaskCard } from "../../components/both/TaskCard";
import { TaskComments } from "../../components/both/TaskComments";
import { ReportSection } from "../../components/assistent/reports/ReportSection";
import { useApp } from "../../context/AppContext";
import { Task } from "../../types";
import { Button } from "../../components/ui/Button";

interface TaskFormData {
	title: string;
	description: string;
	priority: "high" | "medium" | "low";
	deadline: string;
}

const defaultTaskForm: TaskFormData = {
	title: "",
	description: "",
	priority: "medium",
	deadline: "",
};

const ProjectDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { getProject, getProjectTasks, addTask, deleteTask, user } = useApp();

	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [taskForm, setTaskForm] = useState<TaskFormData>(defaultTaskForm);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showPriorityPicker, setShowPriorityPicker] = useState(false);
	const [showArchive, setShowArchive] = useState(false);

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

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTaskForm((prev) => ({ ...prev, [name]: value }));
	};

	const handlePrioritySelect = (priority: "high" | "medium" | "low") => {
		setTaskForm((prev) => ({ ...prev, priority }));
		setShowPriorityPicker(false);
	};

	const handleDateSelect = (date: string) => {
		setTaskForm((prev) => ({ ...prev, deadline: date }));
		setShowDatePicker(false);
	};

	const handleSubmitTask = (e: React.FormEvent) => {
		e.preventDefault();

		if (!id || !user) return;

		addTask({
			title: taskForm.title,
			description: taskForm.description,
			priority: taskForm.priority,
			deadline: taskForm.deadline || null,
			status: "new",
			projectId: id,
			createdBy: user.id,
			comments: [],
			completedAt: null,
		});

		setTaskForm(defaultTaskForm);
		setIsAddingTask(false);
	};

	const handleDeleteTask = (taskId: string) => {
		deleteTask(taskId);
	};

	const getPriorityLabel = (priority: string) => {
		switch (priority) {
			case "high":
				return "Высокий";
			case "medium":
				return "Средний";
			case "low":
				return "Низкий";
			default:
				return "Средний";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "bg-[#bcb4ff]/10 text-foreground";
			case "medium":
				return "bg-[#bcb4ff]/10 text-foreground";
			case "low":
				return "bg-[#bcb4ff]/10 text-foreground";
			default:
				return "bg-[#bcb4ff]/10 text-foreground";
		}
	};

	const filteredTasks = tasks.filter((task) => {
		if (showArchive) {
			return task.status === "completed";
		}
		return task.status !== "completed";
	});

	const getStatusBadge = (status: string) => {
		return (
			<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#edf64d]/10 text-foreground">
				{status === "new"
					? "Новая"
					: status === "in_progress"
					? "В работе"
					: "Завершена"}
			</span>
		);
	};

	const getPriorityBadge = (priority: string) => {
		return (
			<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#bcb4ff]/10 text-foreground">
				{getPriorityLabel(priority)}
			</span>
		);
	};

	const formatDeadline = (deadline: string | null) => {
		if (!deadline) return "Без срока";
		return format(new Date(deadline), "d MMMM yyyy", { locale: ru });
	};

	return (
		<>
			<div className="mb-8">
				<Link
					to="/assistant/projects"
					className="flex items-center text-foreground/70 hover:text-foreground mb-6 transition-colors"
				>
					<ArrowLeft size={18} className="mr-2" />
					Назад к проектам
				</Link>

				<h1 className="text-2xl font-bold text-foreground mb-2">
					{project.assistantTitle}
				</h1>
				{project.assistantDescription && (
					<p className="text-foreground/70">
						{project.assistantDescription}
					</p>
				)}
			</div>

			<ReportSection projectId={id || ""} />

			{isAddingTask && user?.role === "manager" && (
				<div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100 hover:border-[#bcb4ff]/20 transition-colors">
					<h2 className="text-xl font-semibold text-foreground mb-6">
						Добавить задачу
					</h2>
					<form onSubmit={handleSubmitTask} className="space-y-4">
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium text-foreground/70 mb-2"
							>
								Название задачи
							</label>
							<input
								type="text"
								id="title"
								name="title"
								value={taskForm.title}
								onChange={handleInputChange}
								className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#edf64d]/20 focus:border-[#edf64d] bg-[#faf6f1]"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium text-foreground/70 mb-2"
							>
								Описание
							</label>
							<textarea
								id="description"
								name="description"
								value={taskForm.description}
								onChange={handleInputChange}
								rows={3}
								className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#edf64d]/20 focus:border-[#edf64d] bg-[#faf6f1] resize-none"
								required
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="relative">
								<label
									htmlFor="priority"
									className="block text-sm font-medium text-foreground/70 mb-2"
								>
									Приоритет
								</label>
								<button
									type="button"
									onClick={() =>
										setShowPriorityPicker(
											!showPriorityPicker
										)
									}
									className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#edf64d]/20 focus:border-[#edf64d] bg-[#faf6f1] flex items-center justify-between"
								>
									<span
										className={getPriorityColor(
											taskForm.priority
										)}
									>
										{getPriorityLabel(taskForm.priority)}
									</span>
									<ChevronDown
										size={16}
										className="text-foreground/50"
									/>
								</button>
								{showPriorityPicker && (
									<div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
										<div className="p-1">
											<button
												type="button"
												onClick={() =>
													handlePrioritySelect("high")
												}
												className="w-full px-4 py-2 text-left text-sm hover:bg-[#faf6f1] rounded-lg flex items-center"
											>
												<span className="w-2 h-2 rounded-full bg-[#bcb4ff] mr-2"></span>
												Высокий приоритет
											</button>
											<button
												type="button"
												onClick={() =>
													handlePrioritySelect(
														"medium"
													)
												}
												className="w-full px-4 py-2 text-left text-sm hover:bg-[#faf6f1] rounded-lg flex items-center"
											>
												<span className="w-2 h-2 rounded-full bg-[#bcb4ff] mr-2"></span>
												Средний приоритет
											</button>
											<button
												type="button"
												onClick={() =>
													handlePrioritySelect("low")
												}
												className="w-full px-4 py-2 text-left text-sm hover:bg-[#faf6f1] rounded-lg flex items-center"
											>
												<span className="w-2 h-2 rounded-full bg-[#bcb4ff] mr-2"></span>
												Низкий приоритет
											</button>
										</div>
									</div>
								)}
							</div>

							<div className="relative">
								<label
									htmlFor="deadline"
									className="block text-sm font-medium text-foreground/70 mb-2"
								>
									Дедлайн
								</label>
								<button
									type="button"
									onClick={() =>
										setShowDatePicker(!showDatePicker)
									}
									className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#edf64d]/20 focus:border-[#edf64d] bg-[#faf6f1] flex items-center justify-between"
								>
									<span className="text-foreground">
										{taskForm.deadline
											? format(
													new Date(taskForm.deadline),
													"d MMMM yyyy",
													{
														locale: ru,
													}
											  )
											: "Выберите дату"}
									</span>
									<Calendar
										size={16}
										className="text-foreground/50"
									/>
								</button>
								{showDatePicker && (
									<div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
										<input
											type="date"
											name="deadline"
											value={taskForm.deadline}
											onChange={(e) =>
												handleDateSelect(e.target.value)
											}
											className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#edf64d]/20 focus:border-[#edf64d] bg-[#faf6f1]"
											min={format(
												new Date(),
												"yyyy-MM-dd"
											)}
										/>
									</div>
								)}
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 pt-4">
							<Button
								type="submit"
								variant="default"
								className="w-full sm:w-auto bg-[#edf64d] text-foreground hover:bg-[#edf64d]/90 shadow-sm"
							>
								Добавить задачу
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsAddingTask(false)}
								className="w-full sm:w-auto bg-white border border-gray-200 hover:bg-[#faf6f1] text-foreground"
							>
								Отмена
							</Button>
						</div>
					</form>
				</div>
			)}

			<div className="bg-white rounded-2xl shadow-sm border border-gray-100">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 px-4 sm:px-6 py-4 gap-4">
					<h2 className="text-xl sm:text-2xl font-semibold text-foreground">
						Задачи
					</h2>
					{user?.role === "manager" && (
						<div className="w-full sm:w-auto">
							<Button
								variant="default"
								onClick={() => setIsAddingTask(true)}
								className="w-full sm:w-auto bg-[#edf64d] text-foreground hover:bg-[#edf64d]/90 shadow-sm"
							>
								<Plus size={20} className="mr-2" />
								Добавить задачу
							</Button>
						</div>
					)}
				</div>

				<div className="p-4 sm:p-6">
					<div className="mb-6 flex flex-wrap gap-2">
						<button
							className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 ${
								!showArchive
									? "bg-[#edf64d] text-foreground shadow-sm"
									: "bg-white text-foreground hover:bg-[#faf6f1] border border-gray-200"
							}`}
							onClick={() => setShowArchive(false)}
						>
							Активные задачи
						</button>
						<button
							className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 ${
								showArchive
									? "bg-[#edf64d] text-foreground shadow-sm"
									: "bg-white text-foreground hover:bg-[#faf6f1] border border-gray-200"
							}`}
							onClick={() => setShowArchive(true)}
						>
							Архив
						</button>
					</div>

					{filteredTasks.length === 0 ? (
						<div className="text-center py-12 bg-[#faf6f1]/50 rounded-lg">
							<p className="text-lg text-foreground/70 mb-4">
								{showArchive
									? "В архиве нет завершенных задач"
									: "Нет активных задач"}
							</p>
							{!showArchive && user?.role === "manager" && (
								<Button
									variant="default"
									onClick={() => setIsAddingTask(true)}
									className="bg-[#edf64d] text-foreground hover:bg-[#edf64d]/90 shadow-sm"
								>
									Добавить первую задачу
								</Button>
							)}
						</div>
					) : (
						<div className="space-y-4">
							{filteredTasks.map((task) => (
								<TaskCard
									key={task.id}
									task={task}
									onDelete={handleDeleteTask}
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
							setSelectedTask(null);
							setShowTaskDetailModal(false);
						}
					}}
				>
					<div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
						<div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
							<h3 className="text-lg font-semibold text-foreground">
								{selectedTask.title}
							</h3>
							<button
								className="text-foreground/70 hover:text-foreground p-1"
								onClick={(e) => {
									e.stopPropagation();
									setSelectedTask(null);
									setShowTaskDetailModal(false);
								}}
								aria-label="Close"
							>
								&times;
							</button>
						</div>
						<div className="px-4 sm:px-6 py-4 flex-1 overflow-y-auto">
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
								<div className="flex space-x-2">
									{getStatusBadge(selectedTask.status)}
									{getPriorityBadge(selectedTask.priority)}
									<span
										className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#edf64d]/10 text-foreground ${
											selectedTask.status === "completed"
												? "line-through text-foreground/40"
												: ""
										}`}
									>
										<Calendar size={12} className="mr-1" />
										{formatDeadline(selectedTask.deadline)}
									</span>
								</div>
							</div>

							<p className="text-foreground/70 mb-6 whitespace-pre-wrap">
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

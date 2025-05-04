import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import TaskList from "../../components/manager/tasks/TaskList";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useParams, useNavigate } from "react-router-dom";

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

const AssistantDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { userProjects, addTask, updateTask, deleteTask, user } = useApp();

	const [isAddingTask, setIsAddingTask] = useState(false);
	const [taskForm, setTaskForm] = useState<TaskFormData>(defaultTaskForm);

	const currentProject = userProjects.find((p) => p.id === id);

	if (!currentProject) {
		return (
			<div className="min-h-screen bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center">
						<h1 className="text-2xl font-bold text-foreground">
							Ассистент не найден
						</h1>
						<Button
							variant="outline"
							onClick={() => navigate("/manager/dashboard")}
							className="mt-4"
						>
							<ArrowLeft size={16} className="mr-2" />
							Вернуться к списку
						</Button>
					</div>
				</div>
			</div>
		);
	}

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setTaskForm((prev) => ({ ...prev, [name]: value }));
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
			assignedTo: id, // ID ассистента
			comments: [],
			completedAt: null,
			reports: [],
		});

		setTaskForm(defaultTaskForm);
		setIsAddingTask(false);
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<button
					className="flex items-center text-foreground/70 hover:text-foreground mb-6 transition-colors"
					onClick={() => navigate("/manager/dashboard")}
				>
					<ArrowLeft size={18} className="mr-2" />
					Назад к ассистентам
				</button>

				<div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100 hover:border-secondary/20 transition-colors">
					<h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
						{currentProject.title}
					</h1>
					{currentProject.description && (
						<p className="text-foreground/70 text-base sm:text-lg">
							{currentProject.description}
						</p>
					)}
				</div>

				{isAddingTask ? (
					<div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100 hover:border-secondary/20 transition-colors">
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
									className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
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
									className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background resize-none"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="priority"
									className="block text-sm font-medium text-foreground/70 mb-2"
								>
									Приоритет
								</label>
								<select
									id="priority"
									name="priority"
									value={taskForm.priority}
									onChange={handleInputChange}
									className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
								>
									<option value="low">Низкий</option>
									<option value="medium">Средний</option>
									<option value="high">Высокий</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="deadline"
									className="block text-sm font-medium text-foreground/70 mb-2"
								>
									Срок выполнения (необязательно)
								</label>
								<input
									type="date"
									id="deadline"
									name="deadline"
									value={taskForm.deadline}
									onChange={handleInputChange}
									className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
								/>
							</div>

							<div className="flex flex-col sm:flex-row gap-3 pt-4">
								<Button
									type="submit"
									variant="default"
									className="w-full sm:w-auto bg-secondary hover:bg-secondary/90"
								>
									Добавить задачу
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsAddingTask(false)}
									className="w-full sm:w-auto hover:border-secondary hover:text-secondary"
								>
									Отмена
								</Button>
							</div>
						</form>
					</div>
				) : null}

				<TaskList
					project={currentProject}
					onUpdateTask={updateTask}
					onDeleteTask={deleteTask}
					onAddTask={() => setIsAddingTask(true)}
				/>
			</div>
		</div>
	);
};

export default AssistantDetailPage;

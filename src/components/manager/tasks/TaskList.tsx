import React, { useState } from "react";
import { Project, Task } from "../../../types";
import { Plus } from "lucide-react";
import { Button } from "../../ui/Button";
import TaskItem from "./TaskItem";
import { useApp } from "../../../context/AppContext";

interface TaskListProps {
	project: Project;
	onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
	onDeleteTask: (taskId: string) => void;
	onAddTask: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
	project,
	onUpdateTask,
	onDeleteTask,
	onAddTask,
}) => {
	const { user } = useApp();
	const [taskFilter, setTaskFilter] = useState<string | null>(null);

	const filteredTasks = project.tasks.filter((task) => {
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
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 px-4 sm:px-6 py-4 gap-4">
				<h2 className="text-xl sm:text-2xl font-semibold text-foreground">
					Задачи
				</h2>
				{user?.role === "manager" && (
					<div className="w-full sm:w-auto">
						<Button
							variant="default"
							onClick={onAddTask}
							className="w-full sm:w-auto bg-secondary hover:bg-secondary/90"
						>
							<Plus size={20} className="mr-2" />
							Добавить задачу
						</Button>
					</div>
				)}
			</div>

			<div className="p-4 sm:p-6">
				<div className="mb-6 flex flex-wrap gap-2">
					{taskStatusOptions.map((option) => (
						<button
							key={option.value || "all"}
							className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 ${
								taskFilter === option.value
									? "bg-secondary text-white shadow-sm"
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
						{user?.role === "manager" && (
							<Button
								variant="default"
								onClick={onAddTask}
								className="bg-secondary hover:bg-secondary/90"
							>
								Добавить первую задачу
							</Button>
						)}
					</div>
				) : (
					<div className="space-y-4">
						{filteredTasks.map((task) => (
							<TaskItem
								key={task.id}
								task={task}
								onUpdate={onUpdateTask}
								onDelete={onDeleteTask}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskList;

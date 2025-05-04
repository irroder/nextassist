import React from "react";
import {
	Clock,
	MessageCircle,
	CheckCircle2,
	X,
	Flag,
	ArrowUpRight,
} from "lucide-react";
import { format, parseISO, isPast } from "date-fns";
import { Task } from "../../../types";
import { useApp } from "../../../context/AppContext";
import confetti from "canvas-confetti";

interface TaskCardProps {
	task: Task;
	onSelect: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onSelect }) => {
	const { updateTask, getTaskComments, acceptTask, declineTask } = useApp();

	const comments = getTaskComments(task.id);

	const triggerConfetti = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "No deadline";
		return format(parseISO(dateString), "MMM d, yyyy");
	};

	const isPastDeadline =
		task.deadline &&
		isPast(parseISO(task.deadline)) &&
		task.status !== "completed";

	const getPriorityColor = (priority: Task["priority"]) => {
		switch (priority) {
			case "high":
				return "text-red-500";
			case "medium":
				return "text-yellow-500";
			case "low":
				return "text-blue-500";
			default:
				return "text-gray-500";
		}
	};

	const getStatusBadge = () => {
		switch (task.status) {
			case "new":
				return (
					<span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
						Новая
					</span>
				);
			case "in_progress":
				return (
					<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
						В работе
					</span>
				);
			case "completed":
				return (
					<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
						Завершена
					</span>
				);
			case "accepted":
				return (
					<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
						Принята
					</span>
				);
			case "declined":
				return (
					<span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
						Отклонена
					</span>
				);
			default:
				return null;
		}
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		if (e.target.checked) {
			updateTask(task.id, { ...task, status: "completed" });
			triggerConfetti();
		} else {
			updateTask(task.id, { ...task, status: "in_progress" });
		}
	};

	return (
		<div
			className={`bg-white rounded-xl shadow-sm group hover:shadow-md transition-all cursor-pointer relative ${
				isPastDeadline ? "border-red-200" : "border-gray-100"
			}`}
			onClick={() => onSelect(task)}
		>
			<div className="p-4 sm:p-6">
				<div className="flex flex-col sm:flex-row sm:items-start gap-4">
					<div className="flex-grow min-w-0">
						<div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
							<div className="flex items-center gap-3">
								<label className="relative flex items-center">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={task.status === "completed"}
										onChange={handleCheckboxChange}
										disabled={
											task.status === "new" ||
											task.status === "declined"
										}
									/>
									<div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-green-500 peer-checked:bg-green-500 transition-colors">
										{task.status === "completed" && (
											<CheckCircle2 className="w-full h-full text-white" />
										)}
									</div>
								</label>
								<div className="flex items-center gap-2">
									<Flag
										className={`w-4 h-4 sm:w-5 sm:h-5 ${getPriorityColor(
											task.priority
										)}`}
									/>
									<h3 className="font-semibold text-gray-900 text-base sm:text-lg">
										{task.title}
									</h3>
								</div>
							</div>
							<div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
								{getStatusBadge()}
								<ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
							</div>
						</div>

						<p className="text-gray-600 text-sm sm:text-base line-clamp-2 mb-4">
							{task.description}
						</p>

						<div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
							<div
								className={`flex items-center ${
									isPastDeadline
										? "text-red-500 font-medium"
										: ""
								}`}
							>
								<Clock size={14} className="mr-1.5" />
								{formatDate(task.deadline)}
								{isPastDeadline && " (Просрочено)"}
							</div>
							{comments.length > 0 && (
								<div className="flex items-center">
									<MessageCircle
										size={14}
										className="mr-1.5"
									/>
									{comments.length} комментариев
								</div>
							)}
						</div>

						{task.status === "new" && (
							<div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
								<button
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 h-8 px-3 text-xs"
									onClick={(e) => {
										e.stopPropagation();
										acceptTask(task.id);
									}}
								>
									Принять
								</button>
								<button
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-50 text-gray-600 hover:bg-gray-100 h-8 px-3 text-xs"
									onClick={(e) => {
										e.stopPropagation();
										declineTask(task.id);
									}}
								>
									<X size={16} className="mr-2" />
									Отказаться
								</button>
							</div>
						)}
						{task.status === "accepted" && (
							<div className="mt-4">
								<button
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-sky-50 text-sky-700 hover:bg-sky-100 h-8 px-3 text-xs"
									onClick={(e) => {
										e.stopPropagation();
										updateTask(task.id, {
											...task,
											status: "in_progress",
										});
									}}
								>
									Начать работу
								</button>
							</div>
						)}
						{task.status === "in_progress" && (
							<div className="mt-4">
								<p className="text-xs sm:text-sm text-gray-500">
									Отметьте галочку, чтобы завершить задачу
								</p>
							</div>
						)}
						{task.status === "completed" && (
							<div className="mt-4">
								<button
									className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-sky-50 text-sky-700 hover:bg-sky-100 h-8 px-3 text-xs"
									onClick={(e) => {
										e.stopPropagation();
										updateTask(task.id, {
											...task,
											status: "in_progress",
										});
									}}
								>
									Возобновить
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

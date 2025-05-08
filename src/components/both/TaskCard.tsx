import React, { useState } from "react";
import {
	MessageSquare,
	Trash2,
	AlertTriangle,
	CheckCircle2,
	Pencil,
} from "lucide-react";
import { Task } from "../../types";
import { format, parseISO } from "date-fns";
import { TaskComments } from "./TaskComments";
import { useApp } from "../../context/AppContext";
import confetti from "canvas-confetti";

interface TaskCardProps {
	task: Task;
	onDelete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
	const { updateTask, acceptTask, declineTask, user } = useApp();
	const [showChatModal, setShowChatModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editForm, setEditForm] = useState({
		title: task.title,
		description: task.description,
		priority: task.priority,
		deadline: task.deadline,
	});

	const isAssistant = user?.role === "assistant";
	const isManager = user?.role === "manager";
	const canEditTask =
		(isAssistant && task.createdBy === user?.id) || isManager;
	const canDeleteTask =
		(isAssistant && task.createdBy === user?.id) || isManager;
	const canManageTask = isAssistant && task.createdBy !== user?.id;

	const triggerConfetti = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	const handleComplete = () => {
		if (task.status === "completed") {
			updateTask(task.id, {
				status: "in_progress",
				completedAt: null,
			});
		} else {
			updateTask(task.id, {
				status: "completed",
				completedAt: new Date().toISOString(),
			});
			triggerConfetti();
		}
	};

	const handleAccept = () => {
		acceptTask(task.id);
	};
	const handleStartWork = () => {
		updateTask(task.id, {
			status: "in_progress",
		});
	};

	const handleDecline = () => {
		declineTask(task.id);
		onDelete(task.id);
	};

	const handleEdit = () => {
		setShowEditModal(true);
	};

	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateTask(task.id, {
			...task,
			...editForm,
		});
		setShowEditModal(false);
	};

	const formatDeadline = (deadline: string | null) => {
		if (!deadline) return "Без срока";
		return format(parseISO(deadline), "d MMM yyyy");
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "new":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#edf64d]/10 text-foreground">
						Новая
					</span>
				);
			case "in_progress":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#edf64d]/10 text-foreground">
						В работе
					</span>
				);
			case "completed":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#edf64d]/10 text-foreground">
						Завершена
					</span>
				);
			case "accepted":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#edf64d]/10 text-foreground">
						Принята
					</span>
				);
			case "declined":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#edf64d]/10 text-foreground">
						Отклонена
					</span>
				);
			default:
				return null;
		}
	};

	const getPriorityBadge = (priority: string) => {
		switch (priority) {
			case "high":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#bcb4ff]/10 text-foreground">
						Высокий приоритет
					</span>
				);
			case "medium":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#bcb4ff]/10 text-foreground">
						Средний приоритет
					</span>
				);
			case "low":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#bcb4ff]/10 text-foreground">
						Низкий приоритет
					</span>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<div
				className={`bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 ${
					task.status === "completed" ? "opacity-75" : ""
				}`}
			>
				<div className="p-4">
					<div className="flex items-start gap-4">
						<button
							onClick={handleComplete}
							className={`mt-1 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
								task.status === "completed"
									? "bg-[#edf64d] text-foreground hover:bg-[#edf64d]/90"
									: "bg-[#faf6f1] text-foreground/70 hover:bg-[#faf6f1]/80"
							}`}
							disabled={
								task.status === "new" ||
								task.status === "declined"
							}
						>
							<CheckCircle2 size={20} />
						</button>

						<div className="flex-1 min-w-0">
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1 min-w-0">
									<h3
										className={`text-base font-medium text-foreground mb-1 transition-all duration-200 ${
											task.status === "completed"
												? "line-through text-foreground/50"
												: ""
										}`}
									>
										{task.title}
									</h3>
									<p
										className={`text-sm text-foreground/70 line-clamp-2 transition-all duration-200 ${
											task.status === "completed"
												? "line-through text-foreground/40"
												: ""
										}`}
									>
										{task.description}
									</p>
								</div>
								<div className="flex items-center gap-2">
									{canEditTask && (
										<button
											onClick={handleEdit}
											className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white shadow-sm hover:bg-[#faf6f1] hover:text-foreground h-8 px-3"
											title="Редактировать задачу"
										>
											<Pencil size={16} />
										</button>
									)}
									<button
										onClick={() => setShowChatModal(true)}
										className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white shadow-sm hover:bg-[#faf6f1] hover:text-foreground h-8 px-3"
										title="Открыть чат"
									>
										<MessageSquare size={16} />
									</button>
									{canDeleteTask && (
										<button
											onClick={() =>
												setShowDeleteModal(true)
											}
											className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white shadow-sm hover:bg-[#faf6f1] hover:text-foreground h-8 px-3"
											title="Удалить задачу"
										>
											<Trash2 size={16} />
										</button>
									)}
								</div>
							</div>

							<div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-foreground/70">
								{getStatusBadge(task.status)}
								{getPriorityBadge(task.priority)}
								<span
									className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
										task.status === "completed"
											? "bg-white/50 text-foreground/40 line-through"
											: task.deadline &&
											  new Date(task.deadline) <
													new Date()
											? "bg-red-100 text-red-700"
											: "bg-white text-foreground"
									}`}
								>
									Дедлайн: {formatDeadline(task.deadline)}
								</span>
							</div>

							{task.status === "new" && canManageTask && (
								<div className="flex flex-wrap gap-2 mt-4">
									<button
										className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-foreground hover:bg-[#edf64d]/90 h-8 px-4 shadow-sm"
										onClick={handleAccept}
									>
										Принять
									</button>
									<button
										className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-foreground border border-gray-200 hover:bg-[#faf6f1] h-8 px-4"
										onClick={handleDecline}
									>
										Отказаться
									</button>
								</div>
							)}

							{task.status === "accepted" && canManageTask && (
								<div className="flex flex-wrap gap-2 mt-4">
									<button
										className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#edf64d] text-foreground hover:bg-[#edf64d]/90 h-8 px-4 shadow-sm"
										onClick={handleStartWork}
									>
										Начать работу
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Chat Modal */}
			{showChatModal && (
				<div
					className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
					style={{ margin: 0 }}
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							setShowChatModal(false);
						}
					}}
				>
					<div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
						<div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
							<h3 className="text-lg font-semibold text-foreground">
								Чат задачи: {task.title}
							</h3>
							<button
								className="text-foreground/70 hover:text-foreground p-1"
								onClick={() => setShowChatModal(false)}
								aria-label="Close"
							>
								&times;
							</button>
						</div>
						<div className="px-4 sm:px-6 py-4 flex-1 overflow-y-auto">
							<TaskComments task={task} />
						</div>
					</div>
				</div>
			)}

			{/* Edit Modal */}
			{showEditModal && (
				<div
					className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
					style={{ margin: 0 }}
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							setShowEditModal(false);
						}
					}}
				>
					<div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-lg font-semibold text-foreground">
								Редактировать задачу
							</h3>
							<button
								className="text-foreground/70 hover:text-foreground p-1"
								onClick={() => setShowEditModal(false)}
								aria-label="Close"
							>
								&times;
							</button>
						</div>
						<form onSubmit={handleEditSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="edit-title"
									className="block text-sm font-medium text-foreground/70 mb-2"
								>
									Название
								</label>
								<input
									type="text"
									id="edit-title"
									value={editForm.title}
									onChange={(e) =>
										setEditForm((prev) => ({
											...prev,
											title: e.target.value,
										}))
									}
									className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#edf64d]/20 focus:border-[#edf64d] bg-[#faf6f1]"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="edit-description"
									className="block text-sm font-medium text-foreground/70 mb-2"
								>
									Описание
								</label>
								<textarea
									id="edit-description"
									value={editForm.description}
									onChange={(e) =>
										setEditForm((prev) => ({
											...prev,
											description: e.target.value,
										}))
									}
									rows={3}
									className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#edf64d]/20 focus:border-[#edf64d] bg-[#faf6f1] resize-none"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="edit-deadline"
									className="block text-sm font-medium text-foreground/70 mb-2"
								>
									Дедлайн
								</label>
								<input
									type="date"
									id="edit-deadline"
									value={editForm.deadline || ""}
									onChange={(e) =>
										setEditForm((prev) => ({
											...prev,
											deadline: e.target.value,
										}))
									}
									className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#edf64d]/20 focus:border-[#edf64d] bg-[#faf6f1]"
								/>
							</div>
							<div className="flex justify-end gap-3 pt-4">
								<button
									type="button"
									onClick={() => setShowEditModal(false)}
									className="px-4 py-2 text-sm font-medium text-foreground bg-white border border-gray-200 rounded-lg hover:bg-[#faf6f1]"
								>
									Отмена
								</button>
								<button
									type="submit"
									className="px-4 py-2 text-sm font-medium text-foreground bg-[#edf64d] rounded-lg hover:bg-[#edf64d]/90 shadow-sm"
								>
									Сохранить
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{showDeleteModal && (
				<div
					className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
					style={{ margin: 0 }}
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							setShowDeleteModal(false);
						}
					}}
				>
					<div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
						<div className="flex items-center gap-4 mb-4">
							<div className="p-2 bg-[#bcb4ff]/10 rounded-full">
								<AlertTriangle
									className="text-foreground"
									size={24}
								/>
							</div>
							<h3 className="text-lg font-semibold text-foreground">
								Удаление задачи
							</h3>
						</div>
						<p className="text-foreground/70 mb-6">
							Вы уверены, что хотите удалить задачу "{task.title}
							"? Это действие нельзя будет отменить.
						</p>
						<div className="flex justify-end gap-3">
							<button
								onClick={() => setShowDeleteModal(false)}
								className="px-4 py-2 text-sm font-medium text-foreground bg-white border border-gray-200 rounded-lg hover:bg-[#faf6f1]"
							>
								Отмена
							</button>
							<button
								onClick={() => {
									onDelete(task.id);
									setShowDeleteModal(false);
								}}
								className="px-4 py-2 text-sm font-medium text-foreground bg-[#edf64d] rounded-lg hover:bg-[#edf64d]/90 shadow-sm"
							>
								Удалить
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

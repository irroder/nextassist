import React, { useState } from "react";
import { Check, MessageSquare, FileText, Trash2 } from "lucide-react";
import { Task } from "../../../types";
import { format, parseISO } from "date-fns";
import { TaskComments } from "../../both/TaskComments";

interface TaskItemProps {
	task: Task;
	onUpdate: (taskId: string, updates: Partial<Task>) => void;
	onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onUpdate,
	onDelete,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);
	const [editedDescription, setEditedDescription] = useState(
		task.description
	);
	const [showChatModal, setShowChatModal] = useState(false);

	const handleComplete = () => {
		onUpdate(task.id, {
			status: task.status === "completed" ? "in_progress" : "completed",
			completedAt:
				task.status === "completed" ? null : new Date().toISOString(),
		});
	};

	const handleSave = () => {
		onUpdate(task.id, {
			title: editedTitle,
			description: editedDescription,
		});
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedTitle(task.title);
		setEditedDescription(task.description);
	};

	const formatDeadline = (deadline: string | null) => {
		if (!deadline) return "Без срока";
		return format(parseISO(deadline), "d MMM yyyy");
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "new":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
						Новая
					</span>
				);
			case "in_progress":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
						В работе
					</span>
				);
			case "completed":
				return (
					<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
						Завершена
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
					isExpanded ? "shadow-md" : ""
				}`}
			>
				<div className="p-4">
					<div className="flex items-start gap-4">
						<button
							onClick={handleComplete}
							className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
								task.status === "completed"
									? "bg-primary border-primary"
									: "border-gray-300 hover:border-primary"
							}`}
						>
							{task.status === "completed" && (
								<Check size={16} className="text-white" />
							)}
						</button>

						<div className="flex-1 min-w-0">
							{isEditing ? (
								<div className="space-y-3">
									<input
										type="text"
										value={editedTitle}
										onChange={(e) =>
											setEditedTitle(e.target.value)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="Название задачи"
									/>
									<textarea
										value={editedDescription}
										onChange={(e) =>
											setEditedDescription(e.target.value)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
										rows={3}
										placeholder="Описание задачи"
									/>
									<div className="flex justify-end gap-2">
										<button
											onClick={handleCancel}
											className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4"
										>
											Отмена
										</button>
										<button
											onClick={handleSave}
											className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4"
										>
											Сохранить
										</button>
									</div>
								</div>
							) : (
								<>
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1 min-w-0">
											<h3 className="text-base font-medium text-gray-900 mb-1">
												{task.title}
											</h3>
											<p className="text-sm text-gray-500 line-clamp-2">
												{task.description}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<button
												onClick={() =>
													setShowChatModal(true)
												}
												className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3"
												title="Открыть чат"
											>
												<MessageSquare size={16} />
											</button>
											<button
												onClick={(e) => {
													e.stopPropagation();
													onDelete(task.id);
												}}
												className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 h-8 px-3"
												title="Удалить задачу"
											>
												<Trash2 size={16} />
											</button>
											<button
												onClick={() =>
													setIsExpanded(!isExpanded)
												}
												className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3"
												title={
													isExpanded
														? "Свернуть"
														: "Развернуть"
												}
											>
												{isExpanded ? "−" : "+"}
											</button>
										</div>
									</div>

									<div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
										{getStatusBadge(task.status)}
										<span className="flex items-center">
											<FileText
												size={14}
												className="mr-1"
											/>
											{task.comments.length} комментариев
										</span>
										<span>
											{formatDeadline(task.deadline)}
										</span>
									</div>

									{isExpanded && (
										<div className="mt-4 pt-4 border-t border-gray-100">
											<div className="space-y-4">
												<div>
													<h4 className="text-sm font-medium text-gray-900 mb-2">
														Описание
													</h4>
													<p className="text-sm text-gray-600 whitespace-pre-wrap">
														{task.description}
													</p>
												</div>

												{task.reports &&
													task.reports.length > 0 && (
														<div>
															<h4 className="text-sm font-medium text-gray-900 mb-2">
																Отчеты
															</h4>
															<div className="space-y-2">
																{task.reports.map(
																	(
																		report
																	) => (
																		<div
																			key={
																				report.id
																			}
																			className="bg-gray-50 rounded-lg p-3"
																		>
																			<h5 className="text-sm font-medium text-gray-900 mb-1">
																				{
																					report.title
																				}
																			</h5>
																			<p className="text-sm text-gray-600 mb-2">
																				{
																					report.content
																				}
																			</p>
																			<div className="text-xs text-gray-500">
																				{format(
																					parseISO(
																						report.createdAt
																					),
																					"d MMM yyyy, HH:mm"
																				)}
																			</div>
																		</div>
																	)
																)}
															</div>
														</div>
													)}
											</div>
										</div>
									)}
								</>
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
							<h3 className="text-lg font-semibold text-gray-800">
								Чат задачи: {task.title}
							</h3>
							<button
								className="text-gray-400 hover:text-gray-600 p-1"
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
		</>
	);
};

export default TaskItem;

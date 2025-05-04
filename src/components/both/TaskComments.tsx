import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Task } from "../../types";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Send, Smile } from "lucide-react";
import { ru } from "date-fns/locale";

interface TaskCommentsProps {
	task: Task;
}

const getInitials = (name: string) => {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();
};

const Avatar = ({ src, name }: { src: string; name: string }) => {
	const [imgError, setImgError] = useState(false);

	if (imgError || !src) {
		return (
			<div className="w-full h-full bg-secondary/10 text-secondary flex items-center justify-center font-medium text-sm">
				{getInitials(name)}
			</div>
		);
	}

	return (
		<img
			src={src}
			alt={name}
			className="w-full h-full object-cover"
			onError={() => setImgError(true)}
		/>
	);
};

export const TaskComments: React.FC<TaskCommentsProps> = ({ task }) => {
	const { getTaskComments, addComment, user } = useApp();
	const [commentText, setCommentText] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const comments = getTaskComments(task.id);

	const handleSubmitComment = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!commentText.trim()) return;

		setIsSubmitting(true);

		addComment({
			taskId: task.id,
			userId: user?.id || "",
			userName: user?.firstName || "",
			userPhoto: user?.avatar || "",
			content: commentText,
		});

		setCommentText("");
		setIsSubmitting(false);
	};

	const getFormattedTime = (dateString: string) => {
		return formatDistanceToNow(parseISO(dateString), {
			addSuffix: true,
			locale: ru,
		});
	};

	return (
		<div className="flex flex-col h-full">
			<form
				onSubmit={handleSubmitComment}
				className="pt-3 sm:pt-4 bg-white"
			>
				<div className="flex items-start gap-2 sm:gap-3">
					<div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex-shrink-0">
						<Avatar
							src={user?.avatar || ""}
							name={user?.firstName || ""}
						/>
					</div>
					<div className="flex-1 min-w-0">
						<div className="relative">
							<textarea
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
								placeholder="Добавить комментарий..."
								className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary resize-none min-h-[60px] sm:min-h-[80px] text-sm sm:text-base"
								rows={2}
							/>
							<div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-2">
								<button
									type="button"
									className="p-1 sm:p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
									onClick={() =>
										alert("Эмодзи будут добавлены позже")
									}
								>
									<Smile
										size={18}
										className="sm:w-5 sm:h-5"
									/>
								</button>
							</div>
						</div>
						<div className="mt-2 flex justify-end">
							<button
								type="submit"
								className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/20 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-white hover:bg-secondary/90"
								disabled={!commentText.trim() || isSubmitting}
							>
								<Send
									size={14}
									className={`sm:w-4 sm:h-4 ${
										isSubmitting ? "animate-pulse" : ""
									}`}
								/>
								Отправить
							</button>
						</div>
					</div>
				</div>
			</form>

			<h3 className="font-medium text-gray-800 text-sm sm:text-base mt-4 sm:mt-6 mb-3 sm:mb-4">
				Комментарии
			</h3>

			<div className="flex-1 overflow-y-auto min-h-0 px-1">
				{comments.length === 0 ? (
					<p className="text-center text-gray-500 text-sm sm:text-base py-4">
						Комментариев пока нет.
					</p>
				) : (
					<div className="space-y-4 sm:space-y-6">
						{[...comments].reverse().map((comment) => (
							<div
								key={comment.id}
								className="flex gap-2 sm:gap-3"
							>
								<div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden mt-1 flex-shrink-0">
									<Avatar
										src={comment.userPhoto}
										name={comment.userName}
									/>
								</div>
								<div className="flex-1 min-w-0">
									<div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
										<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 mb-1">
											<span className="font-medium text-gray-900 text-sm sm:text-base">
												{comment.userName}
											</span>
											<span className="text-[10px] sm:text-xs text-gray-500">
												{getFormattedTime(
													comment.createdAt
												)}
											</span>
										</div>
										<p className="text-gray-700 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
											{comment.content}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

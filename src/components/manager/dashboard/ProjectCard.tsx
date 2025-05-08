import React from "react";
import { Project } from "../../../types";
import { ChevronRight, Users } from "lucide-react";

interface ProjectCardProps {
	project: Project;
	onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
	const completedTasks =
		project.tasks?.filter((task) => task.status === "completed").length ||
		0;
	const totalTasks = project.tasks?.length || 0;
	const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

	return (
		<div
			className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer border border-gray-100 hover:border-secondary/20"
			onClick={onClick}
		>
			<div className="flex justify-between items-start mb-4">
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-lg text-foreground truncate">
						{project.managerTitle}
					</h3>
					{project.managerDescription && (
						<p className="text-foreground/70 text-sm mt-1 line-clamp-2">
							{project.managerDescription}
						</p>
					)}
				</div>
				<ChevronRight
					size={20}
					className="text-foreground/30 flex-shrink-0 ml-2 group-hover:text-secondary transition-colors"
				/>
			</div>

			<div className="flex items-center justify-between text-sm">
				<div className="flex items-center text-foreground/50">
					<Users size={16} className="mr-1.5" />
					<span>
						{completedTasks} из {totalTasks} задач
					</span>
				</div>
			</div>

			{totalTasks > 0 && (
				<div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
					<div
						className="h-full bg-secondary rounded-full transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>
			)}
		</div>
	);
};

export default ProjectCard;

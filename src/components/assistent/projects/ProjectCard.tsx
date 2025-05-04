import React from "react";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "../../../types";
import { format, parseISO } from "date-fns";

interface ProjectCardProps {
	project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const formatDate = (dateString: string | null) => {
		if (!dateString) return "Ongoing";
		return format(parseISO(dateString), "MMM d, yyyy");
	};

	return (
		<div className="bg-white rounded-xl shadow-sm h-full hover:shadow-md transition-shadow">
			<Link
				to={`/assistant/projects/${project.id}`}
				className="block p-6"
			>
				<div className="flex justify-between items-start">
					<h3 className="text-lg font-semibold text-gray-800 mb-2">
						{project.title}
					</h3>
					<span
						className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
							project.status === "active"
								? "bg-blue-50 text-blue-700"
								: "bg-gray-50 text-gray-700"
						}`}
					>
						{project.status}
					</span>
				</div>

				<p className="text-gray-600 text-sm mb-4 line-clamp-2">
					{project.description}
				</p>

				<div className="flex flex-col space-y-2 text-sm text-gray-500">
					<div className="flex items-center">
						<User size={14} className="mr-2" />
						<span>Manager: {project.managerName}</span>
					</div>
					<div className="flex items-center">
						<Calendar size={14} className="mr-2" />
						<span>
							{formatDate(project.startDate)} -{" "}
							{formatDate(project.endDate)}
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
};

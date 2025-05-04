import React from "react";
import { Project } from "../../../types";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
	projects: Project[];
	onSelectProject: (projectId: string) => void;
	onAddProject: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
	projects,
	onSelectProject,
}) => {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-lg md:text-xl font-semibold text-gray-800">
					Ваши ассистенты
				</h2>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
				{projects.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						onClick={() => onSelectProject(project.id)}
					/>
				))}

				{projects.length === 0 && (
					<div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
						<p className="text-gray-500 mb-4">
							У вас пока нет ассистентов
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectList;

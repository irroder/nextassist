import React from "react";
import { useApp } from "../../context/AppContext";
import { ProjectCard } from "../../components/assistent/projects/ProjectCard";

const Projects: React.FC = () => {
	const { userProjects } = useApp();

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Мои проекты
				</h1>
				<p className="text-gray-600">
					Управление и отслеживание всех проектов
				</p>
			</div>

			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h2 className="text-lg md:text-xl font-semibold text-gray-800">
						Ваши руководители
					</h2>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
					{userProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}

					{userProjects.length === 0 && (
						<div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
							<p className="text-gray-500 mb-4">
								У вас пока нет проектов
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Projects;

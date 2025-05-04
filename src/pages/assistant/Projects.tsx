import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ProjectCard } from "../../components/assistent/projects/ProjectCard";

const Projects: React.FC = () => {
	const { userProjects } = useApp();
	const [filter, setFilter] = useState<"active" | "completed">("active");

	const filteredProjects = userProjects.filter((project) => {
		return project.status === filter;
	});

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Мои проекты
				</h1>
				<p className="text-gray-600">
					Управление и отслеживание всех активных и завершенных
					проектов.
				</p>
			</div>

			<div className="mb-6 flex flex-wrap gap-2">
				<button
					className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 ${
						filter === "active"
							? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
							: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
					}`}
					onClick={() => setFilter("active")}
				>
					Активные
				</button>
				<button
					className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 ${
						filter === "completed"
							? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
							: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
					}`}
					onClick={() => setFilter("completed")}
				>
					Завершённые
				</button>
			</div>

			{filteredProjects.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-lg shadow">
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Проекты не найдены
					</h3>
					<p className="text-gray-600 mb-4">
						{`У вас нет ${
							filter === "active" ? "активных" : "завершённых"
						} проектов.`}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					{filteredProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			)}
		</>
	);
};

export default Projects;

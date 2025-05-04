import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import ProjectList from "../../components/manager/dashboard/ProjectList";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
	const { userProjects } = useApp();
	const navigate = useNavigate();
	const [isAddingProject, setIsAddingProject] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");
	const [newProjectDescription, setNewProjectDescription] = useState("");

	const handleAddProject = () => {
		if (!newProjectName.trim()) return;

		const newProject = {
			name: newProjectName,
			description: newProjectDescription || undefined,
		};

		console.log("Adding new project:", newProject);

		setNewProjectName("");
		setNewProjectDescription("");
		setIsAddingProject(false);
	};

	return (
		<>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Панель управления
				</h1>
				<p className="text-gray-600">
					Управляйте своими ассистентами и задачами
				</p>
			</div>

			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
				<Button
					variant="default"
					onClick={() => setIsAddingProject(true)}
					className="mt-4 sm:mt-0 w-full sm:w-auto bg-secondary hover:bg-secondary/90"
				>
					<Plus size={16} className="mr-2" />
					Добавить ассистента
				</Button>
			</div>

			{isAddingProject ? (
				<div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100 hover:border-secondary/20 transition-colors">
					<h2 className="text-xl font-semibold text-foreground mb-6">
						Добавить ассистента
					</h2>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="projectName"
								className="block text-sm font-medium text-foreground/70 mb-2"
							>
								Имя ассистента
							</label>
							<input
								type="text"
								id="projectName"
								placeholder="Введите имя ассистента"
								value={newProjectName}
								onChange={(e) =>
									setNewProjectName(e.target.value)
								}
								className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
							/>
						</div>

						<div>
							<label
								htmlFor="projectDescription"
								className="block text-sm font-medium text-foreground/70 mb-2"
							>
								Описание (необязательно)
							</label>
							<textarea
								id="projectDescription"
								rows={3}
								placeholder="Введите краткое описание"
								value={newProjectDescription}
								onChange={(e) =>
									setNewProjectDescription(e.target.value)
								}
								className="w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-background"
							/>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 pt-4">
							<Button
								variant="default"
								onClick={handleAddProject}
								className="w-full sm:w-auto bg-secondary hover:bg-secondary/90"
							>
								<Plus size={16} className="mr-2" />
								Создать ассистента
							</Button>
							<Button
								variant="outline"
								onClick={() => setIsAddingProject(false)}
								className="w-full sm:w-auto hover:border-secondary hover:text-secondary"
							>
								Отмена
							</Button>
						</div>
					</div>
				</div>
			) : null}

			<ProjectList
				projects={userProjects}
				onSelectProject={(id) => navigate(`/manager/dashboard/${id}`)}
				onAddProject={() => setIsAddingProject(true)}
			/>
		</>
	);
};

export default DashboardPage;

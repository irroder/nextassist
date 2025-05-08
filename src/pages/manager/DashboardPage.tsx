import React from "react";
import { useApp } from "../../context/AppContext";
import ProjectList from "../../components/manager/dashboard/ProjectList";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
	const { userProjects } = useApp();
	const navigate = useNavigate();

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

			<ProjectList
				projects={userProjects}
				onSelectProject={(id) => navigate(`/manager/dashboard/${id}`)}
			/>
		</>
	);
};

export default DashboardPage;

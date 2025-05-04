import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { MainLayout } from "../layouts/MainLayout";

// Lazy load pages to improve performance
const HomePage = React.lazy(() => import("../pages/common/HomePage"));
const LoginPage = React.lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/auth/RegisterPage"));
const NotFoundPage = React.lazy(() => import("../pages/common/NotFoundPage"));

// Assistant pages
const ProfilePage = React.lazy(() => import("../pages/assistant/Profile.tsx"));
const ProjectsPage = React.lazy(
	() => import("../pages/assistant/Projects.tsx")
);
const ProjectDetailPage = React.lazy(
	() => import("../pages/assistant/ProjectDetail.tsx")
);
const BalancePage = React.lazy(() => import("../pages/assistant/Balance.tsx"));

const SettingsPage = React.lazy(
	() => import("../pages/assistant/Settings.tsx")
);

const CoursesPage = React.lazy(() => import("../pages/assistant/Courses.tsx"));

const CourseLessonsPage = React.lazy(
	() => import("../pages/assistant/CourseLessons.tsx")
);

// Manager pages
const ManagerBalancePage = React.lazy(
	() => import("../pages/manager/BalancePage")
);
const ManagerDashboardPage = React.lazy(
	() => import("../pages/manager/DashboardPage")
);
const AssistantDetailPage = React.lazy(
	() => import("../pages/manager/AssistantDetailPage")
);
const ManagerCoursesPage = React.lazy(() => import("../pages/manager/Courses"));

const ManagerCourseLessonsPage = React.lazy(
	() => import("../pages/manager/CourseLessons")
);
const ManagerProfilePage = React.lazy(
	() => import("../pages/manager/ProfilePage")
);

const ManagerSettingsPage = React.lazy(
	() => import("../pages/manager/SettingsPage")
);

// Loading component for suspense fallback
const LoadingFallback = () => (
	<div className="min-h-screen flex items-center justify-center">
		<div className="flex flex-col items-center">
			<div className="h-12 w-12 border-4 border-t-brand-600 border-surface-300 rounded-full animate-spin"></div>
			<p className="mt-4 text-surface-600">Загрузка...</p>
		</div>
	</div>
);

export const AppRoutes = () => {
	const { isAuthenticated, user } = useApp();

	console.log("Auth state:", { isAuthenticated, user });

	// Redirect logic based on auth state and user role
	const getRedirectPath = () => {
		if (!isAuthenticated) return "/login";

		if (user?.role === "assistant") return "/assistant/projects";
		if (user?.role === "manager") return "/manager/dashboard";

		return "/login";
	};

	return (
		<React.Suspense fallback={<LoadingFallback />}>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<HomePage />} />
				</Route>

				{/* Auth routes */}
				<Route
					path="login"
					element={
						isAuthenticated ? (
							<Navigate to={getRedirectPath()} />
						) : (
							<LoginPage />
						)
					}
				/>
				<Route
					path="register"
					element={
						isAuthenticated ? (
							<Navigate to={getRedirectPath()} />
						) : (
							<RegisterPage />
						)
					}
				/>

				{/* Assistant routes */}
				<Route
					path="assistant"
					element={
						<MainLayout requireAuth allowedRoles={["assistant"]} />
					}
				>
					<Route index element={<Navigate to="projects" />} />
					<Route path="profile" element={<ProfilePage />} />
					<Route path="projects" element={<ProjectsPage />} />
					<Route
						path="projects/:id"
						element={<ProjectDetailPage />}
					/>
					<Route path="balance" element={<BalancePage />} />
					<Route path="settings" element={<SettingsPage />} />
					<Route path="courses" element={<CoursesPage />} />
					<Route
						path="courses/:courseId/lessons"
						element={<CourseLessonsPage />}
					/>
				</Route>

				{/* Manager routes */}
				<Route
					path="manager"
					element={
						<MainLayout requireAuth allowedRoles={["manager"]} />
					}
				>
					<Route index element={<Navigate to="dashboard" />} />
					<Route
						path="dashboard"
						element={<ManagerDashboardPage />}
					/>
					<Route
						path="dashboard/:id"
						element={<AssistantDetailPage />}
					/>
					<Route path="balance" element={<ManagerBalancePage />} />
					<Route path="courses" element={<ManagerCoursesPage />} />
					<Route
						path="courses/:courseId/lessons"
						element={<ManagerCourseLessonsPage />}
					/>
					<Route path="profile" element={<ManagerProfilePage />} />
					<Route path="settings" element={<ManagerSettingsPage />} />
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</React.Suspense>
	);
};

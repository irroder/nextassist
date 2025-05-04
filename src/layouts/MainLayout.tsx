import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Layout as AssistantLayout } from "../components/assistent/layout/Layout";
import { Layout as ManagerLayout } from "../components/manager/layout/Layout";

interface MainLayoutProps {
	requireAuth?: boolean;
	allowedRoles?: string[];
}

export const MainLayout: React.FC<MainLayoutProps> = ({
	requireAuth = false,
	allowedRoles = [],
}) => {
	const { isAuthenticated, user } = useApp();

	// Check if authentication is required
	if (requireAuth && !isAuthenticated) {
		return <Navigate to="/login" />;
	}

	// Check if user has required role
	if (requireAuth && allowedRoles.length > 0 && user) {
		if (!allowedRoles.includes(user.role)) {
			// Redirect based on user role
			if (user.role === "assistant") {
				return <Navigate to="/assistant/profile" />;
			}
			if (user.role === "manager") {
				return <Navigate to="/manager/dashboard" />;
			}
			return <Navigate to="/login" />;
		}
	}

	// Render appropriate layout based on user role
	if (user?.role === "assistant") {
		return (
			<AssistantLayout>
				<Outlet />
			</AssistantLayout>
		);
	}

	// Manager layout
	if (user?.role === "manager") {
		return (
			<ManagerLayout>
				<Outlet />
			</ManagerLayout>
		);
	}

	// Default layout for non-authenticated users
	return <Outlet />;
};

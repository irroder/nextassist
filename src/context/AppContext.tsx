import React, { createContext, useContext, useState, ReactNode } from "react";
import {
	User,
	WorkExperience,
	Skill,
	Course,
	Project,
	Task,
	Comment,
	DailyReport,
	BalanceInfo,
	LearningModule,
} from "../types";
import {
	workExperiences,
	skills,
	courses,
	projects,
	comments,
	balanceInfo,
	learningModules,
	reports,
} from "../data/mockData";
import { allUsers } from "../data/mockData";

interface AppContextType {
	// Auth state
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (userData: Partial<User>, password: string) => Promise<void>;

	// Profile data
	experiences: WorkExperience[];
	userSkills: Skill[];
	userCourses: Course[];
	userProjects: Project[];
	projectTasks: Record<string, Task[]>;
	taskComments: Record<string, Comment[]>;

	// Manager specific data
	balance: BalanceInfo;
	learningModules: LearningModule[];
	currentProjectId: string | null;
	activeTab: "dashboard" | "profile" | "balance" | "learning" | "reports";

	// Profile Methods
	updateUserProfile: (updatedUser: User) => void;
	addExperience: (experience: Omit<WorkExperience, "id">) => void;
	updateExperience: (experience: WorkExperience) => void;
	deleteExperience: (id: string) => void;

	addSkill: (skill: Omit<Skill, "id">) => void;
	updateSkill: (skill: Skill) => void;
	deleteSkill: (id: string) => void;

	// Project Methods
	getProject: (id: string) => Project | undefined;
	getProjectTasks: (projectId: string) => Task[];

	// Task Methods
	addTask: (task: Omit<Task, "id" | "createdAt">) => void;
	updateTask: (taskId: string, updates: Partial<Task>) => void;
	deleteTask: (id: string) => void;

	// Task Status Methods
	acceptTask: (taskId: string) => void;
	declineTask: (taskId: string) => void;
	completeTask: (taskId: string) => void;

	// Comments
	getTaskComments: (taskId: string) => Comment[];
	addComment: (comment: Omit<Comment, "id" | "createdAt">) => void;

	// Reports
	getProjectReports: (projectId: string) => DailyReport[];
	addReport: (report: Omit<DailyReport, "id" | "createdAt">) => void;

	// Manager specific methods
	setCurrentProjectId: (id: string | null) => void;
	setActiveTab: (
		tab: "dashboard" | "profile" | "balance" | "learning" | "reports"
	) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock auth delay
const mockAuthDelay = () => new Promise((resolve) => setTimeout(resolve, 800));

export const AppProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// Auth state
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// Profile data
	const [experiences, setExperiences] =
		useState<WorkExperience[]>(workExperiences);
	const [userSkills, setUserSkills] = useState<Skill[]>(skills);
	const [userCourses] = useState<Course[]>(courses);
	const [userProjects, setUserProjects] = useState<Project[]>(projects);
	const [projectTasks, setProjectTasks] = useState<Record<string, Task[]>>(
		() => {
			const tasksByProject: Record<string, Task[]> = {};
			projects.forEach((project) => {
				if (!tasksByProject[project.id]) {
					tasksByProject[project.id] = [];
				}
				tasksByProject[project.id].push(...project.tasks);
			});
			return tasksByProject;
		}
	);
	const [taskComments, setTaskComments] = useState<Record<string, Comment[]>>(
		() => {
			const commentsByTask: Record<string, Comment[]> = {};
			comments.forEach((comment) => {
				if (!commentsByTask[comment.taskId]) {
					commentsByTask[comment.taskId] = [];
				}
				commentsByTask[comment.taskId].push(comment);
			});
			return commentsByTask;
		}
	);

	// Manager specific state
	const [balance] = useState<BalanceInfo>(balanceInfo);
	const [learningModulesList] = useState<LearningModule[]>(learningModules);
	const [currentProjectId, setCurrentProjectId] = useState<string | null>(
		null
	);
	const [activeTab, setActiveTab] = useState<
		"dashboard" | "profile" | "balance" | "learning" | "reports"
	>("dashboard");

	// Check for existing session on mount
	React.useEffect(() => {
		const checkAuth = async () => {
			try {
				// Check localStorage for saved user
				const savedUser = localStorage.getItem("nextassist_user");
				if (savedUser) {
					setUser(JSON.parse(savedUser));
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	// Auth Methods
	const login = async (email: string, _password: string) => {
		setIsLoading(true);
		try {
			await mockAuthDelay();
			const foundUser = allUsers.find(
				(u) => u.email.toLowerCase() === email.toLowerCase()
			);

			if (!foundUser) {
				throw new Error("Неверный email или пароль");
			}

			setUser(foundUser);
			localStorage.setItem("nextassist_user", JSON.stringify(foundUser));
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("nextassist_user");
	};

	const register = async (userData: Partial<User>, _password: string) => {
		setIsLoading(true);
		try {
			await mockAuthDelay();

			const userExists = allUsers.some(
				(u) => u.email.toLowerCase() === userData.email?.toLowerCase()
			);

			if (userExists) {
				throw new Error("Пользователь с таким email уже существует");
			}

			const newUser: User = {
				id: `user-${Date.now()}`,
				email: userData.email || "",
				firstName: userData.firstName || "",
				lastName: userData.lastName || "",
				role: userData.role || "assistant",
				createdAt: new Date().toISOString(),
				avatar: userData.avatar,
				bio: userData.bio,
			};

			setUser(newUser);
			localStorage.setItem("nextassist_user", JSON.stringify(newUser));
		} catch (error) {
			console.error("Registration error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	// Profile Methods
	const updateUserProfile = (updatedUser: User) => {
		setUser(updatedUser);
	};

	const addExperience = (experience: Omit<WorkExperience, "id">) => {
		const newExperience = {
			...experience,
			id: Math.random().toString(36).substring(2, 9),
		};
		setExperiences([...experiences, newExperience]);
	};

	const updateExperience = (experience: WorkExperience) => {
		setExperiences(
			experiences.map((exp) =>
				exp.id === experience.id ? experience : exp
			)
		);
	};

	const deleteExperience = (id: string) => {
		setExperiences(experiences.filter((exp) => exp.id !== id));
	};

	const addSkill = (skill: Omit<Skill, "id">) => {
		const newSkill = {
			...skill,
			id: Math.random().toString(36).substring(2, 9),
		};
		setUserSkills([...userSkills, newSkill]);
	};

	const updateSkill = (skill: Skill) => {
		setUserSkills(userSkills.map((s) => (s.id === skill.id ? skill : s)));
	};

	const deleteSkill = (id: string) => {
		setUserSkills(userSkills.filter((s) => s.id !== id));
	};

	// Project Methods
	const getProject = (id: string) => {
		return userProjects.find((project) => project.id === id);
	};

	const getProjectTasks = (projectId: string) => {
		return projectTasks[projectId] || [];
	};

	// Task Methods
	const addTask = (task: Omit<Task, "id" | "createdAt">) => {
		const newTask = {
			...task,
			id: Math.random().toString(36).substring(2, 9),
			createdAt: new Date().toISOString(),
		};

		setProjectTasks((prev) => {
			const updatedTasks = { ...prev };
			if (!updatedTasks[task.projectId]) {
				updatedTasks[task.projectId] = [];
			}
			updatedTasks[task.projectId] = [
				...updatedTasks[task.projectId],
				newTask,
			];
			return updatedTasks;
		});
	};

	const updateTask = (taskId: string, updates: Partial<Task>) => {
		// Update tasks in projectTasks
		setProjectTasks((prev) => {
			const updatedTasks = { ...prev };
			Object.keys(updatedTasks).forEach((projectId) => {
				updatedTasks[projectId] = updatedTasks[projectId].map((task) =>
					task.id === taskId ? { ...task, ...updates } : task
				);
			});
			return updatedTasks;
		});

		// Update tasks in userProjects
		setUserProjects((prevProjects) =>
			prevProjects.map((project) => ({
				...project,
				tasks: project.tasks.map((task) =>
					task.id === taskId ? { ...task, ...updates } : task
				),
			}))
		);
	};

	const deleteTask = (id: string) => {
		setProjectTasks((prev) => {
			const updatedTasks = { ...prev };

			// Find which project the task belongs to
			Object.keys(updatedTasks).forEach((projectId) => {
				updatedTasks[projectId] = updatedTasks[projectId].filter(
					(task) => task.id !== id
				);
			});

			return updatedTasks;
		});
	};

	// Task Status Methods
	const updateTaskStatus = (taskId: string, status: Task["status"]) => {
		setProjectTasks((prev) => {
			const updatedTasks = { ...prev };

			Object.keys(updatedTasks).forEach((projectId) => {
				updatedTasks[projectId] = updatedTasks[projectId].map((task) =>
					task.id === taskId ? { ...task, status } : task
				);
			});

			return updatedTasks;
		});
	};

	const acceptTask = (taskId: string) => updateTaskStatus(taskId, "accepted");
	const declineTask = (taskId: string) =>
		updateTaskStatus(taskId, "declined");
	const completeTask = (taskId: string) =>
		updateTaskStatus(taskId, "completed");

	// Comments
	const getTaskComments = (taskId: string) => {
		return taskComments[taskId] || [];
	};

	const addComment = (comment: Omit<Comment, "id" | "createdAt">) => {
		const newComment = {
			...comment,
			id: Math.random().toString(36).substring(2, 9),
			createdAt: new Date().toISOString(),
		};

		setTaskComments((prev) => {
			const updatedComments = { ...prev };
			if (!updatedComments[comment.taskId]) {
				updatedComments[comment.taskId] = [];
			}
			updatedComments[comment.taskId] = [
				...updatedComments[comment.taskId],
				newComment,
			];
			return updatedComments;
		});
	};

	// Reports Methods
	const getProjectReports = (projectId: string) => {
		return reports.filter((report) => report.projectId === projectId);
	};

	const addReport = (report: Omit<DailyReport, "id" | "createdAt">) => {
		const newReport: DailyReport = {
			...report,
			id: Math.random().toString(36).substring(2, 9),
			createdAt: new Date().toISOString(),
		};
		// In a real app, this would update the state
		console.log("New report added:", newReport);
	};

	const value = {
		// Auth state
		user,
		isAuthenticated: !!user,
		isLoading,
		login,
		logout,
		register,

		// Profile data
		experiences,
		userSkills,
		userCourses,
		userProjects,
		projectTasks,
		taskComments,

		// Manager specific data
		balance,
		learningModules: learningModulesList,
		currentProjectId,
		activeTab,

		// Profile Methods
		updateUserProfile,
		addExperience,
		updateExperience,
		deleteExperience,

		addSkill,
		updateSkill,
		deleteSkill,

		// Project Methods
		getProject,
		getProjectTasks,

		// Task Methods
		addTask,
		updateTask,
		deleteTask,

		// Task Status Methods
		acceptTask,
		declineTask,
		completeTask,

		// Comments
		getTaskComments,
		addComment,

		// Reports
		getProjectReports,
		addReport,

		// Manager specific methods
		setCurrentProjectId,
		setActiveTab,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useApp must be used within an AppProvider");
	}
	return context;
};

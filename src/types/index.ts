export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: "assistant" | "manager";
	createdAt: string;
	avatar?: string;
	company?: string;
	bio?: string;
	inn?: string;
	hasAcceptedOffer?: boolean;
	completeCourses?: Course[];
}

export interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (userData: Partial<User>, password: string) => Promise<void>;
}

export interface WorkExperience {
	id: string;
	company: string;
	position: string;
	startDate: string;
	endDate: string | null;
	description: string;
}

export interface Skill {
	id: string;
	name: string;
	category: string;
}

export interface Course {
	id: string;
	title: string;
	completedDate: string;
	certificate?: string;
}

export interface Project {
	id: string;
	assistantTitle: string;
	managerTitle: string;
	assistantDescription: string;
	managerDescription: string;
	managerId: string;
	assistantId: string;
	managerName: string;
	tasks: Task[];
	reports?: DailyReport[];
}

export interface Report {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	createdBy: string;
}

export interface Task {
	id: string;
	projectId: string;
	title: string;
	description: string;
	priority: "high" | "medium" | "low";
	deadline: string | null;
	status: "new" | "in_progress" | "completed" | "accepted" | "declined";
	createdBy: string;
	createdAt: string;
	completedAt: string | null;
	comments: Comment[];
}

export interface Comment {
	id: string;
	taskId: string;
	userId: string;
	userName: string;
	userPhoto: string;
	content: string;
	createdAt: string;
}

export interface DailyReport {
	id: string;
	projectId: string;
	date: string;
	summary: string;
	achievements: string[];
	challenges: string[];
	nextDayPlans: string[];
	createdAt: string;
	createdBy: string;
}

export interface BalanceInfo {
	total: number;
	nextChargeDate: string;
	assistantCharges: AssistantCharge[];
}

export interface AssistantCharge {
	assistantId: string;
	assistantName: string;
	amount: number;
	nextPaymentDate: string;
}

export interface Transaction {
	id: string;
	type: "charge" | "payment";
	description: string;
	amount: number;
	date: string;
	receiptUrl?: string;
}

export interface LearningModule {
	id: string;
	title: string;
	description: string;
	duration: string;
	progress: number;
	lessons: Lesson[];
}

export interface Lesson {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	content: string;
	duration: string;
}

export interface AppState {
	currentProjectId: string | null;
	setCurrentProjectId: (id: string | null) => void;
	activeTab: "dashboard" | "profile" | "balance" | "learning" | "reports";
	setActiveTab: (
		tab: "dashboard" | "profile" | "balance" | "learning" | "reports"
	) => void;
}

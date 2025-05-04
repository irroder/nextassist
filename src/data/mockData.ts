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

export const allUsers: User[] = [
	{
		id: "1",
		firstName: "Алексей",
		lastName: "Морозов",
		email: "alex@example.com",
		role: "assistant",
		createdAt: "2024-01-01T00:00:00.000Z",
		avatar: "https://i.pravatar.cc/150?img=1",
		bio: "Full-stack разработчик с более чем 5-летним опытом создания веб-приложений. Увлечен созданием интуитивно понятных пользовательских интерфейсов и решением сложных задач.",
	},
	{
		id: "2",
		email: "elena@example.com",
		firstName: "Елена",
		lastName: "Петрова",
		role: "manager",
		company: 'ООО "Компания"',
		createdAt: "2024-01-01T00:00:00.000Z",
		avatar: "https://i.pravatar.cc/150?img=2",
		bio: "Я - Елена, менеджер по продажам. Я помогаю компаниям увеличить продажи и привлечь новых клиентов.",
		inn: "1234567890",
		hasAcceptedOffer: true,
	},
];

export const workExperiences: WorkExperience[] = [
	{
		id: "1",
		company: "ТехКорп Солюшнс",
		position: "Ведущий разработчик",
		startDate: "2020-06-01",
		endDate: null,
		description:
			"Руководство командой из 5 разработчиков, создание корпоративных приложений с использованием React, Node.js и AWS.",
	},
	{
		id: "2",
		company: "ВебИнновейт",
		position: "Frontend-разработчик",
		startDate: "2018-03-15",
		endDate: "2020-05-30",
		description:
			"Разработка и внедрение адаптивных пользовательских интерфейсов с использованием React и Redux. Сотрудничество с UX-дизайнерами для создания интуитивно понятных интерфейсов.",
	},
	{
		id: "3",
		company: "Диджитал Стартап",
		position: "Младший разработчик",
		startDate: "2016-09-01",
		endDate: "2018-03-01",
		description:
			"Разработка и поддержка веб-приложений с использованием JavaScript, HTML и CSS.",
	},
];

export const availableSkills = [
	{ name: "JavaScript", category: "Frontend" },
	{ name: "React", category: "Frontend" },
	{ name: "TypeScript", category: "Frontend" },
	{ name: "CSS/SCSS", category: "Frontend" },
	{ name: "HTML5", category: "Frontend" },
	{ name: "Vue.js", category: "Frontend" },
	{ name: "Angular", category: "Frontend" },
	{ name: "Node.js", category: "Backend" },
	{ name: "Express", category: "Backend" },
	{ name: "Python", category: "Backend" },
	{ name: "Django", category: "Backend" },
	{ name: "Flask", category: "Backend" },
	{ name: "MongoDB", category: "Database" },
	{ name: "PostgreSQL", category: "Database" },
	{ name: "MySQL", category: "Database" },
	{ name: "Redis", category: "Database" },
	{ name: "AWS", category: "DevOps" },
	{ name: "Docker", category: "DevOps" },
	{ name: "Kubernetes", category: "DevOps" },
	{ name: "CI/CD", category: "DevOps" },
	{ name: "Figma", category: "UI/UX" },
	{ name: "Adobe XD", category: "UI/UX" },
	{ name: "Sketch", category: "UI/UX" },
	{ name: "User Research", category: "UI/UX" },
];

export const skills: Skill[] = [
	{ id: "1", name: "JavaScript", category: "Frontend" },
	{ id: "2", name: "React", category: "Frontend" },
	{ id: "3", name: "TypeScript", category: "Frontend" },
	{ id: "4", name: "CSS/SCSS", category: "Frontend" },
	{ id: "5", name: "Node.js", category: "Backend" },
	{ id: "6", name: "Express", category: "Backend" },
	{ id: "7", name: "MongoDB", category: "Database" },
	{ id: "8", name: "PostgreSQL", category: "Database" },
	{ id: "9", name: "AWS", category: "DevOps" },
	{ id: "10", name: "Docker", category: "DevOps" },
];

export const courses: Course[] = [
	{
		id: "1",
		title: "Продвинутые паттерны React",
		completedDate: "2023-04-15",
		certificate: "https://example.com/cert1",
	},
	{
		id: "2",
		title: "Мастер-класс по TypeScript",
		completedDate: "2022-11-20",
		certificate: "https://example.com/cert2",
	},
	{
		id: "3",
		title: "Сертифицированный разработчик AWS",
		completedDate: "2022-06-10",
		certificate: "https://example.com/cert3",
	},
];

export const projects: Project[] = [
	{
		id: "1",
		title: "Михаил Петров",
		description:
			"Предприниматель в сфере электронной коммерции. Развивает платформу онлайн-продаж с фокусом на пользовательский опыт.",
		managerId: "2",
		managerName: "Елена Петрова",
		status: "active",
		startDate: "2023-10-01",
		endDate: null,
		tasks: [
			{
				id: "1",
				projectId: "1",
				title: "Дизайн макета страницы продукта",
				description:
					"Создание адаптивного макета для страницы деталей продукта в соответствии с новой системой дизайна.",
				priority: "high",
				deadline: "2023-12-15",
				status: "in_progress",
				createdBy: "2",
				assignedTo: "1",
				createdAt: "2023-10-05",
				comments: [],
			},
			{
				id: "2",
				projectId: "1",
				title: "Реализация функционала корзины",
				description:
					"Добавление функционала корзины с возможностью добавления/удаления товаров и обновления количества.",
				priority: "medium",
				deadline: "2023-12-20",
				status: "new",
				createdBy: "2",
				assignedTo: "1",
				createdAt: "2023-10-10",
				comments: [],
			},
		],
		reports: [
			{
				id: "1",
				projectId: "1",
				date: "2024-03-15",
				summary:
					"Завершена разработка основного функционала. Проведено тестирование модуля оплаты.",
				achievements: [
					"Завершен модуль оплаты",
					"Проведено тестирование",
				],
				challenges: ["Сложности с интеграцией платежной системы"],
				nextDayPlans: ["Начать работу над модулем доставки"],
				createdAt: "2024-03-15T10:30:00Z",
				createdBy: "1",
			},
		],
	},
	{
		id: "2",
		title: "Александр Соколов",
		description:
			"Владелец сети розничных магазинов. Внедряет цифровые решения для оптимизации бизнес-процессов.",
		managerId: "2",
		managerName: "Елена Петрова",
		status: "active",
		startDate: "2023-11-15",
		endDate: null,
		tasks: [
			{
				id: "3",
				projectId: "2",
				title: "Создание графиков для данных продаж",
				description:
					"Реализация интерактивных графиков для отображения ежемесячных и квартальных данных о продажах.",
				priority: "low",
				deadline: "2023-12-10",
				status: "new",
				createdBy: "2",
				assignedTo: "1",
				createdAt: "2023-11-16",
				comments: [],
			},
		],
		reports: [],
	},
	{
		id: "3",
		title: "Роман Волков",
		description:
			"Основатель стартапа в сфере финтех. Разрабатывает инновационное мобильное приложение для финансовых операций.",
		managerId: "2",
		managerName: "Елена Петрова",
		status: "completed",
		startDate: "2023-05-01",
		endDate: "2023-09-30",
		tasks: [
			{
				id: "4",
				projectId: "3",
				title: "Интеграция API для аутентификации",
				description:
					"Реализация интеграции API для единой аутентификации пользователей между веб и мобильными платформами.",
				priority: "low",
				deadline: "2023-07-15",
				status: "completed",
				createdBy: "2",
				assignedTo: "1",
				createdAt: "2023-06-01",
				comments: [],
			},
			{
				id: "5",
				projectId: "3",
				title: "Синхронизация пользовательских настроек",
				description:
					"Обеспечение синхронизации пользовательских настроек и предпочтений между веб и мобильными приложениями.",
				priority: "low",
				deadline: "2023-08-10",
				status: "completed",
				createdBy: "2",
				assignedTo: "1",
				createdAt: "2023-06-15",
				comments: [],
			},
		],
		reports: [],
	},
];

export const tasks: Task[] = [
	{
		id: "1",
		projectId: "1",
		title: "Дизайн макета страницы продукта",
		description:
			"Создание адаптивного макета для страницы деталей продукта в соответствии с новой системой дизайна.",
		priority: "high",
		deadline: "2023-12-15",
		status: "in_progress",
		createdBy: "10",
		assignedTo: "1",
		createdAt: "2023-10-05",
		comments: [],
	},
	{
		id: "2",
		projectId: "1",
		title: "Реализация функционала корзины",
		description:
			"Добавление функционала корзины с возможностью добавления/удаления товаров и обновления количества.",
		priority: "medium",
		deadline: "2023-12-20",
		status: "new",
		createdBy: "10",
		assignedTo: "1",
		createdAt: "2023-10-10",
		comments: [],
	},
	{
		id: "3",
		projectId: "2",
		title: "Создание графиков для данных продаж",
		description:
			"Реализация интерактивных графиков для отображения ежемесячных и квартальных данных о продажах.",
		priority: "low",
		deadline: "2023-12-10",
		status: "new",
		createdBy: "11",
		assignedTo: "1",
		createdAt: "2023-11-16",
		comments: [],
	},
	{
		id: "4",
		projectId: "3",
		title: "Интеграция API для аутентификации",
		description:
			"Реализация интеграции API для единой аутентификации пользователей между веб и мобильными платформами.",
		priority: "low",
		deadline: "2023-07-15",
		status: "completed",
		createdBy: "10",
		assignedTo: "1",
		createdAt: "2023-06-01",
		comments: [],
	},
	{
		id: "5",
		projectId: "3",
		title: "Синхронизация пользовательских настроек",
		description:
			"Обеспечение синхронизации пользовательских настроек и предпочтений между веб и мобильными приложениями.",
		priority: "low",
		deadline: "2023-08-10",
		status: "completed",
		createdBy: "10",
		assignedTo: "1",
		createdAt: "2023-06-15",
		comments: [],
	},
];

export const comments: Comment[] = [
	{
		id: "1",
		taskId: "1",
		userId: "4",
		userName: "Анна Смирнова",
		userPhoto:
			"https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
		content:
			"Пожалуйста, убедитесь, что макет точно соответствует дизайну в Figma. Особое внимание уделите отступам вокруг изображений продуктов.",
		createdAt: "2023-10-06T09:30:00Z",
	},
	{
		id: "2",
		taskId: "1",
		userId: "1",
		userName: "Алексей Морозов",
		userPhoto:
			"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
		content:
			"Я начал реализацию и у меня возник вопрос о поведении адаптивности на планшетах. Нужно ли располагать изображения в столбец или оставить в виде сетки?",
		createdAt: "2023-10-07T14:20:00Z",
	},
	{
		id: "3",
		taskId: "3",
		userId: "5",
		userName: "Дмитрий Козлов",
		userPhoto:
			"https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
		content:
			"Маркетинговая команда запросила дополнительные фильтры для графиков. Я отправлю обновленные требования завтра.",
		createdAt: "2023-11-18T11:45:00Z",
	},
];

export const reports: DailyReport[] = [
	{
		id: "1",
		projectId: "1",
		date: "2024-03-15",
		summary:
			"Завершена разработка основного функционала. Проведено тестирование модуля оплаты.",
		achievements: ["Завершен модуль оплаты", "Проведено тестирование"],
		challenges: ["Сложности с интеграцией платежной системы"],
		nextDayPlans: ["Начать работу над модулем доставки"],
		createdAt: "2024-03-15T10:30:00Z",
		createdBy: "1",
	},
	{
		id: "2",
		projectId: "1",
		date: "2024-03-14",
		summary:
			"Проведена встреча с заказчиком. Согласованы изменения в дизайне главной страницы.",
		achievements: ["Согласован дизайн главной страницы"],
		challenges: ["Необходимость переработки существующих компонентов"],
		nextDayPlans: ["Начать реализацию обновленного дизайна"],
		createdAt: "2024-03-14T16:45:00Z",
		createdBy: "1",
	},
];

export const balanceInfo: BalanceInfo = {
	total: 250.0,
	nextChargeDate: "2024-06-15",
	assistantCharges: [
		{
			assistantId: "1",
			assistantName: "Алексей Морозов",
			amount: 29.99,
			nextPaymentDate: "2024-06-15",
		},
	],
};

export const learningModules: LearningModule[] = [
	{
		id: "m1",
		title: "Основы работы с ассистентами",
		description:
			"Изучите базовые принципы работы с AI-ассистентами и их возможности",
		duration: "2 часа",
		progress: 75,
		lessons: [
			{
				id: "l1",
				title: "Введение в AI-ассистентов",
				description:
					"Узнайте, что такое AI-ассистенты и как они могут помочь в работе",
				completed: true,
				content: "Содержание урока...",
				duration: "30 минут",
			},
			{
				id: "l2",
				title: "Эффективная коммуникация",
				description:
					"Как правильно формулировать запросы для получения лучших результатов",
				completed: true,
				content: "Содержание урока...",
				duration: "45 минут",
			},
		],
	},
	{
		id: "m2",
		title: "Безумный копирайтинг",
		description: "Не просто курс, а целое погружение в мир копирайтинга",
		duration: "2 часа",
		progress: 50,
		lessons: [
			{
				id: "l1",
				title: "Введение в копирайтинг",
				description:
					"Узнайте, что такое копирайтинг и как он может помочь в работе",
				completed: false,
				content: "Содержание урока...",
				duration: "30 минут",
			},
		],
	},
];

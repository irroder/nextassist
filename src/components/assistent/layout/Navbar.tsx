import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Settings, LogOut } from "lucide-react";
import { useApp } from "../../../context/AppContext";

export const Navbar: React.FC = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [profileMenuOpen, setProfileMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useApp();
	const profileMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				profileMenuOpen &&
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target as Node)
			) {
				setProfileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [profileMenuOpen]);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({
		to,
		children,
	}) => {
		const isActive = location.pathname === to;

		return (
			<Link
				to={to}
				className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
					isActive
						? "bg-primary text-foreground"
						: "text-foreground/70 hover:bg-primary/20 hover:text-foreground"
				}`}
			>
				{children}
			</Link>
		);
	};

	return (
		<nav className="bg-background shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link
								to="/assistant/projects"
								className="text-2xl font-bold text-foreground"
							>
								Без<span className="text-secondary">Рук</span>
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
							<NavLink to="/assistant/projects">Проекты</NavLink>
							<NavLink to="/assistant/profile">Профиль</NavLink>
							<NavLink to="/assistant/courses">Курсы</NavLink>
							<NavLink to="/assistant/balance">Баланс</NavLink>
						</div>
					</div>

					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<div className="relative" ref={profileMenuRef}>
							<button
								type="button"
								className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								onClick={() =>
									setProfileMenuOpen(!profileMenuOpen)
								}
							>
								<div className="relative w-8 h-8 rounded-full overflow-hidden transition-transform hover:scale-110">
									<img
										src={user?.avatar}
										alt={user?.firstName}
										className="w-full h-full object-cover"
										onError={(e) => {
											const target =
												e.target as HTMLImageElement;
											target.style.display = "none";
											const initials = user?.firstName
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase();
											const parent = target.parentElement;
											if (parent) {
												parent.innerHTML = `
													<div class="w-full h-full flex items-center justify-center bg-gray-400 text-white font-medium">
														${initials}
													</div>
												`;
											}
										}}
									/>
								</div>
							</button>

							{profileMenuOpen && (
								<div
									className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
									role="menu"
								>
									<Link
										to="/assistant/settings"
										className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={() =>
											setProfileMenuOpen(false)
										}
									>
										<Settings size={16} className="mr-2" />
										Настройки
									</Link>
									<button
										className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={() => {
											setProfileMenuOpen(false);
											handleLogout();
										}}
									>
										<LogOut size={16} className="mr-2" />
										Выйти
									</button>
								</div>
							)}
						</div>
					</div>

					<div className="flex items-center sm:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? (
								<X size={24} />
							) : (
								<Menu size={24} />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className="fixed inset-0 z-[100] sm:hidden">
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-black/50 backdrop-blur-sm"
						onClick={() => setMobileMenuOpen(false)}
					/>

					{/* Menu content */}
					<div className="fixed inset-y-4 right-4 w-[calc(100%-2rem)] max-w-sm bg-white shadow-xl rounded-2xl transform transition-transform duration-300 ease-in-out">
						<div className="flex flex-col h-full">
							{/* Header */}
							<div className="flex items-center justify-between p-6 border-b border-gray-100">
								<div className="flex items-center space-x-4">
									<div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
										<img
											src={user?.avatar}
											alt={user?.firstName}
											className="w-full h-full object-cover"
											onError={(e) => {
												const target =
													e.target as HTMLImageElement;
												target.style.display = "none";
												const initials = user?.firstName
													.split(" ")
													.map((n) => n[0])
													.join("")
													.toUpperCase();
												const parent =
													target.parentElement;
												if (parent) {
													parent.innerHTML = `
														<div class="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-medium text-lg">
															${initials}
														</div>
													`;
												}
											}}
										/>
									</div>
									<div>
										<div className="text-lg font-semibold text-foreground">
											{user?.firstName}
										</div>
										<div className="text-sm text-muted-foreground">
											{user?.email}
										</div>
									</div>
								</div>
								<button
									onClick={() => setMobileMenuOpen(false)}
									className="p-2 rounded-xl hover:bg-accent transition-colors"
								>
									<X
										size={24}
										className="text-muted-foreground"
									/>
								</button>
							</div>

							{/* Navigation Links */}
							<div className="flex-1 overflow-y-auto py-6">
								<Link
									to="/assistant/profile"
									className={`flex items-center px-6 py-4 text-base font-medium transition-colors ${
										location.pathname ===
										"/assistant/profile"
											? "bg-primary text-primary-foreground"
											: "text-foreground hover:bg-accent"
									}`}
									onClick={() => setMobileMenuOpen(false)}
								>
									Профиль
								</Link>
								<Link
									to="/assistant/projects"
									className={`flex items-center px-6 py-4 text-base font-medium transition-colors ${
										location.pathname ===
										"/assistant/projects"
											? "bg-primary text-primary-foreground"
											: "text-foreground hover:bg-accent"
									}`}
									onClick={() => setMobileMenuOpen(false)}
								>
									Проекты
								</Link>
								<Link
									to="/assistant/courses"
									className={`flex items-center px-6 py-4 text-base font-medium transition-colors ${
										location.pathname ===
										"/assistant/courses"
											? "bg-primary text-primary-foreground"
											: "text-foreground hover:bg-accent"
									}`}
									onClick={() => setMobileMenuOpen(false)}
								>
									Курсы
								</Link>
								<Link
									to="/assistant/balance"
									className={`flex items-center px-6 py-4 text-base font-medium transition-colors ${
										location.pathname ===
										"/assistant/balance"
											? "bg-primary text-primary-foreground"
											: "text-foreground hover:bg-accent"
									}`}
									onClick={() => setMobileMenuOpen(false)}
								>
									Баланс
								</Link>
							</div>

							{/* Footer */}
							<div className="border-t border-gray-100 p-6 space-y-3">
								<Link
									to="/assistant/settings"
									className="flex items-center px-6 py-4 text-base font-medium text-foreground hover:bg-accent rounded-xl transition-colors"
									onClick={() => setMobileMenuOpen(false)}
								>
									<Settings
										size={20}
										className="mr-3 text-muted-foreground"
									/>
									Настройки
								</Link>
								<button
									className="flex w-full items-center px-6 py-4 text-base font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
									onClick={() => {
										setMobileMenuOpen(false);
										handleLogout();
									}}
								>
									<LogOut size={20} className="mr-3" />
									Выйти
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

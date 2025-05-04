import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "../../components/ui/Card";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useApp } from "../../context/AppContext";

const LoginPage = () => {
	const { login } = useApp();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const cardRef = React.useRef<HTMLDivElement>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			await login(email, password);
			// Redirect is handled by the router
		} catch (err) {
			setError(err instanceof Error ? err.message : "Ошибка при входе");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-md mx-auto">
				<Link
					to="/"
					className="inline-flex items-center text-foreground/70 hover:text-foreground mb-6 group"
				>
					<ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
					На главную
				</Link>

				<Card ref={cardRef} className="w-full">
					<CardHeader className="text-center space-y-2">
						<CardTitle className="text-3xl font-bold text-foreground">
							Вход в{" "}
							<span className="text-secondary">БезРук</span>
						</CardTitle>
						<p className="text-foreground/70">
							Войдите, чтобы продолжить работу
						</p>
					</CardHeader>

					<CardContent>
						{error && (
							<div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
								{error}
							</div>
						)}

						<form onSubmit={handleSubmit}>
							<div className="space-y-4">
								<Input
									label="Email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="your@email.com"
									required
									leftIcon={
										<Mail
											size={18}
											className="text-foreground/50"
										/>
									}
								/>

								<Input
									label="Пароль"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="••••••••"
									required
									leftIcon={
										<Lock
											size={18}
											className="text-foreground/50"
										/>
									}
								/>

								<Button
									type="submit"
									fullWidth
									isLoading={isLoading}
									size="lg"
									className="mt-6"
								>
									Войти
								</Button>
							</div>
						</form>

						<div className="mt-8 text-center">
							<p className="text-foreground/70">
								Нет аккаунта?{" "}
								<Link
									to="/register"
									className="text-secondary hover:text-secondary/80 font-medium"
								>
									Зарегистрироваться
								</Link>
							</p>

							<div className="mt-6 border-t border-foreground/10 pt-6">
								<p className="text-foreground/60 text-sm mb-3">
									Для демонстрации можно использовать:
								</p>
								<div className="space-y-2 text-sm">
									<p className="bg-primary/10 p-2 rounded-md">
										<strong className="text-foreground">
											Ассистент:
										</strong>{" "}
										<span className="text-foreground/70">
											alex@example.com
										</span>
									</p>
									<p className="bg-secondary/10 p-2 rounded-md">
										<strong className="text-foreground">
											Руководитель:
										</strong>{" "}
										<span className="text-foreground/70">
											elena@example.com
										</span>
									</p>
									<p className="text-foreground/50 text-xs mt-2">
										(любой пароль подойдет)
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;

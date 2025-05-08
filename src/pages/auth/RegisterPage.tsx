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
import { Mail, Lock, User, Building2, ArrowLeft } from "lucide-react";
import { useApp } from "../../context/AppContext";

const RegisterPage = () => {
	const { register } = useApp();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		role: "assistant" as "assistant" | "manager",
		company: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const cardRef = React.useRef<HTMLDivElement>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			await register(
				{
					email: formData.email,
					firstName: formData.firstName,
					lastName: formData.lastName,
					role: formData.role,
					company:
						formData.role === "manager"
							? formData.company
							: undefined,
				},
				formData.password
			);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Ошибка при регистрации"
			);
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
							Регистрация в{" "}
							<span className="text-secondary">БезРук</span>
						</CardTitle>
						<p className="text-foreground/70">
							Создайте аккаунт, чтобы начать работу
						</p>
					</CardHeader>

					<CardContent>
						{error && (
							<div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
								{error}
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-4">
								<Input
									label="Email"
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
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
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
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

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Input
										label="Имя"
										value={formData.firstName}
										onChange={(e) =>
											setFormData({
												...formData,
												firstName: e.target.value,
											})
										}
										placeholder="Иван"
										required
										leftIcon={
											<User
												size={18}
												className="text-foreground/50"
											/>
										}
									/>

									<Input
										label="Фамилия"
										value={formData.lastName}
										onChange={(e) =>
											setFormData({
												...formData,
												lastName: e.target.value,
											})
										}
										placeholder="Петров"
										required
										leftIcon={
											<User
												size={18}
												className="text-foreground/50"
											/>
										}
									/>
								</div>

								<div className="space-y-2">
									<label className="font-medium text-foreground">
										Роль
									</label>
									<div className="grid grid-cols-2 gap-4">
										<button
											type="button"
											className={`p-4 border-2 rounded-lg text-center transition-all ${
												formData.role === "assistant"
													? "border-secondary bg-secondary/10 text-foreground"
													: "border-foreground/10 hover:border-foreground/20"
											}`}
											onClick={() =>
												setFormData({
													...formData,
													role: "assistant",
												})
											}
										>
											<div className="font-bold mb-1">
												Ассистент
											</div>
											<div className="text-sm text-foreground/70">
												Ищу работу ассистентом
											</div>
										</button>

										<button
											type="button"
											className={`p-4 border-2 rounded-lg text-center transition-all ${
												formData.role === "manager"
													? "border-secondary bg-secondary/10 text-foreground"
													: "border-foreground/10 hover:border-foreground/20"
											}`}
											onClick={() =>
												setFormData({
													...formData,
													role: "manager",
												})
											}
										>
											<div className="font-bold mb-1">
												Руководитель
											</div>
											<div className="text-sm text-foreground/70">
												Ищу ассистента
											</div>
										</button>
									</div>
								</div>

								{formData.role === "manager" && (
									<Input
										label="Компания"
										value={formData.company}
										onChange={(e) =>
											setFormData({
												...formData,
												company: e.target.value,
											})
										}
										placeholder="ООО 'Компания'"
										leftIcon={
											<Building2
												size={18}
												className="text-foreground/50"
											/>
										}
									/>
								)}

								<Button
									type="submit"
									fullWidth
									isLoading={isLoading}
									size="lg"
									className="mt-6"
								>
									Зарегистрироваться
								</Button>
							</div>
						</form>

						<div className="mt-8 text-center">
							<p className="text-foreground/70">
								Уже есть аккаунт?{" "}
								<Link
									to="/login"
									className="text-secondary hover:text-secondary/80 font-medium"
								>
									Войти
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default RegisterPage;

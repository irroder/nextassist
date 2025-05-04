import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 md:p-8">
			<div className="text-center max-w-3xl mx-auto w-full">
				<div className="mb-6 sm:mb-8 md:mb-12">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
						Добро пожаловать на платформу{" "}
						<span className="text-secondary">БезРук</span>
					</h1>
					<p className="text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
						Управляйте задачами, отслеживайте прогресс и
						развивайтесь вместе с нами
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
						<div className="p-4 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors">
							<h3 className="font-semibold text-foreground mb-2 text-base sm:text-lg">
								Управление задачами
							</h3>
							<p className="text-sm text-foreground/70">
								Эффективно организуйте и отслеживайте выполнение
								задач
							</p>
						</div>
						<div className="p-4 rounded-md bg-secondary/10 hover:bg-secondary/20 transition-colors">
							<h3 className="font-semibold text-foreground mb-2 text-base sm:text-lg">
								Ежедневные отчеты
							</h3>
							<p className="text-sm text-foreground/70">
								Ведите учет достижений и планируйте будущие
								задачи
							</p>
						</div>
						<div className="p-4 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors sm:col-span-2 md:col-span-1">
							<h3 className="font-semibold text-foreground mb-2 text-base sm:text-lg">
								Обучение
							</h3>
							<p className="text-sm text-foreground/70">
								Развивайтесь с помощью наших обучающих
								материалов
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
					<Button
						asChild
						size="lg"
						className="group w-full sm:w-auto"
					>
						<Link
							to="/login"
							className="flex items-center justify-center"
						>
							Войти
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="w-full sm:w-auto"
					>
						<Link
							to="/register"
							className="flex items-center justify-center"
						>
							Зарегистрироваться
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;

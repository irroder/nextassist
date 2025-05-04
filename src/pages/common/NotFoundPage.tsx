import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

const NotFoundPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-surface-900 mb-4">
					404
				</h1>
				<h2 className="text-2xl font-semibold text-surface-700 mb-6">
					Страница не найдена
				</h2>
				<p className="text-surface-600 mb-8">
					Извините, страница, которую вы ищете, не существует.
				</p>
				<Button asChild>
					<Link to="/assistant/projects">Вернуться?</Link>
				</Button>
			</div>
		</div>
	);
};

export default NotFoundPage;

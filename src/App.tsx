import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AppRoutes } from "./routes/routes";

function App() {
	return (
		<BrowserRouter>
			<AppProvider>
				<AppRoutes />
			</AppProvider>
		</BrowserRouter>
	);
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AdminRequests from "./pages/Admin";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />}></Route>
				<Route path="/admin" element={<AdminRequests />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

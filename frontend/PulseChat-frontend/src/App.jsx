import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import Home from "./pages/home/index";
function App() {
	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

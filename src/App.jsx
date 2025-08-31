import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { RequireAuth, RequireAdmin } from "./Components/guards";

import Landing from './Pages/Landing'
import Login from './Pages/Login'
import Signup from './Pages/SignUp'
import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard';

// const AdminDashboard = () => <h1>Admin Dashboard</h1>;
// const UserDashboard = () => <h1>User Dashboard</h1>;
const Unauthorized = () => <h2>Unauthorized</h2>;

function App() {
	const [count, setCount] = useState(0)

	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />

					<Route path="/user" element={
						<RequireAuth><UserDashboard /></RequireAuth>
					} />

					<Route path="/admin" element={
						<RequireAdmin><AdminDashboard /></RequireAdmin>
					} />

					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route path="*" element={<h2>Not Found</h2>} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App

import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "./stores/auth";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { IdeasPage } from "./pages/ideas";
import { MembersPage } from "./pages/Members";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthStore();
	return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthStore();
	return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}


export function App() {

	return (
		<Layout>
			<Routes>
				<Route path="/login" element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				} />

				<Route path="/signup" element={
					<PublicRoute>
						<Signup />
					</PublicRoute>
				} />

				<Route path="/" element={
					<ProtectedRoute>
						<IdeasPage />
					</ProtectedRoute>
				} />

				<Route path="/members" element={
					<ProtectedRoute>
						<MembersPage />
					</ProtectedRoute>
				} />
			</Routes>
		</Layout>
	)
}
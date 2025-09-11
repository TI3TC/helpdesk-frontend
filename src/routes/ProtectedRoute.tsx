import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";


export default function ProtectedRoute() {
const { user, loading } = useAuth();
if (loading) return <div className="p-6">Carregando…</div>;
return user ? <Outlet /> : <Navigate to="/login" replace />;
}

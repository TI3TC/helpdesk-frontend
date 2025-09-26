import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./store/auth";
import AuthCallback from "./auth/AuthCallback.tsx"; // <-- import novo

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/auth/callback",        // <-- nova rota
    element: <AuthCallback />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/tickets", element: <Tickets /> }
    ]
  }
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

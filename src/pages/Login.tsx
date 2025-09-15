// src/pages/Login.tsx
import { useNavigate } from "react-router-dom";
import { signInWithMicrosoft } from "../auth/msalActions";
import { usePostLogin } from "../auth/usePostLogin";

export default function Login() {
  const navigate = useNavigate();
  usePostLogin(navigate);

  return (
    <div className="p-6 flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <button
        onClick={signInWithMicrosoft}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition"
      >
        Entrar com Microsoft
      </button>
    </div>
  );
}

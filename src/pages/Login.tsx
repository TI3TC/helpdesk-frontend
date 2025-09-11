import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";


export default function Login() {
const [email, setEmail] = useState("");
const { loginDev } = useAuth();
const nav = useNavigate();


async function onSubmit(e: React.FormEvent) {
e.preventDefault();
await loginDev(email);
nav("/tickets");
}


return (
<form onSubmit={onSubmit} className="max-w-sm mx-auto mt-24 space-y-3">
<h1 className="text-2xl font-semibold">Login</h1>
<input
className="border rounded w-full p-2"
placeholder="email@3tc.com.br"
value={email}
onChange={e => setEmail(e.target.value)}
/>
<button className="bg-black text-white px-4 py-2 rounded">Entrar</button>
</form>
);
}

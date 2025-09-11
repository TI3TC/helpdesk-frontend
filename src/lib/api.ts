export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";


const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";


async function request<T>(path: string, method: HttpMethod = "GET", body?: unknown): Promise<T> {
const res = await fetch(`${API_BASE}${path}` as string, {
method,
headers: body ? { "Content-Type": "application/json" } : undefined,
credentials: "include", // envia/recebe cookies httpOnly
body: body ? JSON.stringify(body) : undefined
});
if (!res.ok) {
let msg = res.statusText;
try { const data = await res.json(); msg = data?.error || msg; } catch {}
throw new Error(msg);
}
return res.json() as Promise<T>;
}


export const api = {
health: () => request<{ ok: boolean; time: string }>("/healthz"),
me: () => request<{ user: { id: string; email: string } }>("/auth/me"),
logout: () => request<void>("/auth/logout", "POST"),
// login temporário — ajuste se seu backend usa outra rota
loginDev: (email: string) => request<{ user: { id: string; email: string } }>("/auth/dev-login", "POST", { email }),
tickets: () => request<{ items: Array<{ id: number; title: string; status: string }> }>("/tickets")
};

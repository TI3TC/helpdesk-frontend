const API = import.meta.env.VITE_API_BASE_URL!;

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",                // envia/recebe cookies (sessão)
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init
  });
  if (!res.ok) throw new Error((await res.text()) || res.statusText);
  return res.json() as Promise<T>;
}

export const api = {
  health: () => req<{ ok: boolean; time: string }>("/healthz"),
  me:     () => req<{ user: { id: string; email: string } }>("/auth/me"),
  logout: () => req<void>("/auth/logout", { method: "POST" }) as any,
  loginDev: (email: string) =>
    req<{ user: { id: string; email: string } }>("/auth/dev-login", {
      method: "POST", body: JSON.stringify({ email })
    }),
  tickets: () => req<{ items: Array<{ id: number; title: string; status: string }> }>("/tickets")
};

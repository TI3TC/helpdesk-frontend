import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";


type User = { id: string; email: string };
type AuthCtx = {
user: User | null;
loading: boolean;
loginDev: (email: string) => Promise<void>;
logout: () => Promise<void>;
};
const Ctx = createContext<AuthCtx>({} as any);


export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
api.me().then(r => setUser(r.user)).catch(() => {}).finally(() => setLoading(false));
}, []);


async function loginDev(email: string) {
await api.loginDev(email);
const me = await api.me();
setUser(me.user);
}


async function logout() {
await api.logout();
setUser(null);
}


return <Ctx.Provider value={{ user, loading, loginDev, logout }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);

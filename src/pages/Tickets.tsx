import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../store/auth";

export default function Tickets() {
  const [tickets, setTickets] = useState<Array<{ id: number; title: string; status: string }>>([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    api.tickets().then((r) => setTickets(r.items));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tickets</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button onClick={() => logout()} className="border px-3 py-1 rounded">
            Sair
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {tickets.map((t) => (
          <li key={t.id} className="border rounded p-3">
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-gray-600">{t.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

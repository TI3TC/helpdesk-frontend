import { NavLink } from "react-router-dom";
import { SquarePlus, LifeBuoy, Users, Settings, ListChecks } from "lucide-react";

const items = [
  { label: "Abrir Chamado", to: "/tickets/new", icon: SquarePlus },
  { label: "Meus Chamados", to: "/tickets", icon: ListChecks },
  { label: "Central de Ajuda", to: "/help", icon: LifeBuoy },
  { label: "Usuários e Perfis", to: "/admin/users", icon: Users },
  { label: "Configurações", to: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <nav className="p-3 space-y-1">
      <div className="px-2 py-3 font-semibold">Helpdesk 3TC</div>
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [
              "flex items-center gap-3 px-3 py-2 rounded-md transition",
              isActive ? "bg-accent text-foreground" : "hover:bg-accent text-foreground",
            ].join(" ")
          }
        >
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Ticket,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  Plus,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    current: true,
  },
  {
    name: "Meus Tickets",
    href: "/tickets",
    icon: Ticket,
    current: false,
    badge: 5,
  },
  {
    name: "Novo Ticket",
    href: "/tickets/new",
    icon: Plus,
    current: false,
  },
  {
    name: "Base de Conhecimento",
    href: "/knowledge-base",
    icon: BookOpen,
    current: false,
  },
];

const agentNavigation = [
  {
    name: "Tickets Atribuídos",
    href: "/agent/tickets",
    icon: MessageCircle,
    current: false,
    badge: 8,
  },
  {
    name: "Tickets Pendentes",
    href: "/agent/pending",
    icon: Clock,
    current: false,
    badge: 12,
  },
  {
    name: "Resolvidos",
    href: "/agent/resolved",
    icon: CheckCircle,
    current: false,
  },
];

const adminNavigation = [
  {
    name: "Usuários",
    href: "/admin/users",
    icon: Users,
    current: false,
  },
  {
    name: "Relatórios",
    href: "/admin/reports",
    icon: BarChart3,
    current: false,
  },
  {
    name: "Configurações",
    href: "/admin/settings",
    icon: Settings,
    current: false,
  },
];

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={cn("w-64 bg-sidebar border-r border-sidebar-border", className)}>
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">HD</span>
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Helpdesk</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={item.current ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  item.current
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          <div className="pt-6">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Agente
            </h3>
            <div className="mt-2 space-y-1">
              {agentNavigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Administração
            </h3>
            <div className="mt-2 space-y-1">
              {adminNavigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};
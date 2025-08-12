import { 
  Home, 
  Ticket, 
  Plus, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Meus Tickets", href: "/tickets", icon: Ticket },
  { name: "Novo Ticket", href: "/tickets/new", icon: Plus },
  { name: "Base de Conhecimento", href: "/knowledge-base", icon: BookOpen },
  { name: "Usuários", href: "/users", icon: Users },
  { name: "Relatórios", href: "/reports", icon: BarChart3 },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-14 items-center border-b px-4">
        <HelpCircle className="h-6 w-6 text-primary mr-2" />
        <span className="font-semibold">Helpdesk Pro</span>
      </div>
      
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive && "bg-secondary text-secondary-foreground"
              )}
              onClick={() => navigate(item.href)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
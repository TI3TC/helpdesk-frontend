import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Users,
  Plus
} from "lucide-react";

const stats = [
  {
    title: "Total de Tickets",
    value: "248",
    change: "+12%",
    icon: Ticket,
    color: "text-blue-600"
  },
  {
    title: "Tickets Abertos",
    value: "32",
    change: "-8%",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "Resolvidos Hoje",
    value: "18",
    change: "+25%",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "Urgentes",
    value: "5",
    change: "+2",
    icon: AlertTriangle,
    color: "text-red-600"
  }
];

const recentTickets = [
  {
    id: "#TK-001",
    title: "Problema com impressora",
    status: "Aberto",
    priority: "Alta",
    customer: "João Silva",
    time: "há 2 horas"
  },
  {
    id: "#TK-002", 
    title: "Acesso ao sistema",
    status: "Em Progresso",
    priority: "Média",
    customer: "Maria Santos",
    time: "há 4 horas"
  },
  {
    id: "#TK-003",
    title: "Erro no email",
    status: "Resolvido",
    priority: "Baixa",
    customer: "Pedro Costa",
    time: "há 1 dia"
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aberto": return "bg-red-100 text-red-800";
      case "Em Progresso": return "bg-yellow-100 text-yellow-800";
      case "Resolvido": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Média": return "bg-yellow-100 text-yellow-800";
      case "Baixa": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => navigate("/tickets/new")} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> desde o mês passado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Tickets Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between border-b pb-2">
                <div className="space-y-1">
                  <p className="font-medium">{ticket.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{ticket.id}</span>
                    <span>•</span>
                    <span>{ticket.customer}</span>
                    <span>•</span>
                    <span>{ticket.time}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/tickets")}
            >
              Ver Todos os Tickets
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/tickets/new")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Criar Novo Ticket
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/knowledge-base")}
            >
              <Users className="mr-2 h-4 w-4" />
              Base de Conhecimento
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/reports")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Ver Relatórios
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
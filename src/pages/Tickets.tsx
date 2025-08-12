import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter } from "lucide-react";

const tickets = [
  {
    id: "#TK-001",
    title: "Problema com impressora não está funcionando",
    description: "A impressora do setor financeiro parou de funcionar desde ontem...",
    status: "Aberto",
    priority: "Alta",
    customer: "João Silva",
    agent: "Maria Santos",
    created: "2024-01-15",
    updated: "há 2 horas"
  },
  {
    id: "#TK-002",
    title: "Solicitação de acesso ao sistema",
    description: "Preciso de acesso ao sistema de RH para consultar informações...",
    status: "Em Progresso",
    priority: "Média",
    customer: "Ana Costa",
    agent: "Pedro Lima",
    created: "2024-01-14",
    updated: "há 4 horas"
  },
  {
    id: "#TK-003",
    title: "Erro no email corporativo",
    description: "Não consigo receber emails desde ontem à tarde...",
    status: "Resolvido",
    priority: "Baixa",
    customer: "Carlos Santos",
    agent: "Ana Silva",
    created: "2024-01-13",
    updated: "há 1 dia"
  },
  {
    id: "#TK-004",
    title: "Sistema lento para acessar",
    description: "O sistema está muito lento, demora mais de 5 minutos para carregar...",
    status: "Aberto",
    priority: "Urgente",
    customer: "Roberto Silva",
    agent: "João Costa",
    created: "2024-01-15",
    updated: "há 30 min"
  }
];

export default function Tickets() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aberto": return "bg-red-100 text-red-800";
      case "Em Progresso": return "bg-yellow-100 text-yellow-800";
      case "Resolvido": return "bg-green-100 text-green-800";
      case "Fechado": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgente": return "bg-red-100 text-red-800";
      case "Alta": return "bg-orange-100 text-orange-800";
      case "Média": return "bg-yellow-100 text-yellow-800";
      case "Baixa": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meus Tickets</h1>
        <Button onClick={() => navigate("/tickets/new")} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Ticket
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Aberto">Aberto</SelectItem>
                <SelectItem value="Em Progresso">Em Progresso</SelectItem>
                <SelectItem value="Resolvido">Resolvido</SelectItem>
                <SelectItem value="Fechado">Fechado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Prioridades</SelectItem>
                <SelectItem value="Urgente">Urgente</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Média">Média</SelectItem>
                <SelectItem value="Baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{ticket.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {ticket.id}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {ticket.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Cliente: {ticket.customer}</span>
                    <span>•</span>
                    <span>Agente: {ticket.agent}</span>
                    <span>•</span>
                    <span>Criado: {ticket.created}</span>
                    <span>•</span>
                    <span>Atualizado: {ticket.updated}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/tickets/${ticket.id.replace('#', '')}`)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Nenhum ticket encontrado com os filtros aplicados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
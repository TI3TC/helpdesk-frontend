import { Layout } from "@/components/layout/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TicketCard, type Ticket } from "@/components/tickets/TicketCard";
import { TicketStatusChart, WeeklyTicketsChart } from "@/components/charts/TicketChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket as TicketIcon, Clock, Users, CheckCircle, Plus, TrendingUp, AlertTriangle } from "lucide-react";

// Mock data
const mockTickets: Ticket[] = [
  {
    id: "1",
    code: "HD-2024-001",
    title: "Problema com acesso ao sistema de e-mail",
    description: "Não consigo acessar meu e-mail corporativo desde ontem. Aparece erro de conexão.",
    status: "open",
    priority: "high",
    category: "E-mail",
    requester: {
      name: "Maria Silva",
      email: "maria.silva@empresa.com",
    },
    createdAt: "2024-01-10T08:30:00Z",
    updatedAt: "2024-01-10T08:30:00Z",
    commentsCount: 0,
    attachmentsCount: 1,
    slaStatus: "ok",
  },
  {
    id: "2",
    code: "HD-2024-002",
    title: "Solicitação de novo usuário no sistema",
    description: "Preciso criar acesso para novo funcionário que iniciou hoje.",
    status: "in-progress",
    priority: "medium",
    category: "Acessos",
    requester: {
      name: "João Santos",
      email: "joao.santos@empresa.com",
    },
    agent: {
      name: "Ana Costa",
    },
    createdAt: "2024-01-09T14:15:00Z",
    updatedAt: "2024-01-10T09:00:00Z",
    commentsCount: 3,
    attachmentsCount: 0,
    slaStatus: "warning",
  },
  {
    id: "3",
    code: "HD-2024-003",
    title: "Impressora não funciona",
    description: "A impressora do 2º andar não está imprimindo. Já tentei reiniciar.",
    status: "pending",
    priority: "urgent",
    category: "Hardware",
    requester: {
      name: "Carlos Oliveira",
      email: "carlos.oliveira@empresa.com",
    },
    agent: {
      name: "Pedro Lima",
    },
    createdAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-09T10:30:00Z",
    commentsCount: 5,
    attachmentsCount: 2,
    slaStatus: "critical",
  },
];

const Index = () => {
  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-hero rounded-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Helpdesk</h1>
              <p className="text-blue-100 text-lg">
                Gerencie seus tickets de suporte de forma eficiente
              </p>
            </div>
            <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Plus className="mr-2 h-5 w-5" />
              Novo Ticket
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total de Tickets"
            value="147"
            icon={TicketIcon}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Tickets Abertos"
            value="45"
            icon={Clock}
            trend={{ value: 8, isPositive: false }}
          />
          <StatsCard
            title="Resolvidos Hoje"
            value="23"
            icon={CheckCircle}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Tempo Médio"
            value="2.4h"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <TicketStatusChart />
          <WeeklyTicketsChart />
        </div>

        {/* Recent Tickets */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tickets Recentes</CardTitle>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* SLA Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Alertas de SLA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">#HD-2024-003</p>
                    <p className="text-xs text-muted-foreground">Vence em 45min</p>
                  </div>
                  <Badge variant="destructive">Crítico</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">#HD-2024-002</p>
                    <p className="text-xs text-muted-foreground">Vence em 2h</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Atenção</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Novo Ticket
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Gerenciar Usuários
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TicketIcon className="mr-2 h-4 w-4" />
                  Relatórios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

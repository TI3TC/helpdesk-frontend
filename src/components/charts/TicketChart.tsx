import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ticketStatusData = [
  { name: "Abertos", value: 45, color: "#3b82f6" },
  { name: "Em Andamento", value: 23, color: "#f59e0b" },
  { name: "Pendentes", value: 12, color: "#ef4444" },
  { name: "Resolvidos", value: 67, color: "#10b981" },
];

const weeklyData = [
  { day: "Seg", tickets: 12 },
  { day: "Ter", tickets: 19 },
  { day: "Qua", tickets: 15 },
  { day: "Qui", tickets: 22 },
  { day: "Sex", tickets: 18 },
  { day: "Sáb", tickets: 8 },
  { day: "Dom", tickets: 5 },
];

export const TicketStatusChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status dos Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ticketStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {ticketStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const WeeklyTicketsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets por Dia da Semana</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tickets" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
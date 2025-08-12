import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MessageCircle, Paperclip, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Ticket {
  id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "pending" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  requester: {
    name: string;
    email: string;
    avatar?: string;
  };
  agent?: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  attachmentsCount: number;
  slaStatus: "ok" | "warning" | "critical";
}

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
}

const statusColors = {
  open: "status-open",
  "in-progress": "status-in-progress",
  pending: "status-pending",
  resolved: "status-resolved",
  closed: "status-closed",
};

const priorityColors = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high",
  urgent: "priority-urgent",
};

const slaColors = {
  ok: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  critical: "bg-red-100 text-red-800",
};

export const TicketCard = ({ ticket, onClick }: TicketCardProps) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Agora mesmo";
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  return (
    <Card className="card-hover cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge className={cn("border", statusColors[ticket.status])}>
              {ticket.status}
            </Badge>
            <Badge className={cn("border", priorityColors[ticket.priority])}>
              {ticket.priority}
            </Badge>
            <Badge variant="outline" className={slaColors[ticket.slaStatus]}>
              SLA
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">#{ticket.code}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {ticket.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 mt-1">
            {ticket.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={ticket.requester.avatar} />
              <AvatarFallback>
                {ticket.requester.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">{ticket.requester.name}</span>
          </div>
          
          {ticket.agent && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{ticket.agent.name}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{ticket.commentsCount}</span>
            </div>
            {ticket.attachmentsCount > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="h-4 w-4" />
                <span>{ticket.attachmentsCount}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatTimeAgo(ticket.updatedAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline">{ticket.category}</Badge>
          <Button variant="outline" size="sm">
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
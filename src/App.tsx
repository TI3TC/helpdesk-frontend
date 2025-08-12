import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/layout/Layout";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import KnowledgeBase from "./pages/KnowledgeBase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tickets" element={
            <Layout>
              <Tickets />
            </Layout>
          } />
          <Route path="/tickets/new" element={
            <Layout>
              <NewTicket />
            </Layout>
          } />
          <Route path="/knowledge-base" element={
            <Layout>
              <KnowledgeBase />
            </Layout>
          } />
          <Route path="/users" element={
            <Layout>
              <div className="text-center py-8">
                <h1 className="text-2xl font-bold mb-4">Usuários</h1>
                <p className="text-muted-foreground">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/reports" element={
            <Layout>
              <div className="text-center py-8">
                <h1 className="text-2xl font-bold mb-4">Relatórios</h1>
                <p className="text-muted-foreground">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <div className="text-center py-8">
                <h1 className="text-2xl font-bold mb-4">Configurações</h1>
                <p className="text-muted-foreground">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

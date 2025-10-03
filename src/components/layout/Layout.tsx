import { ReactNode } from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Topbar } from "../components/topbar/Topbar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground grid md:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="border-r bg-card">
        <Sidebar />
      </aside>

      {/* Conteúdo */}
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-10 bg-card/80 backdrop-blur border-b">
          <Topbar />
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

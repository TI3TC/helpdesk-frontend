// src/pages/Login.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithMicrosoft } from "../auth/msalActions";
import { usePostLogin } from "../auth/usePostLogin";

export default function Login() {
  const navigate = useNavigate();
  usePostLogin(navigate);

  // estados simples para rótulos e alertas
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [ariaMessage, setAriaMessage] = useState("");

  const handleSignIn = async () => {
    try {
      setStatus("loading");
      setAriaMessage("Aguarde, autenticando sua conta.");
      await signInWithMicrosoft(); // deve redirecionar para MS; usePostLogin cuida do pós-login
      setStatus("success");
      setAriaMessage("Autenticado com sucesso. Redirecionando.");
    } catch (e) {
      setStatus("error");
      setAriaMessage("Falha na autenticação.");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      {/* Cartão */}
      <div
        role="dialog"
        aria-labelledby="login-title"
        className="w-full max-w-sm bg-card text-card-foreground border rounded-[var(--radius)] shadow-md p-8 space-y-6"
      >
        {/* Logo */}
        <img
          src="/logo-3tc.jpg"
          alt="Logotipo da 3TC Isolamento Térmico"
          className="mx-auto w-28"
          draggable={false}
        />

        {/* Título e subtítulo */}
        <div className="text-center space-y-2">
          <h1 id="login-title" className="text-2xl font-semibold">
            Acesse o Helpdesk
          </h1>
          <p className="text-sm text-muted-foreground">
            Use sua conta corporativa para entrar.
          </p>
        </div>

        {/* Mensagens de estado */}
        {status === "error" && (
          <div className="rounded-md p-3 bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] text-sm">
            Não foi possível autenticar. Tente novamente.{" "}
            <a href="/ajuda" className="underline">
              Preciso de ajuda
            </a>
          </div>
        )}
        {status === "success" && (
          <div className="rounded-md p-3 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] text-sm">
            Tudo certo, redirecionando…
          </div>
        )}

        {/* Botão de login */}
        <button
          onClick={handleSignIn}
          disabled={status === "loading"}
          className="w-full h-12 inline-flex items-center justify-center rounded-md shadow transition
                     bg-primary text-primary-foreground
                     hover:bg-primary/90
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                     focus-visible:ring-offset-2 focus-visible:ring-offset-background
                     disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Entrando…" : "Entrar com Microsoft"}
        </button>

        {/* Links auxiliares */}
        <div className="text-xs text-muted-foreground text-center space-y-2">
          <a href="/ajuda" className="hover:underline">
            Problemas para entrar?
          </a>
          <div>
            <a href="/privacidade" className="hover:underline">
              Política de Privacidade
            </a>
          </div>
        </div>

        {/* Região para leitores de tela (anuncia estados) */}
        <p aria-live="polite" className="sr-only">
          {ariaMessage}
        </p>
      </div>

      {/* Rodapé da página */}
      <footer className="mt-6 text-xs text-muted-foreground text-center space-y-1">
        <p>
          Seus dados são tratados conforme a LGPD. Saiba mais em{" "}
          <a href="/privacidade" className="hover:underline">
            Política de Privacidade
          </a>
          .
        </p>
        <p>© 2025 3TC — Área de Tecnologia da Informação.</p>
      </footer>
    </div>
  );
}

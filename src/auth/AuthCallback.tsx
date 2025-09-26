import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { msal, ensureMsalInitialized } from "./msal";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await ensureMsalInitialized();

      // Processa o retorno do login (Authorization Code Flow)
      const result = await msal.handleRedirectPromise();

      if (result?.account) {
        msal.setActiveAccount(result.account);
        // TODO: Próximo passo: trocar code por sessão no backend
        navigate("/tickets", { replace: true });
        return;
      }

      // Sem result? Tenta reaproveitar sessão do MSAL ou volta ao /login
      const account = msal.getAllAccounts()[0];
      if (account) {
        msal.setActiveAccount(account);
        navigate("/tickets", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    })().catch(() => navigate("/login", { replace: true }));
  }, [navigate]);

  return <div>Autenticando…</div>;
}

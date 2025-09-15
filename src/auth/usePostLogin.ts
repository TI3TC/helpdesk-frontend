// src/auth/usePostLogin.ts
import { useEffect } from 'react';
import { msal, ensureMsalInitialized } from './msal';
import { routeByRole } from './routeByRole';

export function usePostLogin(navigate: (to: string) => void) {
  useEffect(() => {
    (async () => {
      const instance = await ensureMsalInitialized();
      const account = instance.getActiveAccount();
      if (!account) return; // usuário não logado no MSAL

      // pega ID Token
      const result = await instance.acquireTokenSilent({
        account,
        scopes: ['openid', 'profile', 'email']
      });

      const idToken = result.idToken;

      // troca no backend (gera cookie httpOnly)
      const rsp = await fetch('/api/auth/microsoft/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // <— essencial pro cookie
        body: JSON.stringify({ idToken })
      });

      if (!rsp.ok) {
        console.error('exchange failed', await rsp.text());
        return; // opcional: mostrar erro e botão "Tentar novamente"
      }

      const { landing } = await rsp.json();
      navigate(landing || '/tickets');
    })();
  }, [navigate]);
}

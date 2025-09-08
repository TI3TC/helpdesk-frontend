import { useEffect, useState } from 'react';
import { msal, ensureMsalInitialized } from '../auth/msal';

export default function AuthCallback() {
  const [msg, setMsg] = useState('Concluindo login com a Microsoft...');

  useEffect(() => {
    (async () => {
      try {
        await ensureMsalInitialized();
        const res = await msal.handleRedirectPromise();
        if (!res) { setMsg('Nada para processar.'); return; }
        sessionStorage.setItem('msal.idToken', res.idToken);
        setMsg('Login concluído! (próximo passo: trocar por sessão da API)');
        // depois daqui vamos chamar /api/auth/microsoft
      } catch (e) {
        setMsg('Falha no login: ' + (e as Error).message);
      }
    })();
  }, []);

  return <p className="p-6">{msg}</p>;
}

import { useEffect, useState } from 'react';
import { msal } from '../auth/msal';

export default function AuthCallback() {
  const [msg, setMsg] = useState('Concluindo login com a Microsoft...');

  useEffect(() => {
    msal.handleRedirectPromise()
      .then(async (res) => {
        if (!res) { setMsg('Nada para processar.'); return; }
        // ID Token da Microsoft
        sessionStorage.setItem('msal.idToken', res.idToken);
        setMsg('Login concluído! (vamos ligar com a API já já)');
        // Próximo passo: enviar res.idToken para /api/auth/microsoft
      })
      .catch((e) => setMsg('Falha no login: ' + (e as Error).message));
  }, []);

  return <p className="p-6">{msg}</p>;
}

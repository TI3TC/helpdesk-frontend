import { msal } from '../../auth/msal';

export async function signInWithMicrosoft() {
  try {
    // MSAL v3 exige initialize antes (fazemos aqui também)
    if ((msal as any).initialize) {
      await (msal as any).initialize();
    }
    await msal.loginRedirect({ scopes: ['openid', 'profile', 'email'] });
  } catch (e) {
    alert('Erro MSAL: ' + (e as Error).message);
  }
}

export function debugMsal() {
  // ESTE é o debug que precisamos: lê exatamente o que o Vite injetou no build
  const cid = import.meta.env.VITE_MSAL_CLIENT_ID || '';
  const tid = import.meta.env.VITE_MSAL_TENANT_ID || '';
  const redir = `${window.location.origin}/auth/callback`;

  alert(`MSAL (DEBUG build)
VITE_MSAL_CLIENT_ID: ${cid || '(vazio)'}
VITE_MSAL_TENANT_ID: ${tid || '(vazio)'}
redirectUri: ${redir}`);
}


import { msal } from '../../auth/msal';

export function debugMsal() {
  const cfg = (msal as any)?.config?.auth || {};
  alert(
    `MSAL Config
clientId: ${cfg.clientId || '(vazio)'}
authority: ${cfg.authority || '(vazio)'}
redirectUri: ${cfg.redirectUri || '(vazio)'}`
  );
}

export async function signInWithMicrosoft() {
  try {
    await msal.loginRedirect({ scopes: ['openid', 'profile', 'email'] });
  } catch (e) {
    alert('Erro MSAL: ' + (e as Error).message);
  }
}

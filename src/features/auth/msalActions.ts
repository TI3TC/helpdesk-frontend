import { msal } from '../../auth/msal';

export function signInWithMicrosoft() {
  return msal.loginRedirect({ scopes: ['openid', 'profile', 'email'] })
    .catch((e) => alert('Erro MSAL: ' + (e as Error).message));
}

export function debugMsal() {
  const cfg = (msal as any)?.config?.auth || {};
  alert(`MSAL
clientId: ${cfg.clientId || '(vazio)'}
authority: ${cfg.authority || '(vazio)'}
redirectUri: ${cfg.redirectUri || '(vazio)'}`);
}

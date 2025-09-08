import { msal, ensureMsalInitialized, msalConfig, readEnvForDebug } from '../../auth/msal';

export async function signInWithMicrosoft() {
  try {
    await ensureMsalInitialized();
    await msal.loginRedirect({ scopes: ['openid', 'profile', 'email'] });
  } catch (e) {
    alert('Erro MSAL: ' + (e as Error).message);
  }
}

export function debugMsal() {
  const env = readEnvForDebug();
  alert(`DEBUG
env.VITE_MSAL_CLIENT_ID: ${env.envClientId || '(vazio)'}
env.VITE_MSAL_TENANT_ID: ${env.envTenantId || '(vazio)'}
redirectUri: ${env.redirectUri}
origin: ${env.origin}`);
}

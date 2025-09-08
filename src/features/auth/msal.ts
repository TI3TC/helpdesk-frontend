import { PublicClientApplication } from '@azure/msal-browser';

/** pegas do .env (precisam começar com VITE_) */
const clientId = import.meta.env.VITE_MSAL_CLIENT_ID || '';
const tenantId = import.meta.env.VITE_MSAL_TENANT_ID || '';

export const msalConfig = {
  auth: {
    clientId,
    authority: tenantId ? `https://login.microsoftonline.com/${tenantId}` : '',
    redirectUri: `${window.location.origin}/auth/callback`,
  },
  cache: { cacheLocation: 'localStorage' as const },
};

export const msal = new PublicClientApplication(msalConfig);

/** garante que o MSAL foi inicializado antes de usar */
let inited = false;
export async function ensureMsalInitialized() {
  if (!inited) {
    await msal.initialize();
    inited = true;
  }
}

/** helpers pra debug */
export function readEnvForDebug() {
  return {
    envClientId: import.meta.env.VITE_MSAL_CLIENT_ID || '',
    envTenantId: import.meta.env.VITE_MSAL_TENANT_ID || '',
    redirectUri: msalConfig.auth.redirectUri,
    origin: window.location.origin,
  };
}

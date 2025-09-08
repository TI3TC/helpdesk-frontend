import { PublicClientApplication } from '@azure/msal-browser';

const clientId = import.meta.env.VITE_MSAL_CLIENT_ID || 'CHANGE_ME';
const tenantId = import.meta.env.VITE_MSAL_TENANT_ID || 'common';

export const msal = new PublicClientApplication({
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: `${window.location.origin}/auth/callback`,
  },
  cache: { cacheLocation: 'localStorage' },
});

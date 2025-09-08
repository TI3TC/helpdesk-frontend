import { PublicClientApplication } from '@azure/msal-browser';

// --- COLOQUE SEUS GUIDS AQUI (os que você me passou) ---
const clientId = 'd6881117-d053-4933-a5e2-b13532f2af95';
const tenantId = 'a2f44e6b-598b-4d56-8e01-c63c72e21c10';
// --------------------------------------------------------

export const msal = new PublicClientApplication({
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: `${window.location.origin}/auth/callback`,
  },
  cache: { cacheLocation: 'localStorage' },
});

// src/auth/msal.ts
import { PublicClientApplication, EventType, InteractionStatus, AccountInfo, LogLevel, Configuration } from '@azure/msal-browser';

let msalInstance: PublicClientApplication | null = null;
let initialized = false;

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID || '<SEU_CLIENT_ID>',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MSAL_TENANT_ID || 'common'}`,
    redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI || window.location.origin, // ex: https://helpdesk.3tc.com.br/
    postLogoutRedirectUri: import.meta.env.VITE_MSAL_POSTLOGOUT_URI || window.location.origin,
    navigateToLoginRequestUrl: false, // evita voltar pra /login após redirect
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      loggerCallback: (level, message) => {
        if (level === LogLevel.Error) console.error('[MSAL]', message);
        if (level === LogLevel.Warning) console.warn('[MSAL]', message);
        if (level === LogLevel.Info) console.info('[MSAL]', message);
        if (level === LogLevel.Verbose) console.debug('[MSAL]', message);
      }
    }
  }
};

export const msal = {
  getInstance() {
    if (!msalInstance) msalInstance = new PublicClientApplication(msalConfig);
    return msalInstance;
  }
};

export async function ensureMsalInitialized() {
  if (initialized) return msal.getInstance();

  const instance = msal.getInstance();

  // 1) Processa o redirect (ESSENCIAL para sair do loop)
  await instance.handleRedirectPromise().then((result) => {
    if (result && result.account) {
      instance.setActiveAccount(result.account);
      console.info('[MSAL] Login via redirect OK. Active account setado:', result.account.username);
    }
  }).catch((err) => {
    console.error('[MSAL] handleRedirectPromise error', err);
  });

  // 2) Se nenhum account ficou ativo, mas existem contas, seta a primeira
  const accounts = instance.getAllAccounts();
  if (!instance.getActiveAccount() && accounts.length > 0) {
    instance.setActiveAccount(accounts[0]);
    console.info('[MSAL] Active account setado a partir das contas existentes:', accounts[0].username);
  }

  // 3) Opcional: escutar eventos de sucesso de login/silent
  instance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
      const acc = event.payload && (event.payload as any).account as AccountInfo | undefined;
      if (acc) {
        instance.setActiveAccount(acc);
        console.info('[MSAL] Active account atualizado por evento:', acc.username);
      }
    }
  });

  initialized = true;
  return instance;
}

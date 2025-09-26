// src/auth/msal.ts
import {
  PublicClientApplication,
  EventType,
  AccountInfo,
  LogLevel,
  Configuration,
  RedirectRequest,
  SilentRequest,
} from "@azure/msal-browser";

const CLIENT_ID = (import.meta.env.VITE_MSAL_CLIENT_ID ?? "").trim();
const TENANT_ID = (import.meta.env.VITE_MSAL_TENANT_ID ?? "").trim();
const REDIRECT_URI =
  (import.meta.env.VITE_MSAL_REDIRECT_URI as string) || window.location.origin;
const POST_LOGOUT_URI =
  (import.meta.env.VITE_MSAL_POSTLOGOUT_URI as string) || window.location.origin;

if (!CLIENT_ID || !TENANT_ID) {
  console.error(
    "[MSAL] Variáveis ausentes: VITE_MSAL_CLIENT_ID e/ou VITE_MSAL_TENANT_ID."
  );
}

const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: POST_LOGOUT_URI,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      loggerCallback: (level, message) => {
        if (level === LogLevel.Error) console.error("[MSAL]", message);
        if (level === LogLevel.Warning) console.warn("[MSAL]", message);
        if (level === LogLevel.Info) console.info("[MSAL]", message);
        if (level === LogLevel.Verbose) console.debug("[MSAL]", message);
      },
    },
  },
};

export const loginRequest: RedirectRequest & SilentRequest = {
  scopes: ["openid", "profile", "email"],
  prompt: "select_account",
};

let msalInstance: PublicClientApplication | null = null;
let initialized = false;

export const msal = {
  getInstance() {
    if (!msalInstance) msalInstance = new PublicClientApplication(msalConfig);
    return msalInstance;
  },
};

export async function ensureMsalInitialized() {
  if (initialized) return msal.getInstance();

  const instance = msal.getInstance();

  try {
    const result = await instance.handleRedirectPromise();
    if (result?.account) {
      instance.setActiveAccount(result.account);
      console.info(
        "[MSAL] Login via redirect OK. Active account:",
        result.account.username
      );
    }
  } catch (err) {
    console.error("[MSAL] handleRedirectPromise error", err);
  }

  if (!instance.getActiveAccount()) {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
      console.info(
        "[MSAL] Active account definido a partir das contas existentes:",
        accounts[0].username
      );
    }
  }

  instance.addEventCallback((event) => {
    if (
      event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
    ) {
      const acc = (event.payload as any)?.account as AccountInfo | undefined;
      if (acc) {
        instance.setActiveAccount(acc);
        console.info("[MSAL] Active account atualizado:", acc.username);
      }
    }
  });

  initialized = true;
  return instance;
}

export function getActiveAccount(): AccountInfo | null {
  const i = msal.getInstance();
  return i.getActiveAccount() ?? i.getAllAccounts()[0] ?? null;
}

export async function signInWithMicrosoft() {
  const instance = await ensureMsalInitialized();
  await instance.loginRedirect(loginRequest);
}

export async function acquireIdTokenSilent(): Promise<string | null> {
  const instance = await ensureMsalInitialized();
  const account = getActiveAccount();
  if (!account) return null;

  try {
    const resp = await instance.acquireTokenSilent({
      ...loginRequest,
      account,
    });
    return resp.idToken ?? null;
  } catch (err) {
    console.warn("[MSAL] acquireTokenSilent falhou; tente loginRedirect.", err);
    return null;
  }
}

export async function signOut() {
  const instance = await ensureMsalInitialized();
  const account = getActiveAccount();
  await instance.logoutRedirect({
    account: account ?? undefined,
    postLogoutRedirectUri: POST_LOGOUT_URI,
  });
}

/** Utilitário opcional para debug local (não usar em produção) */
export function decodeIdToken(idToken: string) {
  try {
    const [, payload] = idToken.split(".");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

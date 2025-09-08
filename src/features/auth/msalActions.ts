import { msal } from '../../auth/msal';

export function signInWithMicrosoft() {
  msal.loginRedirect({ scopes: ['openid', 'profile', 'email'] });
}

// src/auth/routeByRole.ts
export type AppRole = 'admin' | 'agent' | 'user';

export function routeByRole(role?: AppRole): string {
  switch (role) {
    case 'admin': return '/admin';
    case 'agent': return '/tickets';
    case 'user':  return '/meus-tickets';
    default:      return '/tickets'; // fallback seguro
  }
}

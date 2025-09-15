// src/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ allow }: { allow?: Array<'admin'|'agent'|'user'> }) {
  const [ok, setOk] = useState<boolean|null>(null);

  useEffect(() => {
    (async () => {
      const rsp = await fetch('/api/auth/me', { credentials: 'include' });
      if (!rsp.ok) { setOk(false); return; }
      const me = await rsp.json(); // { email, roles: [...] }
      if (!allow || allow.length === 0) { setOk(true); return; }
      setOk(me.roles?.some((r: string) => allow.includes(r)) || false);
    })();
  }, [allow]);

  if (ok === null) return <div>Carregando...</div>;
  return ok ? <Outlet/> : <Navigate to="/login" replace />;
}

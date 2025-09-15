// src/auth/session.ts
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

type AppRole = 'admin' | 'agent' | 'user';

export type AppUser = {
  id: string;
  email: string;
  name?: string;
  roles: AppRole[];
};

const SESSION_SECRET = process.env.SESSION_SECRET!;
const COOKIE_NAME = 'helpdesk_sess';

export function issueSessionCookie(res: Response, user: AppUser) {
  const token = jwt.sign(
    { sub: user.id, email: user.email, roles: user.roles },
    SESSION_SECRET,
    { expiresIn: '15m' }
  );

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,          // true em produção (HTTPS)
    path: '/'
  });
}

export function requireAuth(roles?: AppRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const raw = req.cookies?.[COOKIE_NAME];
    if (!raw) return res.status(401).json({ error: 'unauthenticated' });

    try {
      const payload = jwt.verify(raw, SESSION_SECRET) as any;
      (req as any).user = payload;

      if (roles && roles.length > 0) {
        const ok = (payload.roles as AppRole[]).some(r => roles.includes(r));
        if (!ok) return res.status(403).json({ error: 'forbidden' });
      }

      next();
    } catch {
      return res.status(401).json({ error: 'invalid_session' });
    }
  };
}

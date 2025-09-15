// src/routes/auth.ts
import { Router } from 'express';
import { verifyMicrosoftIdToken } from '../auth/ms-jwt';
import { issueSessionCookie } from '../auth/session';
import { findOrCreateUser, getRolesForUser } from '../db/users'; // implemente no seu DAL
import { decideDefaultRole } from '../services/roles'; // ex.: admin por allowlist de e-mails

const router = Router();

router.post('/microsoft/exchange', async (req, res) => {
  try {
    const { idToken } = req.body as { idToken: string };
    if (!idToken) return res.status(400).json({ error: 'idToken_required' });

    const id = await verifyMicrosoftIdToken(idToken);

    // Campos úteis do token (OIDC)
    const email = (id.email || id.preferred_username || '').toLowerCase();
    const name = id.name as string | undefined;
    if (!email) return res.status(400).json({ error: 'email_missing_in_token' });

    const user = await findOrCreateUser({ email, name });
    const roles = await getRolesForUser(user.id) ?? [await decideDefaultRole(email)];

    issueSessionCookie(res, { id: user.id, email, name, roles });

    // landing route (devolver pro front)
    const landing =
      roles.includes('admin') ? '/admin' :
      roles.includes('agent') ? '/tickets' :
      '/meus-tickets';

    return res.json({ ok: true, user: { id: user.id, email, name, roles }, landing });
  } catch (e) {
    console.error('exchange error', e);
    return res.status(401).json({ error: 'invalid_token' });
  }
});

export default router;

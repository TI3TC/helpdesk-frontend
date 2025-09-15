// src/auth/ms-jwt.ts
import jwksClient from 'jwks-rsa';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';

const TENANT = process.env.MS_TENANT_ID || 'common';
const ISSUER = `https://login.microsoftonline.com/${TENANT}/v2.0`;
const CLIENT_ID = process.env.MS_CLIENT_ID!;

const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${TENANT}/discovery/v2.0/keys`
});

function getKey(header: JwtHeader, cb: SigningKeyCallback) {
  client.getSigningKey(header.kid!, (err, key) => {
    const signingKey = key?.getPublicKey();
    cb(err as any, signingKey);
  });
}

export async function verifyMicrosoftIdToken(idToken: string) {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(
      idToken,
      getKey,
      {
        audience: CLIENT_ID,
        issuer: ISSUER,
        algorithms: ['RS256']
      },
      (err, decoded) => (err ? reject(err) : resolve(decoded))
    );
  });
}

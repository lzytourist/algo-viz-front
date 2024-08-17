'use server'

import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);
const sessionName: string = 'session';
const sessionExpireTime: number = 50 * 60 * 1000;

export async function encode(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('50 min from now')
    .sign(key);
}

export async function decode(input: string) {
  const {payload} = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function createSession(user: { email: string, first_name: string, last_name: string }, token: string) {
  const session = await encode({user, token});
  const expires = new Date(Date.now() + sessionExpireTime);
  cookies().set(sessionName, session, {
    expires,
    httpOnly: true,
    sameSite: 'strict'
  });
}

export async function destroySession() {
  cookies().set(sessionName, '', {
    expires: new Date(0)
  });
}

export async function getSession() {
  const session = cookies().get(sessionName)?.value;
  if (!session) {
    return;
  }
  return await decode(session);
}

export async function updateSession() {
  const session = await getSession();
  return {
    key: sessionName,
    value: await encode(session)
  }
}
'use server'

import {SignInSchemaType, SignUpSchemaType, UserSchemaType} from "@/lib/definitions";
import {createSession, destroySession, getSession} from "@/lib/jwt";

const baseUrl = 'https://algo-viz-backend.vercel.app/api/auth'

export async function signUp(data: SignUpSchemaType) {
  const res = await fetch(`${baseUrl}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const {status} = res;
  let errors = [];
  if (status === 400) {
    errors = await res.json();
  }

  return {
    status,
    errors,
  }
}

export async function activate(data: { uid: string, token: string }) {
  const res = await fetch(`${baseUrl}/users/activation/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const {status} = res;
  return {
    status,
  }
}

export async function authUser(token: string) {
  const res = await fetch(`${baseUrl}/users/me/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  });
  return await res.json();
}

export async function updateUser(data: UserSchemaType) {
  const session = await getSession();
  const token = session!.token as string;

  const res = await fetch(`${baseUrl}/users/me/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    method: 'PATCH',
    body: JSON.stringify({
      ...data,
      date_of_birth: data.date_of_birth ? `${data.date_of_birth.getFullYear()}-${data.date_of_birth.getMonth() + 1}-${data.date_of_birth.getDay()}` : null
    })
  });
  return await res.json();
}

export async function signIn(data: SignInSchemaType) {
  const res = await fetch(`${baseUrl}/token/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const {status} = res;

  if (status == 200) {
    const {auth_token} = await res.json();

    const user = await authUser(auth_token);

    await createSession({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    }, auth_token);
  }

  return {
    status,
  }
}

export async function signOut() {
  await destroySession();
}
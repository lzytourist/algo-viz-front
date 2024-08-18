'use server'

import {base} from "next/dist/build/webpack/config/blocks/base";
import {CommentSchemaType} from "@/lib/definitions";
import {getSession} from "@/lib/jwt";

const baseUrl = 'https://algo-viz-backend.vercel.app/api/algorithms';

export type Category = {
  name: string;
  slug: string,
  parent: Category
};

export type Algorithm = {
  name: string;
  description?: string,
  slug: string,
  component: string,
  created_at: string,
  updated_at: string,
  category?: Category
};

export type Comment = {
  user: string,
  text: string,
  created_at: string,
};

export type Result = {
  next: string | null,
  previous: string | null,
  count: number,
  results: Algorithm[]
};

export async function formatDate(date: string) {
  return Intl.DateTimeFormat('en-BD', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export async function getAlgorithms(page: number = 1, category: string | undefined = undefined) {
  let endpoint = baseUrl + '/?page=' + page;
  if (category) {
    endpoint += '&category__slug=' + category;
  }
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  });

  return res.json();
}

export async function getAlgorithm(slug: string) {
  const res = await fetch(`${baseUrl}/${slug}/`, {
    headers: {
      'Accept': 'application/json',
    }
  });

  return res.json();
}

export async function postComment(data: CommentSchemaType, slug: string) {
  const session = await getSession();
  const {token} = session!;

  const res = await fetch(`${baseUrl}/${slug}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({...data})
  });

  const {status} = res;

  return {
    status,
  }
}

export async function getComments(slug: string, page: number = 1) {
  const res = await fetch(`${baseUrl}/${slug}/comments/?page=${page}`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  return res.json();
}
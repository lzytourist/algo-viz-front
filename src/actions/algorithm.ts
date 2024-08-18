'use server'

import {base} from "next/dist/build/webpack/config/blocks/base";

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
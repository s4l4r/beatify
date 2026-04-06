import { client } from './client';
import type { UserResponse } from '@/types';

export async function getMe(): Promise<UserResponse> {
  const response = await client.get<UserResponse>('/api/auth/me');
  return response.data;
}

export async function logout(): Promise<void> {
  await client.post('/api/auth/logout');
}

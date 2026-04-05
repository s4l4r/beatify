import { client } from './client';
import type { AuthResponse, RegisterData, UserResponse } from '@/types';

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await client.post<AuthResponse>('/api/auth/login', {
    email,
    password,
  });
  return response.data;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await client.post<AuthResponse>('/api/auth/register', data);
  return response.data;
}

export async function getMe(): Promise<UserResponse> {
  const response = await client.get<UserResponse>('/api/auth/me');
  return response.data;
}

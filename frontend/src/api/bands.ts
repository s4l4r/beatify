import { client } from './client';
import type { BandDetail } from '@/types';

export async function getById(id: number): Promise<BandDetail> {
  const response = await client.get<BandDetail>(`/api/bands/${id}`);
  return response.data;
}

import axios from 'axios';

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

/**
 * Generic request wrapper that supports JSON or form-encoded.
 */
export const apiClient = async <T = any>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: Record<string, any>,
  contentType: 'json' | 'form' = 'json'
): Promise<T> => {
  const headers =
    contentType === 'form'
      ? { 'Content-Type': 'application/x-www-form-urlencoded' }
      : { 'Content-Type': 'application/json' };

  const payload =
    contentType === 'form' ? new URLSearchParams(data as Record<string, string>) : data;

  const response = await client.request<T>({
    method,
    url,
    data: method !== 'get' ? payload : undefined,
    params: method === 'get' ? data : undefined,
    headers,
  });

  return response.data;
};

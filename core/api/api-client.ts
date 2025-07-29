import axios from 'axios';
import { Platform } from 'react-native';
import { useAuthStore } from '../store/auth-store';

const client = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? process.env.EXPO_PUBLIC_API_URL_LOCAL_ANDROID
      : process.env.EXPO_PUBLIC_API_URL_LOCAL_IOS,
  timeout: 10000,
});

client.interceptors.request.use(
  (config) => {
    const { access_token } = useAuthStore.getState();

    if (access_token) {
      config.headers = config.headers || {};
      if (typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${access_token}`);
      } else {
        config.headers['Authorization'] = `Bearer ${access_token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
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

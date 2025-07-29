import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';

interface LoginInput {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async ({ username, password }) => {
      return await apiClient('post', '/users/login', { username, password }, 'form');
    },
  });

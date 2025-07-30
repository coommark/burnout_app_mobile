import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';

interface SignUpInput {
  email: string;
  password: string;
  full_name?: string;
}

export const useSignup = () =>
  useMutation({
    mutationFn: async (input: SignUpInput) => {
      return await apiClient('post', '/users/register', input, 'json');
    },
  });

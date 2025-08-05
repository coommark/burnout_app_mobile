import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';

export interface EditProfileInput {
  full_name: string;
}

export const useEditProfile = () =>
  useMutation({
    mutationFn: async (input: EditProfileInput) => {
      return await apiClient('put', '/users/profile', input, 'json');
    },
  });

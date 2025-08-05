import { z } from 'zod';

export const profileEditSchema = z.object({
  full_name: z
    .string({ message: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters'),
});

export type ProfileEditSchema = z.infer<typeof profileEditSchema>;

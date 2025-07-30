import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

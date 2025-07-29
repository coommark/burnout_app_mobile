import { z } from 'zod';

export const signInSchema = z.object({
  username: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

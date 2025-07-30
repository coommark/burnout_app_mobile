import { z } from 'zod';

export const signInSchema = z.object({
  username: z.email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

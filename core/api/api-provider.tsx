import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

export const queryClient = new QueryClient();

export function APIProvider({ children }: { children: ReactNode }) {
  useReactQueryDevTools(queryClient);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

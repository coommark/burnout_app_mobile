import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './persistent-storage';

type AuthState = {
  isLoggedIn: boolean;
  logIn: (access_token: string, user: User) => void;
  logOut: () => void;
  updateUser: (user: Partial<User>) => void;
  user: User | null;
  access_token: string | null;
  hydrated: boolean;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      access_token: null,
      user: null,
      hydrated: false,
      logIn: (access_token, user) => set((s) => ({ ...s, isLoggedIn: true, access_token, user })),
      logOut: () => set((s) => ({ ...s, isLoggedIn: false, user: null, access_token: null })),
      updateUser: (patch) =>
        set((s) => ({ ...s, user: s.user ? { ...s.user, ...patch } : s.user })),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hydrated: true });
      },
    }
  )
);

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './persistent-storage';

type AuthState = {
  isLoggedIn: boolean;
  logIn: (access_token: string, user: User) => void;
  logOut: () => void;
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
      logIn: (access_token, user) => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: true,
            access_token: access_token,
            user: user,
          };
        });
      },
      logOut: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: false,
            user: null,
            access_token: null,
          };
        });
      },
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

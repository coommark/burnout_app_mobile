import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './persistent-storage';

type AuthState = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      logIn: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: true,
          };
        });
      },
      logOut: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: false,
          };
        });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

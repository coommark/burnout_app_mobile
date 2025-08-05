import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './persistent-storage';

type NotificationState = {
  hour: number; // 0–23
  minute: number; // 0–59
  enabled: boolean; // allow daily reminder
  notificationId?: string | null;
  hydrated: boolean;

  setTime: (h: number, m: number) => void;
  setEnabled: (v: boolean) => void;
  setNotificationId: (id: string | null) => void;
};

export const useNotificationStore = create(
  persist<NotificationState>(
    (set) => ({
      hour: 14,
      minute: 0,
      enabled: true,
      notificationId: null,
      hydrated: false,
      setTime: (hour, minute) => set({ hour, minute }),
      setEnabled: (enabled) => set({ enabled }),
      setNotificationId: (notificationId) => set({ notificationId }),
    }),
    {
      name: 'notification-store',
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => () => {
        useNotificationStore.setState({ hydrated: true });
      },
    }
  )
);

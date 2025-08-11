import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './persistent-storage';

type NotificationState = {
  hour: number;
  minute: number;
  enabled: boolean;
  notificationId?: string | null;

  lastAssessmentDate: string | null;
  setLastAssessmentDate: (isoDate: string | null) => void;

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

      lastAssessmentDate: null,
      setLastAssessmentDate: (iso) => set({ lastAssessmentDate: iso }),

      setTime: (hour, minute) => set({ hour, minute }),
      setEnabled: (enabled) => set({ enabled }),
      setNotificationId: (notificationId) => set({ notificationId }),
    }),
    {
      name: 'notification-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

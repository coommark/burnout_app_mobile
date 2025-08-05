import { useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { useNotificationStore } from '~/core/store/notification-store';

type Options = {
  askPermission?: boolean; // default true
};

export function useDailyNotification(options: Options = { askPermission: true }) {
  const { hour, minute, enabled, notificationId, setNotificationId } = useNotificationStore();

  const schedule = useCallback(async () => {
    if (!enabled) {
      // If disabled, clear any existing schedules.
      await Notifications.cancelAllScheduledNotificationsAsync();
      setNotificationId(null);
      return null;
    }

    // Permissions
    if (options.askPermission !== false) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        return null;
      }
    }

    // Clear previous schedules before setting a new one
    await Notifications.cancelAllScheduledNotificationsAsync();

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Check-In',
        body: 'Take a moment to log your burnout assessment 🧠',
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });

    setNotificationId(id);
    return id;
  }, [enabled, hour, minute, options.askPermission, setNotificationId]);

  const cancel = useCallback(async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setNotificationId(null);
  }, [setNotificationId]);

  return { schedule, cancel, hour, minute, enabled, notificationId };
}

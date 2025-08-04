import { Link, Tabs } from 'expo-router';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { colors } from '~/core/theme/colors';
import { HeaderLeft } from '~/components/HeaderLeft';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

export default function TabLayout() {
  useEffect(() => {
    async function setupNotifications() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') return;

      await Notifications.cancelAllScheduledNotificationsAsync();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Daily Check-In',
          body: 'Take a moment to log your burnout assessment 🧠',
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          type: SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 60,
        },
      });
    }

    setupNotifications();
  }, []);

  /* trigger: {
          type: SchedulableTriggerInputTypes.DAILY,
          hour: 14,
          minute: 0,
        }, */

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
          headerLeft: () => <HeaderLeft />,
        }}
      />
      <Tabs.Screen
        name="assessment"
        options={{
          title: 'Assessment',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-unordered" color={color} />,
          headerLeft: () => <HeaderLeft />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          headerLeft: () => <HeaderLeft />,
        }}
      />
    </Tabs>
  );
}

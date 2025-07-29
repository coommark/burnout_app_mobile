import { useAuthStore } from '~/core/store/auth-store';
import '../global.css';

import { Stack } from 'expo-router';
import { ReactNode } from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import theme from '~/core/theme/use-theme-config';
import { APIProvider } from '~/core/api/api-provider';
import { Toaster } from 'sonner-native';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <APIProvider>
        <ThemeProvider value={theme}>{children}</ThemeProvider>
        <Toaster />
      </APIProvider>
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();

  if (__DEV__) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../ReactotronConfig');
  }
  return (
    <Providers>
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="landing" />
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="sign-up" />
        </Stack.Protected>
      </Stack>
    </Providers>
  );
}

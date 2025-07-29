import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';
import { Button } from '~/components/Button';
import { useDashboard } from '~/core/api/hooks/useDashboard';
import { useAuthStore } from '~/core/store/auth-store';

export default function Home() {
  const { logOut } = useAuthStore();
  const { data, error, isLoading } = useDashboard();

  useEffect(() => {
    if (data) {
      console.log('Dashboard Data:', JSON.stringify(data));
    }
    if (error) {
      console.error('Dashboard Error:', error.message);
    }
  }, [data, error]);

  return (
    <>
      <Stack.Screen options={{ title: 'Dashboard' }} />
      <View style={styles.container}>
        <Button title="Log Out" onPress={logOut} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

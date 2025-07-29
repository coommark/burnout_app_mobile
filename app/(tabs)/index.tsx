import { Stack } from 'expo-router';

import { StyleSheet, View } from 'react-native';
import { Button } from '~/components/Button';

import { ScreenContent } from '~/components/ScreenContent';
import { useAuthStore } from '~/store/auth-store';

export default function Home() {
  const { logOut } = useAuthStore();
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

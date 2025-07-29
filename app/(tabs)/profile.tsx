import { Stack } from 'expo-router';

import { StyleSheet, View, Text } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View style={styles.container}>
        <Text>Profile</Text>
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

import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function SignUp() {
  return (
    <>
      <Stack.Screen options={{ title: 'Sign Up' }} />
      <View style={styles.container}>
        <Text>Sign Up</Text>
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

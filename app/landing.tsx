import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '~/components/Button';

export default function Landing() {
  return (
    <>
      <Stack.Screen options={{ title: 'Landing' }} />
      <View style={styles.container}>
        <Text>Landing</Text>
        <Link asChild href="/sign-in" className="mb-4">
          <Button title="Sign In" />
        </Link>
        <Link asChild href="/sign-up">
          <Button title="Sign Up" />
        </Link>
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

import { Stack } from 'expo-router';
import { useAuthStore } from '~/core/store/auth-store';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';

export default function Profile() {
  const { logOut } = useAuthStore();
  return (
    <Container>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
      <Button title="Log Out" onPress={logOut} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

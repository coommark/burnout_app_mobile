import { Stack, Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useAuthStore } from '~/core/store/auth-store';
import { Container } from '~/components/Container';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { SquircleButton } from 'expo-squircle-view';
import { colors } from '~/core/theme/colors';

export default function Profile() {
  const { user, logOut } = useAuthStore();

  return (
    <Container>
      <Stack.Screen options={{ title: 'Profile' }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={require('~/assets/profile.jpg')} // Replace with your own profile image
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.full_name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <ProfileLink title="Edit Profile" to="/edit-profile" />
          <ProfileLink title="Notifications" to="/notifications" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <ProfileLink title="Help & FAQs" />
          <ProfileLink title="Contact Us" />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <SquircleButton
          className="mt-auto"
          preserveSmoothing
          cornerSmoothing={100}
          borderRadius={16}
          style={{ backgroundColor: colors.primary, paddingVertical: 16 }}>
          <Text className="text-center text-xl font-semibold text-white" onPress={logOut}>
            Sign Out
          </Text>
        </SquircleButton>
      </View>
    </Container>
  );
}

const ProfileLink = ({ title, to }: { title: string; to?: string }) => {
  const content = (
    <View style={styles.linkRow}>
      <Text style={styles.linkText}>{title}</Text>
      <Feather name="chevron-right" size={20} color="#000" />
    </View>
  );

  if (to) {
    return (
      <Link href={to} asChild>
        <Pressable>{content}</Pressable>
      </Link>
    );
  }

  return <Pressable>{content}</Pressable>;
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#5e928d',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  linkText: {
    fontSize: 17,
    color: '#000',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

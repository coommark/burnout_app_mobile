import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Container } from '~/components/Container';
import { useLogin } from '~/core/api/hooks/useLogin';
import { useAuthStore } from '~/store/auth-store';
import { SquircleButton } from 'expo-squircle-view';
import { colors } from '~/core/theme/colors';
import { Image } from 'expo-image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInSchema } from '~/core/validation/signin-schema';

export default function SignIn() {
  const { logIn } = useAuthStore();
  const loginMutation = useLogin();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInSchema) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Login successful:', JSON.stringify(response));
        logIn();
      },
      onError: (error) => {
        console.error('Login failed:', error);
      },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Sign In' }} />
      <Container>
        <View className="flex-1">
          <Image
            source={require('~/assets/logo.png')}
            style={{
              height: 114,
              marginTop: 40,
              marginBottom: 60,
            }}
            contentFit="contain"
          />
          <TextInput
            className="bg-secondary mt-4 rounded-lg p-5 text-xl"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => setValue('username', text)}
          />
          <TextInput
            className="bg-secondary mt-4 rounded-lg p-5 text-xl"
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setValue('password', text)}
          />
          <SquircleButton
            className="mt-auto"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            style={{ backgroundColor: colors.primary, paddingVertical: 16 }}>
            <Text
              className="text-center text-xl font-semibold text-white"
              onPress={handleSubmit(onSubmit)}>
              Sign In
            </Text>
          </SquircleButton>
          <Text className="mt-4 text-center text-lg text-gray-500">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-primary font-semibold">
              Sign Up
            </Link>
          </Text>
          {errors.username && <Text className="mt-2 text-red-500">{errors.username.message}</Text>}
        </View>
      </Container>
    </>
  );
}

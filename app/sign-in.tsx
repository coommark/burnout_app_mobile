import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Container } from '~/components/Container';
import { useLogin } from '~/core/api/hooks/useLogin';
import { useAuthStore } from '~/core/store/auth-store';
import { SquircleButton } from 'expo-squircle-view';
import { colors } from '~/core/theme/colors';
import { Image } from 'expo-image';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInSchema } from '~/core/validation/signin-schema';
import { toast } from 'sonner-native';

export default function SignIn() {
  const { logIn } = useAuthStore();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: SignInSchema) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        logIn(response.access_token, response.user);
      },
      onError: (error) => {
        toast.error('Login failed. Please check your credentials and try again.');
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
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className="mt-4 rounded-lg bg-secondary p-5 text-xl"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
          {errors.username && <Text className="mt-2 text-red-500">{errors.username.message}</Text>}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className="mt-4 rounded-lg bg-secondary p-5 text-xl"
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
          {errors.password && <Text className="mt-2 text-red-500">{errors.password.message}</Text>}

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
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="font-semibold text-primary">
              Sign Up
            </Link>
          </Text>
        </View>
      </Container>
    </>
  );
}

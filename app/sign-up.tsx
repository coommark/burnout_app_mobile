import { Link, Stack, router } from 'expo-router';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Container } from '~/components/Container';
import { SquircleButton } from 'expo-squircle-view';
import { colors } from '~/core/theme/colors';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpSchema } from '~/core/validation/signup-schema';
import { useSignup } from '~/core/api/hooks/useSignup';
import { toast } from 'sonner-native';
import { Image } from 'expo-image';

export default function SignUp() {
  const signupMutation = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: SignUpSchema) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Registration successful! You can now sign in.');
        router.replace('/sign-in');
      },
      onError: (err) => {
        toast.error(err.message || 'Registration failed. Try again.');
      },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Sign Up' }} />
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
            name="full_name"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className="mt-4 rounded-lg bg-secondary p-5 text-xl"
                placeholder="Full Name (optional)"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
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
          {errors.email && <Text className="mt-2 text-red-500">{errors.email.message}</Text>}
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
              Sign Up
            </Text>
          </SquircleButton>
          <Text className="mt-4 text-center text-lg text-gray-500">
            Already got an account?{' '}
            <Link href="/sign-in" className="font-semibold text-primary">
              Sign In
            </Link>
          </Text>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

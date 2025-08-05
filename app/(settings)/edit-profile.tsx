import { Stack, router } from 'expo-router';
import { View, Text, TextInput } from 'react-native';
import { Container } from '~/components/Container';
import { SquircleButton } from 'expo-squircle-view';
import { colors } from '~/core/theme/colors';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileEditSchema, ProfileEditSchema } from '~/core/validation/profile-edit-schema';
import { useEditProfile } from '~/core/api/hooks/useEditProfile';
import { toast } from 'sonner-native';
import { useAuthStore } from '~/core/store/auth-store';

export default function EditProfile() {
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);
  const mutation = useEditProfile();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileEditSchema>({
    resolver: zodResolver(profileEditSchema),
    mode: 'onBlur',
    defaultValues: {
      full_name: user?.full_name ?? '',
    },
  });

  const onSubmit = (data: ProfileEditSchema) => {
    mutation.mutate(
      { full_name: data.full_name },
      {
        onSuccess: (updated) => {
          updateUser({ full_name: updated.full_name });
          toast.success('Profile updated.');
          router.back();
        },
        onError: (err: any) => {
          toast.error(err?.message || 'Update failed. Try again.');
        },
      }
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Edit Profile', headerBackTitle: 'Profile' }} />
      <Container>
        <View className="flex-1">
          <Controller
            control={control}
            name="full_name"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className="mt-4 rounded-lg bg-secondary p-5 text-xl"
                placeholder="Full Name"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                editable={!isSubmitting}
              />
            )}
          />
          {errors.full_name && (
            <Text className="mt-2 text-red-500">{errors.full_name.message}</Text>
          )}

          <SquircleButton
            className="mt-auto"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            style={{ backgroundColor: colors.primary, paddingVertical: 16 }}>
            <Text
              className="text-center text-xl font-semibold text-white"
              onPress={handleSubmit(onSubmit)}>
              {isSubmitting ? 'Saving…' : 'Save'}
            </Text>
          </SquircleButton>
        </View>
      </Container>
    </>
  );
}

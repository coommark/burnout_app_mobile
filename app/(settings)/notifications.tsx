import { useState } from 'react';
import { View, Text, Platform, Button, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import { useNotificationStore } from '~/core/store/notification-store';
import { useDailyNotification } from '~/core/hooks/useDailyNotification';
import { SquircleButton } from 'expo-squircle-view';
import { colors } from '~/core/theme/colors';

export default function NotificationsScreen() {
  const { hour, minute, setTime } = useNotificationStore((s) => ({
    hour: s.hour,
    minute: s.minute,
    setTime: s.setTime,
  }));
  const { schedule } = useDailyNotification({ askPermission: false });

  const initial = new Date();
  initial.setHours(hour, minute, 0, 0);

  const [value, setValue] = useState<Date>(initial);
  const [show, setShow] = useState(Platform.OS === 'ios');

  const onChange = (_: DateTimePickerEvent, selected?: Date) => {
    if (!selected) return;
    setValue(selected);
    if (Platform.OS === 'android') setShow(false);
  };

  const save = async () => {
    const h = value.getHours();
    const m = value.getMinutes();
    setTime(h, m);
    await schedule();
  };

  return (
    <Container>
      <Stack.Screen options={{ title: 'Notifications setup', headerBackTitle: 'Profile' }} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily reminder time</Text>
          <Text style={styles.subtitle}>
            Choose when you’d like to be reminded to log your assessment.
          </Text>
        </View>

        <View style={styles.body}>
          {Platform.OS === 'android' && (
            <View style={styles.fullWidth}>
              <Button title="Change time" onPress={() => setShow(true)} />
            </View>
          )}

          {show && (
            <View style={styles.pickerWrapper}>
              <DateTimePicker
                value={value}
                mode="time"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onChange}
                style={Platform.OS === 'ios' ? styles.iosPicker : styles.androidPicker}
              />
            </View>
          )}

          <View style={styles.currentTimeBox}>
            <Text style={styles.currentTime}>
              Currently set to{' '}
              {`${value.getHours().toString().padStart(2, '0')}:${value
                .getMinutes()
                .toString()
                .padStart(2, '0')}`}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer fixed at bottom, same as Profile */}
      <View style={styles.footer}>
        <SquircleButton
          className="mt-auto"
          preserveSmoothing
          cornerSmoothing={100}
          borderRadius={16}
          style={{ backgroundColor: colors.primary, paddingVertical: 16 }}>
          <Text className="text-center text-xl font-semibold text-white" onPress={save}>
            Update
          </Text>
        </SquircleButton>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100, // leave room for footer button, like Profile
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  body: {
    gap: 16,
    paddingHorizontal: 16,
  },
  fullWidth: { alignSelf: 'stretch' },
  pickerContainer: {
    alignSelf: 'stretch',
    width: '100%',
  },
  picker: {
    width: '100%',
  },
  currentTimeBox: { paddingVertical: 8 },
  currentTime: { fontSize: 16, textAlign: 'center' },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  pickerWrapper: {
    width: '100%',
    alignItems: 'center', // center horizontally
    justifyContent: 'center',
  },
  iosPicker: {
    width: '100%',
    height: 180, // allows inline picker to fully expand on iOS
  },
  androidPicker: {
    width: '100%',
  },
});

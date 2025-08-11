import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SquircleButton } from 'expo-squircle-view';
import { colors } from '~/core/theme/colors';
import { Container } from '~/components/Container';
import { useAssessment } from '~/core/api/hooks/useAssessment';
import { useNotificationStore } from '~/core/store/notification-store';
import { useFocusEffect } from '@react-navigation/native';

export default function Assessment() {
  const [tired, setTired] = useState(0);
  const [capable, setCapable] = useState(0);
  const [meaningful, setMeaningful] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const assessmentMutation = useAssessment();
  const router = useRouter();

  // pull persisted values from notifications store
  const { hydrated, lastAssessmentDate, setLastAssessmentDate } = useNotificationStore((s) => ({
    hydrated: s.hydrated,
    lastAssessmentDate: s.lastAssessmentDate,
    setLastAssessmentDate: s.setLastAssessmentDate,
  }));

  // ensure we react even if hydration finishes after this screen mounts
  const [ready, setReady] = useState(useNotificationStore.persist?.hasHydrated?.() ?? hydrated);
  useEffect(() => {
    const unsub = useNotificationStore.persist?.onFinishHydration?.(() => setReady(true));
    return () => unsub?.();
  }, [setReady]);

  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // when screen focuses, decide whether to show the blocking overlay
  useFocusEffect(
    useCallback(() => {
      if (!ready) return;
      setOverlayVisible(lastAssessmentDate === todayIso);
    }, [ready, lastAssessmentDate, todayIso])
  );

  const handleSubmit = () => {
    assessmentMutation.mutate(
      {
        tired_score: tired,
        capable_score: capable,
        meaningful_score: meaningful,
      },
      {
        onSuccess: () => {
          setLastAssessmentDate(todayIso);
          router.replace('/(tabs)');
        },
        onError: (error) => {
          console.warn('Failed to submit assessment:', error?.message);
        },
      }
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Assessment' }} />
      <Container>
        <View style={{ flex: 1 }}>
          <AssessmentSlider
            title="How tired or drained do you feel today?"
            leftLabel="Not at all"
            rightLabel="Extremely"
            value={tired}
            onChange={setTired}
          />
          <AssessmentSlider
            title="How capable did you feel at work today?"
            leftLabel="Not capable"
            rightLabel="Extremely"
            value={capable}
            onChange={setCapable}
          />
          <AssessmentSlider
            title="How meaningful did your work feel today?"
            leftLabel="Not meaningful"
            rightLabel="Extremely"
            value={meaningful}
            onChange={setMeaningful}
          />

          <SquircleButton
            className="mt-auto"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            onPress={handleSubmit}
            style={{ backgroundColor: colors.primary, paddingVertical: 16 }}>
            <Text className="text-center text-xl font-semibold text-white">Submit</Text>
          </SquircleButton>
        </View>

        {/* Blocking overlay modal */}
        {overlayVisible && (
          <View style={styles.overlay} pointerEvents="auto">
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Already Logged</Text>
              <Text style={styles.modalText}>You already logged your assessment today.</Text>

              <SquircleButton
                preserveSmoothing
                cornerSmoothing={100}
                borderRadius={16}
                onPress={() => router.replace('/(tabs)')}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 14,
                  paddingHorizontal: 18,
                  marginTop: 20,
                }}>
                <Text className="text-center text-xl font-semibold text-white">Go back</Text>
              </SquircleButton>
            </View>
          </View>
        )}
      </Container>
    </>
  );
}

const AssessmentSlider = ({
  title,
  leftLabel,
  rightLabel,
  value,
  onChange,
}: {
  title: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (v: number) => void;
}) => (
  <View style={{ marginBottom: 20 }}>
    <Text className="text-2xl">{title}</Text>
    <View className="mt-3 flex flex-row justify-between">
      <Text className="text-lg">{leftLabel}</Text>
      <Text className="text-lg">{rightLabel}</Text>
    </View>
    <Slider
      style={{ width: '100%', height: 80 }}
      minimumValue={0}
      maximumValue={6}
      step={1}
      tapToSeek
      value={value}
      onValueChange={onChange}
      minimumTrackTintColor="#3DB58A"
      maximumTrackTintColor="#D4E3DE"
    />
    <View style={styles.labelRow}>
      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
        <Text key={num} style={styles.label}>
          {num}
        </Text>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: -16,
  },
  label: {
    fontSize: 12,
    color: '#444',
  },

  // overlay modal styles
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    // Android touch/stacking
    elevation: 10,
  },
  modal: {
    backgroundColor: '#fff',
    width: '82%',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { SquircleButton } from 'expo-squircle-view';
import { colors } from '~/core/theme/colors';
import { Container } from '~/components/Container';
import { useAssessment } from '~/core/api/hooks/useAssessment';
import { toast } from 'sonner-native';

export default function Assessment() {
  const [tired, setTired] = useState(0);
  const [capable, setCapable] = useState(0);
  const [meaningful, setMeaningful] = useState(0);
  const assessmentMutation = useAssessment();
  const router = useRouter();

  const handleSubmit = () => {
    assessmentMutation.mutate(
      {
        tired_score: tired,
        capable_score: capable,
        meaningful_score: meaningful,
      },
      {
        onSuccess: (data) => {
          toast.success('Assessment submitted successfully!');
          router.replace('/(tabs)');
        },
        onError: (error) => {
          toast.error(`Failed to submit assessment: ${error.message}`);
        },
      }
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Assessment' }} />
      <Container>
        <View className="flex-1">
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
  <View className="mb-20">
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
});

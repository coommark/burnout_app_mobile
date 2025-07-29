import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet } from 'react-native';

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

export default AssessmentSlider;

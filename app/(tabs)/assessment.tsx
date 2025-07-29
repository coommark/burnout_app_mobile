import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Container } from '~/components/Container';
import Slider from '@react-native-community/slider';
import { SquircleButton } from 'expo-squircle-view';
import { colors } from '~/core/theme/colors';

export default function Assessment() {
  return (
    <>
      <Stack.Screen options={{ title: 'Assessment' }} />
      <Container>
        <View className="flex-1">
          <View className="mb-20">
            <Text className="text-2xl">How tired or drained do you feel today?</Text>
            <View className="mt-3 flex flex-row justify-between">
              <Text className="text-lg">Not at all</Text>
              <Text className="text-lg">Extremely</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 80 }}
              minimumValue={0}
              maximumValue={6}
              step={1}
              tapToSeek
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

          <View className="mb-20">
            <Text className="text-2xl">How capable did you feel at work today?</Text>
            <View className="mt-3 flex flex-row justify-between">
              <Text className="text-lg">Not capable</Text>
              <Text className="text-lg">Extremely</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 80 }}
              minimumValue={0}
              maximumValue={6}
              step={1}
              tapToSeek
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

          <View className="mb-20">
            <Text className="text-2xl">How meaningful did your work feel today? </Text>
            <View className="mt-3 flex flex-row justify-between">
              <Text className="text-lg">Not meaningful</Text>
              <Text className="text-lg">Extremely</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 80 }}
              minimumValue={0}
              maximumValue={6}
              step={1}
              tapToSeek
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
          <SquircleButton
            className="mt-auto"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            style={{ backgroundColor: colors.primary, paddingVertical: 16 }}>
            <Text className="text-center text-xl font-semibold text-white">Submit</Text>
          </SquircleButton>
        </View>
      </Container>
    </>
  );
}

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

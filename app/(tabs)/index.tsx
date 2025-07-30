import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { useDashboard } from '~/core/api/hooks/useDashboard';
import { SegmentedArc } from '@shipt/segmented-arc-for-react-native';
import { LineChart } from 'react-native-gifted-charts';
import { formatChartData } from '~/core/utils/formatChartData';
import { colors } from '~/core/theme/colors';
import { Container } from '~/components/Container';
import { Image } from 'expo-image';

export default function Home() {
  const { data } = useDashboard();

  const today = data?.today_prediction;
  type BurnoutLabel = 'Low' | 'Moderate' | 'High';

  const label = (today?.label as BurnoutLabel) || 'Low';

  const arcConfig: Record<BurnoutLabel, { fillValue: number; color: string }> = {
    Low: { fillValue: 33, color: '#52c779' },
    Moderate: { fillValue: 66, color: '#face2f' },
    High: { fillValue: 100, color: '#ff4b45' },
  };

  const fillValue = arcConfig[label].fillValue;
  const fillColor = arcConfig[label].color;

  const segments = [
    {
      scale: 1,
      filledColor: fillColor,
      emptyColor: '#F2F3F5',
      data: { label },
    },
  ];

  const chartData = data?.recent_predictions ? formatChartData(data.recent_predictions) : [];

  return (
    <Container>
      <Stack.Screen options={{ title: 'Dashboard' }} />
      <View style={styles.container}>
        {today ? (
          <View className="mb-20 mt-8">
            <Text style={styles.chartTitle}>
              Burnout Risk Today: <Text style={{ color: fillColor, fontWeight: 600 }}>{label}</Text>
            </Text>
            <SegmentedArc
              segments={segments}
              fillValue={fillValue}
              isAnimated={true}
              animationDelay={500}
              showArcRanges={false}
              ranges={[]}
              filledArcWidth={20}
              emptyArcWidth={20}
              capInnerColor={colors.primary}>
              {() => (
                <View style={styles.arcContent}>
                  <Text style={styles.arcConfidence}>
                    Confidence: {(today.confidence * 100).toFixed(1)}%
                  </Text>
                </View>
              )}
            </SegmentedArc>
          </View>
        ) : (
          <Text style={styles.chartTitle}>No prediction available for today.</Text>
        )}

        {chartData.length > 0 ? (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Recent Risk Trend</Text>
            <LineChart
              data={chartData}
              color={colors.primary}
              thickness={5}
              hideAxesAndRules={true}
              hideYAxisText={true}
              noOfSections={3}
              maxValue={3}
              curved
              xAxisLabelTextStyle={{ marginLeft: 6, marginTop: -86 }}
            />
          </View>
        ) : (
          <Text className="text-center text-lg">
            You need submit at least 7 days assessment to view your burnout risk
          </Text>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  arcContent: {
    alignItems: 'center',
    paddingTop: 16,
    justifyContent: 'center',
  },
  arcLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  arcConfidence: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },

  chartContainer: {
    marginLeft: 24,
    alignSelf: 'center',
  },

  chartTitle: {
    fontSize: 22,
    fontWeight: '400',
    marginBottom: 26,
    textAlign: 'center',
  },
});

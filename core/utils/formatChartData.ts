import { format, parseISO } from 'date-fns';

type BurnoutLabel = 'Low' | 'Moderate' | 'High';

const labelToY: Record<BurnoutLabel, number> = {
  Low: 1,
  Moderate: 2,
  High: 3,
};

export function formatChartData(
  predictions: any[]
): { value: number; label: string; dataPointText: string }[] {
  return predictions
    .slice()
    .reverse()
    .map((item) => {
      const parsedDate = parseISO(item.date); // e.g. '2025-07-28'
      const dayOfWeek = format(parsedDate, 'EEE'); // 'Mon', 'Tue', etc.

      return {
        value: labelToY[item.label as BurnoutLabel] || 0,
        label: dayOfWeek,
        dataPointText: item.label,
      };
    });
}

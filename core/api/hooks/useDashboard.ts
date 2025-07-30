import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';

export interface DailyPrediction {
  date: string;
  burnout_risk: boolean;
  confidence: number;
  model_version: string;
  label: 'Low' | 'Moderate' | 'High';
}

export interface DashboardResponse {
  today_prediction: DailyPrediction | null;
  recent_predictions: DailyPrediction[];
}

export const useDashboard = () =>
  useQuery<DashboardResponse, Error>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      return await apiClient('get', '/dashboard/');
    },
  });

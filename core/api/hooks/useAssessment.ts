import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';

interface AssessmentInput {
  tired_score: number;
  capable_score: number;
  meaningful_score: number;
}

interface AssessmentResponse {
  burnout_risk: string;
  confidence: number;
}

export const useAssessment = () =>
  useMutation<AssessmentResponse, Error, AssessmentInput>({
    mutationFn: (data) => apiClient('post', '/assessments/', data),
  });

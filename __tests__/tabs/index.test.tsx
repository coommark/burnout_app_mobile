import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderRouter, screen } from 'expo-router/testing-library';
import Home from '~/app/(tabs)';
import * as dashboardModule from '~/core/api/hooks/useDashboard'; // import module directly

jest.mock('~/core/api/hooks/useDashboard');

describe('<Dashboard />', () => {
  const queryClient = new QueryClient();

  const renderDashboard = () => {
    renderRouter(
      {
        index: () => (
          <QueryClientProvider client={queryClient}>
            <Home />
          </QueryClientProvider>
        ),
      },
      { initialUrl: '/' }
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dashboard with today's prediction and recent trend", async () => {
    (dashboardModule.useDashboard as jest.Mock).mockReturnValue({
      data: {
        today_prediction: {
          label: 'Moderate',
          confidence: 0.85,
        },
        recent_predictions: [
          { date: '2025-07-30', label: 'Moderate' },
          { date: '2025-07-29', label: 'High' },
          { date: '2025-07-28', label: 'Low' },
          { date: '2025-07-27', label: 'Moderate' },
          { date: '2025-07-26', label: 'Low' },
          { date: '2025-07-25', label: 'Low' },
          { date: '2025-07-24', label: 'High' },
        ],
      },
    });

    renderDashboard();

    expect(await screen.findByText(/Burnout Risk Today/i)).toBeTruthy();
    expect(await screen.findByText(/Confidence: 85.0%/i)).toBeTruthy();
    expect(await screen.findByText(/Recent Risk Trend/i)).toBeTruthy();
  });

  it('renders fallback when no today_prediction exists', async () => {
    (dashboardModule.useDashboard as jest.Mock).mockReturnValue({
      data: {
        today_prediction: null,
        recent_predictions: [],
      },
    });

    renderDashboard();

    expect(await screen.findByText('No prediction available for today.')).toBeTruthy();
    expect(
      await screen.findByText(
        /You need submit at least 7 days assessment to view your burnout risk/i
      )
    ).toBeTruthy();
  });

  it('renders recent trend message when predictions are not enough', async () => {
    (dashboardModule.useDashboard as jest.Mock).mockReturnValue({
      data: {
        today_prediction: {
          label: 'High',
          confidence: 0.92,
        },
        recent_predictions: [], // No data for chart
      },
    });

    renderDashboard();

    expect(await screen.findByText(/Burnout Risk Today/i)).toBeTruthy();
    expect(await screen.findByText(/Confidence: 92.0%/i)).toBeTruthy();
    expect(
      await screen.findByText(
        /You need submit at least 7 days assessment to view your burnout risk/i
      )
    ).toBeTruthy();
  });
});

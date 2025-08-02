import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderRouter, screen, fireEvent, waitFor } from 'expo-router/testing-library';
import Assessment from '~/app/(tabs)/assessment';
import { useAssessment } from '~/core/api/hooks/useAssessment';

jest.mock('~/core/api/hooks/useAssessment');
jest.mock('expo-router', () => {
  const original = jest.requireActual('expo-router');
  return {
    ...original,
    useRouter: () => ({
      replace: jest.fn(),
    }),
  };
});

describe('<Assessment />', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all three assessment sliders and submit button', async () => {
    renderRouter(
      {
        assessment: () => (
          <QueryClientProvider client={queryClient}>
            <Assessment />
          </QueryClientProvider>
        ),
      },
      { initialUrl: '/assessment' }
    );

    expect(await screen.findByText('How tired or drained do you feel today?')).toBeTruthy();
    expect(await screen.findByText('How capable did you feel at work today?')).toBeTruthy();
    expect(await screen.findByText('How meaningful did your work feel today?')).toBeTruthy();
    expect(await screen.findByText('Submit')).toBeTruthy();
  });

  it('submits the assessment data when Submit is pressed', async () => {
    const mutateMock = jest.fn();
    (useAssessment as jest.Mock).mockReturnValue({ mutate: mutateMock });

    renderRouter(
      {
        assessment: () => (
          <QueryClientProvider client={queryClient}>
            <Assessment />
          </QueryClientProvider>
        ),
      },
      { initialUrl: '/assessment' }
    );

    // Optional: simulate slider movement if you have a way to directly trigger onValueChange
    // For now, just press submit
    fireEvent.press(await screen.findByText('Submit'));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        {
          tired_score: 0,
          capable_score: 0,
          meaningful_score: 0,
        },
        expect.any(Object)
      );
    });
  });
});

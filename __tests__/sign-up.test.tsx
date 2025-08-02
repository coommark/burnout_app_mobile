import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignUp from '~/app/sign-up';
import { renderRouter, screen, fireEvent, waitFor } from 'expo-router/testing-library';
import { useSignup } from '~/core/api/hooks/useSignup';

jest.mock('~/core/api/hooks/useSignup');

describe('<SignUp />', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Sign Up screen with inputs', async () => {
    renderRouter(
      {
        'sign-up': () => (
          <QueryClientProvider client={queryClient}>
            <SignUp />
          </QueryClientProvider>
        ),
      },
      { initialUrl: '/sign-up' }
    );

    expect(await screen.findByPlaceholderText('Full Name (optional)')).toBeTruthy();
    expect(await screen.findByPlaceholderText('Email')).toBeTruthy();
    expect(await screen.findByPlaceholderText('Password')).toBeTruthy();
    expect(await screen.findByText('Sign Up')).toBeTruthy();
  });

  it('submits the form correctly', async () => {
    const mutateMock = jest.fn();
    (useSignup as jest.Mock).mockReturnValue({ mutate: mutateMock });

    renderRouter(
      {
        'sign-up': () => (
          <QueryClientProvider client={queryClient}>
            <SignUp />
          </QueryClientProvider>
        ),
      },
      { initialUrl: '/sign-up' }
    );

    fireEvent.changeText(await screen.findByPlaceholderText('Full Name (optional)'), 'John Doe');
    fireEvent.changeText(await screen.findByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(await screen.findByPlaceholderText('Password'), 'StrongPassword123');

    fireEvent.press(await screen.findByText('Sign Up'));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        {
          full_name: 'John Doe',
          email: 'john@example.com',
          password: 'StrongPassword123',
        },
        expect.any(Object)
      );
    });
  });
});

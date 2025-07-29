import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from '~/app/sign-in';

import { renderRouter, screen, fireEvent, waitFor } from 'expo-router/testing-library';

import { useLogin } from '~/core/api/hooks/useLogin';

jest.mock('~/core/api/hooks/useLogin');

describe('<SignIn />', () => {
  test('renders Sign In screen', async () => {
    const queryClient = new QueryClient();

    renderRouter(
      {
        'sign-in': () => (
          <QueryClientProvider client={queryClient}>
            <SignIn />
          </QueryClientProvider>
        ),
      },
      { initialUrl: '/sign-in' }
    );

    expect(await screen.findByPlaceholderText('Email')).toBeTruthy();
    expect(await screen.findByPlaceholderText('Password')).toBeTruthy();
    expect(await screen.findByText('Sign In')).toBeTruthy();
  });

  test('submits login form successfully', async () => {
    const mutateMock = jest.fn();
    (useLogin as jest.Mock).mockReturnValue({ mutate: mutateMock });

    renderRouter({ 'sign-in': SignIn }, { initialUrl: '/sign-in' });

    fireEvent.changeText(await screen.findByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(await screen.findByPlaceholderText('Password'), 'Password123');

    fireEvent.press(await screen.findByText('Sign In'));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        { username: 'test@example.com', password: 'Password123' },
        expect.any(Object)
      );
    });
  });
});

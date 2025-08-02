import { renderRouter, screen, fireEvent } from 'expo-router/testing-library';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as authStoreModule from '~/core/store/auth-store';
import Profile from '~/app/(tabs)/profile';

jest.mock('~/core/store/auth-store', () => ({
  useAuthStore: jest.fn(),
}));

const mockUseAuthStore = authStoreModule.useAuthStore as unknown as jest.Mock;

describe('<Profile />', () => {
  const queryClient = new QueryClient();

  const mockUser = {
    full_name: 'John Doe',
    email: 'john@example.com',
  };

  const mockLogOut = jest.fn();

  const renderProfile = () => {
    mockUseAuthStore.mockReturnValue({
      user: mockUser,
      logOut: mockLogOut,
    });

    renderRouter(
      {
        index: () => (
          <QueryClientProvider client={queryClient}>
            <Profile />
          </QueryClientProvider>
        ),
      },
      { initialUrl: '/' }
    );
  };

  it('renders user info correctly', async () => {
    renderProfile();

    expect(await screen.findByText('John Doe')).toBeTruthy();
    expect(screen.getByText('john@example.com')).toBeTruthy();
  });

  it('calls logOut when Sign Out button is pressed', async () => {
    renderProfile();

    fireEvent.press(await screen.findByText('Sign Out'));

    expect(mockLogOut).toHaveBeenCalled();
  });
});

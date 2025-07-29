import { renderRouter, screen } from 'expo-router/testing-library';
import SignUp from '~/app/sign-up';

describe('<SignUp />', () => {
  it('renders SignUp page via expo-router', async () => {
    renderRouter(
      {
        'sign-up': SignUp,
      },
      { initialUrl: '/sign-up' }
    );

    expect(await screen.findByText('Sign Up')).toBeTruthy();
  });
});

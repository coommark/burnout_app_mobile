import { Theme, DefaultTheme } from '@react-navigation/native';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default theme;

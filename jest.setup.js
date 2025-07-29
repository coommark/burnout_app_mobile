/* eslint-disable no-undef */
// Optional mocks
jest.mock('expo-squircle-view', () => ({
  SquircleButton: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

jest.mock('expo-image', () => ({
  Image: ({ children, ...props }) => <img {...props}>{children}</img>,
}));

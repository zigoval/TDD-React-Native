import React from 'react';
import { View } from 'react-native';

import { render } from '@testing-library/react-native';

import App from '../App';
import AppNavigator from '../screens';
import { Provider } from 'react-redux';

jest.mock('../screens', () => jest.fn());
jest.mock('react-redux', () => ({
  ...jest.requireActual<object>('react-redux'),
  Provider: jest.fn(),
}));

describe('App', () => {
  test('Should render routes', () => {
    (Provider as jest.Mock).mockImplementationOnce(({ children }) => children);

    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID="mock-routes" />,
    );
    const wrapper = render(<App />);
    wrapper.getByTestId('mock-routes');
  });

  test('Should render Provider', () => {
    (Provider as jest.Mock).mockReturnValueOnce(
      <View testID="mock-provider" />,
    );
    const wrapper = render(<App />);
    wrapper.getByTestId('mock-provider');
  });
});

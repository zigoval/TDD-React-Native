import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { View } from 'react-native';
import WeatherCurrent from '../../components/WeatherCurrent';
import WeatherCoordinates from '../../components/WeatherCoordinates';

jest.mock('../../components/WeatherCoordinates', () =>
  jest.fn().mockReturnValue(null),
);
jest.mock('../../components/WeatherCurrent', () =>
  jest.fn().mockReturnValue(null),
);

describe('HomeScreen', () => {
  test('Should render correctly', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen');
  });
  describe('Title section', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(946684800000); //le 1/1/2000 à 0:00:00
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    test('Should contain current date', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Jan 01, 2000');
    });
    test('Should contain current day', () => {
      const wrapper = render(<HomeScreen />);
      //expect(wrapper.getByTestId('day').props.children).toBe('Friday');
      wrapper.getByText('Saturday');
    });
  });
  test('Should contain a section to get current weather', () => {
    (WeatherCurrent as jest.Mock).mockReturnValue(
      <View testID="mock-weather-current" />,
    );
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('mock-weather-current');
  });

  test('should contain a divider', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen-divider');
  });

  test('Should contain a section to get weather at given latitude & longitude', () => {
    (WeatherCoordinates as jest.Mock).mockReturnValue(
      <View testID="mock-weather-coordinates" />,
    );
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('mock-weather-coordinates');
  });
});

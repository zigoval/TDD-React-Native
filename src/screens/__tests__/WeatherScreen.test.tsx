import React from 'react';
import { act } from 'react-test-renderer';

import { useNavigation } from '@react-navigation/native';

import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from '../../store/weather/actions';
import { nullWeather } from '../../types/Weather';
import { fireEvent, mockStore, render, waitFor } from '../../utils/test.utils';
import WeatherScreen from '../WeatherScreen';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({ goBack: jest.fn() }),
    useRoute: jest
      .fn()
      .mockReturnValue({ params: { longitude: 0, latitude: 0 } }),
  };
});

describe('WeatherScreen', () => {
  test('should render correctly', () => {
    const wrapper = render(<WeatherScreen />);
    wrapper.getByTestId('weather-screen');
  });

  test('should return to home when button home is pressed', () => {
    const mockGoBack = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({
      goBack: mockGoBack,
    });
    const wrapper = render(<WeatherScreen />);
    const button = wrapper.getByText('Home');

    fireEvent.press(button);
    expect(mockGoBack).toHaveBeenCalled();
  });

  test('should fetch weather', async () => {
    const interceptor = jest.fn();
    const store = mockStore(interceptor);
    render(<WeatherScreen />, { store });
    await waitFor(() => {
      expect(interceptor).toHaveBeenCalledWith(fetchWeather(0, 0));
    });
  });
  test('Should display loader when fetching weather', () => {
    const wrapper = render(<WeatherScreen />);
    wrapper.getByTestId('weather-screen-loader');
  });
  test('Should display given error', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(fetchWeatherFailure('mock-error'));
    });
    wrapper.getByText('mock-error');
  });
  test('sould display image with given weather icon', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(
        fetchWeatherSuccess({ ...nullWeather, icon: 'mock-icon' }),
      );
    });
    const image = wrapper.getByTestId('weather-screen-icon');
    expect(image).toHaveProp('source', { uri: 'mock-icon' });
  });
  test('sould not display image when weather has no icon', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });
    expect(() => wrapper.getByTestId('weather-screen-icon')).toThrow();
  });
  test('Sould display description from given weather', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(
        fetchWeatherSuccess({
          ...nullWeather,
          description: 'mock-description',
        }),
      );
    });
    wrapper.getByText('mock-description');
  });
  test('should not display description when given weather has no description', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });
    expect(() => wrapper.getByTestId('weather-screen-description')).toThrow();
  });
  test('should display city name from given weather', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(
        fetchWeatherSuccess({ ...nullWeather, city: 'mock-city' }),
      );
    });
    wrapper.getByText('mock-city');
  });
  test('should display formated temperature', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(
        fetchWeatherSuccess({ ...nullWeather, temperature: 10.8 }),
      );
    });
    const container = wrapper.getByTestId('weather-screen-temperature');
    const title = wrapper.getByText('temperature');
    const temperature = wrapper.getByText('11°C');
    expect(container).toContainElement(title);
    expect(container).toContainElement(temperature);
  });
  test('Should display formated wind', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(fetchWeatherSuccess({ ...nullWeather, windSpeed: 1 }));
    });
    const container = wrapper.getByTestId('weather-screen-wind');
    const title = wrapper.getByText('wind');
    const windSpeed = wrapper.getByText('1m/s');
    expect(container).toContainElement(title);
    expect(container).toContainElement(windSpeed);
  });
  test('Should display formated humidity', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(fetchWeatherSuccess({ ...nullWeather, humidity: 50 }));
    });
    const container = wrapper.getByTestId('weather-screen-humidity');
    const title = wrapper.getByText('humidity');
    const humidity = wrapper.getByText('50%');
    expect(container).toContainElement(title);
    expect(container).toContainElement(humidity);
  });
  test('Should display formated pressure', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, { store });
    act(() => {
      store.dispatch(fetchWeatherSuccess({ ...nullWeather, pressure: 1000 }));
    });
    const container = wrapper.getByTestId('weather-screen-pressure');
    const title = wrapper.getByText('pressure');
    const pressure = wrapper.getByText('1000 hPa');
    expect(container).toContainElement(title);
    expect(container).toContainElement(pressure);
  });
});

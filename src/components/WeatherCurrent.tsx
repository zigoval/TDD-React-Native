import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import Button from './Button';
import LocationService from '../services/LocationService';
import { StyleSheet } from 'react-native';
import { Colors } from '../constants';

interface Props {}

const WeatherCurrent = (props: Props) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleFetchWeather = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const position = await LocationService.getCurrentPosition();
      navigation.navigate('Weather', position);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [navigation]);

  return (
    <Button
      testID="weather-current"
      label="Weather at my position"
      onPress={handleFetchWeather}
      loading={loading}
      style={error && styles.error}
    />
  );
};

const styles = StyleSheet.create({
  error: {
    borderColor: Colors.ERROR,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default WeatherCurrent;

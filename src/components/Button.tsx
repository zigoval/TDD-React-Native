import React from 'react';
import { ActivityIndicator, StyleSheet, Text, ViewProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constants';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
} & ViewProps;

function Button(props: Props) {
  const { label, onPress, loading, style, ...others } = props;
  return (
    <TouchableOpacity onPress={onPress} testID="button">
      <LinearGradient
        {...others}
        colors={[Colors.LIGHTER_GRAY, Colors.DARK_GREY]}
        style={[styles.container, style]}
      >
        {loading ? (
          <ActivityIndicator
            testID="button-loading"
            size={24}
            color={Colors.WHITE}
          />
        ) : (
          <Text style={[styles.label]}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 19,
    color: Colors.WHITE,
  },
});

export default Button;

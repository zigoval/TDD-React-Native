import React from 'react';
import { View } from 'react-native';

import store from '../';
import { render } from '../../utils/test.utils';

describe('Store', () => {
  test('Should be a valid store', () => {
    const wrapper = render(<View testID="mock-component" />, { store });
    wrapper.getByTestId('mock-component');
  });
});

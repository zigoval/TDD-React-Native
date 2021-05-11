import React from 'react';
import { Provider } from 'react-redux';

import AppNavigator from './screens';

function App() {
  return (
    <Provider store={{} as any}>
      <AppNavigator />
    </Provider>
  );
}

export default App;

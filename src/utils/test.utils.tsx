import React, { ElementType, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { render, RenderOptions } from '@testing-library/react-native';

import rootReducer from '../store/reducers';
import { runSaga } from '@redux-saga/core';

type Action = {
  type?: any;
  payload?: any;
};

const store = createStore(rootReducer);

export async function recordSaga(worker: any, initialAction: Action) {
  const dispatched: Array<Function> = [];
  await runSaga(
    {
      dispatch: (action: Function) => dispatched.push(action),
    },
    worker,
    initialAction,
  ).toPromise();
  return dispatched;
}

type CustomRenderOptions = {
  store?: typeof store;
};

const AllTheProviders =
  (options: CustomRenderOptions) =>
  ({ children }: { children: ElementType }) => {
    return <Provider store={options.store || store}></Provider>;
  };

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions & Omit<RenderOptions, 'queries'> = {},
) => {
  const { store, ...others } = options;
  return render(ui, {
    wrapper: AllTheProviders({ store }) as React.ComponentType,
    ...others,
  });
};

export * from '@testing-library/react-native';
export { customRender as render };

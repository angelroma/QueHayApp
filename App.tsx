import 'react-native-url-polyfill/auto';
import * as React from 'react';
import NavigationTab from '@navigation/NavigationTab';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@store/store';
import AppProvider from '@shared/providers/AppProvider';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AppProvider>
        <NavigationTab />
      </AppProvider>
    </ReduxProvider>
  );
}

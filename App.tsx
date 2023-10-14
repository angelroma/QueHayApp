import 'react-native-url-polyfill/auto';
import * as React from 'react';
import NavigationTab from '@navigation/NavigationTab';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@store/store';
import AppProvider from '@shared/providers/AppProvider';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <GluestackUIProvider config={config}>
        <AppProvider>
          <NavigationTab />
        </AppProvider>
      </GluestackUIProvider>
      <Toast />
    </ReduxProvider>
  );
}

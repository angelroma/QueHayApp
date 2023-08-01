import * as React from 'react';
import NavigationTab from '@navigation/NavigationTab';
import {GluestackUIProvider} from '@components/core/GluestackUIProvider';
import {config} from './gluestack-ui.config';

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <NavigationTab />
    </GluestackUIProvider>
  );
}

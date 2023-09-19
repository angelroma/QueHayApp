import * as React from 'react';
import NavigationTab from '@navigation/NavigationTab';
import {config, GluestackUIProvider} from '@gluestack-ui/themed';

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <NavigationTab />
    </GluestackUIProvider>
  );
}

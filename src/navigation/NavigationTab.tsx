import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './Stacks';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function NavigationTab() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

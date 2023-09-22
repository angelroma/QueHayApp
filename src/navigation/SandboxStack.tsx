import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import HeaderRight from './components/HeaderRight';
import HomeScreen from '@features/Sandbox/screens/HomeScreen';
import {SandboxStackParamList} from './types';
import AuthenticationScreen from '@features/Sandbox/screens/AuthScreen';

const Stack = createStackNavigator<SandboxStackParamList>();

export default function SandboxStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => <HeaderRight navigation={navigation} />,
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      })}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Authentication" component={AuthenticationScreen} />
    </Stack.Navigator>
  );
}

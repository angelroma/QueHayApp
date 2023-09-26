import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountScreen from '../features/Account/screens/AccountScreen';
import {AccountStackParamList} from './types';

const Stack = createStackNavigator<AccountStackParamList>();

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={({}) => ({})}>
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
    </Stack.Navigator>
  );
}

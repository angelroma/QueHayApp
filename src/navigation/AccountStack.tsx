import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Types} from '@shared/types/types';
import AccountScreen from '../features/Account/screens/AccountScreen';

const Stack = createStackNavigator<Types.Navigation.AccountStackParamList>();

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={({}) => ({})}>
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
}

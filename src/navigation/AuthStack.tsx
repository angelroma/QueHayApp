import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'features/Auth/screens/LoginScreen';
import RegisterScreen from '../features/Auth/screens/RegisterScreen';
import {AuthStackParamList} from './types';

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={({}) => ({})}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

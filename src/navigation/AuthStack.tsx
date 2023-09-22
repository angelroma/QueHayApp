import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Types} from '@shared/types/types';
import LoginScreen from 'features/Auth/screens/LoginScreen';
import RegisterScreen from '../features/Auth/screens/RegisterScreen';

const Stack = createStackNavigator<Types.Navigation.AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={({}) => ({})}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

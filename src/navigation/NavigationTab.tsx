import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStack from './MainStack';
import {Types} from '@utils/types';

const Tab = createBottomTabNavigator<Types.Navigation.RootStackParamList>();

export default function NavigationTab() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({}) => ({
            headerShown: false,
          })}>
          <Tab.Screen
            name="Main"
            component={MainStack}
            options={({}) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({color, size}) => (
                <Icon name="home" size={size} color={color} />
              ),
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

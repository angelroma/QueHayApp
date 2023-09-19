import * as React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MainStack from './MainStack';
import {Types} from '@shared/utils/types';
import AccountStack from './AccountStack';
import AuthStack from './AuthStack';

const Tab = createBottomTabNavigator<Types.Navigation.RootStackParamList>();

const MainScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<Types.Navigation.RootStackParamList, 'Main'>;
      navigation: any;
    }) => BottomTabNavigationOptions)
  | undefined = {
  tabBarShowLabel: false,
  tabBarIcon: ({color, size}) => <Icon name="home" size={size} color={color} />,
};

const AccountScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<Types.Navigation.RootStackParamList, 'Account'>;
      navigation: any;
    }) => BottomTabNavigationOptions)
  | undefined = {
  tabBarShowLabel: false,
  tabBarIcon: ({color, size}) => <Icon name="user" size={size} color={color} />,
};

export default function NavigationTab() {
  const isAuthentificated = false;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen
            name="Main"
            component={MainStack}
            options={MainScreenOptions}
          />

          <Tab.Screen
            name="Account"
            component={isAuthentificated ? AccountStack : AuthStack}
            options={AccountScreenOptions}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

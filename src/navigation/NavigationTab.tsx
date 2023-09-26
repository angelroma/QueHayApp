import * as React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Home, User} from 'lucide-react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MainStack from './MainStack';
import AccountStack from './AccountStack';
import {RootStackParamList} from './types';
import AuthStack from './AuthStack';
import SandboxStack from './SandboxStack';
import {useAppSelector} from '@store/store';

const Tab = createBottomTabNavigator<RootStackParamList>();

const MainScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, 'Main'>;
      navigation: any;
    }) => BottomTabNavigationOptions)
  | undefined = {
  tabBarShowLabel: false,
  tabBarIcon: ({color, size}) => <Home name="home" size={size} color={color} />,
};

const AccountScreenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, 'Account'>;
      navigation: any;
    }) => BottomTabNavigationOptions)
  | undefined = {
  tabBarShowLabel: false,
  tabBarIcon: ({color, size}) => <User name="user" size={size} color={color} />,
};

export default function NavigationTab() {
  const isAuthentificated = useAppSelector(
    state => state.auth.user?.role === 'normal',
  );

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

          {__DEV__ && <Tab.Screen name="Sandbox" component={SandboxStack} />}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

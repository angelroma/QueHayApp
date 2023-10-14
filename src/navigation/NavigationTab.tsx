import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Search, Lamp, User} from 'lucide-react-native';
import {RootStackParamList} from './types';
import AuthStack from './AuthStack';
import SandboxStack from './SandboxStack';
import HomeStack from './HomeStack';
import {useAppSelector} from '@store/store';
import AccountStack from './AccountStack';
import SearchStack from './SearchStack';

const Bottomtab = createBottomTabNavigator<RootStackParamList>();

export default function NavigationTab() {
  const isAuthentificated = useAppSelector(
    state => state.auth.user?.role === 'normal',
  );
  return (
    <NavigationContainer>
      <Bottomtab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Bottomtab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({color, size}) => <Home color={color} size={size} />,
            headerRight: () => {
              return <User color={'black'} size={20} />;
            },
          }}
        />
        <Bottomtab.Screen
          name="SearchStack"
          component={SearchStack}
          options={{
            tabBarIcon: ({color, size}) => <Search color={color} size={size} />,
          }}
        />
        <Bottomtab.Screen
          name="AccountStack"
          component={isAuthentificated ? AccountStack : AuthStack}
          options={{
            tabBarIcon: ({color, size}) => <User color={color} size={size} />,
          }}
        />
        {__DEV__ && (
          <Bottomtab.Screen
            name="SandboxStack"
            component={SandboxStack}
            options={{
              tabBarIcon: ({color, size}) => <Lamp color={color} size={size} />,
            }}
          />
        )}
      </Bottomtab.Navigator>
    </NavigationContainer>
  );
}

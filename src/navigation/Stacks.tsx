import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import SearchScreen from '@screens/SearchScreen';
import ListScreen from '@screens/ListScreen';

export type RootStackParamList = {
  Search: undefined;
  List: {
    term?: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={25} />
          </TouchableOpacity>
        ),
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      })}>
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={({route}) => ({
          title: route.params && route.params.term ? route.params.term : 'List',
        })}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={() => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
}

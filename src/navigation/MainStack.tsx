import React from 'react';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import ArtifactScreen from '../features/Artifact/screens/ArtifactScreen';
import ImageListScreen from '../features/Artifact/screens/ImageListScreen';
import ListScreen from '../features/Artifact/screens/ListScreen';
import SearchScreen from '../features/Search/screens/SearchScreen';
import HeaderRight from './components/HeaderRight';
import {Types} from '@shared/utils/types';
import {RouteProp} from '@react-navigation/native';

const horizontalCardStyleInterpolator = CardStyleInterpolators.forHorizontalIOS;

const ListScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<Types.Navigation.MainStackParamList, 'List'>;
      navigation: any;
    }) => StackNavigationOptions)
  | undefined = ({route}: {route: any}) => ({
  title: route.params && route.params.term ? route.params.term : 'List',
});

const ArtifactScreenOptions = {
  cardStyleInterpolator: horizontalCardStyleInterpolator,
};

const ImageListScreenOptions = {
  cardStyleInterpolator: horizontalCardStyleInterpolator,
};

const SearchScreenOptions = {
  header: () => null,
};

const Stack = createStackNavigator<Types.Navigation.MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => <HeaderRight navigation={navigation} />,
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      })}>
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={ListScreenOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={SearchScreenOptions}
      />
      <Stack.Screen
        name="Artifact"
        component={ArtifactScreen}
        options={ArtifactScreenOptions}
      />
      <Stack.Screen
        name="ImageListScreen"
        component={ImageListScreen}
        options={ImageListScreenOptions}
      />
    </Stack.Navigator>
  );
}

import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import ArtifactScreen from '@screens/ArtifactScreen';
import ImageListScreen from '@screens/ImageListScreen';
import ListScreen from '@screens/ListScreen';
import SearchScreen from '@screens/SearchScreen';
import HeaderRight from '../components/HeaderRight';
import {Types} from '@utils/types';

const horizontalCardStyleInterpolator = CardStyleInterpolators.forHorizontalIOS;

const ListScreenOptions = ({route}: {route: any}) => ({
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

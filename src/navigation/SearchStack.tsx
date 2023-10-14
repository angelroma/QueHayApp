import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchStackParamList} from './types';
import SearchScreen from '@features/Search/screens/SearchScreen';
import SearchTermScreen from '@features/Search/screens/SearchTermScreen';
import ArtifactScreen from '@features/Artifact/screens/ArtifactScreen';
import ImageListScreen from '@features/Artifact/screens/ImageListScreen';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchTermScreen"
        component={SearchTermScreen}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="ArtifactScreen"
        component={ArtifactScreen}
        options={{}}
      />
      <Stack.Screen
        name="ImageListScreen"
        component={ImageListScreen}
        options={{}}
      />
    </Stack.Navigator>
  );
}

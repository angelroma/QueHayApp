import {View, Text, Button} from 'react-native';
import React from 'react';
import {SandboxStackParamList} from '@navigation/types';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<SandboxStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  return (
    <View>
      <Text
        onPress={() => {
          navigation.navigate('Authentication');
        }}>
        Authentication
      </Text>
    </View>
  );
}

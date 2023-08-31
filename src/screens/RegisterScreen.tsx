import {View, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Types} from '@utils/types';

type Props = StackScreenProps<Types.Navigation.AuthStackParamList, 'Register'>;

export default function RegisterScreen({}: Props) {
  return (
    <View>
      <Text>RegisterScreen</Text>
    </View>
  );
}

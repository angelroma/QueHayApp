import {View, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Types} from '@utils/types';

type Props = StackScreenProps<Types.Navigation.AuthStackParamList, 'Login'>;

export default function LoginScreen({}: Props) {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
}

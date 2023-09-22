import {View, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Types} from '@shared/types/types';

type Props = StackScreenProps<
  Types.Navigation.AccountStackParamList,
  'Account'
>;

export default function AccountScreen({}: Props) {
  return (
    <View>
      <Text>AccountScreen</Text>
    </View>
  );
}

import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AccountStackParamList} from '@navigation/types';
import auth from '@react-native-firebase/auth';

type Props = StackScreenProps<AccountStackParamList, 'AccountScreen'>;

export default function AccountScreen({}: Props) {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
              .catch(error => console.log(error));
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View>
      <Text>AccountScreen</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

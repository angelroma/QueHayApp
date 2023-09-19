import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function HeaderRight({navigation}: {navigation: any}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('Search')}
      style={styles.headerRight}>
      <Icon name="search" size={25} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 10,
  },
});

import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, SafeAreaView} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';
import {RootStackParamList} from '@navigation/Stacks';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({navigation}: Props) {
  const [term, setTerm] = useState(''); // state for search input

  // mock data array
  const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  // filtering data based on search input
  const filteredData = data.filter(item =>
    item.toLowerCase().includes(term.toLowerCase()),
  );

  const renderItem = ({item}) => <Text>{item}</Text>;

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 10,
          paddingTop: 10,
        }}>
        <HeaderBackButton onPress={() => navigation.goBack()} />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, flex: 1}}
          onChangeText={text => setTerm(text)}
          value={term}
          placeholder="Search here"
          autoFocus={true}
          enablesReturnKeyAutomatically={true}
          returnKeyType="search"
          keyboardType="default"
          onSubmitEditing={() => {
            if (term.length === 0) return;
            navigation.push('List', {
              term: term,
            });
          }}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

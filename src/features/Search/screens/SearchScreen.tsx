import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '@navigation/types';

const SEARCH_ICON_SIZE = 30;
const CHEVRON_ICON_SIZE = 30;
const INPUT_HEIGHT = 40;
const INPUT_BORDER_RADIUS = 18;
const INPUT_PADDING_HORIZONTAL = 10;
const ITEM_PADDING = 10;
const ITEM_MARGIN_VERTICAL = 8;

type Props = StackScreenProps<MainStackParamList, 'Search'>;

const SearchScreen: React.FC<Props> = ({navigation}) => {
  const [term, setTerm] = useState('');

  const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(term.toLowerCase()),
  );

  const renderItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.push('List', {
          term: item,
        });
      }}>
      <View style={styles.rowCenter}>
        {/* <Icon
          name="search"
          size={SEARCH_ICON_SIZE}
          color="black"
          style={styles.iconMargin}
        /> */}
        <Text>{item}</Text>
      </View>
      {/* <Icon name="chevron-right" size={CHEVRON_ICON_SIZE} color="black" /> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigation.goBack()} />
        <TextInput
          style={styles.textInput}
          onChangeText={setTerm}
          value={term}
          placeholder="Search here"
          autoFocus
          enablesReturnKeyAutomatically
          returnKeyType="search"
          keyboardType="default"
          onSubmitEditing={() => {
            if (term.length === 0) {
              return;
            }
            navigation.push('List', {term});
          }}
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item}
        renderItem={({item}) => renderItem({item})}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingTop: 10,
  },
  textInput: {
    height: INPUT_HEIGHT,
    borderColor: 'gray',
    flex: 1,
    borderRadius: INPUT_BORDER_RADIUS,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
    backgroundColor: '#f2f2f2',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ITEM_PADDING,
    marginVertical: ITEM_MARGIN_VERTICAL,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconMargin: {
    marginRight: 10,
  },
});

export default SearchScreen;

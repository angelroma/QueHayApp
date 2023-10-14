import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';
import {StackScreenProps} from '@react-navigation/stack';
import {Input, InputField, InputSlot, InputIcon} from '@gluestack-ui/themed';
import {Search, ChevronRight, XCircle} from 'lucide-react-native';
import {SearchStackParamList} from '@navigation/types';

const ITEM_PADDING = 10;
const ITEM_MARGIN_VERTICAL = 8;
const SEARCH_ICON_SIZE = 20;

type Props = StackScreenProps<SearchStackParamList, 'SearchTermScreen'>;

const SearchTermScreen: React.FC<Props> = ({navigation, route: {params}}) => {
  const initialTerm = params?.term ?? '';
  const [term, setTerm] = useState(initialTerm);

  const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const filteredData = useMemo(
    () => data.filter(item => item.toLowerCase().includes(term.toLowerCase())),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [term],
  );

  const renderItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('SearchScreen', {term: item})}>
      <View style={styles.rowCenter}>
        <Search
          size={SEARCH_ICON_SIZE}
          color="black"
          style={styles.iconMargin}
        />
        <Text>{item}</Text>
      </View>
      <ChevronRight size={SEARCH_ICON_SIZE} color="black" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigation.goBack()} />
        <Input
          variant="rounded"
          size="md"
          borderColor="gray"
          backgroundColor="#f2f2f2"
          borderWidth={0}
          flex={1}>
          <InputField
            placeholder="Enter Text here"
            onChangeText={setTerm}
            value={term}
            autoFocus
            enablesReturnKeyAutomatically
            returnKeyType="search"
            keyboardType="default"
            onSubmitEditing={() =>
              term && navigation.navigate('SearchScreen', {term})
            }
          />
          {term && (
            <InputSlot style={styles.clearIcon} onPress={() => setTerm('')}>
              <InputIcon>
                <XCircle size={15} color="black" />
              </InputIcon>
            </InputSlot>
          )}
        </Input>
      </View>

      {!filteredData.length && term && (
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen', {term})}>
          <View style={styles.item}>
            <Text>Buscar {term}</Text>
          </View>
        </TouchableOpacity>
      )}
      <FlatList
        data={filteredData}
        keyExtractor={item => item}
        renderItem={renderItem}
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
    padding: ITEM_PADDING,
    marginVertical: ITEM_MARGIN_VERTICAL,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingTop: 10,
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
  clearIcon: {
    paddingRight: 20,
  },
});

export default SearchTermScreen;

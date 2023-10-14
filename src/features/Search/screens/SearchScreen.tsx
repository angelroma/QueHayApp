import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {FlashList} from '@shopify/flash-list';
import * as ArtifactTypes from '@features/Artifact/types';
import * as ArtifactMock from '@features/Artifact/mock';
import {useAppSelector} from '@store/store';
import {SearchStackParamList} from '@navigation/types';
import ArtifactItem from '@features/Artifact/components/ArtifactItem';
import {Input, InputField} from '@gluestack-ui/themed';
import {MapPin} from 'lucide-react-native';

const ON_END_REACHED_THRESHOLD = 0.5;
const ESTIMATED_ITEM_SIZE = 300;
const ITEMS_PER_PAGE = 20;

type Props = StackScreenProps<SearchStackParamList, 'SearchScreen'>;

const SearchScreen: React.FC<Props> = ({navigation, route}) => {
  console.log('SearchScreen', route);
  const [artifacts, setArtifacts] = useState<ArtifactTypes.Artifact[]>([]);
  const [loading, setLoading] = useState(false);

  const address = useAppSelector(state => state.geolocation.address);

  const fetchArtifacts = useCallback(async ({page}: {page: number}) => {
    setLoading(true);
    const newArtifacts = await ArtifactMock.create(ITEMS_PER_PAGE * page);
    setArtifacts(prevArtifacts => [
      ...prevArtifacts.slice(-ITEMS_PER_PAGE * (page - 1)),
      ...newArtifacts,
    ]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchArtifacts({
      page: 1,
    });
  }, [fetchArtifacts]);

  const loadMoreItems = useCallback(() => {
    fetchArtifacts({
      page: artifacts.length / ITEMS_PER_PAGE + 1,
    });
  }, [artifacts, fetchArtifacts]);

  const handleOnItemPress = useCallback(
    (item: ArtifactTypes.Artifact) =>
      navigation.push('ArtifactScreen', {id: item.id}),
    [navigation],
  );

  const onRefresh = useCallback(() => {
    setArtifacts([]);
    fetchArtifacts({
      page: 1,
    });
  }, [fetchArtifacts]);

  const renderItem = ({
    item,
    index,
  }: {
    item: ArtifactTypes.Artifact;
    index: number;
  }) => (
    <ArtifactItem
      item={item}
      key={`${item.id}-${index}`}
      onPress={handleOnItemPress}
    />
  );

  const keyExtractor = (item: ArtifactTypes.Artifact) => item.id.toString();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header]}>
        <Input
          onTouchStart={() =>
            navigation.push('SearchTermScreen', {
              term: route.params && route.params.term,
            })
          }
          variant="rounded"
          size="md"
          backgroundColor="white"
          borderColor="gray"
          borderWidth={0}
          isReadOnly={true}>
          <InputField
            placeholder="Enter Text here"
            defaultValue={
              route.params && route.params.term ? route.params.term : ''
            }
          />
        </Input>

        <View style={styles.addressContainer}>
          <MapPin size={20} color="black" style={styles.mapPinIcon} />
          <Text numberOfLines={1}>{address}</Text>
        </View>
      </View>
      <FlashList
        data={artifacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={ESTIMATED_ITEM_SIZE}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
        refreshing={loading}
        onRefresh={onRefresh}
        ListFooterComponent={
          loading ? <ActivityIndicator style={styles.footer} /> : undefined
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    alignSelf: 'center',
    margin: 20,
  },
  header: {
    padding: 10,
  },
  mapPinIcon: {
    marginRight: 5,
  },
});

export default SearchScreen;

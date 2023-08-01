import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/Stacks';
import ArtifactItem from '@components/ArtifactItem';
import {FlashList} from '@shopify/flash-list';
import {Types} from '@utils/types';
import {Faker} from '@utils/faker';

const ON_END_REACHED_THRESHOLD = 0.5;
const ESTIMATED_ITEM_SIZE = 300;
const ITEMS_PER_PAGE = 20;

type Props = StackScreenProps<RootStackParamList, 'List'>;

const ListScreen: React.FC<Props> = ({navigation}) => {
  const [artifacts, setArtifacts] = useState<Types.Artifact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArtifacts = useCallback(async ({page}: {page: number}) => {
    setLoading(true);
    const newArtifacts = await Faker.Artifact.create(ITEMS_PER_PAGE * page);
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
    (item: Types.Artifact) => navigation.navigate('Artifact', {id: item.id}),
    [navigation],
  );

  const onRefresh = useCallback(() => {
    setArtifacts([]);
    fetchArtifacts({
      page: 1,
    });
  }, [fetchArtifacts]);

  const renderItem = ({item, index}: {item: Types.Artifact; index: number}) => (
    <ArtifactItem
      item={item}
      key={`${item.id}-${index}`}
      onPress={handleOnItemPress}
    />
  );

  const keyExtractor = (item: Types.Artifact) => item.id.toString();

  return (
    <View style={styles.container}>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    alignSelf: 'center',
    margin: 20,
  },
});

export default ListScreen;

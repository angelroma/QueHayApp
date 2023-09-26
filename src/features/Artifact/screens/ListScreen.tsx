import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import ArtifactItem from '../components/ArtifactItem';
import {FlashList} from '@shopify/flash-list';
import * as NavigationTypes from '@navigation/types';
import * as ArtifactTypes from '@features/Artifact/types';
import * as ArtifactMock from '@features/Artifact/mock';
import {useAppSelector} from '@store/store';

const ON_END_REACHED_THRESHOLD = 0.5;
const ESTIMATED_ITEM_SIZE = 300;
const ITEMS_PER_PAGE = 20;

type Props = StackScreenProps<NavigationTypes.MainStackParamList, 'List'>;

const ListScreen: React.FC<Props> = ({navigation}) => {
  const scrollY = new Animated.Value(0);
  const prevScrollY = new Animated.Value(0);
  const isScrollingUp = new Animated.Value(1);

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
      navigation.push('Artifact', {id: item.id}),
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

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY},
        },
      },
    ],
    {
      listener: event => {
        // @ts-ignore
        const currentScrollY = event.nativeEvent.contentOffset.y;
        if (currentScrollY <= 0) {
          isScrollingUp.setValue(1);
        } else {
          // @ts-ignore
          isScrollingUp.setValue(currentScrollY < prevScrollY._value ? 1 : 0);
        }
        prevScrollY.setValue(currentScrollY);
      },
      useNativeDriver: false,
    },
  );

  const headerHeight = isScrollingUp.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const headerOpacity = isScrollingUp.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            opacity: headerOpacity,
          },
        ]}>
        <Text numberOfLines={1}>{address}</Text>
      </Animated.View>
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
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
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
  header: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
});

export default ListScreen;

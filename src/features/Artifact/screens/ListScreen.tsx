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
import {Types} from '@shared/utils/types';
import {Faker} from '@shared/utils/faker';

const ON_END_REACHED_THRESHOLD = 0.5;
const ESTIMATED_ITEM_SIZE = 300;
const ITEMS_PER_PAGE = 20;

type Props = StackScreenProps<Types.Navigation.MainStackParamList, 'List'>;

const ListScreen: React.FC<Props> = ({navigation}) => {
  const [artifacts, setArtifacts] = useState<Types.Artifact[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollY = new Animated.Value(0);
  const prevScrollY = new Animated.Value(0);
  const isScrollingUp = new Animated.Value(1);

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
    (item: Types.Artifact) => navigation.push('Artifact', {id: item.id}),
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
        <Text numberOfLines={1}>
          Nino Jesus 26, San Matias Tlalancaleca, Puebla, Mexico, 74110
        </Text>
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

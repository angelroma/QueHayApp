import {View, FlatList} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/Stacks';
import {Faker} from '@utils/faker';
import ArtifactCard from '@components/ArtifactCard';
import {FlashList} from '@shopify/flash-list';

const data = Faker.Artifact.create(80);

type Props = StackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({navigation, route}: Props) {
  const [artifacts, setArtifacts] = React.useState(data);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlashList
        data={artifacts}
        renderItem={ArtifactCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          padding: 10,
        }}
        estimatedItemSize={300}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 10,
            }}
          />
        )}
      />
    </View>
  );
}

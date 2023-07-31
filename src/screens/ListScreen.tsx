import {View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/Stacks';
import {Faker} from '@utils/faker';
import ArtifactItem from '@components/ArtifactItem';
import {FlashList} from '@shopify/flash-list';
import {Types} from '@utils/types';

type Props = StackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({navigation, route}: Props) {
  const data = Faker.Artifact.create(80);

  const [artifacts, setArtifacts] = React.useState(data);

  // Create a memoized version of the renderItem function
  const renderItem = React.useCallback(
    ({item, index}: {item: Types.Artifact; index: number}) => {
      return <ArtifactItem item={item} key={item.name} />;
    },
    [],
  );

  return (
    <View style={{flex: 1}}>
      <FlashList
        data={artifacts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        estimatedItemSize={300}
      />
    </View>
  );
}

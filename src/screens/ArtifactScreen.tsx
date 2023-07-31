import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Faker} from '@utils/faker';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@navigation/Stacks';
import {Types} from '@utils/types';
import Feather from 'react-native-vector-icons/Feather';
import ImageGrid from '@components/ImageGrid';

type Props = StackScreenProps<RootStackParamList, 'Artifact'>;

const ArtifactScreen: React.FC<Props> = ({navigation}) => {
  const artifacts = Faker.Artifact.create(1);
  const artifact = artifacts[0];

  const handleOnSeeMoreImagesPress = () => {
    navigation.navigate('ImageListScreen', {images: artifact.imageUrls});
  };

  const renderSocialMedia = ({item}: {item: Types.SocialMedia}) => (
    <TouchableOpacity
      style={styles.socialMediaButton}
      onPress={() =>
        Linking.openURL(`https://${item.platform}.com/${item.handle}`)
      }>
      <Feather name={item.platform.toLowerCase()} size={20} color="#888" />
    </TouchableOpacity>
  );

  const renderTag = ({item}: {item: Types.Tag}) => (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{item.label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{uri: artifact.imageUrls[0]}} />
        <Text style={styles.title}>{artifact.name}</Text>
        <View style={styles.tagsContainer}>
          <FlatList
            horizontal
            data={artifact.tags}
            renderItem={renderTag}
            keyExtractor={(_item, index) => index.toString()}
          />
        </View>
        <Text style={styles.description}>{artifact.description}</Text>

        <View style={styles.interactionContainer}>
          <View style={styles.likesDislikesContainer}>
            <Text style={styles.userInteractionText}>
              <Feather name={'thumbs-up'} size={20} color="#008000" />
              {artifact.userInteractions.likes}
            </Text>
            <Text style={styles.userInteractionText}>|</Text>
            <Text style={styles.userInteractionText}>
              <Feather name={'thumbs-down'} size={20} color="#FF0000" />
              {artifact.userInteractions.dislikes}
            </Text>
          </View>
          <TouchableOpacity style={styles.shareContainer}>
            <Feather name={'share-2'} size={20} color="#555" />
            <Text style={styles.userInteractionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          <Text style={styles.sectionContent}>
            <Feather name="map-pin" size={14} color="#666" />
            {artifact.address.street}
          </Text>
          <Text style={styles.sectionContent}>
            <Feather name="phone" size={14} color="#666" />
            {artifact.primaryPhone}
          </Text>
          <Text style={styles.sectionContent}>
            <Feather name="mail" size={14} color="#666" />
            {artifact.email}
          </Text>

          <View style={styles.socialMediaContainer}>
            <FlatList
              horizontal
              data={artifact.socialMedia}
              renderItem={renderSocialMedia}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        {artifact.website && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(artifact.website)}>
            <Text style={styles.buttonText}>Visit Website</Text>
          </TouchableOpacity>
        )}

        <ImageGrid
          images={artifact.imageUrls}
          onSeeMorePress={handleOnSeeMoreImagesPress}
        />

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {artifact.features.map((feature, index) => (
            <View style={styles.featureContainer} key={index}>
              <Feather name="check" size={14} color="#008000" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Operation Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hours of Operation</Text>
          {artifact.hoursOfOperation.map((hours, index) => (
            <Text
              key={index}
              style={
                styles.hoursText
              }>{`${hours.day}: ${hours.openTime} - ${hours.closeTime}`}</Text>
          ))}
        </View>
        <Text style={styles.categoryText}>Category: {artifact.category}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    margin: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  image: {
    height: 220,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  description: {
    marginVertical: 15,
    fontSize: 18,
    color: '#666',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialMediaButton: {
    marginRight: 15,
  },
  userInteractionText: {
    fontSize: 16,
    color: '#555',
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tagContainer: {
    marginRight: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#555',
  },
  section: {
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
  },
  featureContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
  },
  hoursText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  likesDislikesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ArtifactScreen;

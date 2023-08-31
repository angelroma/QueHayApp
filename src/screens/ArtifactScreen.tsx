import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Faker} from '@utils/faker';
import {StackScreenProps} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import ImageGrid from '@components/ImageGrid';
import Clipboard from '@react-native-clipboard/clipboard';
import {Toast, useToast} from '@components/core/';
import {Constan} from '@utils/contants';
import {Types} from '@utils/types';

type Props = StackScreenProps<Types.Navigation.MainStackParamList, 'Artifact'>;

const ArtifactScreen: React.FC<Props> = ({}) => {
  const artifacts = Faker.Artifact.create(1);
  const artifact = artifacts[0];

  const toast = useToast();

  const handleCopy = (text?: string) => {
    if (!text) {
      return;
    }
    Clipboard.setString(text);
    toast.show({
      placement: 'bottom',
      render: ({id}) => {
        return (
          // @ts-ignore
          <Toast nativeId={id}>
            <Toast.Description>Copiado</Toast.Description>
          </Toast>
        );
      },
    });
  };

  const handleUserInteraction = (type: 'like' | 'dislike') => {
    console.log('handleUserInteraction', type);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{uri: artifact.imageUrls[0]}} />
        <Text style={styles.title}>{artifact.name}</Text>
        {/* Tags */}
        <View style={styles.tagsContainer}>
          {artifact.tags.map((tag, index) => (
            <View key={index} style={styles.tagContainer}>
              <Text style={styles.tagText}>{tag.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.description}>{artifact.description}</Text>

        <View style={styles.interactionContainer}>
          <View style={styles.likesDislikesContainer}>
            <TouchableOpacity
              style={styles.interactionButton}
              onPress={() => handleUserInteraction('like')}>
              <Feather
                name={'thumbs-up'}
                size={20}
                color={true ? '#4E9BDE' : 'gray'}
              />
              <Text style={styles.userInteractionText}>
                {artifact.userInteractions.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.interactionButton}
              onPress={() => handleUserInteraction('dislike')}>
              <Feather name={'thumbs-down'} size={20} color={'gray'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
            <Feather name={'share-2'} size={20} color={'gray'} />
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info</Text>

          {/* For Phone Number */}
          <View style={styles.contactItem}>
            <Feather name="phone" size={14} color="#666" />
            <Text
              style={styles.sectionContent}
              onPress={() => handleCopy(artifact.primaryPhone)}>
              {artifact.primaryPhone}
            </Text>
          </View>

          {/*  Email */}
          <View style={styles.contactItem}>
            <Feather name="mail" size={14} color="#666" />
            <Text
              style={styles.sectionContent}
              onPress={() => handleCopy(artifact.email)}>
              {artifact.email}
            </Text>
          </View>

          {/* Address */}
          <View style={styles.contactItem}>
            <Feather name="map-pin" size={14} color="#666" />
            <Text
              style={styles.sectionContent}
              onPress={() => handleCopy(artifact.address.street)}>
              {artifact.address.street}
            </Text>
          </View>

          <View style={styles.socialMediaContainer}>
            {artifact.socialMedia?.map((socialMedia, index) => (
              <TouchableOpacity
                key={index}
                style={styles.socialMediaButton}
                onPress={() =>
                  Linking.openURL(
                    `https://${socialMedia.platform}.com/${socialMedia.handle}`,
                  )
                }>
                <Feather
                  name={socialMedia.platform.toLowerCase()}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {artifact.website && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (artifact.website) {
                Linking.openURL(artifact.website);
              }
            }}
            activeOpacity={0.7} // Changes opacity on press
          >
            <Text style={styles.buttonText}>Visit Website</Text>
          </TouchableOpacity>
        )}

        <ImageGrid images={artifact.imageUrls} />

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {Object.keys(Constan.featureIcon).map((feature, index) => (
            <View style={styles.featureItemContainer}>
              <View
                style={
                  artifact.features.includes(feature as Types.Feature)
                    ? styles.iconContainer
                    : styles.iconContainerDisabled
                }>
                <Feather
                  key={index}
                  name={Constan.featureIcon[feature as Types.Feature]}
                  size={16}
                  color="white"
                />
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Operation Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hours of Operation</Text>
          {artifact.hoursOfOperation.map((hours, index) => (
            <View key={index} style={styles.hoursContainer}>
              <Text style={styles.hoursDay}>{hours.day}</Text>
              <Text
                style={
                  styles.hoursTime
                }>{`${hours.openTime} - ${hours.closeTime}`}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.categoryText}>Category: {artifact.category}</Text>
        <View style={styles.feedbackContainer}>
          <TouchableOpacity>
            <Text style={styles.feedbackText}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  featureItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  featureText: {
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    paddingLeft: 10,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likesDislikesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shareButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionContent: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 10,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  socialMediaButton: {
    marginRight: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000000',
  },
  image: {
    height: 220,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  description: {
    marginVertical: 15,
    fontSize: 16,
    color: '#333333',
  },
  userInteractionText: {
    fontSize: 16,
    color: '#000000',
    marginHorizontal: 5,
    marginLeft: 5,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#000000',
  },
  tagText: {
    fontSize: 14,
    color: '#000000',
  },
  hoursText: {
    fontSize: 16,
    color: '#333333',
    marginVertical: 5,
  },
  header: {
    margin: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
  },
  tagContainer: {
    marginRight: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 8,
    margin: 2,
  },
  section: {
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
  },
  featureContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  feedbackText: {
    color: 'blue',
    marginHorizontal: 10,
    textDecorationLine: 'underline',
  },
  hoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  hoursDay: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  hoursTime: {
    fontSize: 16,
    color: '#666666',
  },
  iconContainer: {
    marginRight: 10,
    backgroundColor: '#333',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerDisabled: {
    marginRight: 10,
    backgroundColor: '#999',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },
});

export default ArtifactScreen;

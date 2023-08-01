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
import Clipboard from '@react-native-clipboard/clipboard';
import {Toast, useToast} from '@components/core/';

type Props = StackScreenProps<RootStackParamList, 'Artifact'>;

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
              <Feather name={'thumbs-up'} size={20} color="gray" />
              {artifact.userInteractions.likes}
            </Text>
            <Text style={styles.userInteractionText}>|</Text>
            <Text style={styles.userInteractionText}>
              <Feather name={'thumbs-down'} size={20} color="gray" />
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
  button: {
    backgroundColor: '#4E9BDE', // choose a noticeable color, light blue in this case
    paddingVertical: 10, // increase padding for larger touch area
    paddingHorizontal: 20, // increase padding for larger touch area
    borderRadius: 5, // round the corners for a softer look
    marginTop: 10, // add some margin at the top for space
    marginBottom: 20, // add some margin at the bottom for space
    shadowColor: '#000', // adding shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF', // text color that contrasts with the button color
    fontSize: 18, // larger font size
    fontWeight: 'bold', // make the text bold
    textAlign: 'center', // center the text within the button
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // black text for better contrast
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // light gray border color
  },
  sectionContent: {
    fontSize: 16,
    color: '#333333', // darker gray for better contrast
    marginLeft: 10, // give some space between the icon and the text
  },
  socialMediaContainer: {
    flexDirection: 'row',
    marginTop: 20, // some space above the social media icons
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
    color: '#000000', // black text for higher contrast
  },
  image: {
    height: 220,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  description: {
    marginVertical: 15,
    fontSize: 16,
    color: '#333333', // darker gray for better contrast
  },
  userInteractionText: {
    fontSize: 16,
    color: '#000000', // black text for better contrast
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#000000', // black text for better contrast
  },
  tagText: {
    fontSize: 14,
    color: '#000000', // black text for better contrast
  },

  featureText: {
    fontSize: 16,
    color: '#333333', // darker gray for better contrast
    marginLeft: 5,
  },
  hoursText: {
    fontSize: 16,
    color: '#333333', // darker gray for better contrast
    marginVertical: 5,
  },
  header: {
    margin: 15,
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
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  likesDislikesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default ArtifactScreen;

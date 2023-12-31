import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import ImageGrid from '../components/ImageGrid';
import Clipboard from '@react-native-clipboard/clipboard';
import {SearchStackParamList} from '@navigation/types';
import Constant from '@shared/contants';
import * as ArtifactMock from '@features/Artifact/mock';
import * as ArtifactTypes from '@features/Artifact/types';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Phone,
  Mail,
  MapPin,
  Truck,
  ShoppingBag,
  BookOpen,
  Coffee,
  Dices,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react-native';
import {
  Feature,
  SocialMediaPlatform,
  UserInteractionType,
} from '@features/Artifact/types';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<SearchStackParamList, 'ArtifactScreen'>;

const ArtifactScreen: React.FC<Props> = ({}) => {
  const artifacts = ArtifactMock.create(1);
  const artifact = artifacts[0];

  const handleOnCopy = useCallback((text?: string) => {
    if (!text) {
      return;
    }
    Clipboard.setString(text);
    Toast.show({
      type: 'info',
      text1: 'Copiado',
      text2: 'Copiado al portapapeles.',
    });
  }, []);

  const handleUserInteraction = useCallback((type: UserInteractionType) => {
    console.log('handleUserInteraction', type);
  }, []);

  const renderFeatureIcon = useCallback((value: Feature) => {
    switch (value) {
      case 'Entrega a domicilio':
        return <Truck size={16} color="white" />;
      case 'Para llevar':
        return <ShoppingBag size={16} color="white" />;
      case 'Reservaciones':
        return <BookOpen size={16} color="white" />;
      case 'Servicio en mesa':
        return <Coffee size={16} color="white" />;
      default:
        return <Dices size={16} color="white" />;
    }
  }, []);

  const renderSocialMediaIcon = useCallback((platform: SocialMediaPlatform) => {
    switch (platform) {
      case 'Facebook':
        return <Facebook size={20} color="#888" />;
      case 'Instagram':
        return <Instagram size={20} color="#888" />;
      case 'Twitter':
        return <Twitter size={20} color="#888" />;
      case 'LinkedIn':
        return <Linkedin size={20} color="#888" />;
      default:
        return null;
    }
  }, []);

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
              onPress={() => handleUserInteraction(UserInteractionType.LIKE)}>
              <ThumbsUp size={20} color={true ? '#4E9BDE' : 'gray'} />
              <Text style={styles.userInteractionText}>
                {artifact.userInteractions.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.interactionButton}
              onPress={() =>
                handleUserInteraction(UserInteractionType.DISLIKE)
              }>
              <ThumbsDown size={20} color={true ? '#4E9BDE' : 'gray'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
            <Share2 size={20} color={'gray'} />
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info</Text>

          {/* For Phone Number */}
          <View style={styles.contactItem}>
            <Phone size={14} color="#666" />
            <Text
              style={styles.sectionContent}
              onPress={() => handleOnCopy(artifact.primaryPhone)}>
              {artifact.primaryPhone}
            </Text>
          </View>

          {/*  Email */}
          <View style={styles.contactItem}>
            <Mail size={14} color="#666" />
            <Text
              style={styles.sectionContent}
              onPress={() => handleOnCopy(artifact.email)}>
              {artifact.email}
            </Text>
          </View>

          {/* Address */}
          <View style={styles.contactItem}>
            <MapPin size={14} color="#666" />
            <Text
              style={styles.sectionContent}
              onPress={() => handleOnCopy(artifact.address.street)}>
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
                {renderSocialMediaIcon(socialMedia.platform)}
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
          {Constant.Features.map((value, index) => {
            if (!artifact.features.includes(value as ArtifactTypes.Feature)) {
              return null;
            }
            return (
              <View style={styles.featureItemContainer} key={index}>
                <View
                  style={
                    artifact.features.includes(value as ArtifactTypes.Feature)
                      ? styles.iconContainer
                      : styles.iconContainerDisabled
                  }>
                  {renderFeatureIcon(value)}
                </View>
                <Text style={styles.featureText}>{value}</Text>
              </View>
            );
          })}
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

        <Text style={styles.categoryText}>
          Category: {artifact.category.name}
        </Text>
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

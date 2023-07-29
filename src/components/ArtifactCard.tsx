import {Types} from '@utils/types';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';

const ArtifactCard = ({item}: {item: Types.Artifact}) => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: item.images[0]}} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.features}>
          {item.features.map((feature, index) => (
            <Text key={index} style={styles.feature}>
              {feature}
            </Text>
          ))}
        </View>
        <View style={styles.contact}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${item.contact.phone[0]}`)}>
            <Text style={styles.link}>{item.contact.phone[0]}</Text>
          </TouchableOpacity>
          {/* Similarly, add touchable links for other social media handles, website, email */}
        </View>
      </View>
    </View>
  );
};

export default ArtifactCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: '35%',
    height: '100%',
  },
  details: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  feature: {
    fontSize: 12,
    color: '#999',
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  contact: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
    marginRight: 5,
  },
});

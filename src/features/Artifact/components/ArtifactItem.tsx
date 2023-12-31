import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Map} from 'lucide-react-native';
import useBusinessState from '@shared/hooks/useBusinessState';
import Constant from '@shared/contants';
import {Artifact, Feature} from '@features/Artifact/types';

const ArtifactItem = ({
  item,
  onPress,
}: {
  item: Artifact;
  onPress?: (item: Artifact) => void;
}) => {
  const businessState = useBusinessState(item.hoursOfOperation);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(item)}>
      <FastImage
        style={styles.image}
        source={{uri: item.imageUrls[0]}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={[styles.businessStateContainer]}>
        <Text style={styles.businessStateText}>{businessState}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.addressContainer}>
          <Map name="map-pin" size={14} color="#666" />
          <Text style={styles.address} numberOfLines={1}>
            {item.address.street}
          </Text>
        </View>
        <View style={styles.features}>
          {Constant.Features.map((feature, index) => (
            <View
              key={index}
              style={
                item.features.includes(feature as Feature)
                  ? styles.iconContainer
                  : styles.iconContainerDisabled
              }>
              <Text>{feature}</Text>
              {/* <Map
                key={index}
                name={Constant.FeatureIcon[feature as Feature]}
                size={14}
                color="white"
              /> */}
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ArtifactItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  features: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconContainer: {
    marginRight: 10,
    backgroundColor: '#333',
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerDisabled: {
    marginRight: 10,
    backgroundColor: '#999',
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },
  address: {
    marginLeft: 5,
    color: '#666',
  },
  description: {
    color: '#333',
    marginTop: 5,
    fontSize: 14,
  },
  businessStateContainer: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 5,
  },
  businessStateText: {
    color: '#fff',
    fontSize: 12,
  },
});

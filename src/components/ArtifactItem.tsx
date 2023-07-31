import {Types} from '@utils/types';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import useBusinessState from '@hooks/useBusinessState';

const featureIcon = {
  'Entrega a domicilio': 'truck',
  'Para llevar': 'shopping-bag',
  Reservaciones: 'book-open',
  'Servicio en mesa': 'coffee',
};

const ArtifactItem = ({
  item,
  onPress,
}: {
  item: Types.Artifact;
  onPress?: (item: Types.Artifact) => void;
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
          <Feather name="map-pin" size={14} color="#666" />
          <Text style={styles.address}>{item.address.street}</Text>
        </View>
        <View style={styles.features}>
          {Object.keys(featureIcon).map((feature, index) => (
            <View
              style={
                item.features.includes(feature as Types.Feature)
                  ? styles.iconContainer
                  : styles.iconContainerDisabled
              }>
              <Feather
                key={index}
                name={featureIcon[feature as Types.Feature]}
                size={14}
                color="white"
              />
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

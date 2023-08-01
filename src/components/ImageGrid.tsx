import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';

type ImageGridProps = {
  images: string[];
  onSeeMorePress?: (images: string[]) => void;
};

const ImageGrid: React.FC<ImageGridProps> = ({images, onSeeMorePress}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeImage, setActiveImage] = useState('');

  const imagesToShow = images.slice(0, 6);

  const renderImage = ({item}: {item: string; index: number}) => (
    <TouchableOpacity
      onPress={() => {
        setActiveImage(item);
        setModalVisible(true);
      }}
      style={styles.imageContainer}>
      <Image source={{uri: item}} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Images</Text>

        {onSeeMorePress && (
          <TouchableOpacity onPress={() => onSeeMorePress(images)}>
            <Text style={styles.seeMoreText}>See More</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={imagesToShow}
        renderItem={renderImage}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="none"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setModalVisible(false)}>
          <Image
            source={{uri: activeImage}}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeMoreText: {
    color: '#007BFF',
  },
  imageContainer: {
    flex: 1,
    padding: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  fullScreenImage: {
    flex: 1,
  },
});

export default ImageGrid;

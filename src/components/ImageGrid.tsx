import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
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

  const rows = [];
  for (let i = 0; i < imagesToShow.length; i += 3) {
    rows.push(imagesToShow.slice(i, i + 3));
  }

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

      {/* Images */}
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setActiveImage(image);
                setModalVisible(true);
              }}
              style={styles.imageContainer}>
              <Image source={{uri: image}} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      ))}

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
  row: {
    flexDirection: 'row',
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

/* eslint-disable */
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';

import { images } from './assets';

export function ImagePickerAvatar({ uri, onPress }) {
  return (
    <View
      style={styles.imageBackground}
      // source={images.whatsappBackground}
      >
      <View style={styles.avatar}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.avatarImage}
          source={uri ? { uri } : images.avatar}
        />
        <View style={styles.addButton}>
          <Image style={styles.addButtonIcon} source={images.addButton} />
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // imageBackground: {
  //   flex: 1,
  //   //paddingTop: 5,
  // },
  // avatar: {
  //   alignItems: 'center',
  //   // marginTop: '40%',
  // },
  avatarImage: {
    height: 135,
    width: 135,
    overflow: 'hidden',
    borderColor: '#ffffff',
    borderWidth: 0,
    borderRadius: 135 / 2,
  },
  addButton: {
    height: 45,
    width: 45,
    backgroundColor: '#f2f2fC',
    borderRadius: 22.5,
    position: 'absolute',
    top: 90,
    right: '0%',
    //bottom: 4,
  },
  addButtonIcon: {
    height: 45,
    width: 45,
  },
  // usernameText: {
  //   fontSize: 24,
  //   fontWeight: '700',
  //   color: '#ffffff',
  //   marginTop: 12,
  // },
});
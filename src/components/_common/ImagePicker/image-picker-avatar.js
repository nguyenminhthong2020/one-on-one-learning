/* eslint-disable */
import React from 'react';
import {
  StyleSheet,
  //Text,
  //TouchableOpacity,
  Image,
  View,
  Pressable
  //ImageBackground,
} from 'react-native';

import { images } from './assets';

export function ImagePickerAvatar({ uri, onPress }) {
  return (
    <View
      style={styles.imageBackground}
      // source={images.whatsappBackground}
      >
      <View style={styles.avatar}>
      <Pressable onPress={onPress}>
        <Image
          style={styles.avatarImage}
          source={uri ? { uri } : images.avatar}
        />
        <View style={styles.addButton}>
          <Image style={styles.addButtonIcon} source={images.addButton} />
        </View>
        </Pressable>
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
    height: 90,
    width: 90,
    overflow: 'hidden',
    borderColor: '#ffffff',
    borderWidth: 0,
    borderRadius:  45,
  },
  addButton: {
    height: 30,
    width: 30,
    backgroundColor: '#f2f2fC',
    borderRadius: 15,
    position: 'absolute',
    top: 60,
    right: '0%',
    //bottom: 4,
  },
  addButtonIcon: {
    height: 30,
    width: 30,
  },
  // usernameText: {
  //   fontSize: 24,
  //   fontWeight: '700',
  //   color: '#ffffff',
  //   marginTop: 12,
  // },
});
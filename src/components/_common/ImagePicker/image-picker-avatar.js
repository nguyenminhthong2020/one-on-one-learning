/* eslint-disable */
import React from 'react';
import {StyleSheet, Image, View, Pressable} from 'react-native';

import {images} from './assets';
import FastImage from 'react-native-fast-image';

export function ImagePickerAvatar({uri, onPress}) {
  return (
    <View
      style={styles.imageBackground}
      // source={images.whatsappBackground}
    >
      <View style={styles.avatar}>
        <Pressable onPress={onPress}>
          {/* <Image
            style={styles.avatarImage}
            source={uri ? {uri} : images.avatar}
          /> */}
          <FastImage
            style={styles.avatarImage}
            resizeMode={FastImage.resizeMode.cover}
            source={
              uri
                ? {
                    uri: uri,
                    priority: FastImage.priority.normal,
                  }
                : require('./assets/avatar1.jpg')
            }
            height={90}
            width={90}
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
    borderRadius: 45,
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

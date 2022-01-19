/* eslint-disable */
import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';

export function ImagePickerAvatar({uri, onPress}) {
  return (
    <View style={styles.imageBackground}>
      <View style={styles.avatar}>
        <Pressable onPress={onPress}>
          {/* <FastImage
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
          /> */}
          {uri &&
          uri !=
            'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png' ? (
            <FastImage
              style={styles.avatarImage}
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: uri, priority: FastImage.priority.normal}}
              height={90}
              width={90}
            />
          ) : (
            <FontAwesome
              style={styles.avatarImage}
              name={'user-circle'}
              size={90}
            />
          )}
          <View style={styles.addButton}>
            <MaterialIcons
              name={'add-circle-outline'}
              size={30}
              color="green"
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarImage: {
    height: 90,
    width: 90,
    overflow: 'hidden',
    borderColor: '#ffffff',
    borderWidth: 0,
    borderRadius: 45,
  },
  addButton: {
    // height: 30,
    // width: 30,
    backgroundColor: '#f2f2fC',
    borderRadius: 15,
    position: 'absolute',
    top: 60,
    right: '0%',
  },
  addButtonIcon: {
    height: 30,
    width: 30,
  },
});

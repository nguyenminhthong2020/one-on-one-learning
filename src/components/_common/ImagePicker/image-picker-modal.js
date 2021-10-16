/* eslint-disable */
import React from 'react';
import { SafeAreaView, Text, Image, Pressable, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

import { images } from './assets';

export function ImagePickerModal({
  isVisible,
  onClose,
  onImageLibraryPress,
  onCameraPress,
}) {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <SafeAreaView style={styles.buttons}>
        <Pressable style={styles.button} onPress={onImageLibraryPress}>
          <Image style={styles.buttonIcon} source={require('./assets/image.jpg')} />
          <Text style={styles.buttonText}>Library</Text>
          <View style={{height: 40}}/>
        </Pressable>
        <Pressable style={styles.button} onPress={onCameraPress}>
          <Image style={styles.buttonIcon} source={require('./assets/camera.png')} />
          <Text style={styles.buttonText}>Camera</Text>
          <View style={{height: 40}}/>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    margin: 10,
  },
  buttons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
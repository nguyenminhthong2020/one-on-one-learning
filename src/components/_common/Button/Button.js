/* eslint-disable */
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {MAIN_COLOR} from '../../../globals/constant';

export default function Button(props) {
  const {title, handleSubmit, onSubmit} = props;
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: MAIN_COLOR,
    paddingVertical: 10,
  },
  container: {
    width: '50%',
    left: '25%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

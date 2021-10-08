/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Input(props) {
  const {title, handleSubmit, onSubmit} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    backgroundColor: 'rgb(0, 113, 240)',
    paddingVertical: 10,
  },
  container: {
    width: '80%',
    left: '10%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

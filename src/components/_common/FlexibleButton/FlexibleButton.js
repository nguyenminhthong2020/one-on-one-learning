/* eslint-disable */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Tag = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.view, {borderColor: 'rgb(100, 100, 100)'}]}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const TagActive = props => {
  return (
    <TouchableOpacity>
      <View style={[styles.view, {backgroundColor: 'rgb(221, 234, 255)'}]}>
        <Text style={[styles.text, {color: 'rgb(0, 113, 240)'}]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const WelcomeButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.view, {backgroundColor: 'white'}]}>
        <Text style={[styles.text, {color: 'rgb(0, 113, 240)'}]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'rgb(228, 230, 235)',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgb(0, 113, 240)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  text: {
    color: 'rgb(100, 100, 100)',
    fontSize: 14,
  },
});

export {Tag, TagActive, WelcomeButton};

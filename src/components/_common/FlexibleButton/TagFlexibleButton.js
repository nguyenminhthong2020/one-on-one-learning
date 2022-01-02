/* eslint-disable */
import React /*{useState, useEffect, useCallback}*/ from 'react';
import { THIRD_COLOR } from '../../../globals/constant';
import {Text, View, StyleSheet, Pressable} from 'react-native';

const MyTag = props => {
  return (
    <Pressable onPress={props.onPress}>
      {props.isActive ? (
        <View style={[styles.view, {borderColor: THIRD_COLOR, backgroundColor: THIRD_COLOR, 
        paddingHorizontal: 5,
        paddingVertical: 1.5,
        borderRadius: 15}]}>
          <Text style={[styles.text, {color: 'white', fontSize: 12.5}]}>{props.title}</Text>
        </View>
      ) : (
        <View style={[styles.view, {borderColor: 'rgb(100, 100, 100)'}]}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      )}
    </Pressable>
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

export default MyTag;

/* eslint-disable */
import React /*{useState, useEffect, useCallback}*/ from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

const MyTag = props => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={[styles.view, {borderColor: 'rgb(100, 100, 100)'}]}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
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

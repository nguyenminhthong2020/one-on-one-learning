/* eslint-disable */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MAIN_COLOR} from '../../../globals/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ButtonIcon(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rowbtn}>
        <TouchableOpacity style={styles.button} onPress={props.handleOnPress}>
          {props.type === 'AntDesign' ? (
            <AntDesign
              name={props.name}
              size={25}
              color={MAIN_COLOR}
              style={{paddingLeft: 15}}
            />
          ) : (
            <FontAwesome5
              name={props.name}
              size={25}
              color={MAIN_COLOR}
              style={{paddingLeft: 15}}
            />
          )}
          <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    // borderRadius: 10,
    // borderWidth: 2,
    // paddingVertical: 5,
    width: '100%',
    justifyContent: 'center'
  },
  rowbtn: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 5,
    backgroundColor: 'white'
  },
  container: {
    left: '10%',
    width: '80%',
    margin: 4,
  },
  text: {
    fontSize: 20,
    // paddingLeft: 15,
    position: 'absolute',
    left: '20%',
    color: MAIN_COLOR,
    fontWeight: 'bold'
  },
});

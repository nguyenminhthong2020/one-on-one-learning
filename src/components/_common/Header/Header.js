/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
// /* eslint-disable no-trailing-spaces */
// /* eslint-disable quotes */
// /* eslint-disable prettier/prettier */
// /* eslint-disable semi */
// /* eslint-disable prettier/prettier */
// /* eslint-disable react/self-closing-comp */
// /* eslint-disable prettier/prettier */
import React from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <View>
          <Text style={styles.leftHeader}>LetTutor</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Icon name="menu" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    //paddingBottom: 5,
  },
  shadow: {
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#fff',
    // width: 300,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  leftHeader: {
    color: MAIN_COLOR,
    fontSize: 25,
    fontWeight: 'bold',
  },
  rightHeader: {
     fontSize: 20,
  },
});

export default Header;

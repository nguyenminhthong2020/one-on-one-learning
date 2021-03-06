/* eslint-disable */
import React from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const Header = props => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.shadow,
          {backgroundColor: isDarkTheme ? 'black' : 'white'},
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isDarkTheme ? (
            <Image
              source={require('../../Main/VideoCall/logoblack.png')}
              style={{width: 30, height: 30}}
            />
          ) : (
            <Image
              source={require('../../../../assets/logo.png')}
              style={{width: 30, height: 30}}
            />
          )}
          <Text style={styles.leftHeader}>LetTutor</Text>
        </View>
        <View
          style={{
            borderWidth: 1.5,
            borderRadius: 5,
            width: 35,
            height: 35,
            backgroundColor: 'red',
            borderColor: 'red',
          }}>
          <Pressable onPress={() => props.navigation.push('Menu')}>
            <Icon name="menu" size={30} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shadow: {
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#fff',
    height: 51,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  leftHeader: {
    color: MAIN_COLOR,
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  rightHeader: {
    fontSize: 22,
  },
});

export default Header;

/* eslint-disable */
import React from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../_common/Header/Header';
import ButtonIcon from '../../_common/Button/ButtonIcon';

const Menu = () => {

  return (
    <View style={styles.container}>
       <Header></Header>
       <View style={styles.content}>
           <ButtonIcon type={'FontAwesome5'} name={'home'} title={'Home'} handleOnPress={() => alert('home')}/>
           <ButtonIcon type={'AntDesign'} name={'user'} title={'Profile'} handleOnPress={() => alert('profile')}/>
           <ButtonIcon type={'FontAwesome5'} name={'chalkboard-teacher'} title={'Tutor'} handleOnPress={() => alert('tutor')}/>
           <ButtonIcon type={'FontAwesome5'} name={'calendar-check'} title={'Schedule'} handleOnPress={() => alert('schedule')}/>
           <ButtonIcon type={'FontAwesome5'} name={'history'} title={'History'} handleOnPress={() => alert('histori')}/>
           <ButtonIcon type={'FontAwesome5'} name={'graduation-cap'} title={'Courses'} handleOnPress={() => alert('courses')}/>
           <ButtonIcon type={'FontAwesome5'} name={'user-graduate'} title={'Became a tutor'} handleOnPress={() => alert('become tutor')}/>
           <ButtonIcon type={'AntDesign'} name={'logout'} title={'Logout'} handleOnPress={() => alert('logout')}/>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
      // backgroundColor: SECOND_COLOR,
      marginTop: 20,
      height: '100%',
  },
});

export default Menu;

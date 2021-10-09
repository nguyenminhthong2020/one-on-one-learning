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
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';


import ButtonIcon from '../../_common/Button/ButtonIcon';
import ChangeSetting from '../../_common/ChangeSetting/ChangeSetting';

const Setting = () => {

  return (
    <View style={styles.container}>
       {/* <Header></Header> */}
       <View style={styles.content}>
           <ButtonIcon type={'AntDesign'} name={'user'} title={'View Feedbacks'} handleOnPress={() => alert('feedbacks')}/>
           <ButtonIcon type={'FontAwesome5'} name={'list'} title={'Booking History'} handleOnPress={() => alert('booking history')}/>
           <ButtonIcon type={'FontAwesome5'} name={'history'} title={'Session History'} handleOnPress={() => alert('session history')}/>          
           {/* <ButtonIcon type={'FontAwesome5'} name={'calendar-check'} title={'Schedule'} handleOnPress={() => alert('schedule')}/>
           <ButtonIcon type={'FontAwesome5'} name={'history'} title={'History'} handleOnPress={() => alert('histori')}/>
           <ButtonIcon type={'FontAwesome5'} name={'graduation-cap'} title={'Courses'} handleOnPress={() => alert('courses')}/>
           <ButtonIcon type={'FontAwesome5'} name={'user-graduate'} title={'Became a tutor'} handleOnPress={() => alert('become tutor')}/> */}
           <ChangeSetting type={'FontAwesome5'} name={'exchange-alt'} title={'Theme'}/>
           <ChangeSetting type={'FontAwesome5'} name={'language'} title={'Language'}/>
           <View style={{marginTop: 25}}>
             <ButtonIcon type={'FontAwesome5'} name={'sign-out-alt'} title={'Log out'} handleOnPress={() => alert('log out')}/>
           </View>
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
      marginTop: 40,
      height: '100%',
  },
});

export default Setting;

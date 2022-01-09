/* eslint-disable */
import React from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {View, StyleSheet, ScrollView, Linking} from 'react-native';
// import {SocialIcon} from 'react-native-elements';
import ButtonIcon from '../../_common/Button/ButtonIcon';
import ChangeSetting from '../../_common/ChangeSetting/ChangeSetting';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/auth/loginSlice';

const Setting = (props) => {
  const dispatch = useDispatch();
  const langState = useSelector(state => state.lang);
  const openHanlde = () => {
    Linking.openURL(
      'https://www.facebook.com/lettutorvn',
    ).catch(err => {
      console.error('Failed opening page because: ', err);
      alert('Failed to open page');
    });
  };
  const openHanlde1 = () => {
    Linking.openURL(
      'https://lettutor.edu.vn/',
    ).catch(err => {
      console.error('Failed opening page because: ', err);
      alert('Failed to open page');
    });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
       <View style={styles.content}>
           {/* <ButtonIcon type={'AntDesign'} name={'user'} title={langState.currentLang=='en'?'Feedback Tutor':'Phản hồi Giáo viên'} handleOnPress={() => props.navigation.navigate("FeedbackList")}/> */}
           {/* <ButtonIcon type={'FontAwesome5'} name={'list'} title={'Booking History'} handleOnPress={() => alert('booking history')}/>
           <ButtonIcon type={'FontAwesome5'} name={'history'} title={'Session History'} handleOnPress={() => alert('session history')}/>           */}
           {/* <ButtonIcon type={'FontAwesome5'} name={'calendar-check'} title={'Schedule'} handleOnPress={() => alert('schedule')}/>
           <ButtonIcon type={'FontAwesome5'} name={'history'} title={'History'} handleOnPress={() => alert('histori')}/>
           <ButtonIcon type={'FontAwesome5'} name={'graduation-cap'} title={'Courses'} handleOnPress={() => alert('courses')}/>
           <ButtonIcon type={'FontAwesome5'} name={'user-graduate'} title={'Became a tutor'} handleOnPress={() => alert('become tutor')}/> */}
           <ButtonIcon type={'AntDesign'} name={'earth'} title={'Website'} handleOnPress={openHanlde1}/>
           <ButtonIcon type={'AntDesign'} name={'facebook-square'} title={'Facebook'} handleOnPress={openHanlde}/>
           <ChangeSetting type={'FontAwesome5'} name={'exchange-alt'} title={`${langState[langState.currentLang].Theme}\nLight/Dark`} type={'theme'}/>
           <ChangeSetting type={'FontAwesome5'} name={'language'} title={`${langState[langState.currentLang].Language}\n(English/Vietnamese)`} type={'lang'}/>
           <View style={{marginTop: 25}}>
             <ButtonIcon type={'FontAwesome5'} name={'sign-out-alt'} title={langState[langState.currentLang].Logout} handleOnPress={
               () => {
                dispatch(logout());
              props.navigation.navigate('Login');
               }}/>
           </View>
       </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
      marginTop: 30,
  },
});

export default Setting;

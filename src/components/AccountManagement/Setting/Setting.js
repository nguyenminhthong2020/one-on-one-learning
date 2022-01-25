/* eslint-disable */
import React from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {View, StyleSheet, ScrollView, Linking} from 'react-native';
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

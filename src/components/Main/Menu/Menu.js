/* eslint-disable */
import React from 'react';
import {SECOND_COLOR} from '../../../globals/constant';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ButtonIcon from '../../_common/Button/ButtonIcon';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/auth/loginSlice';

const Menu = props => {
  const dispatch = useDispatch();
  const langState = useSelector(state => state.lang);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.content, {backgroundColor: isDarkTheme?'black':null}]}>
          {/* <ButtonIcon type={'FontAwesome5'} name={'home'} title={'Home'} handleOnPress={() => alert('home')}/> */}
          <ButtonIcon
            type={'AntDesign'}
            name={'user'}
            title={langState[langState.currentLang].Profile}
            handleOnPress={() => props.navigation.navigate('Profile')}
          />
          <ButtonIcon
            type={'FontAwesome5'}
            name={'heart'}
            title={langState[langState.currentLang].Favorite}
            handleOnPress={() => props.navigation.navigate('Favorites')}
          />
          {/* <ButtonIcon
            type={'FontAwesome5'}
            name={'chalkboard-teacher'}
            title={'Tutor'}
            handleOnPress={() => alert('tutor')}
          /> */}
          {/* <ButtonIcon
            type={'FontAwesome5'}
            name={'calendar-check'}
            title={langState[langState.currentLang].Schedule}
            handleOnPress={() => props.navigation.navigate("Schedule")}
          /> */}
          <ButtonIcon
            type={'FontAwesome5'}
            name={'history'}
            title={langState.currentLang=='en'?'History & Feedbacks':'Lịch sử & Phản hồi'}
            handleOnPress={() => props.navigation.navigate("FeedbackList")}
          />
          <ButtonIcon
            type={'FontAwesome5'}
            name={'graduation-cap'}
            title={langState[langState.currentLang].Courses}
            handleOnPress={() => props.navigation.navigate('ListCourseNew')}
          />
          <ButtonIcon
            type={'AntDesign'}
            name={'book'}
            title={'Ebooks'}
            handleOnPress={() => props.navigation.navigate('ListEbookNew')}
          />
          <ButtonIcon
            type={'FontAwesome5'}
            name={'user-graduate'}
            title={langState[langState.currentLang].Become_a_tutor}
            handleOnPress={() => props.navigation.navigate('BecomeTutor')}
          />
          <ButtonIcon
            type={'AntDesign'}
            name={'logout'}
            title={langState[langState.currentLang].Logout}
            handleOnPress={() => {
              dispatch(logout());
              props.navigation.navigate('Login')
            }}
          />
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
    marginTop: 20,
    height: '100%',
    backgroundColor: SECOND_COLOR,
  },
});

export default Menu;

/* eslint-disable */
import React from 'react';
import {SECOND_COLOR} from '../../../globals/constant';
import {
  //Text,
  View,
  ScrollView,
  StyleSheet,
  //TouchableOpacity,
} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Ionicons';

//import Header from '../../_common/Header/Header';
import ButtonIcon from '../../_common/Button/ButtonIcon';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/auth/loginSlice';

const Menu = props => {
  const dispatch = useDispatch();
  const langState = useSelector(state => state.lang);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* <ButtonIcon type={'FontAwesome5'} name={'home'} title={'Home'} handleOnPress={() => alert('home')}/> */}
          <ButtonIcon
            type={'AntDesign'}
            name={'user'}
            title={langState[langState.currentLang].Profile}
            handleOnPress={() => props.navigation.navigate('Profile')}
          />
          {/* <ButtonIcon
            type={'FontAwesome5'}
            name={'chalkboard-teacher'}
            title={'Tutor'}
            handleOnPress={() => alert('tutor')}
          /> */}
          <ButtonIcon
            type={'FontAwesome5'}
            name={'calendar-check'}
            title={langState[langState.currentLang].Schedule}
            handleOnPress={() => props.navigation.navigate("Schedule")}
          />
          <ButtonIcon
            type={'FontAwesome5'}
            name={'history'}
            title={langState[langState.currentLang].History}
            handleOnPress={() => props.navigation.navigate("History")}
          />
          <ButtonIcon
            type={'FontAwesome5'}
            name={'graduation-cap'}
            title={langState[langState.currentLang].Courses}
            handleOnPress={() => props.navigation.navigate('ListCourse')}
          />
          <ButtonIcon
            type={'AntDesign'}
            name={'book'}
            title={'Ebooks'}
            handleOnPress={() => props.navigation.navigate('ListEbook')}
          />
           <ButtonIcon
            type={'FontAwesome5'}
            name={'heart'}
            title={langState[langState.currentLang].Favorite}
            handleOnPress={() => props.navigation.navigate('Favorites')}
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
    // backgroundColor: SECOND_COLOR,
    marginTop: 20,
    height: '100%',
    backgroundColor: SECOND_COLOR,
  },
});

export default Menu;

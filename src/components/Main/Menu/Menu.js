/* eslint-disable */
import React from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../../_common/Header/Header';
import ButtonIcon from '../../_common/Button/ButtonIcon';

const Menu = props => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* <ButtonIcon type={'FontAwesome5'} name={'home'} title={'Home'} handleOnPress={() => alert('home')}/> */}
          <ButtonIcon
            type={'AntDesign'}
            name={'user'}
            title={'Profile'}
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
            title={'Schedule'}
            handleOnPress={() => props.navigation.navigate("Schedule")}
          />
          <ButtonIcon
            type={'FontAwesome5'}
            name={'history'}
            title={'History'}
            handleOnPress={() => props.navigation.navigate("History")}
          />
          <ButtonIcon
            type={'FontAwesome5'}
            name={'graduation-cap'}
            title={'Courses'}
            handleOnPress={() => props.navigation.navigate('ListCourse')}
          />
          <ButtonIcon
            type={'FontAwesome5'}
            name={'user-graduate'}
            title={'Become a tutor'}
            handleOnPress={() => props.navigation.navigate('BecomeTutor')}
          />
          <ButtonIcon
            type={'AntDesign'}
            name={'logout'}
            title={'Logout'}
            handleOnPress={() => alert('logout')}
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
    marginTop: 30,
    height: '100%',
    backgroundColor: SECOND_COLOR,
  },
});

export default Menu;

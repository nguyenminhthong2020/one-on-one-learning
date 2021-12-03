/* eslint-disable */
import React, {useState} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {Text, View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';
import { useSelector} from 'react-redux';

const HeadContent = props => {
  const langState = useSelector(state => state.lang);

  return props.state === true ? (
    <View style={styles.headContent}>
      <View style={{marginBottom: 10, marginTop: 10}}>
        {
          langState.currentLang == "en" ?
          <Text style={{fontSize: 18, color: 'white'}}>
          Total lesson time is 0 hours 0 minutes
        </Text> : 
        <Text style={{fontSize: 18, color: 'white'}}>
          Tổng thời gian học là 0 giờ 0 phút
        </Text>
        }
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={{fontSize: 17, color: 'white'}}>
          {langState[langState.currentLang].Upcoming_Lesson}
        </Text>
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={{fontSize: 17, color: 'white'}}>
          Fri, 05 Nov 21 20:30 - 20:55
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 8,
          marginBottom: 25,
          borderRadius: 20,
          borderWidth: 1,
          backgroundColor: 'white',
        }}>
        <Pressable onPress={()=>props.navigation.navigate("VideoCall")}>
          <Text style={{fontSize: 16, color: MAIN_COLOR}}>
          {langState[langState.currentLang].Enter_lesson_room}
          </Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <View style={styles.headContent}>
      <View style={{marginBottom: 20, marginTop: 30}}>
        {langState.currentLang == "en" ?
          <Text style={{fontSize: 18, color: 'white'}}>Welcome to LetTutor</Text> :
          <Text style={{fontSize: 18, color: 'white'}}>Chào mừng đến LetTutor</Text>
          }
      </View>
      {/* <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {`You have no upcoming lesson,\n  please click below to book`}
          </Text>
        </View> */}
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderColor: 'white',
          marginBottom: 35,
          borderRadius: 20,
          borderWidth: 1,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity>
          <Text style={{fontSize: 16, color: MAIN_COLOR}}>Book a lesson</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headContent: {
    backgroundColor: 'rgb(12, 61, 223)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeadContent;

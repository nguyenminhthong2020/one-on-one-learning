/* eslint-disable react/self-closing-comp */
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
import React, {useState} from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';

import Header from '../../_common/Header/Header';

const Home = () => {
  const [state, setstate] = useState(false);

  const HeadContent = () => {
    return state ? (
      <View style={styles.headContent}>
        <View style={{marginBottom: 10, marginTop: 10,}}>
          <Text style={{fontSize: 20, color: 'white'}}>
            Total lesson time is 0 hours 0 minutes
          </Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 18, color: 'white'}}>Upcoming Lesson</Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 18, color: 'white'}}>Mon, 11 Oct 21 20:30 - 20:55</Text>
        </View>
        <View style={{paddingHorizontal:10, paddingVertical:8, marginBottom: 25, borderRadius: 20, borderWidth: 1, backgroundColor: 'white'}}>
          <TouchableOpacity>
            <Text style={{fontSize: 18, color: MAIN_COLOR,}}>
              Enter lesson room
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.headContent}>
        <View style={{marginBottom: 10, marginTop: 10,}}>
          <Text style={{fontSize: 20, color: 'white'}}>Welcome to LetTutor</Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {`You have no upcoming lesson,\n  please click below to book`}
          </Text>
        </View>
        <View style={{paddingHorizontal:10, paddingVertical:8, borderColor: 'white', marginBottom: 25, borderRadius: 20, borderWidth: 1, backgroundColor: 'white'}}>
          <TouchableOpacity>
            <Text style={{fontSize: 18, color: MAIN_COLOR,}}>
              Book a lesson
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header></Header>
      <HeadContent></HeadContent>
      
      <View>
        <Text>This is Home</Text>
        <Text>123456</Text>
        <Text>9021</Text>
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

export default Home;

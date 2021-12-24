/* eslint-disable */
import React from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import { axiosInstance } from '../../../utils/utils';

const NotifyForgetPassword = (props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = () => {
    axiosInstance
    .post(`user/forgotPassword`, {
      email: props.route.params.email,
    })
    .then(res => {
      alert("An email has send successfully");
    }).catch(err => {
       alert("Error: \n" + err.response.data.message);
    });
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: 25}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: MAIN_COLOR}}>
         Check your email
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 10, marginHorizontal: 20}}>
        <Text style={{textAlign: 'center', fontSize: 18, color: 'black'}}>
         We just send an email to you with a link to reset your password.
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 45}}>
        <Text style={{fontSize: 18, color: 'black'}}>
          Can't receive the email ?
        </Text>
      </View>
      <View style={{marginTop: 15}}>
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.button}
            onPress={onSubmit}>
            <Text style={styles.text1}>Send again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: 25,
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },

  button: {
    borderRadius: 15,
    backgroundColor: MAIN_COLOR,
    paddingVertical: 10,
  },
  container1: {
    width: '80%',
    left: '10%',
  },
  text1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default NotifyForgetPassword;

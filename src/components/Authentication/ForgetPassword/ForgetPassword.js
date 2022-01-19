/* eslint-disable */
import React from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {Text, View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Input from '../../../components/_common/Input/Input';
import Button from '../../../components/_common/Button/Button';
import { axiosInstance } from '../../../utils/utils';

const ForgetPassword = (props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = data => 
  {
    axiosInstance
      .post(`user/forgotPassword`, {
        email: data.email,
      })
      .then(res => {
        props.navigation.navigate("NotifyForgetPassword", {
          email: data.email
        })
      }).catch(err => {
        if (JSON.stringify(err).includes('message')) {
          alert('FAIL:\n' + err.response.data.message);
        } else {
          alert('FAIL:\n' + err);
        }
      });
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: 20, marginBottom: 5}}>
        <Text style={styles.text}>RESET PASSWORD</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 20, marginHorizontal: 30}}>
        <Text style={{textAlign: 'center', color: 'black', fontSize: 15}}>Enter your email address and we'll send you a link to reset your password.</Text>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            secureTextEntry={false}
            placeholder={'Enter your email'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{'please type your mail'}</Text>}
      <View style={{marginTop: 20}}>
        <Button title="Send" handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'white'
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
});

export default ForgetPassword;

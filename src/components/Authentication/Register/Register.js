/* eslint-disable */
import React from 'react';
import {MAIN_COLOR, BASE_URL} from '../../../globals/constant';
import {Text, View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller, useWatch} from 'react-hook-form';
import Input from '../../../components/_common/Input/Input';
import Button from '../../../components/_common/Button/Button';
import {SocialIcon} from 'react-native-elements';
import { axiosInstance } from '../../../utils/utils';

const Register = (props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});
  const password = useWatch({ control, name: 'password' });

  const onSubmit = data => {
    axiosInstance
      .post(`auth/register`, {
        email: data.email,
        password: data.password,
        source: BASE_URL
      })
      .then(res => {
        // console.log(res.data);
        alert("Your registration successfully.\n\nCheck email:\n"+data.email);
      }).catch(err => {
         alert("Error: \n" + err.response.data.message);
      });
  }

  return (
    // <ScrollView>
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: "please type name",
          validate: value => /^[a-zA-Z]/gi.test(value) || "Fullname is not correct format"
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={'Full name'}
            secureTextEntry={false}
            placeholder={'Name'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
      <Controller
        control={control}
        rules={{
          required: "please type email",
          validate: value => /\S+@\S+\.\S+/.test(value) || "The email is not a valid email address"
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={'Email'}
            secureTextEntry={false}
            placeholder={'example@gmail.com'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      <Controller
        control={control}
        rules={{
          required: "please type password",
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={'Password'}
            secureTextEntry={true}
            placeholder={'********'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: "please confirm password",
          validate: value => value === password || "The passwords do not match"
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={'Confirm password'}
            secureTextEntry={true}
            placeholder={'********'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="repassword"
      />
      {errors.repassword && (
        <Text style={styles.error}>{errors.repassword.message}</Text>
      )}
     
      <View style={{marginTop: 20}}>
      <Button title="Register" handleSubmit={handleSubmit} onSubmit={onSubmit} 
      />
      </View>
      <View style={{marginTop: 15, marginBottom: 20}}>
        <View
          style={{
            marginTop: 18,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View>
            <Text style={{fontSize: 18}}>Already have an account? </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
              <Text style={{color: MAIN_COLOR, fontSize: 18, fontWeight: 'bold'}}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: 25,
  },
  forgotpw: {
    right: '10%',
    marginTop: 22,
    marginBottom: 15,
  },
  forgotpwText: {
    color: MAIN_COLOR,
    fontSize: 15,
    textAlign: 'right',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});

export default Register;

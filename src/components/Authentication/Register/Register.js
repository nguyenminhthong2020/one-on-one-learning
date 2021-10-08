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
import React from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Input from '../../../components/_common/Input/Input';
import Button from '../../../components/_common/Button/Button';
import {SocialIcon} from 'react-native-elements';

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = data => alert(JSON.stringify(data));

  return (
    <View style={styles.container}>
      {/* <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>LOGIN</Text>
      </View> */}
      <Controller
        control={control}
        rules={{
          required: true,
          //   message: 'please type gmail',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={'Full name*'}
            secureTextEntry={false}
            placeholder={'Name'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.error}>{'please type full name'}</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
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
      {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
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
        <Text style={styles.error}>{'please type password'}</Text>
      )}
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={'Confirm password*'}
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
        <Text style={styles.error}>{'please confirm password'}</Text>
      )}
      <View style={{marginTop: 20}}>
      <Button title="Register" handleSubmit={handleSubmit} onSubmit={onSubmit} 
      />
      </View>
      {/* <TouchableOpacity title="Submit" onPress={handleSubmit(onSubmit)} /> */}
      <View style={{marginTop: 20, marginBottom: 20}}>
        <Text style={{textAlign: 'center', marginBottom: 5}}>
          Or continute with
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          <SocialIcon
            style={{width: '30%'}}
            title="Facebook"
            button
            type="facebook"
            onPress={() => {
              alert('facebook');
            }}
          />
          <SocialIcon
            style={{width: '30%'}}
            title="Google"
            button
            type="google"
            onPress={() => {
              alert('google');
            }}
          />
        </View>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View>
            <Text style={{fontSize: 18}}>Already have an account? </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => alert('login')}>
              <Text style={{color: MAIN_COLOR, fontSize: 18}}>Log in</Text>
            </TouchableOpacity>
          </View>
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

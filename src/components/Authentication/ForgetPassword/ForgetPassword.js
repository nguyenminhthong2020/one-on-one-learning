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

const ForgetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = data => alert(JSON.stringify(data));

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={styles.text}>FORGET PASSWORD</Text>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
          //   message: 'please type gmail',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={
              "Enter your email address and we'll send you a link to reset your password"
            }
            secureTextEntry={false}
            placeholder={'Enter your email'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>}
      <View style={{marginTop: 20}}>
        <Button title="Send" handleSubmit={handleSubmit} onSubmit={onSubmit} />
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
});

export default ForgetPassword;
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

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = data => alert(JSON.stringify(data));

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Text style={styles.text}>LOGIN</Text>
      </View>
      {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
          //   message: 'please type gmail',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={'Email'}
            icon={'mail'}
            secureTextEntry={false}
            placeholder={'example@gmail.com'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="email"
      />
      {errors.password && (
        <Text style={styles.error}>{'please type password'}</Text>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
          message: 'please type password',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            label={'Password'}
            icon={'lock'}
            secureTextEntry={true}
            placeholder={'********'}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        name="password"
      />
      <View style={styles.forgotpw}>
        <TouchableOpacity onPress={() => alert('forgotpassword')}>
          <Text style={styles.forgotpwText}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>
      <Button title="Log In" handleSubmit={handleSubmit} onSubmit={onSubmit} />
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
            <Text style={{fontSize: 18}}>Don't have account? </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => alert('signup')}>
              <Text style={{color: MAIN_COLOR, fontSize: 18}}>Sign up</Text>
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
    marginBottom: 15,
    marginTop: 2,
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

  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
});

export default Login;

// import React from 'react'
// import { Alert, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { theme } from '../../../globals/theme'
// import {styles} from './styles'
// import {Controller, useForm} from 'react-hook-form'

// export default Login = () => {

//   const {handleSubmit, control,
//     formState: {errors, isValid},
//   } = useForm({mode: 'onBlur'})

//   const onSubmit = (data) => {
//     Alert(data);
//   }

//   return (
//     <KeyboardAvoidingView style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <Controller
//         control={control}
//         name="email"
//         render={({field: {onChange, value, onBlur}}) => (
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor={theme.colors.primary}
//             value={value}
//             onBlur={onBlur}
//             onChangeText={value => onChange(value)}
//           />
//         )}
//         rules={{
//           required: {
//             value: true,
//             message: 'Please write Email'
//           },
//         }}
//       />
//       <Text style={styles.error}>{errors.email?.message}</Text>
//       <Controller
//         control={control}
//         name="password"
//         render={({field: {onChange, value, onBlur}}) => (
//           <TextInput
//             secureTextEntry
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor={theme.colors.primary}
//             value={value}
//             onBlur={onBlur}
//             onChangeText={value => onChange(value)}
//           />
//         )}
//         rules={{
//           required: {
//             value: true,
//             message: 'Please write Password'
//           }
//         }}
//       />
//       <Text style={styles.error}>{errors.password?.message}</Text>
//       <TouchableOpacity
//         disabled={!isValid}
//         activeOpacity={0.7}
//         style={styles.button}
//         onPress={handleSubmit(onSubmit)}
//       >
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   )
// }

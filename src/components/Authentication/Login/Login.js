/* eslint-disable */
import React, {useEffect} from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {Text, View, Alert, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Input from '../../../components/_common/Input/Input';
import Button from '../../../components/_common/Button/Button';
import {SocialIcon} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../../redux/slices/auth/loginSlice';
import { init } from '../../../redux/slices/auth/loginSlice';
import LinearGradient from 'react-native-linear-gradient';

const Login = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(init());
  }, [])

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});
  

  const check = useSelector(state => state.auth.isLoggin);
  // console.log(check);

  const onSubmit = function(data){
    //dispatch()
    dispatch(loginAsync({
      email: data.email,
      password: data.password
    }))
  }
  
  useEffect(() => {
    // console.log("dispatch nè");
    if(check == true){
      props.navigation.navigate("MainTabs");
    }
  }, [check])

  useEffect(() => {
      //  console.log("dispatch nè");
       if(check == true){
         props.navigation.navigate("MainTabs");
       }
  }, [dispatch, check])

  return (
    <View style={styles.container}>
      <LinearGradient colors={['white', 'white', 'green']}>
      <View style={{height: 8}}></View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>LOGIN</Text>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
          //   message: 'please type gmail',
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
      <View style={{height: 5}}></View>
      <Controller
        control={control}
        rules={{
          required: true,
          message: 'please type password',
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
      <View style={styles.forgotpw}>
        <Pressable onPress={() => props.navigation.navigate("ForgetPassword")}>
          <Text style={styles.forgotpwText}>Forgot Password ?</Text>
        </Pressable>
      </View>
      <Button title="Log In" handleSubmit={handleSubmit} onSubmit={onSubmit} />
      {/* <TouchableOpacity title="Submit" onPress={handleSubmit(onSubmit)} /> */}
      <View style={{marginTop: 18}}>
        <Text style={{textAlign: 'center', marginBottom: 0}}>
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
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View>
            <Text style={{fontSize: 18,}}>Don't have account? </Text>
          </View>
          <View>
            <Pressable onPress={() => props.navigation.navigate("Register")}>
              <Text style={{color: MAIN_COLOR, fontSize: 18, fontWeight: 'bold'}}>Sign up</Text>
            </Pressable>
          </View>
          <View style={{height: 450}}></View>
        </View>
      </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingTop: 0,
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
    marginTop: 15,
    marginBottom: 15,
  },
  forgotpwText: {
    color: MAIN_COLOR,
    fontSize: 15,
    textAlign: 'right',
    //fontWeight: 'bold'
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

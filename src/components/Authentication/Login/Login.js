/* eslint-disable */
import React, {useEffect} from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import { Input } from 'react-native-elements';
import Button from '../../../components/_common/Button/Button';
import {SocialIcon} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../../redux/slices/auth/loginSlice';
import { initNew } from '../../../redux/slices/auth/loginSlice';

// import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { axiosInstance } from '../../../utils/utils';


const Login = (props) => {
  const dispatch = useDispatch();
  const check = useSelector(state => state.auth.isLoggin);
  useEffect(()=>{
    if(check == true){
          props.navigation.navigate("MainTabs");
        }
  }, [check])

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});
  
  const onSubmit = function(data){
    dispatch(loginAsync({
      email: data.email,
      password: data.password
    }))
  }

  const signInGoogle = () => {
    (
      async () => {
        try{
          GoogleSignin.configure({
            // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            hostedDomain: '', // specifies a hosted domain restriction
            webClientId: "248659140633-ckjjk3t298j48vknacktgm9kr1gm52ld.apps.googleusercontent.com",
            offlineAccess: true,
          });

          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signIn();
          const tokens = await GoogleSignin.getTokens();
          await GoogleSignin.signOut();
          
          axiosInstance
      .post(`auth/google`, {
        access_token: tokens.accessToken
      })
      .then(res => {
        dispatch(initNew({current: res.data}))
      }).catch(err => {
         alert("Error: \n" + err.response.data.message);
      });
 
        }catch(err){
          console.log("Error :\n" + err)
        }
      }
    )()
  }

  const signInFacebook = () => {
    (
      async () => {
        try{
          await LoginManager.logOut();
          const result = await LoginManager.logInWithPermissions([
            "email",
            "public_profile",
            "user_friends"
          ]);
          if (result.isCancelled) {
            console.log('User cancelled the login process');
          }else{
              // Once signed in, get the users AccesToken
          const data = await AccessToken.getCurrentAccessToken();
          if (!data) {
            alert('Something went wrong obtaining access token');
          }else{
            axiosInstance
            .post(`auth/facebook`, {
              access_token: data.accessToken
            })
            .then(res => {
              dispatch(initNew({current: res.data}))
            }).catch(err => {
               alert("Error: \n" + err.response.data.message);
            });
          }
          }
        }catch(err){
          console.log("Error :\n" + err)
        }
      }
    )()
  }

  return (
    <View style={styles.container}>
      <View style={{height: 8}}></View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>LOGIN</Text>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
        autoCompleteType="email"
        keyboardType="email-address"
        containerStyle={{width: '80%', marginLeft: '10%', marginTop: 20}}
        inputContainerStyle={{}}
        inputStyle={{marginLeft: 10, fontSize: 16}}
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
        onChangeText={onChange}
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
          containerStyle={{width: '80%', marginLeft: '10%'}}
        inputContainerStyle={{}}
        inputStyle={{marginLeft: 10, fontSize: 16}}
        placeholder="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={onChange}
        secureTextEntry={true}
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
            onPress={signInFacebook}
          />
          <SocialIcon
            style={{width: '30%'}}
            title="Google"
            button
            type="google"
            onPress={signInGoogle}
          />
        </View>
        <View
          style={{
            marginTop: 18,
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
    marginTop: 5,
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

export default Login;
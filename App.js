/* eslint-disable */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './src/components/Authentication/Login/Login';
import Register from './src/components/Authentication/Register/Register';
import ForgetPassword from './src/components/Authentication/ForgetPassword/ForgetPassword';
import NotifyForgetPassword from './src/components/Authentication/ForgetPassword/NotifyForgetPassword';
import Home from './src/components/Main/Home/Home';
import Menu from './src/components/Main/Menu/Menu';
import Profile from './src/components/AccountManagement/Profile/Profile';
import Setting from './src/components/AccountManagement/Setting/Setting';
import Search from './src/components/Main/Tutor/Search/Search';
//import {Tag, TagActive, WelcomeButton} from './src/components/_common/FlexibleButton/FlexibleButton';

const App = () => {
   return (
       //<Menu></Menu>
      //<Home></Home>
      //<Profile></Profile>
      //<Setting></Setting>
      //<Search></Search>
      //<Multicheck></Multicheck>
   );
}
const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
});

export default App;

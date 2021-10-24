/* eslint-disable */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Suspense} from 'react';
import {
  //ActivityIndicator,
  Text,
  // useColorScheme,
  View,
} from 'react-native';
//import Login from './src/components/Authentication/Login/Login';
//import Register from './src/components/Authentication/Register/Register';
// import ForgetPassword from './src/components/Authentication/ForgetPassword/ForgetPassword';
// import NotifyForgetPassword from './src/components/Authentication/ForgetPassword/NotifyForgetPassword';
import {MAIN_COLOR} from './src/globals/constant';
const MainNavigation = React.lazy(() =>
  import('./src/navigation/MainNavigation'),
);
import {NavigationContainer, DarkTheme} from '@react-navigation/native';


const App = () => {
  return (
    <NavigationContainer /*theme={DarkTheme}*/>
      <Suspense
        fallback={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 45, color: MAIN_COLOR}}>LetTutor</Text>
          </View>
        }>
        <MainNavigation />
      </Suspense>
    </NavigationContainer>
  );
};

export default App;

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
// const MainNavigation = React.lazy(() =>
//   import('./src/navigation/MainNavigation'),
// );
import MainNavigation from './src/navigation/MainNavigation';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './src/redux/store';
import {useSelector} from 'react-redux';

const SlashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 45, color: MAIN_COLOR, fontWeight: 'bold'}}>
        LetTutor
      </Text>
    </View>
  );
};
const NavigationTheme = () => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <MainNavigation />
    </NavigationContainer>
  );
};
const App = () => {
  //const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  return (
    <Provider store={store}>
      <PersistGate loading={<SlashScreen />} persistor={persistor}>
          <NavigationTheme />
      </PersistGate>
    </Provider>
  );
};

export default App;

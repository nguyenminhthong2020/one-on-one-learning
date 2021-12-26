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
  Text,
  View,
} from 'react-native';
import {MAIN_COLOR} from './src/globals/constant';
import MainNavigation from './src/navigation/MainNavigation';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './src/redux/store';

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
  return (
    <Provider store={store}>
      <PersistGate loading={<SlashScreen />} persistor={persistor}>
          <NavigationTheme />
      </PersistGate>
    </Provider>
  );
};

export default App;

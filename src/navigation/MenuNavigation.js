/* eslint-disable */
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../components/Main/Home/Home';
import Menu from '../components/Main/Menu/Menu';
import Profile from '../components/AccountManagement/Profile/Profile'
import Search from '../components/Main/Tutor/Search/Search';
import CourseNavigation from './CourseNavigation';
import BecomeTutor from '../components/Main/Menu/BecomeTutor/BecomeTutor';

const Stack = createNativeStackNavigator();

function MenuNavigation(props) {
  return (
      <Stack.Navigator>
        {/* <Stack.Screen name="HomeNavigation" component={HomeNavigation} options={{headerShown: false}}/> */}
        <Stack.Screen name="Menu" component={Menu} /> 
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="BecomeTutor" component={BecomeTutor} options={{headerShown: true}}/>
        <Stack.Screen name="CourseNavigation" component={CourseNavigation} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}

export default MenuNavigation;
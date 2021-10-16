/* eslint-disable */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListCourse from '../components/Main/Menu/Courses/ListCourse/ListCourse';
import CourseDetail from '../components/Main/Menu/Courses/CourseDetail/CourseDetail';

//import ListEbook from '../components/Main/Menu/Course/ListCourse/ListEbook';

const Stack = createNativeStackNavigator();

function CourseNavigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListCourse" component={ListCourse} options={{headerShown: false}}/>
      <Stack.Screen name="CourseDetail" component={CourseDetail} options={{headerShown: false}}/>
      {/* <Tab.Screen name="ListEbook" component={ListEbook} /> */}
    </Stack.Navigator>
  );
}

export default CourseNavigation;

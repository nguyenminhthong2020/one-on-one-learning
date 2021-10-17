/* eslint-disable */
import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../components/Main/Home/Home';
import Menu from '../components/Main/Menu/Menu';
import Profile from '../components/AccountManagement/Profile/Profile';
import ListCourse from '../components/Main/Menu/Courses/ListCourse/ListCourse';
import CourseDetail from '../components/Main/Menu/Courses/CourseDetail/CourseDetail'
import BecomeTutor from '../components/Main/Menu/BecomeTutor/BecomeTutor';
import Schedule from '../components/Main/Menu/Schedule/Schedule';
import History from '../components/Main/Menu/History/History';

//import Menu from '../components/Main/Menu/Menu';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function HomeNavigation(props) {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Menu" component={Menu} options={{headerShown: true}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: true}}/>
        <Stack.Screen name="Schedule" component={Schedule} options={{headerShown: true}}/>
        <Stack.Screen name="History" component={History} options={{headerShown: true}}/>
        <Stack.Screen name="ListCourse" component={ListCourse} options={{headerShown: false}}/>
        <Stack.Screen name="CourseDetail" component={CourseDetail} options={{headerShown: false}} />
        <Stack.Screen name="BecomeTutor" component={BecomeTutor} options={{headerShown: true, title: 'Become a tutor' }}/>
      </Stack.Navigator>
  );
}

export default HomeNavigation;
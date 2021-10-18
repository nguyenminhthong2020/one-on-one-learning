/* eslint-disable */
import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TutorMessage from '../components/Main/Message/TutorMessage';
import TutorDetailNew from '../components/Main/Tutor/TutorDetail/TutorDetailNew';
import ListMessage from '../components/Main/Message/ListMessage';
import Upcoming from '../components/Main/Upcoming/Upcoming';
import Search from '../components/Main/Tutor/Search/Search';
import Setting from '../components/AccountManagement/Setting/Setting';
import Home from '../components/Main/Home/Home';
import Menu from '../components/Main/Menu/Menu';
import Profile from '../components/AccountManagement/Profile/Profile';
import ListCourse from '../components/Main/Menu/Courses/ListCourse/ListCourse';
import CourseDetail from '../components/Main/Menu/Courses/CourseDetail/CourseDetail';
import BecomeTutor from '../components/Main/Menu/BecomeTutor/BecomeTutor';
import Schedule from '../components/Main/Menu/Schedule/Schedule';
import History from '../components/Main/Menu/History/History';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs(props) {
  return (
    <Tab.Navigator
      //initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {height: 55},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={ListMessage}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upcoming"
        component={Upcoming}
        options={{
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tutors"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainNavigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TutorDetailNew"
        component={TutorDetailNew}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListCourse"
        component={ListCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="BecomeTutor"
        component={BecomeTutor}
        options={{headerShown: true, title: 'Become a tutor'}}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="TutorMessage"
        component={TutorMessage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;

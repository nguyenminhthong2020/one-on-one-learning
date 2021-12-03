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
import Favorites from '../components/Main/Menu/Favorites/Favorites';
import History from '../components/Main/Menu/History/History';
import VideoCall from '../components/Main/VideoCall/VideoCall';
import Login from '../components/Authentication/Login/Login';
import ForgetPassword from '../components/Authentication/ForgetPassword/ForgetPassword';
import NotifyForgetPassword from '../components/Authentication/ForgetPassword/NotifyForgetPassword';
import Register from '../components/Authentication/Register/Register';
import { useSelector} from 'react-redux';

// import i18n from "../utils/i18n";
// const home = i18n.t("Home");
// const message = i18n.t("Message");
// const upcoming = i18n.t("Upcoming");
// const tutors = i18n.t("Tutors");
// const settings = i18n.t("Settings");
// import { useTranslation } from 'react-i18next'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs(props) {
  //const currentLang = useSelector(state => state.lang.currentLang);
  //console.log(currentLang);
  const langState = useSelector(state => state.lang);
  //console.log(langState[langState.currentLang].Home);
  // const currentLang = useSelector(state => state.lang.currentLang);


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
          title: langState[langState.currentLang].Home,
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
          title: langState[langState.currentLang].Message,
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
          title: langState[langState.currentLang].Upcoming,
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
          title: langState[langState.currentLang].Tutors,
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
          title: langState[langState.currentLang].Settings,
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
  const langState = useSelector(state => state.lang);
  const check = useSelector(state => state.auth.isLoggin);
  return (
    <Stack.Navigator
       initialRouteName={check == true ? "MainTabs": "Login"}
    >
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Register"
        component={Register}
      />
      <Stack.Screen 
        name="ForgetPassword"
        component={ForgetPassword}
      />
      <Stack.Screen 
        name="NotifyForgetPassword"
        component={NotifyForgetPassword}
      />
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
        name="VideoCall"
        component={VideoCall}
        options={{headerShown: true, title :'Lesson Room'}}
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
        options={{headerShown: true,
         title: langState[langState.currentLang].Schedule
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
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
        options={{headerShown: true, title: langState[langState.currentLang].History}}
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

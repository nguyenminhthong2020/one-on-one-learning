/* eslint-disable */
import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeNavigation from './HomeNavigation';
import ListMessage from '../components/Main/Message/ListMessage';
import Upcoming from '../components/Main/Upcoming/Upcoming';
import Search from '../components/Main/Tutor/Search/Search';
import Setting from '../components/AccountManagement/Setting/Setting';

const Tab = createBottomTabNavigator();

function MainTabNavigation(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeNavigation" component={HomeNavigation} options={{headerShown: false}}/>
      <Tab.Screen name="ListMessage" component={ListMessage}  options={{headerShown: false}}/>
      <Tab.Screen name="Upcoming" component={Upcoming}/>
      <Tab.Screen name="Tutors" component={Search}  options={{headerShown: false}}/>
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}

export default MainTabNavigation;
/* eslint-disable */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigation from './MainTabNavigation';
import TutorMessage from '../components/Main/Message/TutorMessage';
import TutorDetailNew from '../components/Main/Tutor/TutorDetail/TutorDetailNew';

const Stack = createNativeStackNavigator();

function RootNavigation(props) {
  return (
      <Stack.Navigator>
        <Stack.Screen name="MainTabNavigation" component={MainTabNavigation} options={{headerShown: false}}/>
        <Stack.Screen name="TutorMessage" component={TutorMessage} options={{headerShown: false}}/>
        <Stack.Screen name="TutorDetailNew" component={TutorDetailNew} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}

export default RootNavigation;
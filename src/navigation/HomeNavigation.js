/* eslint-disable */
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../components/Main/Home/Home';
import MenuNavigation from './MenuNavigation';
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
        <Stack.Screen name="MenuNavigation" component={MenuNavigation} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}

export default HomeNavigation;
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
  //SafeAreaView,
  // ScrollView,
  // StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  // useColorScheme,
  View,
} from 'react-native';
//import Login from './src/components/Authentication/Login/Login';
 import Register from './src/components/Authentication/Register/Register';
// import ForgetPassword from './src/components/Authentication/ForgetPassword/ForgetPassword';
// import NotifyForgetPassword from './src/components/Authentication/ForgetPassword/NotifyForgetPassword';
//import Home from './src/components/Main/Home/Home';
//import IndexHome from './src/components/Main/Home/IndexHome';
// const Home = React.lazy(() => import('./src/components/Main/Home/Home'));
//import {MAIN_COLOR} from './src/globals/constant';
//import TestCounter from './src/components/_common/TestCounter/TestCounter';
//import Menu from './src/components/Main/Menu/Menu';
// import Profile from './src/components/AccountManagement/Profile/Profile';
import Setting from './src/components/AccountManagement/Setting/Setting';
import Search from './src/components/Main/Tutor/Search/Search';
//const Search = React.lazy(() =>import('./src/components/Main/Tutor/Search/Search'));
////import {Tag, TagActive, WelcomeButton} from './src/components/_common/FlexibleButton/FlexibleButton';
//import ListMessage from './src/components/Main/Message/ListMessage';
//import BecomeTutor from './src/components/Main/Menu/BecomeTutor/BecomeTutor';
//import VideoIntruction from './src/components/Main/Menu/BecomeTutor/VideoIntroduction';
//import Approval from './src/components/Main/Menu/BecomeTutor/Approval';
//import LanguageModal from './src/components/_common/LanguageModal/LanguageModal';
//import TutorDetailNew from './src/components/Main/Tutor/TutorDetail/TutorDetailNew';
import ListMessage from './src/components/Main/Message/ListMessage';
//import TutorMessage from './src/components/Main/Message/TutorMessage';

//import ListCourse from './src/components/Main/Menu/Course/ListCourse/ListCourse';
 import Upcoming from './src/components/Main/Upcoming/Upcoming';

import {NavigationContainer} from '@react-navigation/native';
//import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RootNavigation from './src/navigation/RootNavigation';



// const Tab = createBottomTabNavigator(
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         if (routeName === 'Home') {
//            return <FontAwesome name={'home'} size={horizontal ? 20 : 25} color={tintColor} />;
//         } else if (routeName === 'Settings') {
//           return <Ionicons name={'settings'} size={horizontal ? 20 : 25} color={tintColor} />;
//         } else if (routeName === 'Upcoming') {
//            return <Ionicons name={'time-outline'} size={horizontal ? 20 : 25} color={tintColor} />;
//         } else if (routeName === 'Tutors') {
//           return <FontAwesome name={'group'} size={horizontal ? 20 : 25} color={tintColor} />;
//         } else {
//           return <Ionicons name={'chat-box'} size={horizontal ? 20 : 25} color={tintColor} />;
//         } 

//         // You can return any component that you like here! We usually use an
//         // icon component from react-native-vector-icons
//       },
//     }),
//     tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//     },
//   }
// );

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             // The `merge: true` option makes sure that the params inside the tab screen are preserved
//             navigation.navigate({ name: route.name, merge: true });
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

const App = () => {
  //const Tab = createMaterialTopTabNavigator();
  // const Tab = createBottomTabNavigator();

  return (
    // <TestCounter/>
    //<Menu></Menu>
    //<BecomeTutor/>
    //<VideoIntruction/>
    //<TutorDetailNew />
    //<ListMessage />
    //<TutorMessage/>

    // <ListCourseNew/>

     //<Login></Login>
        //<Register />
    <NavigationContainer>
       <RootNavigation />
    </NavigationContainer>
    

    //<Approval />
    //<LanguageModal/>
    // <Suspense
    //   fallback={
    //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //       <Text style={{fontSize: 45, color: MAIN_COLOR}}>LetTutor</Text>
    //     </View>
    //   }>
    //   <Home></Home>
    // </Suspense>
    // <ListMessage/>
    // <Profile></Profile>
    //<Setting></Setting>
    // <Suspense
    //   fallback={
    //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //       <ActivityIndicator size="large" color="#00ff00" />
    //     </View>
    //   }>
    //   <Search />
    // </Suspense>
    //<Multicheck></Multicheck>
  );
};
const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
});

export default App;

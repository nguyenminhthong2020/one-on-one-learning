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
  // useColorScheme,
  View,
} from 'react-native';
// import Login from './src/components/Authentication/Login/Login';
// import Register from './src/components/Authentication/Register/Register';
// import ForgetPassword from './src/components/Authentication/ForgetPassword/ForgetPassword';
// import NotifyForgetPassword from './src/components/Authentication/ForgetPassword/NotifyForgetPassword';
//import Home from './src/components/Main/Home/Home';
// const Home = React.lazy(() => import('./src/components/Main/Home/Home'));
import {MAIN_COLOR} from './src/globals/constant';
//import TestCounter from './src/components/_common/TestCounter/TestCounter';
//import Menu from './src/components/Main/Menu/Menu';
// import Profile from './src/components/AccountManagement/Profile/Profile';
// import Setting from './src/components/AccountManagement/Setting/Setting';
//import Search from './src/components/Main/Tutor/Search/Search';
//const Search = React.lazy(() =>import('./src/components/Main/Tutor/Search/Search'));
////import {Tag, TagActive, WelcomeButton} from './src/components/_common/FlexibleButton/FlexibleButton';
//import ListMessage from './src/components/Main/Message/ListMessage';
//import BecomeTutor from './src/components/Main/Menu/BecomeTutor/BecomeTutor';
//import VideoIntruction from './src/components/Main/Menu/BecomeTutor/VideoIntroduction';
//import Approval from './src/components/Main/Menu/BecomeTutor/Approval';
//import LanguageModal from './src/components/_common/LanguageModal/LanguageModal';
//import TutorDetailNew from './src/components/Main/Tutor/TutorDetail/TutorDetailNew';
//import ListMessage from './src/components/Main/Message/ListMessage';
import TutorMessage from './src/components/Main/Message/TutorMessage';

const App = () => {
  return (
    // <TestCounter/>
    //<Menu></Menu>
    //<BecomeTutor/>
    //<VideoIntruction/>
    //<TutorDetailNew />
    //<ListMessage />
    <TutorMessage/>
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

/* eslint-disable */
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TutorDetailNew from '../components/Main/Tutor/TutorDetail/TutorDetailNew';
import Booking from '../components/Main/Tutor/TutorDetail/Booking/Booking';
import TutorDetailComment from '../components/Main/Tutor/TutorDetail/TutorDetailComment';
import UpcomingNew from '../components/Main/Upcoming/UpcomingNew';
import Search from '../components/Main/Tutor/Search/Search';
import Setting from '../components/AccountManagement/Setting/Setting';
import Home from '../components/Main/Home/Home';
import Menu from '../components/Main/Menu/Menu';
import Profile from '../components/AccountManagement/Profile/Profile';
import ListCourseNew from '../components/Main/Menu/Courses/ListCourse/ListCourseNew';
import ListEbookNew from '../components/Main/Menu/Courses/ListCourse/ListEbookNew';
import CourseDetail from '../components/Main/Menu/Courses/CourseDetail/CourseDetail';
import Discover from '../components/Main/Menu/Courses/CourseDetail/Discover';
import DiscoverDetail from '../components/Main/Menu/Courses/CourseDetail/DiscoverDetail';
import BecomeTutor from '../components/Main/Menu/BecomeTutor/BecomeTutor';
import VideoIntroduction from '../components/Main/Menu/BecomeTutor/VideoIntroduction';
import Approval from '../components/Main/Menu/BecomeTutor/Approval';
import Schedule from '../components/Main/Menu/Schedule/Schedule';
import Favorites from '../components/Main/Menu/Favorites/Favorites';
import VideoCallNew from '../components/Main/VideoCall/VideoCallNew';
import Login from '../components/Authentication/Login/Login';
import ForgetPassword from '../components/Authentication/ForgetPassword/ForgetPassword';
import NotifyForgetPassword from '../components/Authentication/ForgetPassword/NotifyForgetPassword';
import Register from '../components/Authentication/Register/Register';
import FeedbackList from '../components/AccountManagement/Setting/FeedbackList'; // History & Feedback
import WriteReview from '../components/AccountManagement/Setting/WriteReview';
import {useSelector } from 'react-redux';
// import { useNetInfo } from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs(props) {
  const langState = useSelector(state => state.lang);
  //const netInfo = useNetInfo();
  // useEffect(
  //   ()=>{
  //     if(netInfo.isConnected == false)
  //     {
  //       dispatch(logout());
  //       props.navigation.navigate("Login");
  //       alert("No Internet !");
  //     }
  //   }
  // , [netInfo.isConnected])

  return (
    <Tab.Navigator
      //initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {height: 55},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        //   listeners={({ navigation }) => ({
        //   blur: () => navigation.setParams({ screen: undefined }),
        // })}
        options={{
          title: langState[langState.currentLang].Home,
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UpcomingNew"
        component={UpcomingNew}
        options={{
          title: langState[langState.currentLang].Schedule,
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
    <Stack.Navigator initialRouteName={check == true ? 'MainTabs' : 'Login'}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: true, title: 'Forgot password'}}
      />
      <Stack.Screen
        name="NotifyForgetPassword"
        component={NotifyForgetPassword}
        options={{headerShown: true, title: 'Forgot password'}}
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
        name="VideoCallNew"
        component={VideoCallNew}
        options={{headerShown: true, title: langState.currentLang=='en'?'Lesson Room':'Ph??ng h???c'}}
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
        name="Booking"
        component={Booking}
        options={{headerShown: true, title: langState.currentLang=='en'?'Schedule & Booking':'Th???i kh??a bi???u & ?????t l???ch'}}
      />
      <Stack.Screen
        name="TutorDetailComment"
        component={TutorDetailComment}
        options={{headerShown: true, title: langState.currentLang=='en'? 'Rating and Comment':'B??nh lu???n & ????nh gi??'}}
      />
      <Stack.Screen
        name="ListCourseNew"
        component={ListCourseNew}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListEbookNew"
        component={ListEbookNew}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{headerShown: true, title: langState.currentLang=='en'?"Discover":"Kh??m ph??"
        }}
      />
      <Stack.Screen
        name="DiscoverDetail"
        component={DiscoverDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: true,
          title: langState[langState.currentLang].Schedule,
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: true,
          title: langState[langState.currentLang].Favorite,
        }}
      />
      <Stack.Screen
        name="BecomeTutor"
        component={BecomeTutor}
        options={{
          headerShown: true,
          title: langState[langState.currentLang].Become_a_tutor,
        }}
      />
      <Stack.Screen
        name="VideoIntroduction"
        component={VideoIntroduction}
        options={{headerShown: true, title: langState.currentLang=='en'?'Video Introduction':'Video gi???i thi???u'}}
      />
      <Stack.Screen
        name="Approval"
        component={Approval}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FeedbackList"
        component={FeedbackList}
        options={{
          headerShown: true,
          title: langState.currentLang=='en'?'History & Feedback':'Xem l???ch s??? & Ph???n h???i'//langState[langState.currentLang].FeedbackList,
        }}
      />
      <Stack.Screen
        name="WriteReview"
        component={WriteReview}
        options={{
          headerShown: true,
          title: langState.currentLang=='en'?'Feedback Tutor':'Ph???n h???i gi??o vi??n'//langState[langState.currentLang].FeedbackList,
        }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;

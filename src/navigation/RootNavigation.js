/* eslint-disable */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootNavigation(props){
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown: false}}/>
            <Stack.Screen name="Menu" component={Menu} options={{headerShown: true}}/>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name="TutorDetailNew" component={TutorDetailNew} options={{headerShown: false}}/>
            <Stack.Screen name="ListCourse" component={ListCourse} options={{headerShown: false}}/>
            <Stack.Screen name="CourseDetail" component={CourseDetail} options={{headerShown: false}}/>
            <Stack.Screen name="Schedule" component={Schedule} options={{headerShown: true}}/>
        </Stack.Navigator>
    )
}

export default RootNavigation;
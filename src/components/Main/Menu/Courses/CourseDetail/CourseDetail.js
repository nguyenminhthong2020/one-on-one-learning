/* eslint-disable */
import React, {useState} from 'react';
import {
  Text,
  View,
  //TextInput,
  //StyleSheet,
  //TouchableOpacity,
  //FlatList,
  ScrollView,
  Pressable,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {MAIN_COLOR} from '../../../../../globals/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const arrayTopic = [
  {
    id: 0,
    title: 'Foods You Love'
  },
  {
    id: 1,
    title: 'Foods You Love'
  },
  {
    id: 2,
    title: 'Foods You Love'
  },
  {
    id: 3,
    title: 'Foods You Love'
  },{
    id: 4,
    title: 'Foods You Love'
  },{
    id: 5,
    title: 'Foods You Love'
  },{
    id: 6,
    title: 'Foods You Love'
  },{
    id: 7,
    title: 'Foods You Love'
  },{
    id: 8,
    title: 'Foods You Love'
  },{
    id: 9,
    title: 'Foods You Love'
  }
]
const CourseDetail = props => (
  <ScrollView>
  <View style={{margin: 5, borderRadius: 15}}>
    {/* <Text style={{fontSize: 20}}>{props.title}</Text> */}
    <View
      style={{
        backgroundColor: 'white',
        //   marginHorizontal: 5,
        //   marginVertical: 5,
        //padding: 5,
        margin: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      
        <FastImage
          style={{width: '80%', height: 160, left: '10%'}}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: 'https://camblycurriculumicons.s3.amazonaws.com/5e2b895e541a832674533c18?h=d41d8cd98f00b204e9800998ecf8427e',
            priority: FastImage.priority.normal,
          }}
        />
     

      <View style={{padding: 15}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {'Basic Conversation Topics'}
        </Text>
        <Text style={{fontSize: 15, marginTop: 8, marginBottom: 0}}>
          Gain confidence speaking about familiar topics
        </Text>
        <Pressable 
           onPress={()=>alert("Discover")}
           style={{backgroundColor: MAIN_COLOR, paddingVertical: 6, marginTop: 12, borderRadius: 12}}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>
            Discover
          </Text>
        </Pressable>
      </View>
    </View>


    <View style={{marginHorizontal: 10, marginBottom: 15, marginTop: 15}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Overview
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AntDesign
          name={'questioncircleo'}
          size={18}
          color={'rgb(199, 83, 64)'}
          // style={{
          //   textAlign: 'right',
          //   marginBottom: -50,
          //   marginRight: 10,
          // }}
        />
        <View style={{ marginBottom: 5}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}> Why take this course</Text>
        </View>
      </View>
      <Text style={{marginBottom: 12, fontSize: 16}}>
        It can be intimidating to speak with a foreigner, no matter how much
        grammar and vocabulary you've mastered. If you have basic knowledge of
        English but have not spent much time speaking, this course will help you
        ease into your first English conversations.
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AntDesign
          name={'questioncircleo'}
          size={18}
          color={'rgb(199, 83, 64)'}
          // style={{
          //   textAlign: 'right',
          //   marginBottom: -50,
          //   marginRight: 10,
          // }}
        />
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5}}> What will you be able to do</Text>
        </View> 
      </View>
      <Text style={{marginBottom: 16, fontSize: 16}}>
        This course covers vocabulary at the CEFR A2 level. You will build
        confidence while learning to speak about a variety of common, everyday
        topics. In addition, you will build implicit grammar knowledge as your
        tutor models correct answers and corrects your mistakes.
      </Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        Experience Level
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 16}}>
          <Ionicons
            name={'people'}
            size={15}
            color={MAIN_COLOR}
            // style={{
            //   textAlign: 'right',
            //   marginBottom: -50,
            //   marginRight: 10,
            // }}
          />
        
        <View>
          <Text style={{fontSize: 16}}> Beginner</Text>
        </View>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
      Course Length
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 16}}>
        
          <AntDesign
            name={'book'}
            size={15}
            color={MAIN_COLOR}
            // style={{
            //   textAlign: 'right',
            //   marginBottom: -50,
            //   marginRight: 10,
            // }}
          />
        
        
        <View>
          <Text style={{fontSize: 16}}> 10 Topics</Text>
        </View>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
      List Topics
      </Text>
      <View>
         {
           arrayTopic.map((topic, index) => <View key={index} style={{marginBottom: 2,}}><Text style={{fontSize: 16}}>{index + 1}. {topic.title}</Text></View>)
         }
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop: 16}}>
      Suggested Tutors
      </Text>
      <Text style={{fontSize: 16}}>Michelle Barredo</Text>
    </View>
  </View>
  </ScrollView>
);

// const CourseDetail = () => {
//   return (
//     <View>
//       <Item />
//     </View>
//   );
// };

//const styles = StyleSheet.create({});

export default CourseDetail;

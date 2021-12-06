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
            uri: props.route.params.item.imageUrl,
            priority: FastImage.priority.normal,
          }}
        />
     

      <View style={{padding: 15}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {props.route.params.item.name}
        </Text>
        <Text style={{fontSize: 15, marginTop: 8, marginBottom: 0}}>
          {props.route.params.item.description}
        </Text>
        <Pressable 
           onPress={()=>props.navigation.navigate('Discover', {item: props.route.params.item})}
           style={{backgroundColor: MAIN_COLOR, paddingVertical: 8, marginTop: 12, borderRadius: 12}}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
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
        {props.route.params.item.reason}
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
        {props.route.params.item.purpose}
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
          <Text style={{fontSize: 16}}> {props.route.params.item.level1}</Text>
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
          <Text style={{fontSize: 16}}> {props.route.params.item.topics.length} Topics</Text>
        </View>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
      List Topics
      </Text>
      <View style={{marginBottom: 10}}>
         {
          props.route.params.item.topics.map((topic, index) => <View key={index} style={{marginBottom: 2,}}><Text style={{fontSize: 16}}>{index + 1}. {topic.name}</Text></View>)
         }
      </View>
      {/* <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop: 16}}>
      Suggested Tutors
      </Text>
      <Text style={{fontSize: 16}}>Michelle Barredo</Text> */}
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

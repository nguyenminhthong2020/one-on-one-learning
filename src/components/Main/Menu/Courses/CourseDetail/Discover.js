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
import { useSelector } from 'react-redux';

const Discover = props => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const langState = useSelector(state => state.lang);
  return (
  <ScrollView>
  <View style={{margin: 5, borderRadius: 15}}>
    {/* <Text style={{fontSize: 20}}>{props.title}</Text> */}
    <View
      style={{
        backgroundColor: 'white',
        //   marginHorizontal: 5,
        //   marginVertical: 5,
        //padding: 5,
        marginHorizontal: 10,
        marginBottom: 10,
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
      </View>
    </View>


    <View style={{marginHorizontal: 10, marginBottom: 15, marginTop: 15}}>

      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
      List Topics ({props.route.params.item.topics.length})
      </Text>
      <View style={{marginBottom: 10}}>
         {
          props.route.params.item.topics.map((topic, index) => 
          <View key={index} style={{marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 16, color: isDarkTheme?'white':'black'}}>{index + 1}. {topic.name}</Text>
          <Pressable 
          onPress={()=>props.navigation.navigate('DiscoverDetail', {topic: topic})}
          style={{marginRight: 10, backgroundColor: MAIN_COLOR, borderRadius: 5, paddingHorizontal:10, paddingVertical:1}}>
              <Text style={{textAlign: 'center', color: 'white'}}>{langState.currentLang=='en'?'See':'Xem'}</Text>
          </Pressable>
          </View>)
         }
      </View>
    </View>
  </View>
  </ScrollView>
);
}

// const CourseDetail = () => {
//   return (
//     <View>
//       <Item />
//     </View>
//   );
// };

//const styles = StyleSheet.create({});

export default Discover;

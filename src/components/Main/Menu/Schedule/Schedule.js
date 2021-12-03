/* eslint-disable */
import React, {useState, Suspense} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  //TextInput,
  StyleSheet,
  Pressable,
  //FlatList,
  //ScrollView,
} from 'react-native';

// import {useForm, Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';


const Schedule = () => {
  const arrComingClass = [
    {
      id: 0,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      date: '2021-10-25',
      startTime: '20:30',
      endTime: '20:55',
    },
    {
      id: 1,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      date: '2021-10-29',
      startTime: '20:30',
      endTime: '20:55',
    },
    {
      id: 3,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      date: '2021-10-30',
      startTime: '20:30',
      endTime: '20:55',
    },
  ];

  // page=1 ==> 0 & 1 trong list
  // page=2 ==> 1 & 2
  // page=3 ==> 3 & 4
  // page=4 ==> 5 & 6
  // page=n ==> 2*n-2, 2n-1
  // const [page, setPage] = useState({array: [arrComingClass[0], arrComingClass[1]], index: 1});
  
  // // const onPressNext = () => {
     
  // //    setPage({index: page.index + 1, array: [arrComingClass[2*page.index -1], arrComingClass[2*page +1]]});
  // // }
  // // const onPressPrev = () => {
  // // }
 
  const langState = useSelector(state => state.lang);
  return (
    <View>
      <View>
        <View style={{marginHorizontal: 10}}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              marginTop: 10,
              marginBottom: 5,
            }}>
            Here is a list of the sessions you have booked You can track when
            the meeting starts, join the meeting with one click or can cancel
            the meeting before 2 hours
          </Text>
        </View>
        {arrComingClass.length > 0 ? arrComingClass.map((classComing, i) => (
          <View style={styles.container} key={i}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <FastImage
                  style={{width: 50, height: 50, borderRadius: 25}}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: classComing.uri,
                    priority: FastImage.priority.normal,
                  }}
                />
              </View>
              <View>
                <View style={{margin: 5}}>
                  <Text style={{fontSize: 17, color: 'black'}}>
                    {classComing.name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginHorizontal: 5}}>
                    <Text>{classComing.date}</Text>
                  </View>
                  <View style={{marginLeft: 4}}>
                    <Text style={{color: MAIN_COLOR}}>
                      {classComing.startTime}
                    </Text>
                  </View>
                  <View>
                    <Text> - </Text>
                  </View>
                  <View>
                    <Text style={{color: 'red'}}>{classComing.endTime}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-around',
              }}>
              <Pressable style={{width: '48%'}}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'orange',
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 18}}>
                    {langState[langState.currentLang].Cancel}
                  </Text>
                </View>
              </Pressable>
              {/* <View style={{width: '4%'}}></View> */}
              <Pressable style={{width: '48%'}}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: MAIN_COLOR,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 18}}>
                    {langState[langState.currentLang].Go_to_meeting}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        )): (
          <View><Text>There is no lesson schedule yet!</Text></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal:20,
    marginTop: 10,
    borderWidth:1,
    backgroundColor: 'white',
    paddingHorizontal:5,
    paddingBottom:1
  },
});

export default Schedule;

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

const History = () => {
  const arrHistoryClass = [
    {
      id: 0,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      date: '2021-10-27',
      startTime: '20:30',
      endTime: '20:55',
    },
    {
      id: 1,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      date: '2021-10-28',
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

  return (
    <View>
      <View style={{marginHorizontal: 10}}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            marginTop: 10,
            marginBottom: 5,
          }}>
          The following is a list of lessons you have attended You can review
          the details of the lessons you have attended
        </Text>
      </View>
      {arrHistoryClass.map((arrHistoryClass, index) => (
        <View style={styles.container} key={index}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <FastImage
                style={{width: 50, height: 50, borderRadius: 25}}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: arrHistoryClass.uri,
                  priority: FastImage.priority.normal,
                }}
              />
            </View>
            <View>
              <View style={{margin: 5}}>
                <Text style={{fontSize: 17, color: 'black'}}>
                  {arrHistoryClass.name}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginHorizontal: 5}}>
                  <Text>{arrHistoryClass.date}</Text>
                </View>
                <View style={{marginLeft: 4}}>
                  <Text style={{color: MAIN_COLOR}}>
                    {arrHistoryClass.startTime}
                  </Text>
                </View>
                <View>
                  <Text> - </Text>
                </View>
                <View>
                  <Text style={{color: 'red'}}>{arrHistoryClass.endTime}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginHorizontal:20,
    marginTop: 5,
    borderWidth:1,
    backgroundColor: 'white',
    paddingHorizontal:5,
    paddingBottom:1
  },
});

export default History;
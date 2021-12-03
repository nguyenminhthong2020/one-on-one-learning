/* eslint-disable */
import React, {useState, Suspense} from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  //ScrollView,
} from 'react-native';
//import {SearchBar} from 'react-native-elements';
// import {useForm, Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

const Upcoming = () => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme)
  const langState = useSelector(state => state.lang);

  const upcomingClass = {
    id: 0,
    name: 'April Corpuz',
    uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <FastImage
            style={{width: 50, height: 50, borderRadius: 25}}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
              priority: FastImage.priority.normal,
            }}
          />
        </View>
        <View>
          <View style={{margin: 5}}>
            <Text style={{fontSize: 17, color: isDarkTheme? 'yellow': 'black'}}>April Corpuz</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginHorizontal: 5}}>
              <Text style={{color: isDarkTheme? 'white': 'gray'}}>2021-10-11</Text>
            </View>
            <View style={{marginLeft: 4}}>
              <Text style={{color: MAIN_COLOR}}>20:30</Text>
            </View>
            <View>
              <Text> - </Text>
            </View>
            <View>
              <Text style={{color: 'red'}}>20:55</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
        <TouchableOpacity style={{width: '48%'}}>
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              paddingVertical: 12,
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <Text style={{color: 'black', textAlign: 'center', fontSize: 18}}>
            {langState[langState.currentLang].Cancel}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <View style={{width: '4%'}}></View> */}
        <TouchableOpacity style={{width: '48%'}}>
        <View
          style={{
            width: '100%',
            backgroundColor: MAIN_COLOR,
            paddingVertical: 12,
            borderWidth: 1,
            borderRadius: 5,
          }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
            {langState[langState.currentLang].Go_to_meeting}
            </Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
});

export default Upcoming;

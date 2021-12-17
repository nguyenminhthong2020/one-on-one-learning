/* eslint-disable */
import React, {useState, Suspense, useEffect} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  //TextInput,
  StyleSheet,
  Pressable,
  //FlatList,
  ScrollView,
} from 'react-native';

// import {useForm, Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';

const HistoryItem = (props) => {
    const arrHistoryClass = props.arrHistoryClass;
    return (
        <View style={styles.container}>
              <View>
                <FastImage
                  style={{width: 30, height: 30, borderRadius: 15}}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: arrHistoryClass.scheduleDetailInfo.scheduleInfo
                      .tutorInfo.avatar,
                    priority: FastImage.priority.normal,
                  }}
                />
              </View>
              <View>
                <View style={{margin: 5}}>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {
                      arrHistoryClass.scheduleDetailInfo.scheduleInfo.tutorInfo
                        .name
                    }
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginHorizontal: 5}}>
                    <Text>
                      {arrHistoryClass.scheduleDetailInfo.scheduleInfo.date}
                    </Text>
                  </View>
                  <View style={{marginLeft: 4}}>
                    <Text style={{color: MAIN_COLOR}}>
                      {
                        (new Date(arrHistoryClass.scheduleDetailInfo.scheduleInfo
                          .startTimestamp)).toLocaleTimeString().substring(0, 5)
                      }
                    </Text>
                  </View>
                  <View>
                    <Text> - </Text>
                  </View>
                  <View>
                    <Text style={{color: 'red'}}>
                    {
                        (new Date(arrHistoryClass.scheduleDetailInfo.scheduleInfo
                          .endTimestamp)).toLocaleTimeString().substring(0, 5)
                      }
                    </Text>
                  </View>
                </View>
              </View>
          </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', 
      alignItems: 'center',
      margin: 2,
      //marginHorizontal: 20,
      marginLeft: '10%',
      width: '80%',
      marginTop: 5,
      borderWidth: 1,
      backgroundColor: 'white',
      paddingHorizontal: 5,
      paddingBottom: 1,
    },
  });

  export default HistoryItem;
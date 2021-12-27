/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

import {useSelector} from 'react-redux';
import axios from 'axios';

const HeadContent = props => {
  const langState = useSelector(state => state.lang);
  const current = useSelector(state => state.auth.current);
  const axiosInstance1 = axios.create({
    baseURL: 'https://api.app.lettutor.com/',
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });

  const [dataHeader, setDataHeader] = useState({
    total: 0,
    date: '',
    startTime: '',
    endTime: '',
  })
  
  useEffect(() => {
      axiosInstance1
      .get(`call/total`)
      .then(res => {
        (async () => {
          try{
          const dateTimeLte = new Date().getTime();
          const res1 = await axiosInstance1.get(`booking/next?dateTime=${dateTimeLte}`);
          if (res1.data.data.length > 0) {
            const newArray = res1.data.data.sort((x, y) => (x.scheduleDetailInfo.scheduleInfo.startTimestamp - y.scheduleDetailInfo.scheduleInfo.startTimestamp))
            setDataHeader({
              total: res.data.total,
              date: newArray[0].scheduleDetailInfo.scheduleInfo.date,
              startTime: (new Date(newArray[0].scheduleDetailInfo.scheduleInfo
                .startTimestamp)).toLocaleTimeString().substring(0, 5),
              endTime: (new Date(newArray[0].scheduleDetailInfo.scheduleInfo
                .endTimestamp)).toLocaleTimeString().substring(0, 5),
            })
          }else{
            setDataHeader({
              ...dataHeader,
              total: res.data.total,
              date: "",
              startTime: "",
              endTime: ""
            })
          }
        }catch(err){
          console.log('Error: \n' + err.response.data.message);
        }
        })();
      })
      .catch(err => {
        alert('Error: \n' + err.response.data.message);
      }
    , []);
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      axiosInstance1
      .get(`call/total`)
      .then(res => {
        (async () => {
          try{
          const dateTimeLte = new Date().getTime();
          const res1 = await axiosInstance1.get(`booking/next?dateTime=${dateTimeLte}`);
          if (res1.data.data.length > 0) {
            const newArray = res1.data.data.sort((x, y) => (x.scheduleDetailInfo.scheduleInfo.startTimestamp - y.scheduleDetailInfo.scheduleInfo.startTimestamp))
            setDataHeader({
              total: res.data.total,
              date: newArray[0].scheduleDetailInfo.scheduleInfo.date,
              startTime: (new Date(newArray[0].scheduleDetailInfo.scheduleInfo
                .startTimestamp)).toLocaleTimeString().substring(0, 5),
              endTime: (new Date(newArray[0].scheduleDetailInfo.scheduleInfo
                .endTimestamp)).toLocaleTimeString().substring(0, 5),
            })
          }else{
            setDataHeader({
              ...dataHeader,
              total: res.data.total,
              date: "",
              startTime: "",
              endTime: ""
            })
          }
        }catch(err){
          console.log('Error: \n' + err.response.data.message);
        }
        })();
      })
      .catch(err => {
        alert('Error: \n' + err.response.data.message);
      });
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={styles.headContent}>
      <View style={{marginBottom: 10, marginTop: 10}}>
        {langState.currentLang == 'en' ? (
          <Text style={{fontSize: 18, color: 'white'}}>
            Total lesson time is {Math.floor(dataHeader.total / 60)} hours {dataHeader.total % 60}{' '}
            minutes
          </Text>
        ) : (
          <Text style={{fontSize: 18, color: 'white'}}>
            Tổng thời gian học là {Math.floor(dataHeader.total / 60)} giờ {dataHeader.total % 60} phút
          </Text>
        )}
      </View>
      {dataHeader.date != '' ? (
        <>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 17, color: 'white'}}>
              {langState[langState.currentLang].Upcoming_Lesson}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 17, color: 'white'}}>
              {new Date(dataHeader.date).toUTCString().substring(0, 16)}{' '}
              {dataHeader.startTime} - {dataHeader.endTime}
            </Text>
          </View>
        </>
      ) : (
        <View style={{marginBottom: 34, marginTop: 20}}>
          <Text style={{fontSize: 17, color: 'white'}}>
            {langState[langState.currentLang].No_Upcoming_Lesson}
          </Text>
        </View>
      )}
      {dataHeader.date != '' && (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 8,
            marginBottom: 25,
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor: 'white',
          }}>
          <Pressable onPress={() => props.navigation.navigate('VideoCall')}>
            <Text style={{fontSize: 16, color: MAIN_COLOR}}>
              {langState[langState.currentLang].Enter_lesson_room}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headContent: {
    backgroundColor: 'rgb(12, 61, 223)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeadContent;

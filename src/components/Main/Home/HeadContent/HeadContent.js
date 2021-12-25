/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';
import {useSelector} from 'react-redux';
// import {totalApi} from '../../../../api/home/totalApi';
import axios from 'axios';
import {nextApi} from '../../../../api/home/nextApi';

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

  // const [total, setTotal] = useState(0); //total: minute
  // const [next, setNext] = useState({
  //   date: '',
  //   startTime: '',
  //   endTime: '',
  // });
  const [dataHeader, setDataHeader] = useState({
    total: 0,
    //next
    date: '',
    startTime: '',
    endTime: '',
  })

  useEffect(() => {
    axiosInstance1
      .get(`call/total`)
      .then(res => {
        // setTotal(res.data.total);
        (async () => {
          const res1 = await nextApi.getNext({dateTime: 1});
          if (res1.data.length > 0) {
            //console.log(res1.data[0].scheduleDetailInfo.scheduleInfo)
            //console.log(new Date(res1.data[0].scheduleDetailInfo.scheduleInfo.date).toUTCString().substring(0, 16))
            //setNext(res1.data[0].scheduleDetailInfo.scheduleInfo);
            setDataHeader({
              total: res.data.total,
              date: res1.data[0].scheduleDetailInfo.scheduleInfo.date,
              startTime: res1.data[0].scheduleDetailInfo.scheduleInfo.startTime,
              endTime: res1.data[0].scheduleDetailInfo.scheduleInfo.endTime,
            })
          }else{
            setDataHeader({
              ...dataHeader,
              total: res.data.total
            })
          }
        })();
      })
      .catch(err => {
        alert('Error: \n' + err.response.data.message);
      });
  }, []);

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

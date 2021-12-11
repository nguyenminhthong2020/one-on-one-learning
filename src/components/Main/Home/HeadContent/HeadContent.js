/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {Text, View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';
import { useSelector} from 'react-redux';
import { totalApi } from '../../../../api/home/totalApi';
import { nextApi } from '../../../../api/home/nextApi';

const HeadContent = props => {
  const langState = useSelector(state => state.lang);
  const [total, setTotal] = useState(0); //total: minute
  const [next, setNext] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(()=>{
    (
      async () => {
        const res = await totalApi.getTotal({});
        const res1 = await nextApi.getNext({dateTime: 1});
        if(res1.data.length > 0){
          //console.log(res1.data[0].scheduleDetailInfo.scheduleInfo)
          //console.log(new Date(res1.data[0].scheduleDetailInfo.scheduleInfo.date).toUTCString().substring(0, 16))
          setNext(res1.data[0].scheduleDetailInfo.scheduleInfo)
        }
        setTotal(res.total);
      }
    )()
  }, []);

  return (
    <View style={styles.headContent}>
      <View style={{marginBottom: 10, marginTop: 10}}>
        {
          langState.currentLang == "en" ?
          <Text style={{fontSize: 18, color: 'white'}}>
          Total lesson time is {Math.floor(total / 60)} hours {total % 60} minutes
        </Text> : 
        <Text style={{fontSize: 18, color: 'white'}}>
        Tổng thời gian học là {Math.floor(total / 60)} giờ {total % 60} phút
        </Text>
        }
      </View>
      {next.date != "" ? (<>
      <View style={{marginBottom: 10}}>
        <Text style={{fontSize: 17, color: 'white'}}>
          {langState[langState.currentLang].Upcoming_Lesson}
        </Text>
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={{fontSize: 17, color: 'white'}}>
          {new Date(next.date).toUTCString().substring(0, 16)}  {next.startTime} - {next.endTime}
        </Text>
      </View>
      </>): (
        <View style={{marginBottom: 34, marginTop: 20}}>
        <Text style={{fontSize: 17, color: 'white'}}>
          {langState[langState.currentLang].No_Upcoming_Lesson}
        </Text>
      </View>
      )
      }
      {next.date != "" && <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 8,
          marginBottom: 25,
          borderRadius: 20,
          borderWidth: 1,
          backgroundColor: 'white',
        }}>
        <Pressable onPress={()=>props.navigation.navigate("VideoCall")}>
          <Text style={{fontSize: 16, color: MAIN_COLOR}}>
          {langState[langState.currentLang].Enter_lesson_room}
          </Text>
        </Pressable>
      </View>}
    </View>
  ) 
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

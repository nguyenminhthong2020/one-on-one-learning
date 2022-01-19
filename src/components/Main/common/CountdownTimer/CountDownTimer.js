/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const CountdownTimer = props => {
  let countDownDate = new Date(props.timeStart).getTime(); 
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)); 
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const [time, setTime] = useState({hours, minutes, seconds, days});
  const [isShow, setIsShow] = useState(true);
  const langState = useSelector(state => state.lang);

  useEffect(() => {
    let startTimer = setInterval(function () {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0) {
          return setIsShow(false);
        }
        setTime({hours, minutes, seconds, days});
      }, 1000);

    return () => clearInterval(startTimer);
  }, []);

  return isShow ? (
    <View style={{height: '100%', paddingVertical: 5, paddingHorizontal: 5, backgroundColor: 'gray', marginHorizontal: 0, borderRadius: 5}}>
      <Text style={{color: 'white', fontSize: 17, textAlign: 'center'}}>{langState.currentLang=='en'?'Lesson will be started after':'Buổi học sẽ bắt đầu sau'}</Text>
      <Text style={{marginTop: 4, color: 'white', fontSize: 19, fontWeight: 'bold', textAlign: 'center'}}>{time.days < 10 && '0'}{time.days} : {time.hours < 10 && '0'}{time.hours} : {time.minutes < 10 && '0'}{time.minutes} : {time.seconds < 10 && '0'}{time.seconds}</Text>
      <Text style={{marginTop: 4, color: 'white', 
      fontSize: 19, fontWeight: 'bold', 
      textAlign: 'center'}}>(d : h : m : s)</Text>
    </View>
  ) : (
    <></>
  );
};

export default CountdownTimer;

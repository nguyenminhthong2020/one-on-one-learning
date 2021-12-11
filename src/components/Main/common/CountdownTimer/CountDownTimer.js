/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
//import {MAIN_COLOR} from '../../../globals/constant';

const CountdownTimer = props => {
  let countDownDate = new Date(props.timeStart).getTime(); // thay string = props.timeStart;
  let now = new Date().getTime();
  let distance = countDownDate - now;
  // Time calculations for hours, minutes and seconds
  let days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)); 
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const [time, setTime] = useState({hours, minutes, seconds, days});
  const [isShow, setIsShow] = useState(true);

  

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
          //clearInterval(x);
          return setIsShow(false);
        }
        setTime({hours, minutes, seconds, days});
      }, 1000);

    return () => clearInterval(startTimer);//setIsShow(false);
  }, []);

  return isShow ? (
    <View style={{height: '100%', padding: 0, backgroundColor: 'gray', marginHorizontal: 0, /*marginTop: '50%'*/}}>
      <Text style={{color: 'white', fontSize: 17, textAlign: 'center'}}>Lessons will be started after</Text>
      <Text style={{marginTop: 4, color: 'white', fontSize: 19, fontWeight: 'bold', textAlign: 'center'}}>{time.days < 10 && '0'}{time.days} : {time.hours < 10 && '0'}{time.hours} : {time.minutes < 10 && '0'}{time.minutes} : {time.seconds < 10 && '0'}{time.seconds}</Text>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({});
export default CountdownTimer;

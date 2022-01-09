/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const CountUpTimer = props => {
  const [dem, setDem] = useState(0);
  let now = new Date().getTime();
  let distance = now - props.timeStart;
  let hours1 = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  let minutes1 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds1 = Math.floor((distance % (1000 * 60)) / 1000);

  const [time, setTime] = useState({
    hours: distance >= 0 ? hours1 : 0,
    minutes: distance >= 0 ? minutes1 : 0,
    seconds: distance >= 0 ? seconds1 : 0,
    isShow: false,
  });
  const langState = useSelector(state => state.lang);

  useEffect(() => {
    let startTimer = setInterval(function () {
      if (distance >= 0) {
        let _hours = time.hours;
        let _minutes = time.minutes;
        let _seconds = time.seconds + 1;
        if (_seconds == 60) {
          _minutes = _minutes + 1;
          _seconds = 0;
        }
        if (_minutes == 60) {
          _hours = _hours + 1;
          _minutes = 0;
        }
        setTime({hours: _hours, minutes: _minutes, seconds: _seconds, isShow: true});
      }
      setDem(dem + 1);
    }, 1000);

    return () => clearInterval(startTimer);
  });

  return (
    <View
      style={{
        opacity: time.isShow == true ? 0.5 : 0,
        height: '100%',
        paddingVertical: 0,
        paddingHorizontal: 5,
        backgroundColor: 'gray',
        marginHorizontal: 0,
      }}>
      <Text style={{color: 'yellow', fontSize: 16, textAlign: 'center'}}>
        {langState.currentLang == 'en'
          ? 'The lesson has started for'
          : 'Buổi học đã bắt đầu được'}
      </Text>
      <Text
        style={{
          marginTop: 4,
          color: 'yellow',
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {time.hours < 10 && '0'}
        {time.hours} : {time.minutes < 10 && '0'}
        {time.minutes} : {time.seconds < 10 && '0'}
        {time.seconds}
      </Text>
    </View>
  );
};

export default CountUpTimer;

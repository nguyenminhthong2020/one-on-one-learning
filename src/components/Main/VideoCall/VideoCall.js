/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// /* eslint-disable */

import React, {useEffect, useState} from 'react';
import {View, Dimensions, Pressable, Text} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import CountdownTimer from '../common/CountdownTimer/CountDownTimer';
// import {MAIN_COLOR} from '../../../globals/constant';

let windowHeight = Dimensions.get('window').height;

function VideoCall(props) {
  useEffect(() => {
    const url = 'https://meet.jit.si/songokuminhthong';
    const userInfo = {
      displayName: 'Thong9021',
      email: 'testthu9021@gmail.com',
      // avatar: 'https:/gravatar.com/avatar/abc123',
      avatar:
        'https://i.pinimg.com/170x/d6/13/72/d6137245169ab62c45b5879ddd41d36d.jpg',
      //avatar: 'https://gamek.mediacdn.vn/zoom/220_160/133514250583805952/2021/6/26/avata-16246861354471549893846.jpg',
    };
    JitsiMeet.call(url, userInfo);
    // return () => {
    //   JitsiMeet.endCall();
    // };
  }, []);

  useEffect(() => {
    return () => {
      console.log('end call nè');
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('Meeting Ended');
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log('Meeting Joined');
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('Meeting Before Join');
  }
  return (
    <View
    // style={{
    //   flex: 1,
    //   height: '100%',
    //   width: '100%',
    //   backgroundColor: 'black',
    // }}
    >
      <View
        style={{
          height: 60,
          position: 'absolute',
          marginTop: 120,
          alignSelf: 'center',
          elevation: 100,
        }}>
        {/* <CountdownTimer
          timeStart={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
        /> */}
        {new Date().getTime() <
          props.route.params.arrScheduleClass.scheduleDetailInfo.scheduleInfo
            .startTimestamp && (
          <CountdownTimer
            timeStart={
              new Date(
                props.route.params.arrScheduleClass.scheduleDetailInfo.scheduleInfo.startTimestamp,
              )
            }
          />
        )}
      </View>
      <JitsiMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={e => onConferenceJoined(e)}
        onConferenceWillJoin={e => onConferenceWillJoin(e)}
        style={{
          //flex: 1,
          height: windowHeight,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    </View>
  );
}
export default VideoCall;

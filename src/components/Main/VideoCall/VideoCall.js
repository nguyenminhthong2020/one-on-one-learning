/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {MAIN_COLOR} from '../../../globals/constant';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import CountdownTimer from '../common/CountdownTimer/CountDownTimer';

const VideoCall = () => {
  const onConferenceTerminated = nativeEvent => {
    /* Conference terminated event */
  };

  const onConferenceJoined = nativeEvent => {
    /* Conference joined event */
  };

  const onConferenceWillJoin = nativeEvent => {
    /* Conference will join event */
  };

  useEffect(() => {
    setTimeout(() => {
      const url = 'https://meet.jit.si/deneme'; // can also be only room name and will connect to jitsi meet servers
      const userInfo = {
        displayName: '1612674',
        email: '1612674@student.hcmus.edu.vn',
        avatar:  'https://th.bing.com/th/id/R.0aa3d7e5c150577d194a65b38c66fd5a?rik=qOPqTbbeGzOjvw&riu=http%3a%2f%2fimages.khinsider.com%2fGraphics%2f100x100%2fniccy+xion+1.png&ehk=v1ONxdni77KcK0yE9omBXJ3Y%2bcZLeUMHXpC8e09E97E%3d&risl=&pid=ImgRaw&r=0',//'https:/gravatar.com/avatar/abc123',
      };
      JitsiMeet.call(url, userInfo);
      /* You can also use JitsiMeet.audioCall(url) for audio only call */
      /* You can programmatically end the call with JitsiMeet.endCall() */
    }, 1000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        marginBottom: 60,
        //marginTop: 0,
      }}>
      {/* <View style={{height: '80%', width: '100%'}}> */}
        <JitsiMeetView
          onConferenceTerminated={onConferenceTerminated}
          onConferenceJoined={onConferenceJoined}
          onConferenceWillJoin={onConferenceWillJoin}
          //style={{}}
        />
      {/* </View> */}
      <View style={{marginTop: '25%'}}><CountdownTimer timeStart={'Oct 20, 2021 20:30:00'} /></View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default VideoCall;

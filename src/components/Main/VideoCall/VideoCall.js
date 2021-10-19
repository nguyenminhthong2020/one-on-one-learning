/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// /* eslint-disable */
// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet, Text} from 'react-native';
// import {MAIN_COLOR} from '../../../globals/constant';
// import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
// import CountdownTimer from '../common/CountdownTimer/CountDownTimer';

// const VideoCall = (props) => {
//   const onConferenceTerminated = nativeEvent => {
//     /* Conference terminated event */
//   };

//   const onConferenceJoined = nativeEvent => {
//     /* Conference joined event */
//   };

//   const onConferenceWillJoin = nativeEvent => {
//     /* Conference will join event */
//   };

//   useEffect(() => {
//     //setTimeout(() => {
//       const url = 'https://meet.jit.si/deneme'; // can also be only room name and will connect to jitsi meet servers
//       const userInfo = {
//         displayName: '1612674',
//         email: '1612674@student.hcmus.edu.vn',
//         avatar:  'https:/gravatar.com/avatar/abc123',
//       };
//       JitsiMeet.call(url, userInfo);
//       /* You can also use JitsiMeet.audioCall(url) for audio only call */
//       /* You can programmatically end the call with JitsiMeet.endCall() */
//     //}, 1000);
//   }, []);

//   return (
//     <View
//       style={{
//         backgroundColor: 'black',
//         flex: 1,
//         //marginTop: 0,
//       }}>
//       {/* <View style={{height: '80%', width: '100%'}}> */}
//       <View style={{marginTop: '25%'}}><CountdownTimer timeStart={'Oct 20, 2021 20:30:00'} /></View>
//         <JitsiMeetView
//           onConferenceTerminated={onConferenceTerminated}
//           onConferenceJoined={onConferenceJoined}
//           onConferenceWillJoin={onConferenceWillJoin}
//           //style={{}}
//         />
//       {/* </View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({});
// export default VideoCall;

import React, {useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import CountdownTimer from '../common/CountdownTimer/CountDownTimer';

let windowHeight = Dimensions.get('window').height;

function VideoCall() {
  useEffect(() => {
    setTimeout(() => {
      const url = 'https://meet.jit.si/CompetentStoragesAdhereMagnificently'; //tulis url meeting disini
      const userInfo = {
        displayName: 'Thong9021',
        email: 'testthu9021@gmail.com',
        avatar: 'https:/gravatar.com/avatar/abc123',
      };
      JitsiMeet.call(url, userInfo);
      /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
      /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
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
      <View style={{height: 60}}><CountdownTimer timeStart={'Oct 20, 2021 20:30:00'} /></View>
      <JitsiMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={e => onConferenceJoined(e)}
        onConferenceWillJoin={e => onConferenceWillJoin(e)}
        style={{
          //flex: 1,
          height: windowHeight - 60,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    </View>
  );
}
export default VideoCall;

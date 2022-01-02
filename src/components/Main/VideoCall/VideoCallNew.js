/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Dimensions, StatusBar} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import CountdownTimer from '../common/CountdownTimer/CountDownTimer';
import {useSelector} from 'react-redux';
let windowHeight = Dimensions.get('window').height;
// import {BASE_URL} from '../../../globals/constant';

const VideoCallNew = props => {
  const current = useSelector(state => state.auth.current);
  const [showJitsi,setShowJitsi] = useState(true)

  useEffect(() => {
    const url = `https://meet.jit.si/songokuvegeta9021`;
    const userInfo = {
      displayName: current.user.name,
      email: current.user.email,
      avatar: current.user.avatar, //'https://i.pinimg.com/170x/d6/13/72/d6137245169ab62c45b5879ddd41d36d.jpg',
    };
    const _token = props.route.params.arrScheduleClass.studentMeetingLink.slice(
      13,
      props.route.params.arrScheduleClass.studentMeetingLink.length,
    );
    const room =
      'f569c202-7bbf-4620-af77-ecc1419a6b28-4d54d3d7-d2a9-42e5-97a2-5ed38af5789a';
    //const url = `${BASE_URL}call/?token=${_token}`
    // const url = `https://my.jitsi.server/${roomName}?jwt=${token}`;
    const url1 = `https://meet.lettutor.com/http-bind?room=${room}&token=${_token}`;
    const meetOptions = {
      audioMuted: false,
      audioOnly: false,
      videoMuted: false,
      subject: '',
      // token: _token,
    };
    const meetFeatureFlags = {
      addPeopleEnabled: true,
      calendarEnabled: true,
      callIntegrationEnabled: true,
      chatEnabled: true,
      closeCaptionsEnabled: true,
      inviteEnabled: true,
      androidScreenSharingEnabled: true,
      liveStreamingEnabled: true,
      meetingNameEnabled: true, //true,
      meetingPasswordEnabled: false, //true,
      pipEnabled: true,
      kickOutEnabled: true,
      conferenceTimerEnabled: true,
      videoShareButtonEnabled: true,
      recordingEnabled: true,
      reactionsEnabled: true,
      raiseHandEnabled: true,
      tileViewEnabled: true,
      toolboxAlwaysVisible: false,
      toolboxEnabled: true,
      welcomePageEnabled: false,
    };
    console.log('vegeta nè');

    JitsiMeet.call(url, userInfo, meetOptions, meetFeatureFlags);
  }, []);


  

  useEffect(() => {
    return () => {
      console.log('end call vegeta nè');
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('Meeting vegeta Ended');
  }

  function onConferenceJoined(nativeEvent) {
    console.log('Meeting vegeta Joined');
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('Meeting vegeta Before Join');
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
          height: 100,
          position: 'absolute',
          marginTop: 120,
          alignSelf: 'center',
          elevation: 100,
        }}>
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
      {showJitsi && <JitsiMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={e => onConferenceJoined(e)}
        onConferenceWillJoin={e => onConferenceWillJoin(e)}
        style={{
          //flex: 1,
          height: '100%',//windowHeight,
          width: '100%',
          backgroundColor: 'black',
        }}
      />}
    </View>
  );
};
export default VideoCallNew;

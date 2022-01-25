/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import CountdownTimer from '../common/CountdownTimer/CountDownTimer';
import CountUpTimer from '../common/CountdownTimer/CountUpTimer';
import {useSelector} from 'react-redux';
import { MAIN_COLOR } from '../../../globals/constant';
// let windowHeight = Dimensions.get('window').height;

const VideoCallNew = props => {

  const current = useSelector(state => state.auth.current);
  const [showJitsi,setShowJitsi] = useState(true)

  useEffect(() => {
    //const url = `https://meet.jit.si/songokuvegeta9021`;
    const userInfo = {
      displayName: current.user.name,
      email: current.user.email,
      avatar: current.user.avatar, //'https://i.pinimg.com/170x/d6/13/72/d6137245169ab62c45b5879ddd41d36d.jpg',
    };
    const _token = props.route.params.arrScheduleClass.studentMeetingLink.slice(
      13,
      props.route.params.arrScheduleClass.studentMeetingLink.length,
    );

    //const _serverUrl = "https://meet.tutoring.letstudy.io/";
    const _serverUrl = "https://meet.lettutor.com/";
    //const room = "f569c202-7bbf-4620-af77-ecc1419a6b28-f64bca88-80fb-479d-a9d1-66fd326cfa45";
    let _room = current.user.id + "-"+props.route.params.arrScheduleClass.scheduleDetailInfo.scheduleInfo.tutorId;
    const _url = _serverUrl + _room;
    const meetOptions = {
      audioMuted: false,
      audioOnly: false,
      videoMuted: false,
      subject: '',
      token: _token,
      // room: _room
    };
    // let _url = 'https://sandbox.app.lettutor.com' + props.route.params.arrScheduleClass.studentMeetingLink;
    
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

    JitsiMeet.call(_url, userInfo, meetOptions, meetFeatureFlags);
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
          height: 40,
          width: '100%',//60,
          position: 'absolute',
          marginTop: 0,//30,
          marginLeft: 0, //5,
          alignSelf: 'flex-start',
          elevation: 100,
          backgroundColor: 'black'
        }}>
        {/* <Image source={require('./logoblack.png')} style={{height: 40,
          width: 40,}}/> */}
          <Image source={{uri: 'https://pbs.twimg.com/media/FJ0y8PPVcAAxfZK?format=webp&name=tiny'}} style={{height: 40,
          width: 40,}}/>
          <Text style={{color: MAIN_COLOR, fontWeight: 'bold'}}>LetTutor</Text>
      </View>
      <View
        style={{
          height: 100,
          position: 'absolute',
          marginTop: 90,
          alignSelf: 'center',
          elevation: 100,
        }}>
        {new Date().getTime()<
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
      <View
        style={{
          height: 55,
          position: 'absolute',
          marginTop: 40,
          alignSelf: 'center',
          elevation: 20,
        }}>
        <CountUpTimer
            timeStart={
                props.route.params.arrScheduleClass.scheduleDetailInfo.scheduleInfo.startTimestamp
            }
          />
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
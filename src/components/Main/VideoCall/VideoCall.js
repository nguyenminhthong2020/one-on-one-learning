/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Dimensions, StatusBar} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import CountdownTimer from '../common/CountdownTimer/CountDownTimer';
import axios from 'axios';
import {useSelector} from 'react-redux';
let windowHeight = Dimensions.get('window').height;
import {BASE_URL} from '../../../globals/constant';


function VideoCall(props) {
  const current = useSelector(state => state.auth.current);
  // const axiosInstance1 = axios.create({
  //   baseURL: BASE_URL,
  //   timeout: 5000,
  //   headers: {
  //     Authorization: 'Bearer ' + current.tokens.access.token,
  //   },
  // });

  useEffect(() => {
    // StatusBar.setHidden(false, 'none'); // don't remove this
    // StatusBar.setTranslucent(false); // don't remove this.
    // StatusBar.setBackgroundColor('#000000'); // you can remove
    // StatusBar.setBarStyle('light-content'); // you can remove

    const url = 'https://meet.jit.si/songokuminhthong';
    const userInfo = {
      displayName: current.user.name,
      email: current.user.email,
      avatar: current.user.avatar, //'https://i.pinimg.com/170x/d6/13/72/d6137245169ab62c45b5879ddd41d36d.jpg',
    };
    const _token = props.route.params.arrScheduleClass.studentMeetingLink.slice(
      13,
      props.route.params.arrScheduleClass.studentMeetingLink.length,
    );
    const room = 'f569c202-7bbf-4620-af77-ecc1419a6b28-4d54d3d7-d2a9-42e5-97a2-5ed38af5789a';
    //const url = `${BASE_URL}call/?token=${_token}`
    // const url = `https://my.jitsi.server/${roomName}?jwt=${token}`;
    //const _token1 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJzdHVkZW50QGxldHR1dG9yLmNvbSIsIm5hbWUiOiJIZWxsbyBLaXR0eSJ9fSwicm9vbSI6ImY1NjljMjAyLTdiYmYtNDYyMC1hZjc3LWVjYzE0MTlhNmIyOC00ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWEiLCJyb29tTmFtZSI6ImY1NjljMjAyLTdiYmYtNDYyMC1hZjc3LWVjYzE0MTlhNmIyOC00ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWEiLCJ1c2VyQ2FsbCI6eyJpZCI6ImY1NjljMjAyLTdiYmYtNDYyMC1hZjc3LWVjYzE0MTlhNmIyOCIsImVtYWlsIjoic3R1ZGVudEBsZXR0dXRvci5jb20iLCJuYW1lIjoiSGVsbG8gS2l0dHkiLCJhdmF0YXIiOiJodHRwczovL3NhbmRib3guYXBpLmxldHR1dG9yLmNvbS9hdmF0YXIvZjU2OWMyMDItN2JiZi00NjIwLWFmNzctZWNjMTQxOWE2YjI4YXZhdGFyMTY0MDcwMDcxMzM4MS5qcGciLCJjb3VudHJ5IjoiTloiLCJwaG9uZSI6Ijg0MjQ5OTk5NjUwOCIsImxhbmd1YWdlIjoiRW5nbGlzaCIsImJpcnRoZGF5IjoiMjAyMi0wMS0yIiwiaXNBY3RpdmF0ZWQiOnRydWUsInJlcXVpcmVOb3RlIjpudWxsLCJsZXZlbCI6IlBST0ZJQ0lFTkNZIiwiaXNQaG9uZUFjdGl2YXRlZCI6dHJ1ZSwidGltZXpvbmUiOjd9LCJ1c2VyQmVDYWxsZWQiOnsiaWQiOiI0ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWEiLCJlbWFpbCI6InRlYWNoZXJAbGV0dHV0b3IuY29tIiwibmFtZSI6IktlZWdhbiIsImF2YXRhciI6Imh0dHBzOi8vYXBpLmFwcC5sZXR0dXRvci5jb20vYXZhdGFyLzRkNTRkM2Q3LWQyYTktNDJlNS05N2EyLTVlZDM4YWY1Nzg5YWF2YXRhcjE2Mjc5MTMwMTU4NTAuMDAiLCJjb3VudHJ5IjoiWkEiLCJwaG9uZSI6IjA5ODc2NTQzMjEiLCJsYW5ndWFnZSI6bnVsbCwiYmlydGhkYXkiOiIxOTk5LTEyLTAxIiwiaXNBY3RpdmF0ZWQiOnRydWUsInR1dG9ySW5mbyI6eyJpZCI6IjZjYTVjMDkyLTc2ZWEtNGU3Mi05YzZlLTA1ZTIyMzlhYTMzYiIsInVzZXJJZCI6IjRkNTRkM2Q3LWQyYTktNDJlNS05N2EyLTVlZDM4YWY1Nzg5YSIsInZpZGVvIjoiaHR0cHM6Ly9hcGkuYXBwLmxldHR1dG9yLmNvbS92aWRlby80ZDU0ZDNkNy1kMmE5LTQyZTUtOTdhMi01ZWQzOGFmNTc4OWF2aWRlbzE2Mjc5MTMwMTU4NzEubXA0IiwiYmlvIjoiSSBhbSBwYXNzaW9uYXRlIGFib3V0IHJ1bm5pbmcgYW5kIGZpdG5lc3MsIEkgb2Z0ZW4gY29tcGV0ZSBpbiB0cmFpbC9tb3VudGFpbiBydW5uaW5nIGV2ZW50cyBhbmQgSSBsb3ZlIHB1c2hpbmcgbXlzZWxmLiBJIGFtIHRyYWluaW5nIHRvIG9uZSBkYXkgdGFrZSBwYXJ0IGluIHVsdHJhLWVuZHVyYW5jZSBldmVudHMuIEkgYWxzbyBlbmpveSB3YXRjaGluZyBydWdieSBvbiB0aGUgd2Vla2VuZHMsIHJlYWRpbmcgYW5kIHdhdGNoaW5nIHBvZGNhc3RzIG9uIFlvdXR1YmUuIE15IG1vc3QgbWVtb3JhYmxlIGxpZmUgZXhwZXJpZW5jZSB3b3VsZCBiZSBsaXZpbmcgaW4gYW5kIHRyYXZlbGluZyBhcm91bmQgU291dGhlYXN0IEFzaWEuIiwiZWR1Y2F0aW9uIjoiQkEiLCJleHBlcmllbmNlIjoiSSBoYXZlIG1vcmUgdGhhbiAxMCB5ZWFycyBvZiB0ZWFjaGluZyBlbmdsaXNoIGV4cGVyaWVuY2UiLCJwcm9mZXNzaW9uIjoiRW5nbGlzaCB0ZWFjaGVyIiwiYWNjZW50IjpudWxsLCJ0YXJnZXRTdHVkZW50IjoiSW50ZXJtZWRpYXRlIiwiaW50ZXJlc3RzIjoiIEkgbG92ZWQgdGhlIHdlYXRoZXIsIHRoZSBzY2VuZXJ5IGFuZCB0aGUgbGFpZC1iYWNrIGxpZmVzdHlsZSBvZiB0aGUgbG9jYWxzLiIsImxhbmd1YWdlcyI6ImVuIiwic3BlY2lhbHRpZXMiOiJidXNpbmVzcy1lbmdsaXNoLGNvbnZlcnNhdGlvbmFsLWVuZ2xpc2gsZW5nbGlzaC1mb3Ita2lkcyxpZWx0cyx0b2VpYyIsInJlc3VtZSI6bnVsbCwiaXNBY3RpdmF0ZWQiOnRydWUsImlzTmF0aXZlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA4LTAyVDE0OjAzOjM2LjMyMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA5LTA4VDE3OjQ3OjQ4LjkyOVoifSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjoiQURWQU5DRUQiLCJpc1Bob25lQWN0aXZhdGVkIjpudWxsLCJ0aW1lem9uZSI6N30sImlzVHV0b3IiOmZhbHNlLCJzdGFydFRpbWUiOjE2NDEwNzI2MDAwMDAsImVuZFNlc3Npb24iOjE2NDEwNzQxMDAwMDAsInRpbWVJblJvb20iOjE4MDAsImJvb2tpbmdJZCI6IjI5NDcxNmY0LTk5ZWQtNGQzZS05OTI2LTY4NGNhODAzN2Q5YyIsImlhdCI6MTY0MTA2NjM2OCwiZXhwIjoxNjQxMDg4NDk5LCJhdWQiOiJsaXZldHV0b3IiLCJpc3MiOiJsaXZldHV0b3IiLCJzdWIiOiJodHRwczovL21lZXQudHV0b3JpbmcubGV0c3R1ZHkuaW8ifQ.cnM5lQZPxKoXBNsbdA7ry0g0aJDmXSuSRHZbk21Wows`
    //const url1 = `https://meet.lettutor.com/http-bind?room=${room}&token=${_token}`;
    const url2 = `https://meet.lettutor.com/http-bind?room=${room}&token=${_token}`
    
    const serverUrl = 'https://meet.lettutor.com/http-bind'; //hoặc https://sandbox.app.lettutor.com/call/ hoặc https://sandbox.app.lettutor.com
    const meetOptions = {
      audioMuted: false,
      audioOnly: false,
      videoMuted: false,
      subject: 'String',
      token: _token,
      serverURL: serverUrl,
      room: room
    };
    const url3 = serverUrl  
    // console.log(url1);
    const meetFeatureFlags = {
      addPeopleEnabled: true,
      calendarEnabled: true,
      callIntegrationEnabled: true,
      chatEnabled: true,
      closeCaptionsEnabled: true,
      inviteEnabled: true,
      androidScreenSharingEnabled: true,
      liveStreamingEnabled: true,
      meetingNameEnabled: true,//true,
      meetingPasswordEnabled: false,//true,
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
    JitsiMeet.call(serverUrl, userInfo, meetOptions, meetFeatureFlags);

    // axiosInstance1.post(`https://meet.lettutor.com/http-bind?room=${room}&token=${token}`, {
    //   room: room,
    //   token: token
    // }).then(res => console.log(JSON.stringify(res)));

    // return () => {
    //   JitsiMeet.endCall();
    // };
  }, []);

  useEffect(() => {
    return () => {
      console.log('end call goku nè');
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('Meeting goku Ended');
  }

  function onConferenceJoined(nativeEvent) {
    console.log('Meeting goku Joined');
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('Meeting goku Before Join');
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

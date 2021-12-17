/* eslint-disable */
import React, {Suspense, useState, useRef} from 'react';
// import {
//   ScrollView,
//   // StatusBar,
//   StyleSheet,
//   ActivityIndicator,
//   Text,
//   // useColorScheme,
//   View,
//   Dimensions,
//   Button,
//   Image,
// } from 'react-native';
//import Video from 'react-native-video';
//import {WebView} from 'react-native-webview';
//import testVideo from '../../../../../assets/video/test-video.mp4';
//import {MAIN_COLOR, MAIN_CORLOR} from '../../../../globals/constant';
//import {Video, AVPlaybackStatus} from 'expo-av';

import Video, {FilterType} from 'react-native-video';

const SectionVideo = props => {
  // const player = React.useRef(null);

  // const onLoad = (data) => {
  //   console.log({ duration: data.duration });
  // }
  // const onProgress = (data) => {
  //   console.log(data.currentTime);
  // }
  // const onLoadStart = (data) =>{
  //    console.log(data);
  // }

  return (
    <Video
      source={{
        uri: props.uri,
        /* 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', */
      }}
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

        backgroundColor: 'black',
        width: '100%',
        height: '100%',
      }}
      rate={1.0}
      volume={1.0}
      shouldCorrectPitch={true}
      muted={false}
      paused={false}
      resizeMode="cover"
      controls={true}
      playWhenInactive={true}
      // filterEnable={true}
      // filter={filterType}
      autoplay={true}
      poster="https://ak.picdn.net/shutterstock/videos/1054933562/thumb/7.jpg"

      //ref={player}
      // onLoadStart={onLoadStart}
      //onProgress={(data)=>onProgress(data)}
      // onLoad={(data) => 
      //   {//onLoad(data)
      //   player.current.seek(0); // this will set first frame of video as thumbnail
      // }}
    />
  );
};

export default SectionVideo;

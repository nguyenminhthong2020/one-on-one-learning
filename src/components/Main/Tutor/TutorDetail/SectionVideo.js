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
import Video from 'react-native-video';
//import {Constants} from 'react-native-unimodules';

const SectionVideo = props => {
  return (
    <Video
      source={{
        uri: props.uri,
        /* 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', */
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
      rate={1.0}
      volume={1.0}
      shouldCorrectPitch={true}
      muted={false}
      paused={true}
      resizeMode="cover"
      controls={true}
      playWhenInactive={true}
    //   autoplay={true}
    />
  );
};

export default SectionVideo;

/* eslint-disable */
import React from 'react';
//import {WebView} from 'react-native-webview';
//import {MAIN_COLOR, MAIN_CORLOR} from '../../../../globals/constant';
//import {Video, AVPlaybackStatus} from 'expo-av';
// import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
// import Video, {FilterType} from 'react-native-video';
import { Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-player';

const window = Dimensions.get('window');
const SectionVideo = props => {
  return (
    <VideoPlayer
    poster="https://ak.picdn.net/shutterstock/videos/1054933562/thumb/7.jpg"
    video={{ uri: props.uri }}
    autoplay={true}
    resizeMode="cover"
    videoHeight={window.height/1.25}
/>
  );
};

export default SectionVideo;

/* eslint-disable */
import React, {Suspense, useState, useRef} from 'react';
import {
  ScrollView,
  // StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  // useColorScheme,
  View,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import {WebView} from 'react-native-webview';
//import testVideo from '../../../../../assets/video/test-video.mp4';


const TutorDetail = () => {
  {
    /* <View style={[styles.videoContainer, {}]}>
            <Video
              source={{
                uri: 'https://cdn.kapwing.com/final_6167052d5811ea0044e9d3b2_563828.mp4',
              }}
              style={styles.mediaPlayer}
              volume={10}
              //onEnd={() => setActivation(!activateRecord)}
            />
          </View> 
        <View style={{marginBottom: 100}}><Text>Video 2: </Text></View> */
  }
  {
    /* https://kapwi.ng/c/NqpwhUip_Z */
  }
  {
    /* https://api.app.lettutor.com/video/cd0a440b-cd19-4c55-a2a2-612707b1c12cvideo1631029793846.mp4 */
  }
  {
    /* <Video
        source={{uri: 'https://cdn.kapwing.com/final_6167052d5811ea0044e9d3b2_563828.mp4'}}
        paused={!isPlaying}
        controls={true}
        style={styles.backgroundVideo}
        muted={isMuted}
      />
      <View style={{marginTop: 100}}></View>
      <TouchableOpacity
        onPress={() => setIsPlaying(p => !p)}
      >
          <Text>{isPlaying ? 'Stop' : 'Play'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsPlaying(p => !p)}
      >
          <Text>{isMuted ? 'Unmute' : 'Mute'}</Text>
      </TouchableOpacity> */
  }

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  const myUrl = `https://api.app.lettutor.com/video/cd0a440b-cd19-4c55-a2a2-612707b1c12cvideo1631029793846.mp4`;

  // Dimensions.get('window').width
  return (
    <View>
      <ScrollView>
        {/* <Video
          source={{
            uri: myUrl,
          }}
          style={{width: '100%', height: 200}}
          controls={true}
          audioOnly={true}
          paused={true}
          muted={true}
          onBuffer={(isBuffer) =>{console.log(isBuffer)}}
          // ref={ref => {
          //   this.player = ref;
          // }}
          // poster="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/English_Cocker_Spaniel_4.jpg/800px-English_Cocker_Spaniel_4.jpg"
          // ref={ref => {
          //   this.player = ref;
          // }}
        /> */}
        <View>
        </View>
        <Text style={{marginTop: 100}}>12345678</Text>
        <Text style={{marginTop: 100}}>125678</Text>
        <Text style={{marginTop: 100}}>1344378</Text>
        <Text style={{marginTop: 100}}>22222222</Text>
        <Text style={{marginTop: 100}}>3333333333333</Text>
        <Text style={{marginTop: 100}}>444444444</Text>
        <Text style={{marginTop: 100}}>12345678</Text>
        <Text style={{marginTop: 100}}>999999</Text>
        <Text style={{marginTop: 100}}>1344378</Text>
        <Text style={{marginTop: 100}}>12121212</Text>
        <Text style={{marginTop: 100}}>9021902190219021</Text>
        <Text style={{marginTop: 100}}>1344378</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    width: 400,
    height: 200,
  },
  videoContainer: {
    flex: 0.5,
    // paddingTop: "8%",
    // paddingRight: "6%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    width: 400,
  },
  mediaPlayer: {
    width: '80%',
    height: '50%',
    marginRight: '2%',
  },

  
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});

export default TutorDetail;

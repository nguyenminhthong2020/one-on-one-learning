/* eslint-disable */
import React, {Suspense, useState, useEffect} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  Pressable,
  Image,
  Alert,
} from 'react-native';

import {MAIN_COLOR} from '../../../../globals/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

const SectionVideo = React.lazy(() => import('./SectionVideo'));
import {useDispatch, useSelector} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
// import { detailApi } from '../../../../api/tutor/detailApi';
import axios from 'axios';
import {
  addFavAsync,
  removeFavAsync,
} from '../../../../redux/slices/tutor/moreSlice';

const FavoriteComponent = props => {
  const dispatch = useDispatch();

  let isFav = useSelector(state => state.moretutor.rows);
  let check = isFav.includes(props.route.params.tutor.userId);
  const current = useSelector(state => state.auth.current);

  return (
    <View>
      {check === false ? (
        <AntDesign
          name={'heart'}
          size={22}
          color={'gray'}
          style={{
            textAlign: 'right',
            marginBottom: -50,
            marginRight: 10,
          }}
          onPress={() => {
            dispatch(
              addFavAsync({
                // currentList : isFav,
                tutorId: props.route.params.tutor.userId,
                accessToken: current.tokens.access.token,
              }),
            );
          }}
        />
      ) : (
        <AntDesign
          name={'heart'}
          size={22}
          color={'rgb(240, 72, 72)'}
          style={{
            textAlign: 'right',
            marginBottom: -50,
            marginRight: 10,
          }}
          onPress={() => {
            dispatch(
              removeFavAsync({
                // currentList : isFav,
                tutorId: props.route.params.tutor.userId,
                accessToken: current.tokens.access.token,
              }),
            );
          }}
        />
      )}
    </View>
  );
};

const ReportAlert = tutorName =>
  Alert.alert(
    `Report ${tutorName} for some reasons:`,
    `1) This tutor is annoying me. \n2) This profile is pretending be someone or is fake \n3) Inappropriate profile photo \n\n Please check he/she...`,
    [
      {
        text: 'OK',
        onPress: () => alert('Complete'),
        style: 'default',
      },
      {
        text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
        style: 'destructive',
      },
    ],
    {cancelable: true},
  );

const TutorDetailNew = props => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const current = useSelector(state => state.auth.current);
  const axiosInstance1 = axios.create({
    baseURL: 'https://api.app.lettutor.com/',
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });

  const [detailTutor, setDetailTutor] = useState({
    price: 0,
    avgRating: 0,
  });
  const [priceBalance, setPriceBalance] = useState({price: 0, balance : 0});

  useEffect(() => {
    let isMounted = true;
    axiosInstance1
      .get(`tutor/${props.route.params.tutor.userId}`)
      .then(res => {
        axiosInstance1.get('user/info').then(res => 
          {
            if(isMounted){
              setDetailTutor({
                price: res.data.price,
                avgRating: res.data.avgRating,
              });
              setPriceBalance({
                price: res.data.user.priceOfEachSession.price / 100000,
                balance: res.data.user.walletInfo.amount / 100000
              })
            }
            
          }).catch(err => alert(err.response.data.message))
        // if (isMounted) {
        //   setDetailTutor({
        //     price: res.data.price,
        //     avgRating: res.data.avgRating,
        //   });
        // }
      })
      .catch(err => {
        alert('Error: \n' + err.response.data.message);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //const video = React.useRef(null);
  //const [status, setStatus] = React.useState({});
  const langState = useSelector(state => state.lang);

  //const myUrl = `https://api.app.lettutor.com/video/cd0a440b-cd19-4c55-a2a2-612707b1c12cvideo1631029793846.mp4`;
  //const _myUrl = Constants.linkingUri(myUrl);

  return (
    <View style={{marginTop: 0}}>
      <ScrollView>
        <View>
          {/* <Video
            ref={video}
            style={styles.video}
            source={{
              uri: myUrl,
            }}
            useNativeControls
            resizeMode="cover"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          /> */}
          {/* <View style={styles.buttonControl}>
            <Button
              title={status.isPlaying ? 'Pause' : 'Play'}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View> */}
          <View
            style={{
              height: 200,
              width: '100%',
              backgroundColor: 'gray',
              borderWidth: 1,
              borderColor: MAIN_COLOR,
            }}>
            <Suspense
              fallback={<ActivityIndicator size="large" color="#00ff00" />}>
              <SectionVideo uri={props.route.params.tutor.video} />
            </Suspense>
          </View>

          <View style={{margin: 15, marginTop: 18, marginBottom: 10}}>
            <FavoriteComponent {...props} />
            <View style={{flexDirection: 'row', marginBottom: 5, marginTop: 8}}>
              <View>
                <FastImage
                  style={{width: 80, height: 80, borderRadius: 40}}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    //uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
                    uri: props.route.params.tutor.avatar,
                    priority: FastImage.priority.normal,
                  }}
                />
              </View>
              <View style={{justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: isDarkTheme ? 'white' : 'black',
                    marginLeft: 6,
                    fontWeight: 'bold',
                  }}>
                  {props.route.params.tutor.name}
                </Text>
                {/* <Rating 
                style={{marginLeft: 6}}
                ratingCount={5}
                imageSize={15}
                readonly={true}
                jumpValue={0.5}
                showRating={false}
                fractions={10}
                startingValue={props.tutor.startingValue}
                isDisabled={true}
              /> */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 1,
                    marginLeft: 20,
                  }}>
                  {detailTutor.avgRating == 0 ? (
                    <Text style={{color: 'orange'}}>No reviews yet</Text>
                  ) : (
                    <>
                      <Text style={{color: 'orange'}}>
                        {detailTutor.avgRating}/5{' '}
                      </Text>
                      <Image
                        source={require('../../../../../assets/rating.png')}
                      />
                    </>
                  )}
                </View>
                {isDarkTheme ? (
                  <View style={{backgroundColor: 'white'}}>
                    <CountryPicker
                      //withFlag
                      //withFilter
                      withCountryNameButton
                      countryCode={props.route.params.tutor.country}
                      onSelect={country => {}}
                    />
                  </View>
                ) : (
                  <View>
                    <CountryPicker
                      //withFlag
                      //withFilter
                      withCountryNameButton
                      countryCode={props.route.params.tutor.country}
                      onSelect={country => {}}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 15}}>
            <Pressable
              style={{
                borderRadius: 40,
                backgroundColor: MAIN_COLOR,
                paddingVertical: 10,
              }}
              onPress={() =>
                props.navigation.navigate('Booking', {
                  tutorId: props.route.params.tutor.userId,
                  name: props.route.params.tutor.name,
                  priceBalance: priceBalance
                })
              }>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                {langState[langState.currentLang].Booking}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <View>
              <Pressable
                onPress={() =>
                  props.navigation.navigate('TutorMessage', {
                    uri: props.route.params.tutor.avatar,
                    name: props.route.params.tutor.name,
                  })
                }>
                <View style={{alignItems: 'center'}}>
                  <View style={{marginBottom: 3}}>
                    <MaterialIcons
                      name={'message'}
                      size={27}
                      color={MAIN_COLOR}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: MAIN_COLOR,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {langState[langState.currentLang].Message}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
            <View>
              <Pressable onPress={() => ReportAlert('April Corpuz')}>
                <View style={{alignItems: 'center'}}>
                  <View style={{marginBottom: 3}}>
                    <MaterialIcons
                      name={'report'}
                      size={27}
                      color={MAIN_COLOR}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: MAIN_COLOR,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {langState[langState.currentLang].Report}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
          <View style={{marginTop: 20, marginHorizontal: 15}}>
            <Text
              style={{fontSize: 16, color: isDarkTheme ? 'white' : 'black'}}>
              {props.route.params.tutor.bio}
            </Text>
          </View>
          <View style={{marginTop: 30, marginHorizontal: 15}}>
            <Text
              style={{
                color: isDarkTheme ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {langState[langState.currentLang].Languages}
            </Text>
            <View style={{marginLeft: 5}}>
              <Text style={{color: isDarkTheme ? 'yellow' : MAIN_COLOR}}>
                {props.route.params.tutor.languages}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: isDarkTheme ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {langState[langState.currentLang].Education}
            </Text>
            <Text
              style={{marginLeft: 5, color: isDarkTheme ? 'white' : 'black'}}>
              {props.route.params.tutor.education}
            </Text>
          </View>
          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: isDarkTheme ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {langState[langState.currentLang].Experience}
            </Text>
            <Text
              style={{marginLeft: 5, color: isDarkTheme ? 'white' : 'black'}}>
              {props.route.params.tutor.experience}
            </Text>
          </View>
          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {langState[langState.currentLang].Interest}
            </Text>
            <Text
              style={{marginLeft: 5, color: isDarkTheme ? 'white' : 'black'}}>
              {props.route.params.tutor.interests}
            </Text>
          </View>
          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: isDarkTheme ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {langState[langState.currentLang].Profession}
            </Text>
            <Text
              style={{marginLeft: 5, color: isDarkTheme ? 'white' : 'black'}}>
              {props.route.params.tutor.profession}
            </Text>
          </View>
          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: isDarkTheme ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {langState[langState.currentLang].Specialities}
            </Text>
            <View style={{marginLeft: 5}}>
              <Text style={{color: isDarkTheme ? 'yellow' : MAIN_COLOR}}>
                {props.route.params.tutor.specialties}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: isDarkTheme ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {langState[langState.currentLang].Courses}
            </Text>
          </View>

          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: '#e54594',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {langState[langState.currentLang].Rating_and_Comments} (
              {props.route.params.tutor.feedbacks.length})
            </Text>
          </View>
          <View
            style={{alignItems: 'center', marginTop: 10, marginBottom: '20%'}}>
            <Pressable
              style={{
                width: '50%',
                borderRadius: 40,
                backgroundColor: '#e54594',
                paddingVertical: 10,
              }}
              onPress={() =>
                props.navigation.navigate('TutorDetailComment', {
                  feedbacks: props.route.params.tutor.feedbacks,
                })
              }>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                {langState[langState.currentLang].Click_to_see}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TutorDetailNew;

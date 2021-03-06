/* eslint-disable */
import React, {Suspense, useState, useEffect} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';

import {MAIN_COLOR, BASE_URL, SECOND_COLOR} from '../../../../globals/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
const SectionVideo = React.lazy(() => import('./SectionVideo'));
import {useDispatch, useSelector} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';

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

const TutorDetailNew = props => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const current = useSelector(state => state.auth.current);
  const axiosInstance1 = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const [report, setReport] = useState('');
  const [detailTutor, setDetailTutor] = useState({
    price: 0,
    avgRating: 0,
  });

  useEffect(() => {
    let isMounted = true;
    axiosInstance1
      .get(`tutor/${props.route.params.tutor.userId}`)
      .then(res => {
        axiosInstance1
          .get('user/info')
          .then(res1 => {
            if (isMounted) {
              setDetailTutor({
                price: res.data.price,
                avgRating: res.data.avgRating,
              });
            }
          })
          .catch(err1 => {
            if (JSON.stringify(err1).includes('message')) {
              alert('FAIL:\n' + err1.response.data.message);
            } else {
              alert('FAIL:\n' + err1);
            }
          });
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

  const langState = useSelector(state => state.lang);

  return (
    <View style={{marginTop: 0}}>
      <ScrollView>
        <View style={{backgroundColor: isDarkTheme ? 'black' : 'white'}}>
          <View
            style={{
              backgroundColor: 'gray',
              borderWidth: 1,
              borderColor: MAIN_COLOR,
            }}>
            <Suspense
              fallback={<ActivityIndicator size="large" color="#00ff00" />}>
              <SectionVideo
                uri={props.route.params.tutor.video}
                navigation={props.navigation}
              />
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
                        {(Math.round((detailTutor.avgRating)*2)/2)}/5{' '}
                      </Text>
                      <MaterialIcons name={'star'} size={16} color="orange" />
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
              // onPress={() =>
              //   props.navigation.navigate('TutorMessage', {
              //     uri: props.route.params.tutor.avatar,
              //     name: props.route.params.tutor.name,
              //   })
              // }>
              >
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
              <Pressable onPress={() => setIsVisible(!isVisible)}>
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
                color: isDarkTheme? 'white': 'black',
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
              {langState[langState.currentLang].Rating_and_Comments} 
              {/* ({props.route.params.tutor.feedbacks.length}) */}
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
                  // feedbacks: props.route.params.tutor.feedbacks,
                  userId: props.route.params.tutor.userId
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '70%',
            marginTop: 220,
            marginHorizontal: '15%',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'black',
            //opacity: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              color: MAIN_COLOR,
              marginBottom: 20,
            }}>
            {langState.currentLang=='en'? `Help us understand\nwhat's happening`:`Gi??p ch??ng t??i hi???u\nx???y ra chuy???n g??`}
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: SECOND_COLOR,
              fontSize: 15,
              marginHorizontal: 12,
              backgroundColor: 'white',
              marginBottom: 12,
            }}
            numberOfLines={4}
            multiline
            onChangeText={value => setReport(value)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 5,
            }}>
            <Pressable
              style={{
                backgroundColor: MAIN_COLOR,
                width: '48%',
                paddingVertical: 7,
                borderRadius: 5,
                marginBottom: 5,
              }}
              onPress={() => {
                axiosInstance1
                  .post(`report`, {
                    content: report,
                    tutorId: props.route.params.tutor.userId
                  })
                  .then(res => {
                    alert("Report successfully");
                    setIsVisible(!isVisible)
                  })
                  .catch(err => {
                        if (JSON.stringify(err).includes('message')) {
                          alert('FAIL:\n' + err.response.data.message);
                        } else {
                          alert('FAIL:\n' + err);
                        }
                  });
              }}>
              <Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
                {langState.currentLang=='en'?'Submit':'G???i'}
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: 'orange',
                width: '48%',
                paddingVertical: 7,
                borderRadius: 5,
                marginBottom: 5,
              }}
              onPress={() => setIsVisible(!isVisible)}>
              <Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
              {langState.currentLang=='en'?'Cancel':'H???y'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TutorDetailNew;

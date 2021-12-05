/* eslint-disable */
import React, {Suspense, useState, useRef, useEffect, useMemo} from 'react';
import {
  ScrollView,
  // StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  //Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
  FlatList,
  //TextInput,
  Alert,
} from 'react-native';
//import Video from 'react-native-video';
//import {WebView} from 'react-native-webview';
//import testVideo from '../../../../../assets/video/test-video.mp4';
import {
  MAIN_COLOR,
  // MAIN_CORLOR,
  // SECOND_COLOR,
} from '../../../../globals/constant';
//import {Video, AVPlaybackStatus} from 'expo-av';
// import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
//import {Constants} from 'react-native-unimodules';
//import SectionVideo from './SectionVideo';
const SectionVideo = React.lazy(() => import('./SectionVideo'));
//import ListTags from '../../../_common/ListTags/ListTags';
import {useDispatch, useSelector} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import { detailApi } from '../../../../api/tutor/detailApi';
import { addFavAsync, removeFavAsync } from '../../../../redux/slices/tutor/moreSlice';



const FavoriteComponent = (props) => {
  //console.log('Render lại tim <3');
  const dispatch = useDispatch();

  let isFav = useSelector(state => state.moretutor.rows);
  let check = isFav.includes(props.route.params.tutor.userId);

  // const [like, setLike] = useState(check);

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
                  addFavAsync(
                    {
                      currentList : isFav,
                      tutorId: props.route.params.tutor.userId
                    }
                  )
                )
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
                  removeFavAsync(
                    {
                      currentList : isFav,
                      tutorId: props.route.params.tutor.userId
                    }
                  )
                )
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

const BookingDetailAlert = (student, tutor, date, time, price, balance) =>
  price > balance
    ? Alert.alert(
        `BOOKING DETAILS: FAIL`,
        `1) Student: ${student}, tutor: ${tutor}. \n2) ${date}, ${time} \n3) Balance: ${balance}, Price: ${price}`,
        [
          {
            text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
            style: 'Cancel',
          },
        ],
        {cancelable: true},
      )
    : Alert.alert(
        `BOOKING DETAILS: `,
        `1) Student: ${student}, tutor: ${tutor}. \n2) ${date}, ${time} \n3) Balance: ${balance}, Price: ${price}`,
        [
          {
            text: 'Book',
            onPress: () => {
              console.log('Complete Book'), BookingSuccess();
            },
            style: 'Cancel',
          },
          {
            text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
            style: 'Cancel',
          },
        ],
        {cancelable: true},
      );

const BookingSuccess = () =>
  Alert.alert(
    `Booking details`,
    `Bokking success !`,
    [
      {
        text: 'Done',
        //onPress: () => alert('Complete'),
        style: 'default',
      },
      // {
      //   text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
      //   style: 'destructive',
      // },
    ],
    {cancelable: true},
  );

// const ModalReport = () => {
//   console.log('Render Modal Report');
//   const [isModalVisibleReport, setModalVisibleReport] = useState(false);
//   const toggleModalReport = () => {
//     setModalVisibleReport(!isModalVisibleReport);
//   };
//   return (
//     <View>
//       <View>
//         <TouchableOpacity>
//           <View style={{alignItems: 'center'}}>
//             <View style={{marginBottom: 3}}>
//               <MaterialIcons
//                 name={'report'}
//                 size={27}
//                 color={MAIN_COLOR}
//                 // style={{
//                 //   textAlign: 'right',
//                 //   marginBottom: -50,
//                 //   marginRight: 10,
//                 // }}
//                 onPress={toggleModalReport}
//               />
//             </View>
//             <View>
//               <Text
//                 style={{
//                   color: MAIN_COLOR,
//                   fontWeight: 'bold',
//                   fontSize: 16,
//                 }}>
//                 Report
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>
//       <View style={{backgroundColor: 'white'}}>
//         <Modal isVisible={isModalVisibleReport}>
//           <View
//             style={{backgroundColor: 'white', width: '100%', height: '60%'}}>
//             <Text
//               style={{
//                 color: 'black',
//                 marginLeft: 5,
//                 marginBottom: 15,
//                 fontWeight: 'bold',
//                 fontSize: 20,
//               }}>
//               Help us understand what's happening...
//             </Text>
//             <View
//               style={{borderWidth: 1, marginHorizontal: 5, marginBottom: 10}}>
//               <TextInput multiline={true} numberOfLines={5}></TextInput>
//             </View>
//             <View style={{alignItems: 'center'}}>
//               <TouchableOpacity
//                 style={{
//                   width: '50%',
//                   borderRadius: 40,
//                   backgroundColor: '#e54594',
//                   paddingVertical: 10,
//                   marginBottom: 5,
//                 }}
//                 onPress={toggleModalReport}>
//                 <Text
//                   style={{
//                     color: 'white',
//                     textAlign: 'center',
//                     fontSize: 18,
//                   }}>
//                   Send report
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </View>
//   );
// };

// Modal Time
const ModalTime = props => {
  //props: student, tutor, arrayDateTime, id, isVisible
  const [isModalVisibleTime, setModalVisibleTime] = useState(props.isVisible);
  const toggleModalTime = () => {
    setModalVisibleTime(!isModalVisibleTime);
  };
  onPressHandler = (student, tutor, arrayDateTime, id, time) => {
    //alert("OK nè");
    //alert(`Student ${student}, Tutor ${tutor}, Date ${props.arrayDateTime[props.id].date}, Time ${time}`)
    BookingDetailAlert(
      student,
      tutor,
      props.arrayDateTime[props.id].date,
      time,
      2,
      2,
    );
    toggleModalTime();
    props.setIsClick(false);
  };
  return isModalVisibleTime ? (
    <View style={{backgroundColor: 'white'}}>
      <Modal isVisible={isModalVisibleTime}>
        <View style={{backgroundColor: 'white', width: '100%', height: '80%'}}>
          <Text
            style={{
              color: 'black',
              marginLeft: 5,
              marginBottom: 10,
              fontWeight: 'bold',
              marginTop: 5,
              fontSize: 18,
              textAlign: 'center',
            }}>
            {`Picking your time\n(${props.arrayDateTime[props.id].date})`}
          </Text>
          {props.arrayDateTime[props.id].time.map((time, index) => (
            <View style={{marginHorizontal: 15, marginBottom: 6}} key={index}>
              <Pressable
                style={{
                  borderRadius: 40,
                  backgroundColor: MAIN_COLOR,
                  paddingVertical: 10,
                }}
                onPress={() =>
                  onPressHandler(
                    props.student,
                    props.tutor,
                    props.arrayDateTime,
                    props.id,
                    time,
                  )
                }>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  {time}
                </Text>
              </Pressable>
            </View>
          ))}
          <View style={{alignItems: 'center', marginTop: 25}}>
            <TouchableOpacity
              style={{
                width: '50%',
                borderRadius: 40,
                backgroundColor: '#e54594',
                paddingVertical: 10,
                marginBottom: 5,
              }}
              onPress={toggleModalTime}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  ) : (
    <View></View>
  );
};
const TutorDetailNew = props => {
  // const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  
  const [detailTutor, setDetailTutor] = useState({result : {avgRating: 4.5}});
  useEffect(() => {
    (async function getDetail(){
      const res = await detailApi.detail({userId: props.route.params.tutor.userId})
      if(res.result.avgRating)
      {setDetailTutor(res)}
    })()
  }, [])

  //const video = React.useRef(null);
  //const [status, setStatus] = React.useState({});
  // let isFav = useSelector(state => state.moretutor.rows);
  // let check = isFav.includes(props.tutor.userId);

  //const [like, setLike] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleBooking, setModalVisibleBooking] = useState(false);
  const langState = useSelector(state => state.lang);

  const arrayDateTime = [
    {
      id: 0,
      date: '2021-10-16',
      time: [
        '19:30 - 19:55',
        '20:00 - 20:25',
        '20:30 - 20:55',
        '21:00 - 21:25',
      ],
    },
    {
      id: 1,
      date: '2021-10-17',
      time: [
        '19:30 - 19:55',
        '20:00 - 20:25',
        '20:30 - 20:55',
        '21:00 - 21:25',
      ],
    },
    {
      id: 2,
      date: '2021-10-18',
      time: [
        '19:30 - 19:55',
        '20:00 - 20:25',
        '20:30 - 20:55',
        '21:00 - 21:25',
        '21:30 - 21:55',
      ],
    },
    {
      id: 3,
      date: '2021-10-20',
      time: [
        '19:30 - 19:55',
        '20:00 - 20:25',
        '20:30 - 20:55',
        '21:00 - 21:25',
      ],
    },
    {
      id: 4,
      date: '2021-10-23',
      time: [
        '19:30 - 19:55',
        '20:00 - 20:25',
        '20:30 - 20:55',
        '21:00 - 21:25',
      ],
    },
    {
      id: 5,
      date: '2021-10-24',
      time: [
        '19:30 - 19:55',
        '20:00 - 20:25',
        '20:30 - 20:55',
        '21:00 - 21:25',
      ],
    },
    {
      id: 6,
      date: '2021-10-25',
      time: [
        '19:30 - 19:55',
        '20:00 - 20:25',
        '20:30 - 20:55',
        '21:00 - 21:25',
      ],
    },
  ];
  const arrayIsClick = arrayDateTime.map((v, i) => false);
  const [isClick, setIsClick] = useState(arrayIsClick);

  const setIsClickHandler = value =>
    setIsClick(arrayIsClick.map((v, i) => (i === value ? false : v)));
  // const [isModalVisibleTime, setModalVisibleTime] = useState(false);

  //const [isModalVisibleReport, setModalVisibleReport] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalBooking = () => {
    setModalVisibleBooking(!isModalVisibleBooking);
  };
  // const toggleModalTime = () => {
  //   setModalVisibleTime(!isModalVisibleTime);
  // };

  // const toggleModalReport = () => {
  //   setModalVisibleReport(!isModalVisibleReport);
  // };

  //const myUrl = `https://api.app.lettutor.com/video/cd0a440b-cd19-4c55-a2a2-612707b1c12cvideo1631029793846.mp4`;
  //const _myUrl = Constants.linkingUri(myUrl);
  

  // Dimensions.get('window').width
  console.log('Render lại hết đây :v');
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
              <SectionVideo
                uri={
                  props.route.params.tutor.video
                }
              />
            </Suspense>
          </View>

          <View style={{margin: 15, marginTop: 18, marginBottom: 10}}>
            <FavoriteComponent {...props}/>
            {/* <View>
              {like === false ? (
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
                    alert('Favorite tutor sucessfully !');
                    setLike(!like);
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
                    alert('Unfavorite tutor sucessfully !');
                    setLike(!like);
                  }}
                />
              )}
            </View> */}
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
                  {/* <Text style={{color: 'orange'}}>{3}/5 </Text> */}
                  <Text style={{color: 'orange'}}>{detailTutor.result.avgRating}/5 </Text>
                  <Image source={require('../../../../../assets/rating.png')} />
                </View>
                {isDarkTheme ? 
                <View style={{backgroundColor: 'white'}}>
                  <CountryPicker
                    //withFlag
                    //withFilter
                    withCountryNameButton
                    countryCode={props.route.params.tutor.country}
                    onSelect={country => {}
                    }
                  />
                </View>
                :<View>
                  <CountryPicker
                    //withFlag
                    //withFilter
                    withCountryNameButton
                    countryCode={props.route.params.tutor.country}
                    onSelect={country => {}
                    }
                  />
                </View>}
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
              onPress={toggleModalBooking}>
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
              <Text style={{color: isDarkTheme ? 'yellow' : MAIN_COLOR}}>{props.route.params.tutor.languages}</Text>
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
              <Text style={{color: isDarkTheme ? 'yellow' : MAIN_COLOR}}>{props.route.params.tutor.specialties}</Text>
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
              {langState[langState.currentLang].Rating_and_Comments} ({props.route.params.tutor.feedbacks.length})
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
              //onPress={toggleModal}>
              onPress={()=>props.navigation.navigate("TutorDetailComment", {feedbacks: props.route.params.tutor.feedbacks})}
              >
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
        {/* <View style={{backgroundColor: 'white'}}>
          <Modal isVisible={isModalVisible}>
            <View
              style={{backgroundColor: 'white', width: '100%', height: '80%'}}>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 5,
                  marginBottom: 5,
                  fontWeight: 'bold',
                  marginTop: 5,
                  fontSize: 15,
                }}>
                Comments: (scroll to see all)
              </Text>
              <FlatList
                style={{marginBottom: 20, marginTop: 10}}
                //ListHeaderComponentStyle={{marginBottom: -20}}
                ItemSeparatorComponent={FlatListItemSeparator}
                showsVerticalScrollIndicator={true}
                initialNumToRender={2}
                data={array}
                renderItem={i => (
                  //<View><Text>{JSON.stringify(i.item)}</Text></View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 5,
                        marginTop: 8,
                        marginLeft: 5,
                      }}>
                      <View>
                        <FastImage
                          style={{width: 30, height: 30, borderRadius: 15}}
                          resizeMode={FastImage.resizeMode.cover}
                          source={{
                            uri: `${i.item.avatar}`,
                            priority: FastImage.priority.normal,
                          }}
                        />
                      </View>
                      <View style={{justifyContent: 'space-between'}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'black',
                            marginLeft: 6,
                            fontWeight: 'bold',
                          }}>
                          {i.item.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 1,
                            marginLeft: 20,
                          }}>
                          <Text style={{color: 'orange'}}>
                            {i.item.rating}/5{' '}
                          </Text>
                          <Image
                            source={require('../../../../../assets/rating.png')}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={{marginLeft: 5}}>
                      <Text style={{color: 'black'}}>{i.item.comment}</Text>
                    </View>
                    <View>
                      <Text style={{textAlign: 'right'}}>
                        {i.item.timestamp}
                      </Text>
                    </View>
                  </View>
                )}
              />
              <View style={{alignItems: 'center', marginTop: 30}}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    borderRadius: 40,
                    backgroundColor: '#e54594',
                    paddingVertical: 10,
                    marginBottom: 5,
                  }}
                  onPress={toggleModal}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View> */}
        <View style={{backgroundColor: 'white'}}>
          <Modal isVisible={isModalVisibleBooking}>
            <View
              style={{backgroundColor: 'white', width: '100%', height: '80%'}}>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 5,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  marginTop: 5,
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                Picking your date
              </Text>
              {arrayDateTime.map((datetime, index) => (
                <View
                  style={{marginHorizontal: 15, marginBottom: 6}}
                  key={index}>
                  <Pressable
                    style={{
                      borderRadius: 40,
                      backgroundColor: MAIN_COLOR,
                      paddingVertical: 10,
                    }}
                    onPress={() =>
                      setIsClick(
                        arrayIsClick.map((v, i) => (i === index ? true : v)),
                      )
                    }>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 16,
                      }}>
                      {datetime.date}
                    </Text>
                  </Pressable>
                  {isClick[index] ? (
                    <ModalTime
                      setIsClick={setIsClickHandler}
                      student={'Nguyễn Minh Thông'}
                      tutor={'April Corpuz'}
                      arrayDateTime={arrayDateTime}
                      id={index}
                      isVisible={true}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>
              ))}
              <View style={{alignItems: 'center', marginTop: 25}}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    borderRadius: 40,
                    backgroundColor: '#e54594',
                    paddingVertical: 10,
                    marginBottom: 5,
                  }}
                  onPress={toggleModalBooking}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        {/* <View style={{backgroundColor: 'white'}}>
          <Modal isVisible={isModalVisibleReport}>
            <View
              style={{backgroundColor: 'white', width: '100%', height: '60%'}}>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 5,
                  marginBottom: 15,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Help us understand what's happening...
              </Text>
              <View style={{borderWidth: 1, marginHorizontal: 5, marginBottom: 10}}>
                <TextInput multiline={true} numberOfLines={5}></TextInput>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    borderRadius: 40,
                    backgroundColor: '#e54594',
                    paddingVertical: 10,
                    marginBottom: 5,
                  }}
                  onPress={toggleModalReport}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    Send report
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View> */}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 200,
    marginBottom: 30,
  },
  buttonControl: {
    width: '40%',
    left: '30%',
  },
});

export default TutorDetailNew;

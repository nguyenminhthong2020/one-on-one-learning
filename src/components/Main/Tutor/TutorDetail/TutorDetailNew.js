/* eslint-disable */
import React, {Suspense, useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  // StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  //Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
//import Video from 'react-native-video';
//import {WebView} from 'react-native-webview';
//import testVideo from '../../../../../assets/video/test-video.mp4';
import {
  MAIN_COLOR,
  MAIN_CORLOR,
  SECOND_COLOR,
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
import ListTags from '../../../_common/ListTags/ListTags';

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 0,
        borderWidth: 1,
        marginBottom: 5,
      }}
    />
  );
};
const FavoriteComponent = () => {
  console.log('Render lại tim <3');
  const [like, setLike] = useState(false);

  return (
    <View>
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
  price > balance ? Alert.alert(
    `BOOKING DETAILS: FAIL`,
    `1) Student: ${student}, tutor: ${tutor}. \n2) ${date}, ${time} \n3) Balance: ${balance}, Price: ${price}`,
    [
      {
        text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
        style: 'Cancel',
      },
    ],
    {cancelable: true},
  ):(
    Alert.alert(
      `BOOKING DETAILS: `,
      `1) Student: ${student}, tutor: ${tutor}. \n2) ${date}, ${time} \n3) Balance: ${balance}, Price: ${price}`,
      [
        {
          text: 'Book',
          onPress: () => {console.log('Complete Book'), BookingSuccess()},
          style: 'Cancel',
        },
        {
          text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
          style: 'Cancel',
        },
      ],
      {cancelable: true},
  ))

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
const ModalTime = props => {   //props: student, tutor, arrayDateTime, id, isVisible
  const [isModalVisibleTime, setModalVisibleTime] = useState(props.isVisible);
  const toggleModalTime = () => {
    setModalVisibleTime(!isModalVisibleTime);
  };
  onPressHandler = (student, tutor, arrayDateTime, id, time) =>{
    //alert(`Student ${student}, Tutor ${tutor}, Date ${props.arrayDateTime[props.id].date}, Time ${time}`)
    BookingDetailAlert(student, tutor, props.arrayDateTime[props.id].date, time, 2, 2);
    toggleModalTime();
    props.setIsClick(false);
  }
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
            Picking your time
          </Text>
          { props.arrayDateTime[props.id].time.map((time, index) => (
            <View style={{marginHorizontal: 15, marginBottom: 6}} key={index}>
              <TouchableOpacity
                style={{
                  borderRadius: 40,
                  backgroundColor: MAIN_COLOR,
                  paddingVertical: 10,
                }}
                onPress={()=>onPressHandler(props.student, props.tutor, props.arrayDateTime, props.id, time)}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  {time}
                </Text>
              </TouchableOpacity>
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
const TutorDetailNew = (props) => {
  //const video = React.useRef(null);
  //const [status, setStatus] = React.useState({});
  const [like, setLike] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleBooking, setModalVisibleBooking] = useState(false);
  
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
  
  const setIsClickHandler = (value) => setIsClick(arrayIsClick.map((v, i) => i === value ? false : v));
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

  const myUrl = `https://api.app.lettutor.com/video/cd0a440b-cd19-4c55-a2a2-612707b1c12cvideo1631029793846.mp4`;
  //const _myUrl = Constants.linkingUri(myUrl);
  const array = [
    {
      id: 0,
      name: 'Thông',
      avatar:
        'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
      comment: 'Interesting hour. Thank you very much !',
      rating: 5,
      timestamp: '21:00:05 01/10/2021',
    },
    {
      id: 1,
      name: 'Tuấn',
      avatar: 'https://avatarfiles.alphacoders.com/739/thumb-73989.jpg',
      comment: 'Very good. Thank you',
      rating: 4.5,
      timestamp: '13:05:05 28/09/2021',
    },
    {
      id: 2,
      name: 'Sỹ',
      avatar: 'https://avatarfiles.alphacoders.com/739/thumb-73989.jpg',
      comment: 'Interesting hour. Thank you very much !',
      rating: 5,
      timestamp: '21:00:05 01/10/2021',
    },
    {
      id: 3,
      name: 'Thịnh',
      avatar:
        'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
      comment: 'Interesting hour. Thank you very much !',
      rating: 5,
      timestamp: '21:00:05 01/10/2021',
    },
    {
      id: 4,
      name: 'Hari',
      avatar:
        'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
      comment: 'Interesting hour. Thank you very much !',
      rating: 5,
      timestamp: '21:00:05 01/10/2021',
    },
    {
      id: 5,
      name: 'Thành',
      avatar:
        'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
      comment: 'Interesting hour. Thank you very much !',
      rating: 5,
      timestamp: '21:00:05 01/10/2021',
    },
    {
      id: 6,
      name: 'Thy',
      avatar:
        'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
      comment: 'Interesting hour. Thank you very much !',
      rating: 5,
      timestamp: '21:00:05 01/10/2021',
    },
  ];
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
              //marginBottom: 15,
            }}>
            <Suspense
              fallback={<ActivityIndicator size="large" color="#00ff00" />}>
              <SectionVideo
                uri={
                  'https://api.app.lettutor.com/video/cd0a440b-cd19-4c55-a2a2-612707b1c12cvideo1631029793846.mp4'
                }
              />
            </Suspense>
          </View>

          <View style={{margin: 15, marginTop: 18, marginBottom: 10}}>
            <FavoriteComponent />
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
                    uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
                    priority: FastImage.priority.normal,
                  }}
                />
              </View>
              <View style={{justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginLeft: 6,
                    fontWeight: 'bold',
                  }}>
                  {'April Corpuz'}
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
                  <Text style={{color: 'orange'}}>{5}/5 </Text>
                  <Image source={require('../../../../../assets/rating.png')} />
                </View>
                <View>
                  <Text>{'  '}Philippines (the)</Text>
                </View>
              </View>
            </View>

            {/* <Text
              numberOfLines={NUM_OF_LINES}
              style={{fontSize: 15, color: 'black', marginTop: 5}}>
              {props.tutor.description}
            </Text> */}
          </View>

          <View style={{marginHorizontal: 15}}>
            <TouchableOpacity
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
                Booking
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <View>
              <TouchableOpacity onPress={() => props.navigation.navigate("TutorMessage")}>
                <View style={{alignItems: 'center'}}>
                  <View style={{marginBottom: 3}}>
                    <MaterialIcons
                      name={'message'}
                      size={27}
                      color={MAIN_COLOR}
                      // style={{
                      //   textAlign: 'right',
                      //   marginBottom: -50,
                      //   marginRight: 10,
                      // }}
                      // onPress={() => {
                      //   alert("Message")
                      // }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: MAIN_COLOR,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Message
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => ReportAlert('April Corpuz')}>
                <View style={{alignItems: 'center'}}>
                  <View style={{marginBottom: 3}}>
                    <MaterialIcons
                      name={'report'}
                      size={27}
                      color={MAIN_COLOR}
                      // style={{
                      //   textAlign: 'right',
                      //   marginBottom: -50,
                      //   marginRight: 10,
                      // }}
                      // onPress={ReportAlert}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: MAIN_COLOR,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Report
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 20, marginHorizontal: 15}}>
            <Text style={{fontSize: 16, color: 'black'}}>
              Hello there! I am an Industrial Engineer in the profession but
              chose to do online teaching because I love to meet different
              learners. I am an outgoing person and I have this passion for
              dealing with different people and seeing them progress with my
              help as their teacher. In fact, making friends is one of my best
              skills. I am very good at adapting to new environments and new
              situations. I am very friendly and can easily get along well with
              everyone. I have obtained a 120-Hour TEFL Certificate. I get a
              variety of teaching techniques. I know that there are fast and not
              so fast learners. So don't worry, I will be with you every step of
              the way going at your own pace. Let's practice what you already
              know and add something new each day. With my skills and
              experiences, I can assure you that I can provide adequate English
              learning effectively and efficiently. Together, let's make English
              learning fun.
            </Text>
          </View>
          <View style={{marginTop: 30, marginHorizontal: 15}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Languages
            </Text>
            <View style={{marginLeft: 5}}>
              <ListTags arr={['English', 'Tagalog']} />
            </View>
          </View>
          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Education
            </Text>
            <Text style={{marginLeft: 5}}>
              I have graduated with a degree in Bachelor of Science, major in
              Industrial Engineering, from a reputable university, Saint Louis
              University, Baguio City.
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
              Expericence
            </Text>
            <Text style={{marginLeft: 5}}>
              I have been teaching English online since 2020 catering to
              Japanese and Chinese students.
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
              Interest
            </Text>
            <Text style={{marginLeft: 5}}>
              Cooking, Mingling with kids, Watch my small retail store,
              Travelling
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
              Profession
            </Text>
            <Text style={{marginLeft: 5}}>Online English Teacher</Text>
          </View>
          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Specialities
            </Text>
            <View style={{marginLeft: 5}}>
              <ListTags
                arr={[
                  'EnglishforBussiness',
                  'Conversational',
                  'EnglishforKids',
                  'STARTERS',
                  'MOVERS',
                ]}
              />
            </View>
          </View>

          <View style={{marginTop: 25, marginHorizontal: 15}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Course
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
              Rating and Comments (13)
            </Text>
          </View>
          <View
            style={{alignItems: 'center', marginTop: 30, marginBottom: '20%'}}>
            <TouchableOpacity
              style={{
                width: '50%',
                borderRadius: 40,
                backgroundColor: '#e54594',
                paddingVertical: 10,
              }}
              onPress={toggleModal}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                Click to see
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor: 'white'}}>
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
        </View>
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
                  <TouchableOpacity
                    style={{
                      borderRadius: 40,
                      backgroundColor: MAIN_COLOR,
                      paddingVertical: 10,
                    }}
                    onPress={()=>setIsClick(arrayIsClick.map((v, i) => i === index?true:v))}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 16,
                      }}>
                      {datetime.date}
                    </Text>
                  </TouchableOpacity>
                  {isClick[index]?(<ModalTime setIsClick={setIsClickHandler} student={"Nguyễn Minh Thông"} tutor={"April Corpuz"} arrayDateTime={arrayDateTime} id={index} isVisible={true}/>):(<View></View>)} 
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

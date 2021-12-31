/* eslint-disable */
// // request: 

// https://sandbox.api.lettutor.com/tutor/register
// (POST)

// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNTY5YzIwMi03YmJmLTQ2MjAtYWY3Ny1lY2MxNDE5YTZiMjgiLCJpYXQiOjE2NDA3MDA1NjAsImV4cCI6MTY0MDc4Njk2MCwidHlwZSI6ImFjY2VzcyJ9.ekR8pcriOlJ9X6DUGnB2JUr6SSaC4STRLi2Tlg-9U78
// Content-Length: 59417479
// Content-Type: multipart/form-data; boundary=----WebKitFormBoundary3R4lbsrgrtfDUBRb

// payload: 
// name: John Xina
// country: VN
// birthday: 1997-04-30
// interests: I like reading book in my spare time
// education: University of Science
// experience: 3 years
// profession: WWE, Online English teacher
// languages: en,vi
// bio: You can't Xi me ! Bing chilling !
// targetStudent: Beginner
// specialties: english-for-kids,business-english,conversational-english,starters,movers,flyers,ket,pet,ielts,toefl,toeic
// avatar: (binary)
// video: (binary)
// price: 50000


// res: 
// {"id":"db37f185-399f-470d-995b-bf6143cb1a5f","isActivated":false,"isNative":false,"interests":"I like reading book in my spare time","education":"University of Science","experience":"3 years","profession":"WWE, Online English teacher","languages":"en,vi","bio":"You can't Xi me ! Bing chilling !","targetStudent":"Beginner","specialties":"english-for-kids,business-english,conversational-english,starters,movers,flyers,ket,pet,ielts,toefl,toeic","video":"https://sandbox.api.lettutor.com/video/f569c202-7bbf-4620-af77-ecc1419a6b28video1640700713385.mp4","userId":"f569c202-7bbf-4620-af77-ecc1419a6b28","updatedAt":"2021-12-28T14:11:54.006Z","createdAt":"2021-12-28T14:11:54.006Z","accent":null,"resume":null,"price":50000}

// {
//     id: "db37f185-399f-470d-995b-bf6143cb1a5f",
//     isActivated: false,
//     isNative: false,
//     interests: "I like reading book in my spare time",
//     education: "University of Science",
//     experience: "3 years",
//     profession: "WWE, Online English teacher",
//     languages: "en,vi",
//     bio: "You can't Xi me ! Bing chilling !",
//     targetStudent: "Beginner",
//     specialties: "english-for-kids,business-english,conversational-english,starters,movers,flyers,ket,pet,ielts,toefl,toeic",
//     video: "https://sandbox.api.lettutor.com/video/f569c202-7bbf-4620-af77-ecc1419a6b28video1640700713385.mp4",
//     userId: "f569c202-7bbf-4620-af77-ecc1419a6b28",
//     updatedAt: "2021-12-28T14:11:54.006Z",
//     createdAt: "2021-12-28T14:11:54.006Z",
//     accent: null,
//     resume: null,
//     price: 50000
//   }
import React, {useState, useCallback} from 'react';
import {
  Pressable,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {MAIN_COLOR} from '../../../../globals/constant';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerModal} from '../../../_common/ImagePicker/image-picker-modal';
import SectionVideo from '../../Tutor/TutorDetail/SectionVideo';
import axios from 'axios';
import {BASE_URL} from '../../../../globals/constant';
import {useDispatch, useSelector} from 'react-redux';
import { initNew } from '../../../../redux/slices/auth/loginSlice';

const VideoIntroduction = props => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.auth.current);
  const langState = useSelector(state => state.lang);
  const [file, setFile] = useState({
    uri: ``,
    name: ``,
    type: ``,
    size: 0,
    fileName: '',
  });
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'video',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.hasOwnProperty('assets')) {
        setFile({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          size: response.assets[0].fileSize,
          fileName: response.assets[0].fileName,
        });
      }
    });
  }, []);

  const onCameraPress = React.useCallback(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const options = {
            selectionLimit: 1,
            mediaType: 'video',
            includeBase64: false,
          };

          ImagePicker.launchCamera(options, response => {
            if (response.hasOwnProperty('assets')) {
              setFile({
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
                size: response.assets[0].fileSize,
                fileName: response.assets[0].fileName,
              });
            }
          });
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  const onDone = async () => {
    if (file.uri == '') {
      alert('Please upload video !');
    } else {
      const datas = new FormData();
      datas.append('name', props.route.params.name);
      datas.append('country', props.route.params.country);
      datas.append('birthday', props.route.params.birthday);
      datas.append('interests', props.route.params.interests);
      datas.append('education', props.route.params.education);
      datas.append('experience', props.route.params.experience);
      datas.append('profession', props.route.params.profession);
      datas.append('languages', props.route.params.languages);
      datas.append('bio', props.route.params.bio);
      datas.append('targetStudent', props.route.params.targetStudent);
      datas.append('specialties', props.route.params.specialties);
      datas.append('avatar', {
        uri: props.route.params.avatar.uri,
        type: props.route.params.avatar.type,
        name: props.route.params.avatar.name,
      });
      datas.append(
        'avatar',
        JSON.stringify({size: props.route.params.avatar.size}),
      );
      datas.append('video', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
      datas.append('video', JSON.stringify({size: file.size}));
      datas.append('price', props.route.params.price);
      // console.log(datas);
      // const axiosInstance = axios.create({
      //   baseURL: BASE_URL,
      //   headers: {
      //     Authorization: 'Bearer ' + current.tokens.access.token,
      //     'Content-Type': 'multipart/form-data'
      //   },
      // });
      axios
          .post(`${BASE_URL}tutor/register`, datas, {
            headers: {
              Authorization: 'Bearer ' + current.tokens.access.token,
              'Content-Type': 'multipart/form-data',
            },
          })
        .then(res => {
          //console.log("post nè:" + res.data)
          const axiosInstance1 = axios.create({
            baseURL: BASE_URL,
            headers: {
              Authorization: 'Bearer ' + current.tokens.access.token,
            },
          });
          axiosInstance1
            .get(`user/info`)
            .then(res1 => {
              //console.log("info : "+res1.data.user)
              const newCurrent = {
                tokens: current.tokens,
                user: res1.data.user
              }
              dispatch(
                initNew({
                  current: newCurrent,
                }),
              );
              props.navigation.navigate('Approval');
            })
            .catch(err1 => console.log(err1));
        })
        .catch(err => {
          if (JSON.stringify(err).includes('message')) {
            alert('FAIL:\n' + err.response.data.message);
          } else {
            alert('FAIL:\n' + err);
          }
        });
    }
  };

  return (
    <ScrollView>
      <View>
        {file.uri != '' && (
          <View
            style={{
              backgroundColor: 'gray',
              borderWidth: 1,
              borderColor: MAIN_COLOR,
            }}>
            <SectionVideo uri={file.uri} navigation={props.navigation} />
          </View>
        )}
        <TouchableOpacity
          style={{
            width: '50%',
            borderWidth: 1,
            borderColor: MAIN_COLOR,
            marginTop: 30,
            marginLeft: '25%',
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: 'white',
          }}
          onPress={() => setVisible(true)}>
          <Text style={{textAlign: 'center', fontSize: 16, color: MAIN_COLOR}}>
            {langState.currentLang=='en'?'Choose video':'Chọn video'}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
            marginHorizontal: 15,
          }}>
          <Pressable
            style={{
              width: '25%',
              borderWidth: 1,
              borderColor: MAIN_COLOR,
              marginTop: 30,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: 'white',
            }}
            onPress={() => props.navigation.navigate('BecomeTutor')}>
            <Text
              style={{textAlign: 'center', fontSize: 16, color: MAIN_COLOR}}>
              {langState.currentLang=='en'?'Previous':'Quay lại'}
            </Text>
          </Pressable>
          <Pressable
            style={{
              width: '25%',
              borderWidth: 1,
              borderColor: MAIN_COLOR,
              marginTop: 30,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: MAIN_COLOR,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 16, color: 'white'}}
              onPress={onDone}>
              {langState.currentLang=='en'?'Done':'Hoàn tất'}
            </Text>
          </Pressable>
        </View>
        <Text
          style={{
            marginHorizontal: 6,
            fontSize: 15,
            marginTop: 20,
            color: 'black',
          }}>
          Let students know what they can expect from a lesson with you by
          recording a video highlighting your teaching style (1-3 minutes),
          expertise and personality. Students can be nervous to speak with a
          foreigner, so it really helps to have a friendly video that introduces
          yourself and invites students to call you.
        </Text>
        <ImagePickerModal
          isVisible={visible}
          onClose={() => setVisible(false)}
          onImageLibraryPress={onImageLibraryPress}
          onCameraPress={onCameraPress}
        />
      </View>
    </ScrollView>
  );
};

export default VideoIntroduction;

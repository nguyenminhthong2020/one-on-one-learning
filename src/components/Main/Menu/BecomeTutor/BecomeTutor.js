/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
import {
  MAIN_COLOR,
  SECOND_COLOR,
  THIRD_COLOR,
  BASE_URL,
} from '../../../../globals/constant';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  PermissionsAndroid,
  LogBox,
} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import Button from '../../../_common/Button/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import {Picker} from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {logout, initNew} from '../../../../redux/slices/auth/loginSlice';
import {convertSubject, convertTestPre} from '../../../../utils/utils';

import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerAvatar} from '../../../_common/ImagePicker/image-picker-avatar';
import {ImagePickerModal} from '../../../_common/ImagePicker/image-picker-modal';

const BecomeTutor = props => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const dispatch = useDispatch();

  const current = useSelector(state => state.auth.current);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const langState = useSelector(state => state.lang);

  const axiosInstance1 = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });
  useEffect(() => {
    if (
      new Date(current.tokens.access.expires).getTime() <= new Date().getTime()
    ) {
      if (
        new Date(current.tokens.refresh.expires).getTime() <=
        new Date().getTime()
      ) {
        dispatch(logout());
        props.navigation.navigate('Login');
      } else {
        (async () => {
          const resRefresh = await axiosInstance1.post('auth/refresh-token', {
            refreshToken: current.tokens.refresh.token,
            timezone: 7,
          });
          dispatch(
            initNew({
              current: resRefresh.data,
            }),
          );
        })();
      }
    } else {
      axiosInstance1
        .get('user/info')
        .then(res => {
          if (JSON.stringify(res.data.user).includes('tutorInfo')) {
            if(res.data.user.tutorInfo != null){
              props.navigation.navigate("Approval")
            }
          }
        })
        .catch(err => console.log(err));
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const arrWhatToLearn = [
    {item: 'English for Kids', id: 3},
    {item: 'Business English', id: 4},
    {item: 'Conversational English', id: 5},
  ];
  const arrWhatToLearn1 = [
    {item: 'STARTERS', id: 1},
    {item: 'MOVERS', id: 2},
    {item: 'FLYERS', id: 3},
    {item: 'KET', id: 4},
    {item: 'PET', id: 5},
    {item: 'IELTS', id: 6},
    {item: 'TOEFL', id: 7},
    {item: 'TOEIC', id: 8},
  ];

  let newwhatToLearn;
  if (current.user.hasOwnProperty('learnTopics')) {
    newwhatToLearn = [...current.user.learnTopics].map(function (item) {
      return {
        item: item.name,
        id: item.id,
      };
    });
  } else {
    newwhatToLearn = [];
  }
  let newwhatToLearn1;
  if (current.user.hasOwnProperty('learnTopics')) {
    newwhatToLearn1 = [...current.user.testPreparations].map(function (item) {
      return {
        item: item.name,
        id: item.id,
      };
    });
  } else {
    newwhatToLearn1 = [];
  }

  const _birthday = (
    current.user.birthday != null ? current.user.birthday : '1998-10-27'
  ).substring(0, 10);
  let _country;
  if(current.user.hasOwnProperty('country'))
  {
    _country =  current.user.country != null ? current.user.country : 'VN';
    if(_country.length != 2 || _country[0] == '+' || _country[0] == '0')
    {
      _country = 'VN';
    }
  }else{
    _country = 'VN';
  }

  const [whatToLearn, setWhatToLearn] = useState(newwhatToLearn);
  const [whatToLearn1, setWhatToLearn1] = useState(newwhatToLearn1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthday, setBirthday] = useState(_birthday);
  const [interests, setInterests] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  const [targetStudent, setTargetStudent] = useState('');
  const [targetStudent1, setTargetStudent1] = useState('');
  const [targetStudent2, setTargetStudent2] = useState('');
  //const [country, setCountry] = useState({name: 'Vietnam', cca2: 'VN'});
  const [country, setCountry] = useState({name: '', cca2: _country});
  const [name, setName] = useState(current.user.name);

  // image Picker:
  const [file, setFile] = useState({
    uri: current.user.avatar,
    name: ``,
    type: ``,
    size: 0,
    fileName: '',
  });

  const [visible, setVisible] = useState(false);
  const onImageLibraryPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, response => {

      // setState
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
            mediaType: 'photo',
            includeBase64: false,
          };

          ImagePicker.launchCamera(options, response => {
            // setState
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
  //const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  const onChangeBirthday = e => {
    setShowDatePicker(false);
    if (e.nativeEvent.timestamp === undefined) {
      return;
    }
    const str = JSON.stringify(e.nativeEvent.timestamp);
    let _birthday = str.slice(1, 11);
    setBirthday(_birthday);
  };

  const onSubmit = data => {
    let specialties = '';
    for (let i = 0; i < whatToLearn.length; i++) {
      specialties = specialties + convertSubject(whatToLearn[i].id) + ',';
    }
    for (let j = 0; j < whatToLearn1.length; j++) {
      specialties = specialties + convertTestPre(whatToLearn1[j].id) + ',';
    }
    if (specialties.length > 0) {
      specialties = specialties.substring(0, specialties.length - 1);
    }

    let languages = '';
    if (targetStudent1 == '' && targetStudent2 != '') {
      languages = targetStudent2;
    }
    if (targetStudent1 != '' && targetStudent2 == '') {
      languages = targetStudent1;
    }
    if (targetStudent1 != '' && targetStudent2 != '') {
      languages = targetStudent1 + ',' + targetStudent2;
    }
    props.navigation.navigate('VideoIntroduction', {
      avatar: {
        uri: file.uri,
        type: file.type,
        name: file.name,
        size: file.size,
      },
      name: name,
      country: country.cca2,
      birthday: birthday,
      interests: interests,
      education: education,
      experience: experience,
      profession: profession,
      languages: languages,
      bio: bio,
      targetStudent: targetStudent,
      specialties: specialties,
      price: 50000,
    });
  };

  function onMultiChange() {
    return item => setWhatToLearn(xorBy(whatToLearn, [item], 'id'));
  }
  function onMultiChange1() {
    return item => setWhatToLearn1(xorBy(whatToLearn1, [item], 'id'));
  }

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 20,
            color: THIRD_COLOR,
            fontWeight: 'bold',
            marginBottom: 12,
          }}>
          {langState.currentLang=='en'?'Basic Info':'Thông tin cơ bản'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <ImagePickerAvatar uri={file.uri} onPress={() => setVisible(true)} />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 5,
            }}></View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <View style={{paddingLeft: 0, justifyContent: 'center'}}>
            <Text
              style={{fontSize: 17, color: isDarkTheme ? 'white' : MAIN_COLOR}}>
              {langState[langState.currentLang].Name}:
            </Text>
          </View>
          <View style={{marginLeft: 18, backgroundColor: 'white'}}>
            <TextInput
              style={{borderWidth: 1, width: 220, height: 40, fontSize: 15}}
              value={name}
              defaultValue={current.user.name}
              placeholder={'Name'}
              onChangeText={value => setName(value)}
            />
          </View>
        </View>
        <Controller
          control={control}
          name="country"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.container1}>
              <View>
                <Ionicons
                  name={'location'}
                  size={25}
                  color={MAIN_COLOR}
                  style={{paddingLeft: 12}}
                />
              </View>
              <View style={{marginLeft: 35}}>
                <CountryPicker
                  withFlag
                  withFilter
                  withCountryNameButton
                  countryCode={country.cca2}
                  onSelect={country =>
                    setCountry({cca2: country.cca2, name: country.name})
                  }
                />
              </View>
            </View>
          )}
        />

        <View style={[styles.container1, {marginBottom: 20}]}>
          <View>
            <FontAwesome
              name={'birthday-cake'}
              size={25}
              color={MAIN_COLOR}
              style={{paddingLeft: 12}}
            />
          </View>
          <View style={{marginLeft: 35, backgroundColor: 'white'}}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  width: 105,
                  height: 40,
                  fontSize: 16,
                  borderRightWidth: 1,
                  marginRight: 5,
                  textAlign: 'center',
                }}
                value={birthday}
                onChangeText={str => setBirthday(str)}
              />
              <Pressable
                style={{marginRight: 5}}
                onPress={() => setShowDatePicker(true)}>
                <FontAwesome name="calendar" color="black" size={20} />
              </Pressable>
            </View>
            {showDatePicker && (
              <RNDateTimePicker
                mode="date" // có thể dùng mode="time"
                value={new Date(birthday)}
                minimumDate={new Date(1920, 1, 1)}
                maximumDate={new Date()}
                onChange={e => onChangeBirthday(e)}
                is24Hour={true}
              />
            )}
          </View>
        </View>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 20,
            color: THIRD_COLOR,
            fontWeight: 'bold',
            marginBottom: 12,
            marginTop: 3,
          }}>
          CV
        </Text>
        <Text
          style={{
            marginHorizontal: 12,
            fontSize: 15,
            marginBottom: 10,
            color: isDarkTheme ? 'white' : 'black',
          }}>
          {langState.currentLang=='en'?'In order to protect your privacy, please do not share your personal information (email, phone number, social email, skype, etc) in your profile.':`Để bảo vệ quyền riêng tự, xin đừng chia sẻ thông tin cá nhân của bạn (email, điện thoại,...) trong profile`}
        </Text>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            marginBottom: 5,
            fontWeight: 'bold',
            color: isDarkTheme ? 'yellow' : MAIN_COLOR,
          }}>
          {langState.currentLang=='en'?'Interests':'Điều quan tâm'}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            fontSize: 15,
            marginHorizontal: 12,
            backgroundColor: 'white',
            marginBottom: 5,
          }}
          numberOfLines={3}
          multiline
          onChangeText={value => setInterests(value)}
        />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            marginBottom: 5,
            fontWeight: 'bold',
            color: isDarkTheme ? 'yellow' : MAIN_COLOR,
          }}>
          {langState.currentLang=='en'?'Education':'Học vấn'}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            fontSize: 15,
            marginHorizontal: 12,
            backgroundColor: 'white',
            marginBottom: 5,
          }}
          numberOfLines={3}
          multiline
          onChangeText={value => setEducation(value)}
        />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            marginBottom: 5,
            fontWeight: 'bold',
            color: isDarkTheme ? 'yellow' : MAIN_COLOR,
          }}>
          {langState.currentLang=='en'?'Experience':'Kinh nghiệm'}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            fontSize: 15,
            marginHorizontal: 12,
            backgroundColor: 'white',
          }}
          numberOfLines={3}
          multiline
          onChangeText={value => setExperience(value)}
        />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            marginBottom: 5,
            fontWeight: 'bold',
            color: isDarkTheme ? 'yellow' : MAIN_COLOR,
          }}>
          {langState.currentLang=='en'?'Current or Previous Profession':'Nghề nghiệp gần nhất'}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            fontSize: 15,
            marginHorizontal: 12,
            backgroundColor: 'white',
          }}
          numberOfLines={3}
          multiline
          onChangeText={value => setProfession(value)}
        />
        <View
          style={{
            paddingLeft: '10%',
            marginBottom: 25,
            backgroundColor: isDarkTheme ? 'white' : SECOND_COLOR,
          }}>
        </View>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 20,
            color: THIRD_COLOR,
            fontWeight: 'bold',
            marginBottom: 12,
            marginTop: 10,
          }}>
          {langState.currentLang=='en'?'Languages I speak':'Ngôn ngữ sử dụng'}
        </Text>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            marginBottom: 5,
            fontWeight: 'bold',
            color: isDarkTheme ? 'yellow' : MAIN_COLOR,
          }}>
          {langState.currentLang=='en'?'Language 1:':'Ngôn ngữ 1'}
        </Text>
        <Picker
          style={{
            width: 170,
            height: 35,
            borderColor: '#ddd',
            borderWidth: 1,
            color: 'black',
            marginLeft: 90,
            backgroundColor: 'white',
          }}
          selectedValue={targetStudent1}
          onValueChange={itemValue => setTargetStudent1(itemValue)}>
          <Picker.Item label="(None)" value="" />
          <Picker.Item label="Arabic" value="Arabic" />
          <Picker.Item label="Bengali" value="Bengali" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Filipino" value="Filipino" />
          <Picker.Item label="French" value="French" />
          <Picker.Item label="German" value="German" />
          <Picker.Item label="Hindi" value="Hindi" />
          <Picker.Item label="Indonesian" value="Indonesian" />
          <Picker.Item label="Italian" value="Italian" />
          <Picker.Item label="Japanese" value="Japanese" />
          <Picker.Item label="Korean" value="Korean" />
          <Picker.Item label="Mandarin" value="Mandarin" />
          <Picker.Item label="Portuguese" value="Portuguese" />
          <Picker.Item label="Russian" value="Russian" />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="Tagalog" value="Tagalog" />
          <Picker.Item label="Vietnamese" value="Vietnamese" />
        </Picker>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            marginBottom: 5,
            fontWeight: 'bold',
            marginTop: 8,
            color: isDarkTheme ? 'yellow' : MAIN_COLOR,
          }}>
          {langState.currentLang=='en'?'Language 2:':'Ngôn ngữ 2'}
        </Text>
        <Picker
          style={{
            width: 170,
            height: 35,
            borderColor: '#ddd',
            borderWidth: 1,
            color: 'black',
            marginLeft: 90,
            backgroundColor: 'white',
          }}
          selectedValue={targetStudent2}
          onValueChange={itemValue => setTargetStudent2(itemValue)}>
          <Picker.Item label="(None)" value="" />
          <Picker.Item label="Arabic" value="Arabic" />
          <Picker.Item label="Bengali" value="Bengali" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Filipino" value="Filipino" />
          <Picker.Item label="French" value="French" />
          <Picker.Item label="German" value="German" />
          <Picker.Item label="Hindi" value="Hindi" />
          <Picker.Item label="Indonesian" value="Indonesian" />
          <Picker.Item label="Italian" value="Italian" />
          <Picker.Item label="Japanese" value="Japanese" />
          <Picker.Item label="Korean" value="Korean" />
          <Picker.Item label="Mandarin" value="Mandarin" />
          <Picker.Item label="Portuguese" value="Portuguese" />
          <Picker.Item label="Russian" value="Russian" />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="Tagalog" value="Tagalog" />
          <Picker.Item label="Vietnamese" value="Vietnamese" />
        </Picker>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 20,
            color: THIRD_COLOR,
            fontWeight: 'bold',
            marginBottom: 12,
            marginTop: 20,
          }}>
          {langState.currentLang=='en'?'Who I teach':'Người tôi học'}
        </Text>
        <Text
          style={{
            marginHorizontal: 12,
            fontSize: 15,
            marginBottom: 10,
            color: isDarkTheme ? 'white' : 'black',
          }}>
          {langState.currentLang=='en'?`This is the first thing students will see when looking for tutors.`:`Đây là thông tin học viên sẽ thấy đầu tiên khi vào xem` }
        </Text>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            marginBottom: 5,
            fontWeight: 'bold',
            color: isDarkTheme?'yellow':MAIN_COLOR
          }}>
          {langState.currentLang=='en'?'Introduction':'Giới thiệu'}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            fontSize: 15,
            marginHorizontal: 12,
            backgroundColor: 'white',
          }}
          numberOfLines={3}
          multiline
          onChangeText={value => setBio(value)}
        />
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            marginBottom: 5,
            fontWeight: 'bold',
            marginTop: 5,            
            color: isDarkTheme?'yellow':MAIN_COLOR
          }}>
          {langState.currentLang=='en'?`I am best at teaching students who are`:'Tôi giỏi nhất là dạy cho học viên'}
        </Text>
        <Picker
          style={{
            width: 170,
            height: 35,
            borderColor: '#ddd',
            borderWidth: 1,
            color: 'black',
            marginLeft: 90,
            backgroundColor: 'white',
          }}
          selectedValue={targetStudent}
          onValueChange={itemValue => setTargetStudent(itemValue)}>
          <Picker.Item label="Beginner" value="Beginner" />
          <Picker.Item label="Intermediate" value="Intermediate" />
          <Picker.Item label="Advanced" value="Advanced" />
        </Picker>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            marginBottom: 5,
            fontWeight: 'bold',
            marginTop: 5,
            color: isDarkTheme?'yellow':MAIN_COLOR
          }}>
          {langState.currentLang=='en'?'My specialties are':'Các kỹ năng của tôi'}:{' '}
        </Text>
        <View
          style={{
            paddingLeft: '10%',
            marginBottom: 15,
            backgroundColor: isDarkTheme ? 'black' : SECOND_COLOR,
          }}>
          <View>
            <Text
              style={{fontSize: 17, color: isDarkTheme ? 'white' : MAIN_COLOR}}>
              {langState[langState.currentLang].Subject}:
            </Text>
          </View>
          <SelectBox
            containerStyle={{marginTop: -15}}
            optionContainerStyle={{backgroundColor:isDarkTheme?'white':null}}
            hideInputFilter
            label={false}
            inputPlaceholder={langState[langState.currentLang].Subject}
            options={arrWhatToLearn}
            selectedValues={whatToLearn}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            isMulti
            width={'90%'}
            listOptionProps={{nestedScrollEnabled: true}}
          />
        </View>
        <View style={{paddingLeft: '10%'}}>
          <Text
            style={{fontSize: 17, color: isDarkTheme ? 'white' : MAIN_COLOR}}>
            {langState[langState.currentLang].TestPreparation}:
          </Text>
        </View>
        <View
          style={{
            paddingLeft: '10%',
            marginBottom: 25,
            backgroundColor: isDarkTheme ? 'black' : SECOND_COLOR,
          }}>
          <SelectBox
            containerStyle={{marginTop: -15}}
            optionContainerStyle={{backgroundColor:isDarkTheme?'white':null}}
            label={false}
            hideInputFilter
            inputPlaceholder={langState[langState.currentLang].TestPreparation}
            options={arrWhatToLearn1}
            selectedValues={whatToLearn1}
            onMultiSelect={onMultiChange1()}
            onTapClose={onMultiChange1()}
            isMulti
            width={'90%'}
            listOptionProps={{nestedScrollEnabled: true}}
          />
        </View>
        <View style={{marginBottom: 70, marginTop: 5}}>
          <Button
            title={langState.currentLang == 'en' ? 'Next' : 'Tiếp theo'}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
  },
  container1: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  text: {
    color: MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: 20,
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  countryPicker: {
    backgroundColor: '#1abc9c',
    fontWeight: 'bold',
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderWidth: 2,
  },
  containerPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  picker: {
    width: 170,
    height: 35,
    borderColor: '#ddd',
    borderWidth: 1,
    color: 'black',
  },
});

export default BecomeTutor;
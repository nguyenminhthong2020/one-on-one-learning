/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
import {MAIN_COLOR, BASE_URL} from '../../../globals/constant';
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

import {useForm, Controller, set} from 'react-hook-form';
import Button from '../../_common/Button/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import DatePicker from 'react-native-datepicker';
// thay vì dùng DateTimePicker, có thể dùng RNDatetimePicker
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import {Picker} from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeInfoAsync,
  logout,
  initNew,
  initNewAvatar,
} from '../../../redux/slices/auth/loginSlice';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerAvatar} from '../../_common/ImagePicker/image-picker-avatar';
import {ImagePickerModal} from '../../_common/ImagePicker/image-picker-modal';

const Profile = props => {
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
  if(current.user.hasOwnProperty('learnTopics'))
  {
    newwhatToLearn = [...current.user.learnTopics].map(function (item) {
      return {
        item: item.name,
        id: item.id,
      };
    });
  }else{
    newwhatToLearn = [];
  }
  
  let newwhatToLearn1;
  if(current.user.hasOwnProperty('learnTopics'))
  {
    newwhatToLearn1 = [...current.user.testPreparations].map(function (item) {
      return {
        item: item.name,
        id: item.id,
      };
    });
  }else{
    newwhatToLearn1 = [];
  }
  const _level = current.user.level != null ? current.user.level : 'BEGINNER';
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
  const _language =
    current.user.language == null ? 'English' : current.user.language;
  
  const [whatToLearn, setWhatToLearn] = useState(newwhatToLearn);
  const [whatToLearn1, setWhatToLearn1] = useState(newwhatToLearn1);
  const [levelValue, setLevelValue] = useState(_level);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthday, setBirthday] = useState(_birthday);
  const [pickerValue, setPickerValue] = useState(_language);
  //const [country, setCountry] = useState({name: 'Vietnam', cca2: 'VN'});
  const [country, setCountry] = useState({name: '', cca2: _country});
  const [name, setName] = useState(current.user.name);
  const _phone = current.user.phone != null ? current.user.phone : '';
  const [phone, setPhone] = useState(_phone);
 
  const [file, setFile] = useState({
    uri: current.user.avatar,
    name: ``,
    type: ``,
    size: 0,
    fileName: '',
  });
  
  //const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);
  const onImageLibraryPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.hasOwnProperty('assets')) {
        const datas = new FormData();
        datas.append('avatar', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
        datas.append(
          'avatar',
          JSON.stringify({size: response.assets[0].fileSize}),
        );
        axios
          .post(`${BASE_URL}user/uploadAvatar`, datas, {
            headers: {
              Authorization: 'Bearer ' + current.tokens.access.token,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            dispatch(
              initNewAvatar({
                newAvatar: res.data.avatar,
              }),
            );
          })
          .catch(err => console.log(err));

        // setState
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
            if (response.hasOwnProperty('assets')) {
              const datas = new FormData();
              datas.append('avatar', {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
              });
              datas.append(
                'avatar',
                JSON.stringify({size: response.assets[0].fileSize}),
              );
              axios
                .post(`${BASE_URL}user/uploadAvatar`, datas, {
                  headers: {
                    Authorization: 'Bearer ' + current.tokens.access.token,
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then(res => {
                  dispatch(
                    initNewAvatar({
                      newAvatar: res.data.avatar,
                    }),
                  );
                })
                .catch(err => console.log(err));
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
    alert('Update successfull');
    dispatch(
      changeInfoAsync({
        ...data,
        accessToken: current.tokens.access.token,
        birthday: birthday,
        name: name,
        phone: phone,
        country: country.cca2,
        level: levelValue,
        language: pickerValue,
        whatToLearn: whatToLearn,
        whatToLearn1: whatToLearn1,
      }),
    );
  };

  function onMultiChange() {
    return item => setWhatToLearn(xorBy(whatToLearn, [item], 'id'));
  }
  function onMultiChange1() {
    return item => setWhatToLearn1(xorBy(whatToLearn1, [item], 'id'));
  }
  return (
    <ScrollView style={[styles.container, {backgroundColor: isDarkTheme? 'black':'white'}]} nestedScrollEnabled={true}>
      <View>
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
            }}>
            <View style={{alignSelf: 'center'}}>
              <TextInput
                value={current.user.email}
                editable={false}
                style={{fontSize: 14, color: 'orange'}}
              />
            </View>
          </View>
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
          <View style={{marginLeft: 18, backgroundColor: 'white', borderRadius: 5}}>
            <TextInput
              style={{borderWidth: 1, width: 220, height: 40, fontSize: 15, borderRadius: 5}}
              value={name}
              defaultValue={current.user.name}
              //keyboardType={'numeric'}
              placeholder={'Name'}
              // onBlur={onBlur}
              onChangeText={value => setName(value)}
            />
          </View>
        </View>
        <Controller
          control={control}
          // rules={{required: true}}
          name="phone"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.container1}>
              <View>
                <FontAwesome
                  name={'phone'}
                  size={25}
                  color={MAIN_COLOR}
                  style={{paddingLeft: 12}}
                />
              </View>
              <View style={{marginLeft: 40, backgroundColor: 'white', borderRadius: 5}}>
                <TextInput
                  // editable = {false}
                  style={{borderWidth: 1, width: 220, height: 40, fontSize: 15, borderRadius: 5}}
                  value={phone}
                  defaultValue={phone}
                  keyboardType={'numeric'}
                  placeholder={'Phone number'}
                  onBlur={onBlur}
                  onChangeText={value => setPhone(value)}
                />
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          name="language"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.container1}>
              <View>
                <MaterialIcons name={'language'} size={25} color={MAIN_COLOR} />
              </View>
              <View style={[styles.containerPicker, {marginLeft: 35, borderRadius: 5}]}>
                <Picker
                  style={styles.picker}
                  selectedValue={pickerValue}
                  onValueChange={itemValue => setPickerValue(itemValue)}>
                  <Picker.Item label='(None)' value="" />
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
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          //rules={{required: true}}
          name="level"
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <View style={{paddingLeft: 0, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 17,
                    color: isDarkTheme ? 'white' : MAIN_COLOR,
                  }}>
                  Level:
                </Text>
              </View>
              <View style={[styles.containerPicker, {marginLeft: 12, borderRadius: 5}]}>
                <Picker
                  style={styles.picker}
                  selectedValue={levelValue}
                  onValueChange={levelValue => setLevelValue(levelValue)}>
                  <Picker.Item label="BEGINNER" value="BEGINNER" />
                  <Picker.Item label="HIGHER_BEGINNER" value="HIGHER_BEGINNER" /> 
                  <Picker.Item label="PRE_INTERMEDIATE" value="PRE_INTERMEDIATE" />
                  <Picker.Item label="INTERMEDIATE" value="INTERMEDIATE" /> 
                  <Picker.Item label="UPPER_INTERMEDIATE" value="UPPER_INTERMEDIATE" />
                  <Picker.Item label="ADVANCED" value="ADVANCED" /> 
                  <Picker.Item label="PROFICIENCY" value="PROFICIENCY" />
                </Picker>
              </View>
            </View>
          )}
        />

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
                {/* <CountryPicker translation="eng" withFlag={true} countryCode={true} onSelect={(country) => setCountry(country)}/>
              <CountryPicker
                withCallingCode
                withModal={true}
                withFlagButton={true}
                withFilter={true}
              /> */}
                <CountryPicker
                  withFlag
                  withFilter
                  withCountryNameButton
                  withCallingCode
                  countryCode={country.cca2}
                  // name={country.cca2}
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
          <View style={{marginLeft: 35}}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 5
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
                style={{marginRight: 5, }}
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
            {/* <DateTimePicker
                styles={{width: '37%', backgroundColor: "white", color:'#009387'}}
                testID="dateTimePicker"
                value={date.date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={date => setDate({date: date})}
              /> */}
          </View>
        </View>
        <View
          style={{
            paddingLeft: '10%',
            marginBottom: 15,
            backgroundColor: isDarkTheme ? 'black' : 'white',
          }}>
          <View>
            <Text
              style={{fontSize: 17, color: isDarkTheme ? 'white' : MAIN_COLOR}}>
              {langState[langState.currentLang].Subject}:
            </Text>
          </View>
          <SelectBox 
            containerStyle={{marginTop: -15, backgroundColor: 'white'}}
          optionContainerStyle={{backgroundColor:'white'}}
            // containerStyle={{marginTop: -15}}
            // optionContainerStyle={{backgroundColor:isDarkTheme?'white':null}}
            hideInputFilter
            label={false}
            inputPlaceholder={`  ${langState[langState.currentLang].Subject}`}
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
            backgroundColor: isDarkTheme ? 'black' : 'white',
          }}>
          <SelectBox
            containerStyle={{marginTop: -15, backgroundColor:'white'}}
            optionContainerStyle={{backgroundColor:isDarkTheme?'white':null}}
            label={false}
            hideInputFilter
            inputPlaceholder={`  ${langState[langState.currentLang].TestPreparation}`}
            options={arrWhatToLearn1}
            selectedValues={whatToLearn1}
            onMultiSelect={onMultiChange1()}
            onTapClose={onMultiChange1()}
            isMulti
            width={'90%'}
            listOptionProps={{nestedScrollEnabled: true}}
          />
        </View>
        <Button
          title={langState[langState.currentLang].Save}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
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

export default Profile;

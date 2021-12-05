/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  //TouchableOpacity,
  Pressable,
  ScrollView,
  //SafeAreaView,
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
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { changeInfoAsync } from '../../../redux/slices/auth/loginSlice';

// import AvatarAccessory from '../../_common/AvatarAccessory/AvatarAccessory';

// Phần Image Picker cho Avatar
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerAvatar} from '../../_common/ImagePicker/image-picker-avatar';
import {ImagePickerModal} from '../../_common/ImagePicker/image-picker-modal';

const Profile = (props) => {
  //console.log('render nè');
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    // dispatch()
  }, []);
  const dispatch = useDispatch();
  
  const current = useSelector(state => state.auth.current);
  // console.log('current nè');
  // console.log(current);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme)
  const langState = useSelector(state => state.lang);

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

  const newwhatToLearn = [...current.user.learnTopics].map(function(item){
      return {
        item: item.name,
        id: item.id
      }
  });
  const newwhatToLearn1 = [...current.user.testPreparations].map(function(item){
    return {
      item: item.name,
      id: item.id
    }
});
  const _level = current.user.level;
  const _birthday = current.user.birthday;
  const _country = current.user.country;
  const _language = current.user.language == null ? 'English' : current.user.language;

  const [whatToLearn, setWhatToLearn] = useState(newwhatToLearn);
  const [whatToLearn1, setWhatToLearn1] = useState(newwhatToLearn1);
  const [levelValue, setLevelValue] = useState(_level);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthday, setBirthday] = useState(_birthday);
  const [pickerValue, setPickerValue] = useState(_language);
  //const [country, setCountry] = useState({name: 'Vietnam', cca2: 'VN'});
  const [country, setCountry] = useState({name: '', cca2: _country})

  // image Picker:
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);
  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  const onChangeBirthday = e => {
    setShowDatePicker(false);
    if(e.nativeEvent.timestamp === undefined)
    {
      return;
    }
    const str = JSON.stringify(e.nativeEvent.timestamp);
    let _birthday = str.slice(1, 11);
    setBirthday(_birthday);
  };

  const onSubmit = data => 
    {
      alert("Update successfull")
      dispatch(changeInfoAsync(
        {
              ...data,
        birthday: birthday,
        country: country.cca2,
        level: levelValue,
        language: pickerValue,
        whatToLearn: whatToLearn,
        whatToLearn1: whatToLearn1
        }
      ))
    }
    // alert(
    //   JSON.stringify({
    //     ...data,
    //     birthday: birthday,
    //     country: country.name,
    //     language: pickerValue,
    //     whatToLearn: whatToLearn,
    //     whatToLearn1: whatToLearn1
    //   }),
    //);

  function onMultiChange() {
    return item => setWhatToLearn(xorBy(whatToLearn, [item], 'id'));
  }
  function onMultiChange1() {
    return item => setWhatToLearn1(xorBy(whatToLearn1, [item], 'id'));
  }

  return (
    <ScrollView style={styles.container} nestedScrollEnabled = {true}>
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <View> */}
        <ImagePickerAvatar uri={uri} onPress={() => setVisible(true)} />
        {/* </View> */}
        {/* <TouchableOpacity onPress={() => alert('change avatar')}>
          <AvatarAccessory
            nsize={9}
            uri="https://image.freepik.com/free-vector/cute-orange-robot-cat-avatar_79416-86.jpg"
          />
        </TouchableOpacity> */}
        {/* <View style={{alignSelf: 'center'}}>
          <TextInput
            //value={'thong123@gmail.com'}
            value = {userEmail}
            editable={false}
            style={{fontSize: 16, color: 'orange'}}
          />
        </View> */}
        <View style={{flexDirection: 'column', justifyContent: 'center', marginLeft: 5}}>
        <View style={{alignSelf: 'center'}}>
          <TextInput
            //value={'thong123@gmail.com'}
            value = {current.user.email}
            editable={false}
            style={{fontSize: 16, color: 'orange'}}
          />
        </View>
      <View style={{alignItems: 'center'}}>
        {/* <Text>{langState[langState.currentLang].Name}: {userName}</Text> */}
        <Text>{current.user.name}</Text>
      </View>
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
            <View style={{marginLeft: 40, backgroundColor: 'white'}}>
              <TextInput
                style={{borderWidth: 1, width: 170, height: 40, fontSize: 15}}
                value={value}
                defaultValue={current.user.phone}
                keyboardType={'numeric'}
                placeholder={'Phone number'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        //rules={{required: true}}
        name="language"
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.container1}>
            <View>
              <MaterialIcons
                name={'language'}
                size={25}
                color={MAIN_COLOR}
                style={{paddingLeft: 12}}
              />
            </View>
            {/* <View style={{marginLeft: 35}}>
              <TextInput
                style={{borderWidth: 1, width: 220, height: 40, fontSize: 15}}
                value={value}
                placeholder={'Language'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
              />
            </View> */}
            <View style={[styles.containerPicker, {marginLeft: 35}]}>
              <Picker
                style={styles.picker}
                selectedValue={pickerValue}
                onValueChange={itemValue => setPickerValue(itemValue)}>
                <Picker.Item label="English" value="English" />
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
          <View style={styles.container1}>
            <View style={{paddingLeft: 5, justifyContent: 'center'}}>
              <Text style={{fontSize: 17, color: isDarkTheme? 'white': 'gray'}}>Level:</Text>
            </View>
            <View style={[styles.containerPicker, {marginLeft: 18}]}>
              <Picker
                style={styles.picker}
                selectedValue={levelValue}
                onValueChange={levelValue => setLevelValue(levelValue)}>
                <Picker.Item label="BEGINNER" value="BEGINNER" />
                <Picker.Item label="INTERMEDIATE" value="INTERMEDIATE" />
                <Picker.Item label="ADVANCED" value="ADVANCED" />
              </Picker>
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        //rules={{required: true}}
        name="location"
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
                countryCode={country.cca2}
                onSelect={country =>
                  //console.log("\nĐây nữa nè: " + JSON.stringify(country))
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
      <View style={{paddingLeft: '20%'}}>
        <Text style={{fontSize: 17, color: isDarkTheme?'white':'gray'}}>{langState[langState.currentLang].What_to_learn}:</Text>
      </View>
      <View style={{paddingLeft: '10%', marginBottom: 15, backgroundColor: isDarkTheme? 'white': SECOND_COLOR}}>
        <SelectBox
          label={false}
          options={arrWhatToLearn}
          selectedValues={whatToLearn}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
          width={'90%'}
          listOptionProps={{ nestedScrollEnabled: true }}
        />
      </View>
      <View style={{paddingLeft: '20%'}}>
        <Text style={{fontSize: 17, color: isDarkTheme?'white':'gray'}}>
        {langState[langState.currentLang].What_to_learn} (2):</Text>
      </View>
      <View style={{paddingLeft: '10%', marginBottom: 25, backgroundColor: isDarkTheme? 'white': SECOND_COLOR}}>
        <SelectBox
          label={false}
          options={arrWhatToLearn1}
          selectedValues={whatToLearn1}
          onMultiSelect={onMultiChange1()}
          onTapClose={onMultiChange1()}
          isMulti
          width={'90%'}
          listOptionProps={{ nestedScrollEnabled: true }}
        />
      </View>
      {/* {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>} */}
      <Button title={langState[langState.currentLang].Save} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
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
    left: '10%',
    width: '80%',
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
    // width: 50,
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

/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//import {TextInput as SpecialTextInput} from 'react-native-paper';
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
import AvatarAccessory from '../../_common/AvatarAccessory/AvatarAccessory';

// Phần Image Picker cho Avatar
import * as ImagePicker from 'react-native-image-picker';
import { ImagePickerAvatar } from '../../_common/ImagePicker/image-picker-avatar';
import { ImagePickerModal } from '../../_common/ImagePicker/image-picker-modal';

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const arrWhatToLearn = [
    {item: 'EnglishforKids', id: 0},
    {item: 'BusinessEnglish', id: 1},
    {item: 'ConversationalEnglish', id: 2},
    {item: 'STARTERS', id: 3},
    {item: 'MOVERS', id: 4},
    {item: 'FLYERS', id: 5},
    {item: 'KET', id: 5},
    {item: 'PET', id: 6},
    {item: 'IELTS', id: 7},
    {item: 'TOEFL', id: 8},
    {item: 'TOEIC', id: 9},
  ];

  const [pickerValue, setPickerValue] = useState('English');
  const [whatToLearn, setWhatToLearn] = useState([]);
  const [levelValue, setLevelValue] = useState('Beginner');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthday, setBirthday] = useState('1998-10-27');
  const [country, setCountry] = useState({name: 'Vietnam', cca2: 'VN'});

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
    const str = JSON.stringify(e.nativeEvent.timestamp);
    _birthday = str.slice(1, 11);
    setBirthday(_birthday);
  };

  const onSubmit = data =>
    alert(
      JSON.stringify({
        ...data,
        birthday: birthday,
        country: country.name,
        language: pickerValue,
        whatToLearn: whatToLearn,
      }),
    );

  function onMultiChange() {
    return item => setWhatToLearn(xorBy(whatToLearn, [item], 'id'));
  }

  return (
    <View style={styles.container}>
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
        <View style={{alignSelf: 'center'}}>
        <TextInput
          value={'thong123@gmail.com'}
          editable={false}
          style={{fontSize: 16, color: 'orange'}}
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
            <View style={{marginLeft: 40}}>
              <TextInput
                style={{borderWidth: 1, width: 170, height: 40, fontSize: 15}}
                value={value}
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
              <Text style={{fontSize: 17}}>Level:</Text>
            </View>
            <View style={[styles.containerPicker, {marginLeft: 18}]}>
              <Picker
                style={styles.picker}
                selectedValue={levelValue}
                onValueChange={levelValue => setLevelValue(levelValue)}>
                <Picker.Item label="Beginner" value="Beginner" />
                <Picker.Item label="Intermediate" value="Intermediate" />
                <Picker.Item label="Advanced" value="Advanced" />
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

      <View style={[styles.container1, {marginBottom: 25}]}>
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
            <TouchableOpacity
              style={{marginRight: 5}}
              onPress={() => setShowDatePicker(true)}>
              <FontAwesome name="calendar" color="black" size={20} />
            </TouchableOpacity>
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
        <Text style={{fontSize: 17}}>What to learn:</Text>
      </View>
      <View style={{paddingLeft: '10%', marginBottom: 35}}>
        <SelectBox
          label={false}
          options={arrWhatToLearn}
          selectedValues={whatToLearn}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
          width={'90%'}
        />
      </View>
      {/* {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>} */}
      <Button title="Save" handleSubmit={handleSubmit} onSubmit={onSubmit} />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
    </View>
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

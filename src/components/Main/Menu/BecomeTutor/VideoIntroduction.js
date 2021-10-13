/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {arrLanguage} from '../../../../globals/arr-language';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
//import {TextInput as SpecialTextInput} from 'react-native-paper';
import {useForm, Controller, set} from 'react-hook-form';
import Button from '../../../_common/Button/Button';
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
//import moment from 'moment';
//import AvatarAccessory from '../../_common/AvatarAccessory/AvatarAccessory';

// Phần Image Picker cho Avatar
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerAvatar} from '../../../_common/ImagePicker/image-picker-avatar';
import {ImagePickerModal} from '../../../_common/ImagePicker/image-picker-modal';

const VideoIntruction = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <ImagePickerAvatar uri={uri} onPress={() => setVisible(true)} />
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            margin: 10,
            color: MAIN_COLOR,
            marginTop: 35,
          }}>
          Introduction Video
        </Text>
        <Text style={{marginLeft: 25}}>Choose</Text>
        <Controller
          control={control}
          // rules={{required: true}}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={[styles.container1, {width: '80%'}]}>
              <View style={{marginLeft: 0}}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: '150%',
                    height: 40,
                    fontSize: 15,
                  }}
                  value={'Video'}
                  //keyboardType={'numeric'}
                  //placeholder={'Phone number'}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                />
              </View>
            </View>
          )}
        />
        </View>

        {/* {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>} */}
        <View style={{marginBottom: 25, marginTop: 35}}>
          <Button
            title="Done"
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
    // left: '3%',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  container2: {},
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
  modalView: {
    margin: 10, // 20
    backgroundColor: 'white',
    borderRadius: 20,
    height: '100%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default VideoIntruction;

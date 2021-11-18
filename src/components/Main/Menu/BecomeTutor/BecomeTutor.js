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

const BecomeTutor = () => {
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

  // modal ̣language
  const [modalVisible, setModalVisible] = useState(false);
  const [arrLan, setArrLan] = useState([]);
  // skills (modal)
  const [modalVisible1, setModalVisible1] = useState(false);
  const [arrSkill, setArrSkill] = useState([]);
  const arrWhatToLearn = [
    // skills
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
  let arrWhatToLearn1 = arrWhatToLearn.map(i => i.item);

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
    <ScrollView nestedScrollEnabled = {true}>
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
          Basic Info
        </Text>
        <Text style={{marginLeft: 25}}>Tutoring Name</Text>
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
                  value={'Nguyễn Minh Thông'}
                  //keyboardType={'numeric'}
                  //placeholder={'Phone number'}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                />
              </View>
            </View>
          )}
        />
        <Text style={{marginLeft: 25, marginTop: 35}}>I'm from</Text>
        <Controller
          control={control}
          //rules={{required: true}}
          name="location"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.container1}>
              <View style={{marginLeft: 0}}>
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
        <Text style={{marginLeft: 25, marginTop: 35}}>Date of Birth</Text>
        <View style={[styles.container1, {marginBottom: 25}]}>
          <View style={{marginLeft: 0}}>
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
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            margin: 10,
            color: MAIN_COLOR,
            marginTop: 25,
          }}>
          CV
        </Text>
        <Text style={{marginLeft: 25}}>Interests</Text>
        <Controller
          control={control}
          // rules={{required: true}}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={[styles.container1, {width: '100%'}]}>
              <View style={{marginLeft: 0}}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: 270,
                    fontSize: 15,
                    backgroundColor: 'white',
                  }}
                  //value={'Nguyễn Minh Thông'}
                  //keyboardType={'numeric'}
                  placeholder={'Interests, hobbies,...'}
                  numberOfLines={3}
                  multiline
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                />
              </View>
            </View>
          )}
        />
        <Text style={{marginLeft: 25, marginTop: 35}}>Education</Text>
        <Controller
          control={control}
          // rules={{required: true}}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={[styles.container1, {width: '100%'}]}>
              <View style={{marginLeft: 0}}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: 270,
                    fontSize: 15,
                    backgroundColor: 'white',
                  }}
                  //value={'Nguyễn Minh Thông'}
                  //keyboardType={'numeric'}
                  placeholder={'School...'}
                  numberOfLines={3}
                  multiline
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                />
              </View>
            </View>
          )}
        />
        <Text style={{marginLeft: 25, marginTop: 35}}>Experience</Text>
        <Controller
          control={control}
          // rules={{required: true}}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={[styles.container1, {width: '100%'}]}>
              <View style={{marginLeft: 0}}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: 270,
                    fontSize: 15,
                    backgroundColor: 'white',
                  }}
                  //value={'Nguyễn Minh Thông'}
                  //keyboardType={'numeric'}
                  placeholder={''}
                  numberOfLines={3}
                  multiline
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                />
              </View>
            </View>
          )}
        />
        <Text style={{marginLeft: 25, marginTop: 35}}>
          Current or Previous Profession
        </Text>
        <Controller
          control={control}
          // rules={{required: true}}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={[styles.container1, {width: '100%'}]}>
              <View style={{marginLeft: 0}}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: 270,
                    fontSize: 15,
                    backgroundColor: 'white',
                  }}
                  //value={'Nguyễn Minh Thông'}
                  //keyboardType={'numeric'}
                  placeholder={''}
                  numberOfLines={3}
                  multiline
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                />
              </View>
            </View>
          )}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginTop: 15,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            margin: 10,
            color: MAIN_COLOR,
            marginTop: 45,
          }}>
          Languages I speak
        </Text>
        <Text style={{marginLeft: 25, marginBottom: 15}}>Languages: </Text>
        <Text
          style={{
            color: 'red',
            fontSize: 15,
            marginLeft: 25,
            marginBottom: 15,
          }}>
          {[...new Set(arrLan)].join(', ')}
        </Text>
        <View
          style={{
            alignItems: 'center',
            borderWidth: 0,
            borderRadius: 30,
            backgroundColor: '#35bb9b', 
            width: '40%',
            left: '30%',
          }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{color: 'white', paddingVertical: 15, fontSize: 15}}>
              Choose Language
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            //alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text /*style={styles.modalText}*/>
                Select Languages (Scroll)
              </Text>
              <Text style={{marginTop: 0}}>*You can select one or more</Text>
              <FlatList
                style={{marginBottom: 10, marginTop: 10, borderWidth: 2}}
                showsVerticalScrollIndicator={true}
                initialNumToRender={10}
                data={arrLanguage}
                renderItem={i => (
                  <View>
                    <TouchableOpacity
                      onPress={
                        () =>
                          setArrLan([
                            ...arrLan,
                            i.item.English,
                          ]) /*alert(i.index)*/
                      }>
                      <Text style={{fontSize: 18, marginBottom: 6}}>
                        {`       ${i.item.English}`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <View
                style={{
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 25,
                  backgroundColor: '#35bb9b',
                  width: '40%',
                  left: '0%',
                  marginBottom: 0,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text
                    style={{color: 'white', paddingVertical: 10, fontSize: 20}}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginTop: 15,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            margin: 10,
            color: MAIN_COLOR,
            marginTop: 45,
          }}>
          Who I teach
        </Text>
        <Text style={{marginLeft: 25}}>Introduction</Text>
        <Controller
          control={control}
          // rules={{required: true}}
          name="introduction"
          render={({field: {onChange, onBlur, value}}) => (
            <View style={[styles.container1, {width: '100%'}]}>
              <View style={{marginLeft: 0}}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: 270,
                    fontSize: 15,
                    backgroundColor: 'white',
                  }}
                  //value={'Nguyễn Minh Thông'}
                  //keyboardType={'numeric'}
                  placeholder={''}
                  numberOfLines={2}
                  multiline
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                />
              </View>
            </View>
          )}
        />

        <Text style={{marginLeft: 25, marginTop: 35}}>
          I am best at teaching students who are
        </Text>
        <View style={styles.container1}>
          <View style={[styles.containerPicker, {marginLeft: 0}]}>
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

        <Text style={{marginLeft: 25, marginTop: 35, marginBottom: 15}}>
          My specialties are:
        </Text>
        {/* <Text style={{marginLeft: 25}}>Skills: </Text> */}
        <Text
          style={{
            color: 'red',
            fontSize: 15,
            marginLeft: 25,
            marginBottom: 15,
          }}>
          {[...new Set(arrSkill)].join(', ')}
        </Text>
        <View
          style={{
            alignItems: 'center',
            //borderWidth: 1,
            borderRadius: 30,
            backgroundColor: '#35bb9b',
            width: '40%',
            left: '30%',
            marginBottom: 50,
          }}>
          <TouchableOpacity onPress={() => setModalVisible1(true)}>
            <Text style={{color: 'white', paddingVertical: 15}}>
              Choose Skill
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            //alert("Modal has been closed.");
            setModalVisible1(!modalVisible1);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text /*style={styles.modalText}*/>Select Skills (Scroll)</Text>
              <Text style={{marginTop: 5}}>*You can select one or more</Text>
              <FlatList
                style={{marginBottom: 10, marginTop: 0, borderWidth: 2}}
                showsVerticalScrollIndicator={true}
                initialNumToRender={5}
                data={arrWhatToLearn1}
                renderItem={i => (
                  <View>
                    <TouchableOpacity
                      onPress={
                        () =>
                          setArrSkill([...arrSkill, i.item]) /*alert(i.index)*/
                      }>
                      <Text style={{fontSize: 18, marginBottom: 8}}>
                        {`       ${i.item}`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#35bb9b',
                  borderWidth: 1,
                  borderRadius: 15,
                  width: '40%',
                  left: '0%',
                  marginBottom: 0,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible1(!modalVisible1)}>
                  <Text
                    style={{color: 'white', paddingVertical: 8, fontSize: 20}}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>} */}
        <View style={{marginBottom: 25}}>
          <Button
            title="Next"
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

export default BecomeTutor;

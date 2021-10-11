/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
//import {TextInput as SpecialTextInput} from 'react-native-paper';
import {useForm, Controller, set} from 'react-hook-form';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import CountryPicker from 'react-native-country-picker-modal';
import moment from 'moment';

const ListTutorItem = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const [pickerValue, setPickerValue] = useState('English');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthday, setBirthday] = useState('1998-10-27');
  const [country, setCountry] = useState({name: 'Vietnam', cca2: 'VN'});

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
      }),
    );
  
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => alert("change avatar")}>
         <AvatarAccessory 
           nsize={10}
           uri="https://image.freepik.com/free-vector/cute-orange-robot-cat-avatar_79416-86.jpg"
         />
         </TouchableOpacity>
        <View>
          <TextInput
            value={'thong123@gmail.com'}
            editable={false}
            style={{fontSize: 16}}
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
                style={{borderWidth: 1, width: 220, height: 40, fontSize: 15}}
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

      <View style={[styles.container1, {marginBottom: 35}]}>
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
          {/* <DatePicker
                style={{width: 160}}
                date={date.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1920-01-01"
                maxDate="2021-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    width: 0,
                    height: 0,
                  },
                  dateInput: {
                    marginLeft: 35,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => setDate({date: date})}
              /> */}
        </View>
      </View>
      {/* {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>} */}
      <Button title="Save" handleSubmit={handleSubmit} onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default ListTutorItem;

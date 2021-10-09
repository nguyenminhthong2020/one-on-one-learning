/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
// /* eslint-disable no-trailing-spaces */
// /* eslint-disable quotes */
// /* eslint-disable prettier/prettier */
// /* eslint-disable semi */
// /* eslint-disable prettier/prettier */
// /* eslint-disable react/self-closing-comp */
// /* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Button from '../../_common/Button/Button';
import {Avatar, Accessory} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import CountryPicker from 'react-native-country-picker-modal';
import {yellow100} from 'react-native-paper/lib/typescript/styles/colors';

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const [date, setDate] = useState({date: '1998-01-01'});
  const [country, setCountry] = useState({name: 'Vietnam', cca2: 'VN'});

  const onSubmit = data =>
    alert(
      JSON.stringify({...data, birthday: date.date, country: country.name}),
    );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Avatar
          source={{
            uri: 'https://image.freepik.com/free-vector/cute-orange-robot-cat-avatar_79416-86.jpg',
          }}
          size={100}
          rounded
          activeOpacity={0.7}
          onPress={() => console.log('Change user avatar!')}>
          <Accessory />
        </Avatar>
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
            <View style={{marginLeft: 35}}>
              <TextInput
                style={{borderWidth: 1, width: 220, height: 40, fontSize: 15}}
                value={value}
                placeholder={'Language'}
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

      <Controller
        control={control}
        //rules={{required: true}}
        name="birthday"
        render={({field: {onChange, onBlur, value}}) => (
          <View style={[styles.container1, {marginBottom: 35}]}>
            <View>
              <FontAwesome
                name={'birthday-cake'}
                size={25}
                color={MAIN_COLOR}
                style={{paddingLeft: 12}}
              />
            </View>
            <View>
              <DatePicker
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
              />
            </View>
          </View>
        )}
      />
      {/* {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>} */}
      <Button title="Save" handleSubmit={handleSubmit} onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    flexDirection: 'column',
  },
  container1: {
    left: '5%',
    width: '80%',
    flexDirection: 'row',
    marginTop: 18,
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
});

export default Profile;

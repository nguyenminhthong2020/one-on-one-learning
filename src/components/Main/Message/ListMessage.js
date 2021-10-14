/* eslint-disable */
import React, {useState, Suspense} from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  //ScrollView,
} from 'react-native';
//import {SearchBar} from 'react-native-elements';

// import {useForm, Controller} from 'react-hook-form';

const ListMessage = () => {
  const array = [
    {
      id: 0,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isActive: false,
      lastMessage: "Hi! Nothing to worry about. That's totally fine. I hope to see you in one of my classes. Have a great dayahead. :)"
    },
    {
      id: 1,
      name: 'Teacher Yolly',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isActive: false,
      lastMessage: "Hi! Nothing to worry about. That's totally fine. I hope to see you in one of my classes. Have a great dayahead. :)"
    },
    {
      id: 2,
      name: 'Ralf Bippert',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isActive: false,
      lastMessage: "Hi! Nothing to worry about. That's totally fine. I hope to see you in one of my classes. Have a great dayahead. :)"
    },
  ];

  const [country, setCountry] = useState({name: 'Vietnam', cca2: 'VN'});

  const onPressTutor = index => alert('link to tutor detail index ' + index);

  const renderTest = array => {
    return (
      <View>
        <FlatList
          style={{marginBottom: 150, marginTop: 10}}
          //ListHeaderComponentStyle={{marginBottom: -20}}
          showsVerticalScrollIndicator={true}
          initialNumToRender={3}
          data={array}
          renderItem={i => (
            // <Suspense fallback={<View></View>} key={i.index}>
            //   <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
            // </Suspense>
            <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <SearchBar
        round={true}
        inputContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white', borderRadius: 15}}
        //lightTheme={true}
        placeholder="Search Name..."
        onChangeText={value => setSearch(value)}
        value={search}
      /> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 0,
          marginTop: 10,
        }}>
        <Text style={{fontSize: 17, color: MAIN_COLOR, fontWeight: 'bold'}}>
          *Name:{'   '}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 5,
            height: 40,
            fontSize: 14,
            width: '55%',
          }}
          placeholder="search name..."
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
          marginTop: 8,
          marginBottom: 15,
        }}>
        <Text style={{fontSize: 17, color: MAIN_COLOR, fontWeight: 'bold'}}>
          *Select country:{'  '}
        </Text>
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
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => alert('search tutor')}>
          <Text style={styles.text1}>Search</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={{borderWidth: 1, borderColor: 'black', backgroundColor: MAIN_COLOR, paddingHorizontal: 10}}>
        <Text style={{color: 'white'}}>Search</Text>
      </TouchableOpacity>
      </View> */}
      {renderTest(array)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 0,
  },
  button1: {
    borderRadius: 15,
    backgroundColor: MAIN_COLOR,
    paddingVertical: 8,
  },
  container1: {
    width: '30%',
    left: '35%',
  },
  text1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
});

export default ListMessage;

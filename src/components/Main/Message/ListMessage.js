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
import FastImage from 'react-native-fast-image';
import AvatarAccessory from '../../_common/AvatarAccessory/AvatarAccessory';

// const FlatListItemSeparator = () => {
//   return (
//     <View
//       style={{
//         height: 0,
//         borderWidth: 1,
//         marginBottom: 5,
//         marginHorizontal: 15,
//       }}
//     />
//   );
// };

const ListMessage = () => {
  const array = [
    {
      id: 0,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isActive: false,
      time: '13-10-2021 07:27 AM',
      lastMessage:
        "Hi! Nothing to worry about. That's totally fine. I hope to see you in one of my classes. Have a great dayahead. :)",
    },
    {
      id: 1,
      name: 'Teacher Yolly',
      uri: 'https://api.app.lettutor.com/avatar/73fa5a66-81aa-417b-aa26-fb25373f0fcaavatar1630857319332.jpeg',
      isActive: false,
      time: '13-10-2021 07:27 AM',
      lastMessage: '123456',
    },
    {
      id: 2,
      name: 'Ralf Bippert',
      uri: 'https://api.app.lettutor.com/avatar/49f9eafe-fe94-4eb4-83f9-bbe4ee5f6e24avatar1630907827384.jpg',
      isActive: false,
      time: '13-10-2021 07:27 AM',
      lastMessage: '<3',
    },
  ];

  const renderTest = array => {
    return (
      <View style={{marginTop: 20}}>
        <FlatList
          style={{marginBottom: 150, marginTop: 10}}
          //ItemSeparatorComponent={FlatListItemSeparator}
          showsVerticalScrollIndicator={true}
          initialNumToRender={3}
          data={array}
          renderItem={i => (
            // <Suspense fallback={<View></View>} key={i.index}>
            //   <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
            // </Suspense>
            // <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
            <View
              style={{
                width: '100%',
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 20,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity onPress={() => alert(i.item.lastMessage)}>
                <View
                  style={{flexDirection: 'row', marginBottom: 5, marginTop: 5}}>
                  <View style={{marginLeft: 5}}>
                    {/* <FastImage
                    style={{width: 32, height: 32, borderRadius: 16}}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: i.item.uri,
                      priority: FastImage.priority.normal,
                    }}
                  /> */}
                    <AvatarAccessory
                      nsize={3}
                      uri={i.item.uri}
                      onPress={() => {}}
                      inColor={'#5fdba7'}
                      outColor={'#5fdba7'}
                    />
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        marginLeft: 6,
                        fontWeight: 'bold',
                      }}>
                      {i.item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 1,
                        marginLeft: 20,
                      }}></View>
                  </View>
                </View>
                <View style={{marginHorizontal: 15}}>
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 15, color: 'black', marginTop: 5}}>
                    {i.item.lastMessage}
                  </Text>
                  <Text
                    style={{textAlign: 'right', marginRight: 20, marginTop: 10, fontSize: 12}}>
                    {i.item.time}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
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
          marginRight: 15,
          marginTop: 10,
        }}>
        <View style={{width: '100%'}}>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              height: 50,
              fontSize: 14,
              width: '100%',
              backgroundColor: 'white'
            }}
            placeholder="search message..."
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
        }}></View>
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
    backgroundColor: SECOND_COLOR,
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

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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
const MessageOfTutor = props => {
  return (
    <View
      style={{
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginRight: 50,
      }}>
      <View>
        <FastImage
          style={{width: 32, height: 32, borderRadius: 20}}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: props.uri,
            priority: FastImage.priority.normal,
          }}
        />
      </View>
      <View
        style={{
          marginLeft: 5,
          borderRadius: 15,
          backgroundColor: 'lightgray',
          padding: 10,
        }}>
        <Text style={{color: 'black', textAlign: 'left'}}>{props.message}</Text>
      </View>
    </View>
  );
};
const MessageOfStudent = props => {
  return (
    <View
      style={{
        marginBottom: 10,
        marginRight: 10,
        borderRadius: 15,
        backgroundColor: MAIN_COLOR,
        alignSelf: 'flex-end',
        marginLeft: 40,
        borderRadius: 20,
        padding: 10,
      }}>
      <Text style={{color: 'white', textAlign: 'left'}}>{props.message}</Text>
    </View>
  );
};

const TutorMessage = () => {
  const array = [
    {
      id: 0,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: true, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:27 AM',
      message: '<3',
    },
    {
      id: 1,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: false, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:28 AM',
      message: 'Hello good morning',
    },
    {
      id: 2,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: true, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:29 AM',
      message:
        "dear Ms. April, i want to say sorry about the absence lat night (i went with my friends), and my brother use my phone. My english writing skill isn't good but i hope you don't sad. Thank you very much and hope you have a good day.",
    },
    {
      id: 3,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: true, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:30 AM',
      message: '*went out @@',
    },
    {
      id: 4,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: false, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:50 AM',
      message:
        "hi! Nothing to worry about. That's totally fine. I hope to see you in one of my classes. Have a great day ahead :)",
    },
    {
      id: 5,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: true, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:27 AM',
      message: '<3',
    },
    {
      id: 6,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: false, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:28 AM',
      message: 'Hello good morning',
    },
    {
      id: 7,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: true, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:29 AM',
      message:
        "dear Ms. April, i want to say sorry about the absence lat night (i went with my friends), and my brother use my phone. My english writing skill isn't good but i hope you don't sad. Thank you very much and hope you have a good day.",
    },
    {
      id: 8,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: true, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:30 AM',
      message: '*went out @@',
    },
    {
      id: 9,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: false, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:50 AM',
      message:
        "hi! Nothing to worry about. That's totally fine. I hope to see you in one of my classes. Have a great day ahead :)",
    },
    {
      id: 10,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: false, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:28 AM',
      message: 'Hello good morning',
    },
    {
      id: 11,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: true, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:29 AM',
      message:
        "dear Ms. April, i want to say sorry about the absence lat night (i went with my friends), and my brother use my phone. My english writing skill isn't good but i hope you don't sad. Thank you very much and hope you have a good day.",
    },
    {
      id: 12,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: true, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:30 AM',
      message: '*went out @@',
    },
    {
      id: 13,
      tutor: 'April Corpuz',
      student: 'Nguyễn Minh Thông',
      uriTutor:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      uriStudent:
        'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      isStudentSend: false, // student -> tutor, false: tutor -> student
      time: '13-10-2021 07:50 AM',
      message:
        "hi! Nothing to worry about. That's totally fine. I hope to see you in one of my classes. Have a great day ahead :)",
    },
  ];

  //   const renderTest = array => {
  //     return (
  //       <View style={{marginTop: 20}}>
  //         <FlatList
  //           style={{marginBottom: 150, marginTop: 10}}
  //           //ItemSeparatorComponent={FlatListItemSeparator}
  //           showsVerticalScrollIndicator={true}
  //           initialNumToRender={3}
  //           data={array}
  //           renderItem={i => (
  //             // <Suspense fallback={<View></View>} key={i.index}>
  //             //   <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
  //             // </Suspense>
  //             // <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
  //             <View
  //               style={{
  //                 width: '100%',
  //                 marginLeft: 15,
  //                 marginRight: 15,
  //                 marginBottom: 20,
  //                 backgroundColor: 'white',
  //               }}>
  //               <TouchableOpacity onPress={() => alert(i.item.lastMessage)}>
  //                 <View
  //                   style={{flexDirection: 'row', marginBottom: 5, marginTop: 5}}>
  //                   <View style={{marginLeft: 5}}>
  //                     {/* <FastImage
  //                     style={{width: 32, height: 32, borderRadius: 16}}
  //                     resizeMode={FastImage.resizeMode.cover}
  //                     source={{
  //                       uri: i.item.uri,
  //                       priority: FastImage.priority.normal,
  //                     }}
  //                   /> */}
  //                     <AvatarAccessory
  //                       nsize={3}
  //                       uri={i.item.uri}
  //                       onPress={() => {}}
  //                       inColor={'#5fdba7'}
  //                       outColor={'#5fdba7'}
  //                     />
  //                   </View>
  //                   <View style={{justifyContent: 'center'}}>
  //                     <Text
  //                       style={{
  //                         fontSize: 18,
  //                         color: 'black',
  //                         marginLeft: 6,
  //                         fontWeight: 'bold',
  //                       }}>
  //                       {i.item.name}
  //                     </Text>
  //                     <View
  //                       style={{
  //                         flexDirection: 'row',
  //                         alignItems: 'center',
  //                         marginTop: 1,
  //                         marginLeft: 20,
  //                       }}></View>
  //                   </View>
  //                 </View>
  //                 <View style={{marginHorizontal: 15}}>
  //                   <Text
  //                     numberOfLines={1}
  //                     style={{fontSize: 15, color: 'black', marginTop: 5}}>
  //                     {i.item.lastMessage}
  //                   </Text>
  //                   <Text
  //                     style={{textAlign: 'right', marginRight: 20, marginTop: 10, fontSize: 12}}>
  //                     {i.item.time}
  //                   </Text>
  //                 </View>
  //               </TouchableOpacity>
  //             </View>
  //           )}
  //         />
  //       </View>
  //     );
  //   };

  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
          marginLeft: 5,
        }}>
        <View>
          <FastImage
            style={{width: 32, height: 32, borderRadius: 20}}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
              priority: FastImage.priority.normal,
            }}
          />
        </View>
        <View>
          <Text style={{fontSize: 16, color: MAIN_COLOR, fontWeight: 'bold'}}>
            {' '}
            April Corpuz
          </Text>
        </View>
      </View>
      <View style={{height: 1, borderWidth: 1, marginTop: 5}}></View>
      <FlatList
        inverted={false}
        style={{marginBottom: 10, marginTop: 10}}
        //ItemSeparatorComponent={FlatListItemSeparator}
        showsVerticalScrollIndicator={true}
        initialNumToRender={3}
        data={array}
        renderItem={i => (
          //<View><Text>{i.item.message}</Text></View>
          // <Suspense fallback={<View></View>} key={i.index}>
          //   <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
          // </Suspense>
          // <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
          <View>
            {i.item.isStudentSend ? (
              <MessageOfStudent message={i.item.message} />
            ) : (
              <MessageOfTutor
                uri={
                  'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg'
                }
                message={i.item.message}
              />
            )}
          </View>
        )}
      />
      {/* <FlatList
        style={{marginBottom: 150, marginTop: 10}}
        //ItemSeparatorComponent={FlatListItemSeparator}
        showsVerticalScrollIndicator={true}
        initialNumToRender={3}
        data={array}
        renderItem={i =>
          // <Suspense fallback={<View></View>} key={i.index}>
          //   <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
          // </Suspense>
          // <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
          i.item.isStudentSend ? (
            <MessageOfStudent message={i.item.message} />
          ) : (
            <MessageOfTutor uri={'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg'} message={i.item.message} />
          )
        }
      /> */}
      <View
        style={{
          flexDirection: 'column',
          //alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          marginTop: 10,
        }}>
        {/* <View style={{marginVertical: 100}}><Text>123</Text></View>
        <View style={{marginVertical: 100}}><Text>345</Text></View>
        <View style={{marginVertical: 100}}><Text>567</Text></View>
        <View style={{marginVertical: 100}}><Text>678</Text></View>
        <View style={{marginVertical: 100}}><Text>890</Text></View> */}

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View style={{width: '85%'}}>
            <TextInput
              value={text}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                height: 50,
                fontSize: 14,
                width: '100%',
                backgroundColor: 'white',
              }}
              onChangeText={value => setText(value)}
              placeholder="Type your message..."
            />
          </View>
          <View style={{width: '15%'}}>
            <TouchableOpacity onPress={() => alert(text)}>
              <FontAwesome
                name={'send'}
                size={30}
                color={MAIN_COLOR}
                style={{paddingLeft: 12}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
      </View>
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

export default TutorMessage;

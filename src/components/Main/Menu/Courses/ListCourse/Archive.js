/* eslint-disable */
import React, {useState} from 'react';
import {
  //SafeAreaView,
  // ScrollView,
  // StatusBar,
  StyleSheet,
  //ActivityIndicator,
  Text,
  // useColorScheme,
  View,
  FlatList,
  SectionList,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  Linking,
  //Alert,
  TextInput,
  Modal,
} from 'react-native';

import {TabView /*SceneMap*/} from 'react-native-tab-view';
//import {MAIN_COLOR} from '../../../../../globals/constant';
import FastImage from 'react-native-fast-image';
import { MAIN_COLOR } from '../../../../../globals/constant';

const arrayCourse = [
  {
    title: 'English For Beginners',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Conversational English',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Business English',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'IELTS',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const arrayEbook = [
  {
    title: 'What a world 1',
  },
  {
    title: 'Let’s go starter',
  },
  {
    title: 'Let’s go begin',
  },
  {
    title: 'Family and friends starter',
  },
  {
    title: 'Everybody up starter',
  },
  {
    title: 'Cambridge story fun for starters (1)',
  },
  {
    title: 'NEW HEADWAY ELEMENTARY ',
  },
  {
    title: 'English world (Macmillan Young Learners) 1',
  },
  {
    title: 'Family and Friends 1',
  },
  {
    title: 'Family and Friends 2',
  },
];
const arrLevel = [
  'Any Level',
  'Beginner',
  'Upper-Beginner',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
  'Pre-advanced',
  'Advanced',
  'Very advanced',
];

const Item = props => (
  <View
    style={{
      marginHorizontal: 40,
      marginVertical: 20,
      borderRadius: 15,
      backgroundColor: 'white',
      //   marginHorizontal: 5,
      //   marginVertical: 5,
      //padding: 5,
      //margin: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}>
    <View style={{alignItems: 'center'}}>
      <FastImage
        style={{width: '80%', height: 160}}
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: 'https://camblycurriculumicons.s3.amazonaws.com/5e2b895e541a832674533c18?h=d41d8cd98f00b204e9800998ecf8427e',
          priority: FastImage.priority.normal,
        }}
      />
    </View>
    <View style={{padding: 10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{props.title}</Text>
      <Text style={{fontSize: 15, marginTop: 6, marginBottom: 12}}>
        Gain confidence speaking about familiar topics
      </Text>
      <Text style={{textAlign: 'right', color:'black'}}>Beginner   10 lessons</Text>
    </View>
  </View>
);

const renderItemFirstRoute = (item, navigation) => (
  <Pressable onPress={() => navigation.navigate('CourseDetail')}>
    <Item title={item} />
  </Pressable>
);
const renderSectionHeader = ({section: {title}}) => (
  <Text
    style={{
      fontSize: 22,
      color: 'black',
      fontWeight: 'bold',
      marginLeft: 10,
      marginTop: 20,
    }}>
    {title}
  </Text>
);
const FirstRoute = props => {
  //console.log('First Route props: ' + JSON.stringify(props));
  return (
    <View /*style={{flex: 1, backgroundColor: 'white'}}*/>
      <SectionList
        getItemLayout={(_, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
        removeClippedSubviews={true}
        windowSize={7}
        sections={arrayCourse}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => renderItemFirstRoute(item, props.navigation)}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

const openHanlde = () => {
  Linking.openURL(
    'https://drive.google.com/drive/folders/1vdnKwSEr9v5yc3gEX90mqeuPdXkx3RY7',
  ).catch(err => {
    console.error('Failed opening page because: ', err);
    alert('Failed to open page');
  });
};

const SecondRoute = () => {
  const renderItem = i => (
    // <Suspense fallback={<View></View>} key={i.index}>
    //   <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
    // </Suspense>
    <Pressable onPress={openHanlde /*alert(`E-book thứ ${i.index}`)*/}>
      <Item title={i.item.title} />
    </Pressable>
  );

  return (
    <View /*style={{flex: 1, backgroundColor: 'white'}}*/>
      <FlatList
        getItemLayout={(_, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
        removeClippedSubviews={true}
        windowSize={7}
        style={{marginBottom: 30, margin: 5}}
        //ListHeaderComponentStyle={{marginBottom: -20}}
        showsVerticalScrollIndicator={true}
        initialNumToRender={2}
        data={arrayEbook}
        renderItem={renderItem}
      />
    </View>
  );
};

// const renderScene = SceneMap({
//   course: FirstRoute,
//   ebook: SecondRoute,
// });

const ListCourse = props => {
  const layout = useWindowDimensions();
  //console.log('List Course prop: ' + JSON.stringify(props));
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'course':
        return <FirstRoute navigation={props.navigation} />;
      case 'ebook':
        return (
          <SecondRoute
            navigation={
              props.navigation
            } /*style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}}*/
          />
        );
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'course', title: 'Course'},
    {key: 'ebook', title: 'E-Book'},
  ]);

  const arrCategory = [
    'EnglishforKids',
    'BusinessEnglish',
    'ConversationalEnglish',
    'STARTERS',
    'MOVERS',
    'FLYERS',
    'KET',
    'PET',
    'IELTS',
    'TOEFL',
    'TOEIC',
  ];
  const [arrLevelSelected, setArrayLevelSelected] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [arrCategorySelected, setArrayCategorySelected] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);

  return (
    <>
      {/* <View>
        <Text
          style={{
            fontSize: 24,
            color: MAIN_COLOR,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Discover Courses
        </Text>
      </View> */}
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
        <View style={{width: '25%'}}>
          <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
            Tìm kiếm:{' '}
          </Text>
        </View>
        <View
          style={{
            height: 40,
            backgroundColor: 'white',
            width: '70%',
            borderRadius: 20,
            paddingHorizontal: 5,
          }}>
          <TextInput
            placeholder="Search Name..."
            style={{fontSize: 15}}></TextInput>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 2,
            marginLeft: 3,
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: '#35bb9b',
              width: '30%',
              left: '0%',
              borderWidth: 1,
            }}>
            <Pressable onPress={() => setModalVisible1(true)}>
              <Text style={{color: 'white', paddingVertical: 10}}>
                Choose Level
              </Text>
            </Pressable>
          </View>
          <View style={{width: '70%'}}>
            <Text
              style={{
                color: 'red',
                fontSize: 14,
                marginLeft: 5,
              }}>
              {[...new Set(arrLevelSelected)].join(', ')}
            </Text>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            setModalVisible1(!modalVisible1);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Select Levels (Scroll)</Text>
              <Text style={{marginTop: 5}}>*You can select one or more</Text>
              <FlatList
                style={{marginBottom: 10, marginTop: 0, borderWidth: 2}}
                showsVerticalScrollIndicator={true}
                initialNumToRender={5}
                data={arrLevel}
                renderItem={i => (
                  <View style={{width: 220}}>
                    <TouchableOpacity
                      onPress={() =>
                        setArrayLevelSelected([...arrLevelSelected, i.item])
                      }>
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 8,
                          textAlign: 'center',
                        }}>
                        {`${i.item}`}
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
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 3,
            alignItems: 'center',
            marginBottom: 2,
          }}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: '#35bb9b',
              width: '30%',
              left: '0%',
              borderWidth: 1,
            }}>
            <Pressable onPress={() => setModalVisible2(true)}>
              <Text style={{color: 'white', paddingVertical: 6}}>
                Choose Category
              </Text>
            </Pressable>
          </View>
          <View style={{width: '70%'}}>
            <Text
              style={{
                color: 'blue',
                fontSize: 14,
                marginLeft: 5,
              }}>
              {[...new Set(arrCategorySelected)].join(', ')}
            </Text>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(!modalVisible2);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text /*style={styles.modalText}*/>Select Levels (Scroll)</Text>
              <Text style={{marginTop: 0}}>*You can select one or more</Text>
              <FlatList
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  borderWidth: 2,
                  width: 250,
                }}
                showsVerticalScrollIndicator={true}
                initialNumToRender={5}
                data={arrCategory}
                renderItem={i => (
                  <View>
                    <Pressable
                      onPress={
                        () =>
                          setArrayCategorySelected([
                            ...arrCategorySelected,
                            i.item,
                          ]) /*alert(i.index)*/
                      }>
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 8,
                          textAlign: 'center',
                        }}>
                        {`${i.item}`}
                      </Text>
                    </Pressable>
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
                <Pressable
                  onPress={() => setModalVisible2(!modalVisible2)}>
                  <Text
                    style={{color: 'white', paddingVertical: 8, fontSize: 20}}>
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  //   centeredView: {
  //     flex: 1,
  //     backgroundColor: 'yellow',
  //     // justifyContent: "center",
  //     // alignItems: "center",
  //     // width: '90%',
  //     // height: '90%'
  //     marginTop: 22
  // },
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
});

export default ListCourse;
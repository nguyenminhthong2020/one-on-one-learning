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
import AntDesign from 'react-native-vector-icons/AntDesign';

import {TabView /*SceneMap*/} from 'react-native-tab-view';
//import {MAIN_COLOR} from '../../../../../globals/constant';
import FastImage from 'react-native-fast-image';
import { MAIN_COLOR } from '../../../../../globals/constant';
import { useDispatch, useSelector } from 'react-redux';
import { response } from '../../../../../api/course/searchApi';

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
const arrCategory = [
  'English for Kids',
  'English for Beginners',
  'Business English',
  'Conversational English',
  'STARTERS',
  'MOVERS',
  'FLYERS',
  'KET',
  'PET',
  'IELTS',
  'TOEFL',
  'TOEIC',
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
          uri: props.item.imageUrl,
          priority: FastImage.priority.normal,
        }}
      />
    </View>
    <View style={{padding: 10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{props.item.name}</Text>
      <Text style={{fontSize: 15, marginTop: 6, marginBottom: 12}}>
        {props.item.description}
      </Text>
      <Text style={{textAlign: 'right', color:'black'}}>{props.item.level1}   {props.item.topics.length} lessons</Text>
    </View>
  </View>
);

const renderItemFirstRoute = (item, navigation) => (
  <Pressable onPress={() => navigation.navigate('CourseDetail', {item: item})}>
    <Item item={item} />
  </Pressable>
);
// const renderSectionHeader = ({section: {title}}) => (
//   <Text
//     style={{
//       fontSize: 22,
//       color: 'black',
//       fontWeight: 'bold',
//       marginLeft: 10,
//       marginTop: 20,
//     }}>
//     {title}
//   </Text>
// );
const FirstRoute = props => {

  return (
    <View /*style={{flex: 1, backgroundColor: 'white'}}*/>
      {/* <SectionList
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
      /> */}
      
      <FlatList
        getItemLayout={(_, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
        removeClippedSubviews={true}
        windowSize={4}
        // style={{ marginBottom: 120, marginTop: 10 }}
        showsVerticalScrollIndicator={true}
        initialNumToRender={10}
        data={props._arrayCourseFilter}
        extraData={props._arrayCourseFilter}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItemFirstRoute(item, props.navigation)}
        disableVirtualization={false}
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


// const renderScene = SceneMap({
//   course: FirstRoute,
//   ebook: SecondRoute,
// });

const ListCourse = props => {
  const dispatch = useDispatch();
  //const dataListCourse = useSelector(state => state.searchcourse.data);

  const [query, setQuery] = useState('');
  const [arrLevelSelected, setArrayLevelSelected] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [arrCategorySelected, setArrayCategorySelected] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);

  const layout = useWindowDimensions();
  // let listCate = [
  //   {
  //     id: "255c96b6-fd6f-4f43-8dbd-fec766e361e0",
  //     title: "English for Kids",
  //     key: "KID",
  //   },
  //   {
  //     id: "488cc5f8-a5b1-45cd-8d3a-47e690f9298e",
  //     title: "English for Beginners",
  //     key: "BEGINNER",
  //   },
  //   {
  //     id: "f01cf003-25d1-432f-aaab-bf0e8390e14f",
  //     title: "Business English", 
  //     key: "BUSINESS",     
  //   },
  //   {
  //     id: "d95b69f7-b810-4cdf-b11d-49faaa71ff4b",
  //     title: "Conversational English",
  //     key: "CONVERSATIONAL",  
  //   },
  //   {
  //     id: "968e7e18-10c0-4742-9ec6-6f5c71c517f5",
  //     title: "For studying abroad",
  //     key: "ABROAD",
  //   },
  //   {
  //     id: "c4e7f418-4006-40f2-ba13-cbade54c1fd0",
  //     title: "English for Traveling",
  //     key: "TRAVEL",
  //   },
  //   {
  //     id: "0b89ead7-0e92-4aec-abce-ecfeba10dea5",
  //     title: "PET",
  //     key: "PET",
  //   },
  //   {
  //     id: "534a94f1-579b-497d-b891-47d8e28e1b2c",
  //     title: "MOVERS",
  //     key: "MOVERS",
  //   },
  //   {
  //     id: "df9bd876-c631-413c-9228-cc3d6a5c34fa",
  //     title: "FLYERS",
  //     key: "FLYERS",
  //   },
  //   {
  //     id: "248ca9f5-b46d-4a55-b81c-abafebff5876",
  //     title: "KET",
  //     key: "KET",
  //   },
  //   {
  //     id: "1e662753-b305-47ad-a319-fa52340f5532",
  //     title: "TOEIC",
  //     key: "TOEIC",
  //   },
  //   {
  //     id: "d87de7ba-bd4c-442c-8d58-957acb298f57",
  //     title: "TOEFL",
  //     key: "TOEFL",
  //   },
  //   {
  //     id: "975f83f6-30c5-465d-8d98-65e4182369ba",
  //     title: "STARTERS",
  //     key: "STARTERS",
  //   },
  //   {
  //     id: "fb92cf24-1736-4cd7-a042-fa3c37921cf8",
  //     title: "IELTS",
  //     key: "IELTS",
  //   }
  // ]


  const [_arrayCourseFilter, set_arrayCourseFilter] = useState(response.data.rows);
  const onSearchCourse = () => {
    let x = [...new Set(arrLevelSelected)]
    let y = [...new Set(arrCategorySelected)]
    if(x.length == 0 || x.includes('Any Level')){
      x = [...arrLevel]
    }
    if(y.length == 0){
      y = [...arrCategory]
    }
    let arrRows = response.data.rows.filter(function (i) {
      //console.log(i.level1);
      if (
        i.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) 
        && x.includes(i.level1)  
        && y.includes(i.categories[0].title
        )
      ) {
        return true;
      }else {return false;}

    });
    set_arrayCourseFilter(
      arrRows
    )
  }
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'course', title: 'Course'},
  ]);


  const renderScene = ({route}) => {
    switch (route.key) {
      case 'course':
        return <FirstRoute navigation={props.navigation} _arrayCourseFilter={_arrayCourseFilter}/>;
      default:
        return null;
    }
  };

  return (
    <>
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
            width: {query}!= ''? '55%': '65%',
            borderRadius: 20,
            paddingHorizontal: 5,
          }}>
          <TextInput
            value={query}
            onChangeText={(value)=>setQuery(value)}
            placeholder="Search Name..."
            style={{fontSize: 15}}></TextInput>
        </View>
        {query != '' && <AntDesign
          name={'close'}
          size={22}
          color={'red'}
          style={{marginLeft: 10}}
          onPress={() => {
            setQuery('')
          }}
        />}
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 2,
            marginLeft: 3,
            alignItems: 'center',
          }}>
          
          <View style={{flexDirection: 'column', justifyContent: 'center', width: '30%',
              left: '0%',}}>
          <View
            style={{
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: '#35bb9b',
              // width: '30%',
              // left: '0%',
              borderWidth: 1,
            }}>
            <Pressable onPress={() => setModalVisible1(true)}>
              <Text style={{color: 'white', paddingVertical: 10}}>
                Choose Level
              </Text>
            </Pressable>
          </View>
          {arrLevelSelected.length != 0 && <AntDesign
          name={'close'}
          size={22}
          color={'red'}
          style={{marginLeft: 10}}
          onPress={() => {
            setArrayLevelSelected([]);
          }}
        />}
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
          
        <View style={{flexDirection: 'column', justifyContent:'center',width: '30%',
              left: '0%',}}>
        <View
            style={{
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: '#35bb9b',
              // width: '30%',
              // left: '0%',
              borderWidth: 1,
            }}>
            <Pressable onPress={() => setModalVisible2(true)}>
              <Text style={{color: 'white', paddingVertical: 6}}>
                Choose Category
              </Text>
            </Pressable>
          </View>
          {arrCategorySelected.length != 0 && <AntDesign
          name={'close'}
          size={22}
          color={'red'}
          style={{marginLeft: 10}}
          onPress={() => {
            setArrayCategorySelected([])
          }}
        />}
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
        <View
            style={{
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: MAIN_COLOR,
              width: '40%',
              left: '30%',
              borderWidth: 1,
              marginBottom: 2
            }}>
            <Pressable onPress={onSearchCourse} style={{ width: '100%'}}>
              <Text style={{color: 'white', paddingVertical: 7, fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
                Search
              </Text>
            </Pressable>
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

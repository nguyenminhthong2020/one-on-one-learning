/* eslint-disable */
import React, {useState, useEffect} from 'react';
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
import {MAIN_COLOR} from '../../../../../globals/constant';
import {useDispatch, useSelector} from 'react-redux';
// import {response} from '../../../../../api/course/searchApi';
import {searchEbookAsync} from '../../../../../redux/slices/course/searchEbookSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ConvertLevel2} from '../../../../../redux/slices/course/searchEbookSlice';
import {_listCate} from '../../../../../redux/slices/course/searchEbookSlice';
import {current} from 'immer';

// const arrayEbook = [
//   {
//     title: 'What a world 1',
//   },
//   {
//     title: 'Let’s go starter',
//   },
//   {
//     title: 'Let’s go begin',
//   },
//   {
//     title: 'Family and friends starter',
//   },
//   {
//     title: 'Everybody up starter',
//   },
//   {
//     title: 'Cambridge story fun for starters (1)',
//   },
//   {
//     title: 'NEW HEADWAY ELEMENTARY ',
//   },
//   {
//     title: 'English world (Macmillan Young Learners) 1',
//   },
//   {
//     title: 'Family and Friends 1',
//   },
//   {
//     title: 'Family and Friends 2',
//   },
// ];
const arrLevel = [
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

function ConvertLevel(str) {
  switch (str) {
    case '0':
      return 'Any Level';
    case '1':
      return 'Beginner';
    case '2':
      return 'Upper-Beginner';
    case '3':
      return 'Pre-Intermediate';
    case '4':
      return 'Intermediate';
    case '5':
      return 'Upper-Intermediate';
    case '6':
      return 'Pre-advanced';
    case '7':
      return 'Advanced';
    default:
      return 'Very advanced';
  }
}
const Item = props => (
  <View
    style={{
      marginHorizontal: 40,
      marginVertical: 20,
      borderRadius: 15,
      backgroundColor: 'white',
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
      <Text style={{textAlign: 'right', color: 'black'}}>
        {ConvertLevel(props.item.level)}
      </Text>
    </View>
  </View>
);

const openHanlde = url => {
  Linking.openURL(url).catch(err => {
    console.error('Failed opening page because: ', err);
    alert('Failed to open page');
  });
};

const SecondRoute = props => {
  const renderItem = item => (
    // <Suspense fallback={<View></View>} key={i.index}>
    //   <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
    // </Suspense>
    <Pressable
      onPress={
        () => openHanlde(item.fileUrl) /*alert(`E-book thứ ${i.index}`)*/
      }>
      <Item item={item} />
    </Pressable>
  );

  return (
    <View style={{marginBottom: 0}}>
      <FlatList
        getItemLayout={(_, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
        removeClippedSubviews={true}
        windowSize={7}
        style={{marginBottom: 0, margin: 5}}
        //ListHeaderComponentStyle={{marginBottom: -20}}
        showsVerticalScrollIndicator={true}
        initialNumToRender={2}
        data={props.dataEbooks}
        extraData={props.dataEbooks}
        renderItem={({item}) => renderItem(item, props.navigation)}
        disableVirtualization={false}
      />
    </View>
  );
};

// const renderScene = SceneMap({
//   course: FirstRoute,
//   ebook: SecondRoute,
// });

const ListEbook = props => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [arrLevelSelected, setArrayLevelSelected] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [arrCategorySelected, setArrayCategorySelected] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const layout = useWindowDimensions();

  // useEffect(() => {
  //   const str = `e-book?page=1&size=10`;
  //   dispatch(
  //     searchEbookAsync({
  //       str: str,
  //     }),
  //   );
  // }, []);
  useEffect(() => {
    const str = `e-book?page=${1}&size=10`;
    dispatch(
      searchEbookAsync({
        str: str,
      }),
    );
  }, []);

  const _dataEbooks = useSelector(state => state.searchebook);
  const countPage = ~~(_dataEbooks.data.count / 10) + 1;
  let arrCount = [];
  for (let i = 0; i < countPage; i++) {
    arrCount.push(i);
  }

  const onSearch = () => {
    let str = `e-book?page=${currentPage}&size=10`;
    if (query != '') {
      str = str + `&q=${query}`;
    }
    if (arrLevelSelected.length > 0) {
      for (let i = 0; i < arrLevelSelected.length; i++) {
        str = str + `&level[]=${ConvertLevel2(arrLevelSelected[i])}`;
      }
    }
    if (arrCategorySelected.length > 0) {
      for (let i = 0; i < arrCategorySelected.length; i++) {
        str = str + `&categoryId[]=${_listCate[arrCategorySelected[i]]}`;
      }
    }

    dispatch(
      searchEbookAsync({
        str: str,
      }),
    );
    setCurrentPage(1);
  };

  const handleOnClick = newPage => {
    setCurrentPage(newPage);
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    // {key: 'course', title: 'Course'},
    {key: 'ebook', title: 'E-Book'},
  ]);

  const onSetCurrentPage = index => {
    setCurrentPage(index + 1);
  };
  const renderScene = ({route}) => {
    switch (route.key) {
      // case 'course':
      //   return <></>;
      case 'ebook':
        return (
          <View style={{paddingBottom: 120}}>
            <SecondRoute
              dataEbooks={_dataEbooks.data.rows}
              navigation={
                props.navigation
              } /*style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}}*/
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 20,
              }}>
              {arrCount.map((item, index) =>
                index + 1 == currentPage ? (
                  <View
                    key={index}
                    // onPress={onSetCurrentPage(index)}
                    style={{
                      marginHorizontal: 5,
                      borderColor: MAIN_COLOR,
                      backgroundColor: MAIN_COLOR,
                      borderWidth: 1,
                      borderColor: MAIN_COLOR,
                      width: 30,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      {index + 1}
                    </Text>
                  </View>
                ) : (
                  <Pressable
                    key={index}
                    onPress={() => {
                      let str = `e-book?page=${index + 1}&size=10`;
                      if (query != '') {
                        str = str + `&q=${query}`;
                      }
                      if (arrLevelSelected.length > 0) {
                        for (let i = 0; i < arrLevelSelected.length; i++) {
                          str =
                            str +
                            `&level[]=${ConvertLevel2(arrLevelSelected[i])}`;
                        }
                      }
                      if (arrCategorySelected.length > 0) {
                        for (let i = 0; i < arrCategorySelected.length; i++) {
                          str =
                            str +
                            `&categoryId[]=${
                              _listCate[arrCategorySelected[i]]
                            }`;
                        }
                      }

                      dispatch(
                        searchEbookAsync({
                          str: str,
                        }),
                      );
                      setCurrentPage(index + 1);
                    }}
                    style={{
                      marginHorizontal: 3,
                      borderColor: 'black',
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: 'black',
                      width: 30,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}>
                    <Text style={{textAlign: 'center'}}>{index + 1}</Text>
                  </Pressable>
                ),
              )}
            </View>
          </View>
        );
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
            width: '55%',
            borderRadius: 20,
            paddingHorizontal: 5,
          }}>
          <TextInput
            value={query}
            onChangeText={value => setQuery(value)}
            placeholder="Search Name..."
            style={{fontSize: 15}}></TextInput>
        </View>
        {query != '' && (
          <AntDesign
            name={'close'}
            size={22}
            color={'red'}
            style={{marginLeft: 10}}
            onPress={() => {
              setQuery('');
            }}
          />
        )}
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
              flexDirection: 'column',
              width: '30%',
              left: '0%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#35bb9b',
                borderWidth: 1,
              }}>
              <Pressable onPress={() => setModalVisible1(true)}>
                <Text style={{color: 'white', paddingVertical: 10}}>
                  Choose Level
                </Text>
              </Pressable>
            </View>
            {(arrLevelSelected.length != 0) != '' && (
              <AntDesign
                name={'close'}
                size={22}
                color={'red'}
                style={{marginLeft: 10}}
                onPress={() => {
                  setArrayLevelSelected([]);
                }}
              />
            )}
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
              flexDirection: 'column',
              justifyContent: 'center',
              width: '30%',
              left: '0%',
            }}>
            <View
              style={{
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#35bb9b',
                borderWidth: 1,
              }}>
              <Pressable onPress={() => setModalVisible2(true)}>
                <Text style={{color: 'white', paddingVertical: 6}}>
                  Choose Category
                </Text>
              </Pressable>
            </View>
            {arrCategorySelected.length != 0 && (
              <AntDesign
                name={'close'}
                size={22}
                color={'red'}
                style={{marginLeft: 10}}
                onPress={() => {
                  setArrayCategorySelected([]);
                }}
              />
            )}
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
            marginBottom: 1,
          }}>
          <Pressable onPress={onSearch} style={{width: '100%'}}>
            <Text
              style={{
                color: 'white',
                paddingVertical: 7,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
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
                <Pressable onPress={() => setModalVisible2(!modalVisible2)}>
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

export default ListEbook;

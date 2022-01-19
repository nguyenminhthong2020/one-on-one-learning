/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  Linking,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {MAIN_COLOR} from '../../../../../globals/constant';
import {useDispatch, useSelector} from 'react-redux';
import {searchEbookAsync} from '../../../../../redux/slices/course/searchEbookSlice';

import {ConvertLevel2} from '../../../../../redux/slices/course/searchEbookSlice';
import {_listCate} from '../../../../../redux/slices/course/searchEbookSlice';

import {SearchBar} from 'react-native-elements';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';

const arrLevel = [
    {item: 'Beginner', id: 1},
    {item: 'Upper-Beginner', id: 2},
    {item: 'Pre-Intermediate', id: 3},
    {item: 'Intermediate', id: 4},
    {item: 'Upper-Intermediate', id: 5},
    {item: 'Pre-advanced', id: 6},
    {item: 'Advanced', id: 7},
    {item: 'Very-advanced', id: 8},
  ];

  const arrCategory = [
    {item: 'English for Kids', id: 1},
    {item: 'English for Beginners', id: 2},
    {item: 'Business English', id: 3},
    {item: 'Conversational English', id: 4},
    {item: 'STARTERS', id: 5},
    {item: 'MOVERS', id: 6},
    {item: 'FLYERS', id: 7},
    {item: 'KET', id: 8},
    {item: 'PET', id: 9},
    {item: 'IELTS', id: 10},
    {item: 'TOEFL', id: 11},
    {item: 'TOEIC', id: 12},
    {item: "For studying abroad", id: 13},
  ];

function ConvertLevel(str) {
  switch (str) {
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
    case '8': 
      return 'Very advanced';
    default :
      return 'Any Level';
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
    <View style={{padding: 8}}>
      <Text style={{fontSize: 17, fontWeight: 'bold'}}>{props.item.name}</Text>
      <Text style={{fontSize: 15, marginTop: 6, marginBottom: 10}}>
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
    <Pressable
      onPress={
        () => openHanlde(item.fileUrl) 
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


const ListEbookNew = props => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.auth.current);
  const langState = useSelector(state => state.lang);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  const [query, setQuery] = useState('');
  const [arrLevelSelected, setArrayLevelSelected] = useState([]);
  function onMultiChange() {
    return item => setArrayLevelSelected(xorBy(arrLevelSelected, [item], 'id'));
  }
  const [arrCategorySelected, setArrayCategorySelected] = useState([]);
  function onMultiChange1() {
    return item =>
      setArrayCategorySelected(xorBy(arrCategorySelected, [item], 'id'));
  }

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const str = `e-book?page=${1}&size=10`;
    dispatch(
      searchEbookAsync({
        str: str,
        accessToken: current.tokens.access.token
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
        str = str + `&level[]=${ConvertLevel2(arrLevelSelected[i].item)}`;
      }
    }
    if (arrCategorySelected.length > 0) {
      for (let i = 0; i < arrCategorySelected.length; i++) {
        str = str + `&categoryId[]=${_listCate[arrCategorySelected[i].item]}`;
      }
    }

    dispatch(
      searchEbookAsync({
        str: str,
        accessToken: current.tokens.access.token
      }),
    );
    setCurrentPage(1);
  };


  return (
    <>
      <SearchBar
        round={true}
        containerStyle={{backgroundColor: 'black'}}
        inputContainerStyle={{
          backgroundColor: 'white',
          height: 37,
          borderRadius: 5,
        }}
        inputStyle={{backgroundColor: 'white', height: 20, fontSize: 16}}
        placeholder={
          langState.currentLang == 'en' ? 'search ebooks...' : 'từ khóa...'
        }
        onChangeText={value => setQuery(value)}
        value={query}
      />
      <View style={{marginHorizontal: 20}}>
        <SelectBox
          containerStyle={{marginTop: -16, backgroundColor: isDarkTheme?'white':null}}
          optionContainerStyle={{backgroundColor:isDarkTheme?'white':null}}
          hideInputFilter
          label={false}
          inputPlaceholder={langState.currentLang=='en'?"  Level":"  Cấp độ"}
          options={arrLevel}
          selectedValues={arrLevelSelected}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
          listOptionProps={{nestedScrollEnabled: true}}
        />
      </View>
      
      <View style={{marginHorizontal: 20}}>
        <SelectBox
          containerStyle={{marginTop: -16, backgroundColor: isDarkTheme?'white':null}}
          optionContainerStyle={{backgroundColor:isDarkTheme?'white':null}}
          hideInputFilter
          label={false}
          inputPlaceholder={langState.currentLang=='en'?"  Category":"  Thể loại"}
          options={arrCategory}
          selectedValues={arrCategorySelected}
          onMultiSelect={onMultiChange1()}
          onTapClose={onMultiChange1()}
          isMulti
          listOptionProps={{nestedScrollEnabled: true}}
        />
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
            marginTop: 6
          }}>
          <Pressable onPress={onSearch} style={{width: '100%'}}>
            <Text
              style={{
                color: 'white',
                paddingVertical: 6,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {langState.currentLang=='en'?'Search':'Tìm kiếm'}
            </Text>
          </Pressable>
        </View>
      <View style={{paddingBottom: 310}}>
            <SecondRoute
              dataEbooks={_dataEbooks.data.rows}
              navigation={
                props.navigation
              } 
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
                            `&level[]=${ConvertLevel2(arrLevelSelected[i].item)}`;
                        }
                      }
                      if (arrCategorySelected.length > 0) {
                        for (let i = 0; i < arrCategorySelected.length; i++) {
                          str =
                            str +
                            `&categoryId[]=${
                              _listCate[arrCategorySelected[i].item]
                            }`;
                        }
                      }

                      dispatch(
                        searchEbookAsync({
                          str: str,
                          accessToken: current.tokens.access.token
                        }),
                      );
                      setCurrentPage(index + 1);
                    }}
                    style={{
                      marginHorizontal: 1,
                      borderColor: 'black',
                      backgroundColor: 'yellow',
                      borderWidth: 1,
                      borderColor: 'black',
                      width: 30,
                      paddingVertical: 6,
                      borderRadius: 5,
                    }}>
                    <Text style={{textAlign: 'center'}}>{index + 1}</Text>
                  </Pressable>
                ),
              )}
            </View>
          </View>

    </>
  );
};

export default ListEbookNew;
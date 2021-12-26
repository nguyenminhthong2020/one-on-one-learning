/* eslint-disable */
import React, {useState} from 'react';
import { Text, View, FlatList, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {MAIN_COLOR} from '../../../../../globals/constant';
import {response} from '../../../../../api/course/searchApi';
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
const _arrLevel = [
  'Beginner',
  'Upper-Beginner',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
  'Pre-advanced',
  'Advanced',
  'Very-advanced',
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
];
const _arrCategory = [
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
        {props.item.level1} {props.item.topics.length} lessons
      </Text>
    </View>
  </View>
);
const renderItemFirstRoute = (item, navigation) => (
  <Pressable onPress={() => navigation.navigate('CourseDetail', {item: item})}>
    <Item item={item} />
  </Pressable>
);

const ListCourseNew = props => {
  const langState = useSelector(state => state.lang);
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
  const [_arrayCourseFilter, set_arrayCourseFilter] = useState(
    response.data.rows,
  );

  const onSearchCourse = () => {
    let x = [...new Set(arrLevelSelected.map(i => i.item))];
    let y = [...new Set(arrCategorySelected.map(i => i.item))];
    if (x.length == 0) {
      x = [..._arrLevel];
    }
    if (y.length == 0) {
      y = [..._arrCategory];
    }
    let arrRows = response.data.rows.filter(function (i) {
      if (
        i.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) &&
        x.includes(i.level1) &&
        y.includes(i.categories[0].title)
      ) {
        return true;
      } else {
        return false;
      }
    });
    set_arrayCourseFilter(arrRows);
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
          langState.currentLang == 'en' ? 'search courses...' : 'tên courses...'
        }
        onChangeText={value => setQuery(value)}
        value={query}
      />
      <View style={{marginHorizontal: 20}}>
        <SelectBox
          containerStyle={{marginTop: -10}}
          hideInputFilter
          label={false}
          inputPlaceholder="Level"
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
          containerStyle={{marginTop: -10}}
          hideInputFilter
          label={false}
          inputPlaceholder="Category"
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
          marginBottom: 2,
          marginTop: 8,
        }}>
        <Pressable onPress={onSearchCourse} style={{width: '100%'}}>
          <Text
            style={{
              color: 'white',
              paddingVertical: 6,
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
            }}>
            Search
          </Text>
        </Pressable>
      </View>

      <FlatList
        getItemLayout={(_, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
        removeClippedSubviews={true}
        windowSize={4}
        showsVerticalScrollIndicator={true}
        initialNumToRender={10}
        data={_arrayCourseFilter}
        extraData={_arrayCourseFilter}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItemFirstRoute(item, props.navigation)}
        disableVirtualization={false}
      />
    </>
  );
};

export default ListCourseNew;

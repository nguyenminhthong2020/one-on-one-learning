/* eslint-disable */
import React, {useState, Suspense, useEffect} from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  //TouchableOpacity,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
//import {SearchBar} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';

// import {useForm, Controller} from 'react-hook-form';
import TutorItem from '../../common/TutorItem/TutorItem';
import TutorItemSearch from '../../common/TutorItem/TutorItemSearch';
//const TutorItem = React.lazy(()=>{'../../common/TutorItem/TutorItem'});
import {useSelector, useDispatch} from 'react-redux';
import {searchSpecAsync} from '../../../../redux/slices/tutor/searchSlice';
import MyTag from '../../../_common/FlexibleButton/TagFlexibleButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moreAsync} from '../../../../redux/slices/tutor/moreSlice';
import {isPageTwoExistAsync} from '../../../../redux/slices/tutor/searchSlice';

const Search = props => {
  const dispatch = useDispatch();
  const langState = useSelector(state => state.lang);

  const [spec, setSpec] = useState(['']);
  const [array, setArray] = useState([]);
  const [arrayShow, setArrayShow] = useState(array);
  const [currentPage, setCurrentPage] = useState(1);

  //const [arrayShow, setArrayShow] = useState(array);
  useEffect(() => {
    dispatch(
      moreAsync({
        page: 1,
        perPage: 9,
      }),
    );
  }, []);
  //const listFavorite = useSelector(state => state.moretutor.rows);

  useEffect(() => {
    dispatch(
      searchSpecAsync({
        filters: {specialties: spec, date: '2021-12-04T06:03:15.995Z'},
        page: 1,
        perPage: 12,
      }),
    );
    dispatch(
      isPageTwoExistAsync({
        filters: {specialties: spec, date: '2021-12-04T06:03:15.995Z'},
        page: 2,
        perPage: 12,
      }),
    );
    setCurrentPage(1);
  }, [spec]);

  useEffect(() => {
    dispatch(
      searchSpecAsync({
        filters: {specialties: spec, date: '2021-12-04T06:03:15.995Z'},
        page: currentPage,
        perPage: 12,
      }),
    );
  }, [currentPage]);

  const arrayState = useSelector(state => state.searchtutor.rows);
  useEffect(() => {
    setArray(arrayState);
    setArrayShow(array);
  }, [arrayState]);

  const [country, setCountry] = useState({name: '', cca2: ''}); // Vietnam, VN
  const [nameQuery, setNameQuery] = useState('');

  //const onPressTutor = index => alert('link to tutor detail index ' + index);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  // const handlePageTwo = function () {
  //   dispatch(
  //     isPageTwoExistAsync({
  //       filters: {specialties: spec, date: '2021-12-04T06:03:15.995Z'},
  //       page: 2,
  //       perPage: 12,
  //     }),
  //   );
  // };
  const isPageTwo = useSelector(state => state.searchtutor.isPageTwoExist);
  // useEffect(() => {
  //   if (isPageTwo == true) {
  //     dispatch(
  //       searchSpecAsync({
  //         filters: {specialties: spec, date: '2021-12-04T06:03:15.995Z'},
  //         page: 2,
  //         perPage: 12,
  //       }),
  //     );
  //     setCurrentPage(2);
  //   }else{
  //     alert("No page 2");
  //   }
  // }, [isPageTwo]);

  const renderTest = array => {
    //const array1 = array.map(item => listFavorite.includes(item.userId) ? {...item, isFavorite: true} : {...item, isFavorite: false});

    return array.length == 0 ? (
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Text style={{fontSize: 20, color: MAIN_COLOR}}>No Tutor !</Text>
      </View>
    ) : (
      <View style={{marginTop: 5}}>
        {array.map((item, index) => (
          <TutorItemSearch
            key={index}
            onPress={
              () =>
                props.navigation.navigate('TutorDetailNew', {
                  uri: item.avatar,
                  name: item.name,
                }) /*onPressTutor(i.index)*/
            }
            tutor={item}
          />
        ))}
        {
          isPageTwo == true ? <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 15,
          }}>
          <Pressable
            onPress={() => setCurrentPage(1)}
            style={{
              backgroundColor: MAIN_COLOR,
              marginRight: 20,
              width: 70,
              borderRadius: 20,
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: currentPage == 1 ? 'yellow' : 'white',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              1
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentPage(2)}
            style={{
              backgroundColor: MAIN_COLOR,
              width: 70,
              borderRadius: 20,
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: currentPage == 2 ? 'yellow' : 'white',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              2
            </Text>
          </Pressable>
        </View>
        : 
        <>
        </>
        }
        
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
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
          *{langState[langState.currentLang].Name}:{'   '}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 5,
            height: 40,
            fontSize: 14,
            width: '60%',
            backgroundColor: 'white',
          }}
          value={nameQuery}
          onChangeText={value => setNameQuery(value)}
          placeholder={langState == 'en' ? 'search name...' : 'tìm theo tên...'}
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
          *{langState[langState.currentLang].Country}:{'  '}
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
        <AntDesign
          name={'reload1'}
          size={22}
          color={'red'}
          style={{marginLeft: 10}}
          onPress={() => {
            setCountry({cca2: '', name: ''});
          }}
        />
      </View>
      <View style={styles.container1}>
        <Pressable
          style={styles.button1}
          onPress={() => {
            if (nameQuery.length > 0 && country.name.length == 0) {
              setArrayShow(array.filter(item => item.name.toLowerCase().includes(nameQuery.toLowerCase())));
            } else if (nameQuery.length == 0 && country.name.length > 0) {
              setArrayShow(array.filter(item => item.country == country.cca2));
            } else if (nameQuery.length > 0 && country.name.length > 0) {
              setArrayShow(
                array.filter(
                  item =>
                    item.country == country.cca2 &&
                    item.name.toLowerCase().includes(nameQuery.toLowerCase()),
                ),
              );
            } else {
              setSpec(['']);
            }
          }}>
          <Text style={styles.text1}>
            {langState[langState.currentLang].Search}
          </Text>
        </Pressable>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkTheme ? 'white' : 'black',
          }}>
          {langState[langState.currentLang].Filter_Tutors}: {/* {' '} */}
        </Text>
        <Text style={{color: isDarkTheme ? 'yellow' : 'red'}}>{spec}</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
        <MyTag
          title={'All'}
          onPress={() => {
            // alert('all');
            setSpec(['']);
          }}
        />
        <MyTag
          title={'ConversationalEnglish'}
          onPress={() => {
            // alert('conversational-english');
            setSpec(['conversational-english']);
          }}
        />
        <MyTag
          title={'BusinessEnglish'}
          onPress={() => {
            // alert('business-english');
            setSpec(['business-english']);
          }}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: 3, marginLeft: 10}}>
        <MyTag
          title={'EnglishforKids'}
          onPress={() => {
            // alert('english-for-kids');
            setSpec(['english-for-kids']);
          }}
        />
        <MyTag
          title={'STARTERS'}
          onPress={() => {
            // alert('starters');
            setSpec('starters');
          }}
        />
        <MyTag
          title={'FLYERS'}
          onPress={() => {
            // alert('flyers');
            setSpec(['flyers']);
          }}
        />
        <MyTag
          title={'KET'}
          onPress={() => {
            // alert('ket');
            setSpec(['ket']);
          }}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: 3, marginLeft: 10}}>
        <MyTag
          title={'MOVERS'}
          onPress={() => {
            // alert('movers');
            setSpec(['movers']);
          }}
        />
        <MyTag title={'PET'} onPress={() => setSpec(['pet'])} />
        <MyTag
          title={'IELTS'}
          onPress={() => {
            // alert('ielts');
            setSpec(['ielts']);
          }}
        />
        <MyTag
          title={'TOEFL'}
          onPress={() => {
            // alert('toefl');
            setSpec(['toefl']);
          }}
        />
        <MyTag
          title={'TOEIC'}
          onPress={() => {
            // alert('toeic');
            setSpec(['toeic']);
          }}
        />
      </View>
      {renderTest(arrayShow)}
    </ScrollView>
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

export default Search;

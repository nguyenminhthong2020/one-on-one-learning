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
  SafeAreaView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';

// import {useForm, Controller} from 'react-hook-form';
//import TutorItem from '../../common/TutorItem/TutorItem';
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
  const current = useSelector(state => state.auth.current);

  const [spec, setSpec] = useState(['']);
  const [array, setArray] = useState([]);
  const [arrayShow, setArrayShow] = useState(array); 
  const [currentPage, setCurrentPage] = useState(1);


  //const [arrayShow, setArrayShow] = useState(array);

  // useEffect(() => {
  //   dispatch(
  //     moreAsync({
  //       accessToken: current.tokens.access.token,
  //       page: 1,
  //       perPage: 9,
  //     }),
  //   );
  // }, []);

  //const listFavorite = useSelector(state => state.moretutor.rows);

  useEffect(() => {
    dispatch(
      searchSpecAsync({
        accessToken: current.tokens.access.token,
        filters: {specialties: spec, date: new Date().toISOString()},
        page: 1,
        perPage: 12,
      }),
    );
    dispatch(
      isPageTwoExistAsync({
        filters: {specialties: spec, date: new Date().toISOString()},
        page: 2,
        perPage: 12,
      }),
    );
    setCurrentPage(1);
  }, [spec]);

  useEffect(() => {
    dispatch(
      searchSpecAsync({
        accessToken: current.tokens.access.token,
        filters: {specialties: spec, date: new Date().toISOString()},
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

  //const [country, setCountry] = useState({name: '', cca2: ''}); // Vietnam, VN
  const [nameQuery, setNameQuery] = useState('');


  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  const isPageTwo = useSelector(state => state.searchtutor.isPageTwoExist);
  

  const renderTest = array => {
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
                  // uri: item.avatar,
                  // name: item.name,
                  tutor: item,
                }) /*onPressTutor(i.index)*/
            }
            tutor={item}
          />
        ))}
        {isPageTwo == true ? (
          <View
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
        ) : (
          <></>
        )}
      </View>
    );
  };

  return (
    <>
      <SearchBar
        round={true}
        containerStyle={{backgroundColor: 'black'}}
        inputContainerStyle={{backgroundColor: 'white', height: 35, borderRadius: 5}}
        inputStyle={{backgroundColor: 'white', height: 20, fontSize: 15}}
        placeholder={
          langState.currentLang == 'en' ? 'search tutors...' : 'tìm theo tên...'
        }
        onChangeText={value => setNameQuery(value)}
        value={nameQuery}
      />
      <View style={styles.container1}>
        <Pressable
          style={styles.button1}
          onPress={() => {
            // if (nameQuery.length > 0 && country.name.length == 0) {
            //   setArrayShow(array.filter(item => item.name.toLowerCase().includes(nameQuery.toLowerCase())));
            // } else if (nameQuery.length == 0 && country.name.length > 0) {
            //   setArrayShow(array.filter(item => item.country == country.cca2));
            // } else if (nameQuery.length > 0 && country.name.length > 0) {
            //   setArrayShow(
            //     array.filter(
            //       item =>
            //         //item.country == country.cca2 &&
            //         item.name.toLowerCase().includes(nameQuery.toLowerCase()),
            //     ),
            //   );
            // } else {
            //   setSpec(['']);
            // }
            if (nameQuery.length > 0) {
              setArrayShow(
                array.filter(item =>
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
              fontSize: 16,
              fontWeight: 'bold',
              color: isDarkTheme ? 'white' : 'black',
            }}>
            {langState[langState.currentLang].Filter_Tutors}: {/* {' '} */}
          </Text>
          <Text style={{color: isDarkTheme ? 'yellow' : 'red'}}>{spec}</Text>
        </View>
        
        <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 10, marginBottom: 5}}>
        <MyTag
            title={'All'}
            onPress={() => {
              setSpec(['']);
            }}
          />
          <MyTag
            title={'Conversational English'}
            onPress={() => {
              setSpec(['conversational-english']);
            }}
          />
          <MyTag
            title={'Business English'}
            onPress={() => {
              setSpec(['business-english']);
            }}
          />
          <MyTag
            title={'English for Kids'}
            onPress={() => {
              setSpec(['english-for-kids']);
            }}
          />
          <MyTag
            title={'STARTERS'}
            onPress={() => {
              setSpec('starters');
            }}
          />
          <MyTag
            title={'FLYERS'}
            onPress={() => {
              setSpec(['flyers']);
            }}
          />
          <MyTag
            title={'KET'}
            onPress={() => {
              setSpec(['ket']);
            }}
          />
          <MyTag
            title={'MOVERS'}
            onPress={() => {
              setSpec(['movers']);
            }}
          />
          <MyTag title={'PET'} onPress={() => setSpec(['pet'])} />
          <MyTag
            title={'IELTS'}
            onPress={() => {
              setSpec(['ielts']);
            }}
          />
          <MyTag
            title={'TOEFL'}
            onPress={() => {
              setSpec(['toefl']);
            }}
          />
          <MyTag
            title={'TOEIC'}
            onPress={() => {
              setSpec(['toeic']);
            }}
          />
        </ScrollView>
        </View>
        {/* <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
          <MyTag
            title={'All'}
            onPress={() => {
              setSpec(['']);
            }}
          />
          <MyTag
            title={'ConversationalEnglish'}
            onPress={() => {
              setSpec(['conversational-english']);
            }}
          />
          <MyTag
            title={'BusinessEnglish'}
            onPress={() => {
              setSpec(['business-english']);
            }}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 3, marginLeft: 10}}>
          <MyTag
            title={'EnglishforKids'}
            onPress={() => {
              setSpec(['english-for-kids']);
            }}
          />
          <MyTag
            title={'STARTERS'}
            onPress={() => {
              setSpec('starters');
            }}
          />
          <MyTag
            title={'FLYERS'}
            onPress={() => {
              setSpec(['flyers']);
            }}
          />
          <MyTag
            title={'KET'}
            onPress={() => {
              setSpec(['ket']);
            }}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 3, marginLeft: 10, marginBottom: 3}}>
          <MyTag
            title={'MOVERS'}
            onPress={() => {
              setSpec(['movers']);
            }}
          />
          <MyTag title={'PET'} onPress={() => setSpec(['pet'])} />
          <MyTag
            title={'IELTS'}
            onPress={() => {
              setSpec(['ielts']);
            }}
          />
          <MyTag
            title={'TOEFL'}
            onPress={() => {
              setSpec(['toefl']);
            }}
          />
          <MyTag
            title={'TOEIC'}
            onPress={() => {
              setSpec(['toeic']);
            }}
          />
        </View> */}
      <ScrollView style={styles.container}>
        {/* <View
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
            width: '55%',
            backgroundColor: 'white',
          }}
          value={nameQuery}
          onChangeText={value => setNameQuery(value)}
          placeholder={langState == 'en' ? 'search name...' : 'tìm theo tên...'}
        />
        {nameQuery != '' && <AntDesign
          name={'close'}
          size={22}
          color={'red'}
          style={{marginLeft: 10}}
          onPress={() => {
            setNameQuery('');
          }}
        />}
      </View> */}
        {/* <View
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
        {country.cca2 != '' && <AntDesign
          name={'close'}
          size={22}
          color={'red'}
          style={{marginLeft: 10}}
          onPress={() => {
            setCountry({cca2: '', name: ''});
          }}
        />}
      </View> */}

        
        {renderTest(arrayShow)}
      </ScrollView>
    </>
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
    paddingVertical: 4,
  },
  container1: {
    width: '30%',
    left: '35%',
    marginTop: 4,
  },
  text1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Search;

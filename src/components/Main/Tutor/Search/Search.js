/* eslint-disable */
import React, {useState, Suspense, useEffect} from 'react';
import {MAIN_COLOR, BASE_URL, THIRD_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
// import CountryPicker from 'react-native-country-picker-modal';
// import {useForm, Controller} from 'react-hook-form';
const TutorItemSearch = React.lazy(() =>
  import('../../common/TutorItem/TutorItemSearch.js'),
);
import {useSelector} from 'react-redux';
import MyTag from '../../../_common/FlexibleButton/TagFlexibleButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const MAXIMUM = 100;
const PER_PAGE_VALUE = 5;
const MAX_NUMBER_PAGE = 7;
const Search = props => {
  const langState = useSelector(state => state.lang);
  const current = useSelector(state => state.auth.current);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

  const [nameQuery, setNameQuery] = useState('');
  const [spec, setSpec] = useState(['']);

  const [arrTutorPagination, setArrTutorPagination] = useState({
    arrTutor: [],
    arrPagination: [],
    currentPage: 1,
  });

  const axiosInstance1 = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });

  const handleSearchAndPaginate = (_index, _isMounted) => {
    axiosInstance1
      .post(`tutor/search`, {
        filters: {
          specialties: spec, 
          date: new Date().toISOString(),
        },
        page: 1,
        perPage: MAXIMUM,
      })
      .then(res => {
        if (res.data.count > 0) {
          // res.data.count = res.data.rows.length = result.length
          let newArrTutor;
          if (nameQuery != '') {
            newArrTutor = res.data.rows.filter(item =>
              item.name.toLowerCase().includes(nameQuery.toLowerCase()),
            );
          } else {
            newArrTutor = res.data.rows;
          }
         
          let arrCount = [];
          for (let i = 0; i < Math.ceil(newArrTutor.length / PER_PAGE_VALUE); i++) {
            arrCount.push(i);
          }

          if (_isMounted) {
            setArrTutorPagination({
              currentPage: _index + 1,
              arrTutor: newArrTutor.slice(
                _index * PER_PAGE_VALUE,
                _index * PER_PAGE_VALUE + PER_PAGE_VALUE,
              ),
              arrPagination: arrCount.slice(0, MAX_NUMBER_PAGE),
            });
          }
        }
      }).catch(err => {
        if (JSON.stringify(err).includes('message')) {
          alert('FAIL:\n' + err.response.data.message);
        } else {
          alert('FAIL:\n' + err);
        }
      });
  };

  useEffect(() => {
    let isMounted = true;
    handleSearchAndPaginate(0, isMounted);
    return () => {
      isMounted = false;
    };
  }, [spec]);

  //const [country, setCountry] = useState({name: '', cca2: ''}); // Vietnam, VN

  const renderTest = arrTutorPagination => {
    return arrTutorPagination.arrTutor.length == 0 ? (
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Text style={{fontSize: 20, color: MAIN_COLOR}}>No Tutor !</Text>
      </View>
    ) : (
      <View style={{marginTop: 5}}>
        {arrTutorPagination.arrTutor.map((item, index) => (
          <Suspense
            fallback={
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            }
            key={index}>
            <TutorItemSearch
              onPress={() =>
                props.navigation.navigate('TutorDetailNew', {
                  tutor: item,
                })
              }
              tutor={item}
            />
          </Suspense>
        ))}
        {arrTutorPagination.arrTutor.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
            {arrTutorPagination.arrPagination.map((item, index) =>
              index + 1 == arrTutorPagination.currentPage ? (
                <View
                  key={index}
                  style={{
                    marginHorizontal: 1,
                    width: 40,
                    borderColor: MAIN_COLOR,
                    backgroundColor: MAIN_COLOR,
                    borderWidth: 1,
                    borderColor: MAIN_COLOR,
                    paddingVertical: 6,
                    borderRadius: 5,
                    marginBottom: 20,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {index + 1}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleSearchAndPaginate(index, true)
                  }}
                  style={{
                    marginHorizontal: 1,
                    borderColor: 'black',
                    backgroundColor: 'yellow',
                    borderWidth: 1,
                    borderColor: 'black',
                    paddingVertical: 6,
                    width: 40,
                    borderRadius: 5,
                    marginBottom: 20,
                  }}>
                  <Text style={{textAlign: 'center', color: 'black'}}>{index + 1}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  };
  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <SearchBar
          round={true}
          containerStyle={{backgroundColor: 'black', width: '78%'}}
          inputContainerStyle={{
            backgroundColor: 'white',
            height: 40,
            borderRadius: 5,
          }}
          inputStyle={{backgroundColor: 'white', height: 26, fontSize: 16, color: 'black'}}
          placeholder={
            langState.currentLang == 'en'
              ? 'search tutors...'
              : 'tìm theo tên...'
          }
          onChangeText={value => setNameQuery(value)}
          value={nameQuery}
        />
        <View style={{width: '22%', backgroundColor: 'black', paddingVertical: 8}}>
        <Pressable
          style={[
            styles.button1,
            { paddingVertical: 9, borderRadius: 20},
          ]}
          onPress={() => {
            if (nameQuery.length > 0) {
              handleSearchAndPaginate(0, true);
            } 
          }}>
          <Text style={[styles.text1, {textAlign: 'center'}]}>
            {langState[langState.currentLang].Search}
          </Text>
        </Pressable>
        </View>
      </View>
      <View
        style={{
          height: 5,
          backgroundColor: isDarkTheme ? 'black' : 'white',
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDarkTheme ? 'black' : 'white',
        }}>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 10,
            fontWeight: 'bold',
            color: isDarkTheme ? 'white' : 'black',
            marginBottom: 3
          }}>
          {langState[langState.currentLang].Filter_Tutors}:{' '}
        </Text>
        <MyTag
            isActive
            title={spec != '' ? spec: "All"}
            onPress={() => {
            }}
          />
      </View>
      <View style={{backgroundColor: isDarkTheme ? 'black' : 'white'}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginHorizontal: 10, marginBottom: 5}}>
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
              setSpec(['starters']);
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
      <View
        style={{
          height: 5,
          backgroundColor: isDarkTheme ? 'black' : 'white',
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          backgroundColor: isDarkTheme ? 'black' : 'white',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: isDarkTheme ? 'white' : 'black',
            marginLeft: 10,
          }}>
          {langState.currentLang=='en'?'Results':'Kết quả'}:{' '}
        </Text>
        <FontAwesome
          name="refresh"
          size={30}
          color={THIRD_COLOR}
          style={{marginRight: 15}}
          onPress={() => {
            setSpec(['']);
            setNameQuery('');
          }}
        />
      </View>
      <ScrollView
        style={[
          styles.container,
          {backgroundColor: isDarkTheme ? 'black' : 'white'},
        ]}>
        {renderTest(arrTutorPagination)}
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
/* eslint-disable */
import React, {useState, Suspense, useEffect} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
// import CountryPicker from 'react-native-country-picker-modal';

// import {useForm, Controller} from 'react-hook-form';
const TutorItemSearch = React.lazy(()=> import('../../common/TutorItem/TutorItemSearch.js'));
import {useSelector, useDispatch} from 'react-redux';
import MyTag from '../../../_common/FlexibleButton/TagFlexibleButton';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

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
    baseURL: 'https://api.app.lettutor.com/',
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });

  useEffect(() => {
    let isMounted = true;

    axiosInstance1
      .post(`tutor/search`, {
        filters: {specialties: spec, date: new Date().toISOString()},
        page: 1,
        perPage: 12,
      })
      .then(res => {
        if (res.data.count > 0) {
          const _countPage = ~~(res.data.count / 12) + 1;
          let arrCount = [];
          for (let i = 0; i < _countPage; i++) {
            arrCount.push(i);
          }
          if (isMounted) {
            setArrTutorPagination({
              currentPage: 1,
              arrTutor: res.data.rows,
              arrPagination: arrCount.slice(0, 5),
            });
          }
        }
      });
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
            onPress={
              () =>
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
                    marginHorizontal: 8,
                    width: 40,
                    borderColor: MAIN_COLOR,
                    backgroundColor: MAIN_COLOR,
                    borderWidth: 1,
                    borderColor: MAIN_COLOR,
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginBottom: 20
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {index + 1}
                  </Text>
                </View>
              ) : (
                <Pressable
                  key={index}
                  onPress={() => {
                    axiosInstance1
                      .post(`tutor/search`, {
                        filters: {
                          specialties: spec,
                          date: new Date().toISOString(),
                        },
                        page: index + 1,
                        perPage: 12,
                      })
                      .then(res => {
                        if (res.data.count > 0) {
                          const newArrTutor = res.data.rows.filter(item =>
                        item.name
                          .toLowerCase()
                          .includes(nameQuery.toLowerCase()),
                      );
                    // if(newArrTutor.length > 0)
                    //       {
                          let arrCount = [];

                          if(index == 0)
                          {
                          const _countPage = ~~(newArrTutor.length / 12) + 1;
                          for (let i = 0; i < _countPage; i++) {
                            arrCount.push(i);
                          }
                          }else{
                            for (let i = 0; i < index + 1; i++) {
                            arrCount.push(i);
                          }
                          }
          

                          setArrTutorPagination({
                            currentPage: index + 1,
                            arrTutor: newArrTutor,
                            arrPagination: arrCount.slice(0, 5),
                          });
                        //}
                        }
                      });
                  }}
                  style={{
                    marginHorizontal: 8,
                    borderColor: 'black',
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: 'black',
                    paddingVertical: 5,
                    width: 40,
                    borderRadius: 5,
                    marginBottom: 20
                  }}>
                  <Text style={{textAlign: 'center'}}>{index + 1}</Text>
                </Pressable>
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
      <SearchBar
        round={true}
        containerStyle={{backgroundColor: 'black'}}
        inputContainerStyle={{
          backgroundColor: 'white',
          height: 35,
          borderRadius: 5,
        }}
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
              axiosInstance1
                .post(`tutor/search`, {
                  filters: {specialties: spec, date: new Date().toISOString()},
                  page: 1,
                  perPage: 12,
                })
                .then(res => {
                  if (res.data.count > 0) {
                    const newArrTutor = res.data.rows.filter(item =>
                        item.name
                          .toLowerCase()
                          .includes(nameQuery.toLowerCase()),
                      );
                    // if(newArrTutor.length > 0)
                    // {
                      const _countPage = ~~(newArrTutor.length / 12) + 1;
                      let arrCount = [];
                      for (let i = 0; i < _countPage; i++) {
                        arrCount.push(i);
                      }
                      
                      setArrTutorPagination({
                        currentPage: 1,
                        arrTutor: newArrTutor,
                        arrPagination: arrCount.slice(0, 5),
                      });
                    //}
                  }
                });

              // setArrTutorPagination({
              //   arrTutor: array.filter(item =>
              //     item.name.toLowerCase().includes(nameQuery.toLowerCase()),
              //   ),
              // }
              // );
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
        style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginBottom: 1}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: isDarkTheme ? 'white' : 'black',
          }}>
          {langState[langState.currentLang].Filter_Tutors}: 
        </Text>
        <Text style={{color: isDarkTheme ? 'yellow' : 'red'}}>{spec}</Text>
      </View>

      <View>
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
      {/* <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
          <MyTag
            title={'All'}
            onPress={() => {
              setSpec(['']);
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
        </View>
        <View style={{flexDirection: 'row', marginTop: 3, marginLeft: 10, marginBottom: 3}}>
          <MyTag
            title={'MOVERS'}
            onPress={() => {
              setSpec(['movers']);
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

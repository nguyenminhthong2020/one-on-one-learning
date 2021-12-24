/* eslint-disable */
import React, {Suspense, useState, useEffect} from 'react';
import {
  MAIN_COLOR,
  // SECOND_COLOR,
  // NUM_OF_LINES,
} from '../../../globals/constant';
import {
  Text,
  View,
  //Alert,
  ActivityIndicator,
  StyleSheet,
  //TouchableOpacity,
  Pressable,
  //FlatList,
  ScrollView,
} from 'react-native';

const Header = React.lazy(() => import('../../_common/Header/Header'));
const HeadContent = React.lazy(() => import('./HeadContent/HeadContent'));
import MyTag from '../../_common/FlexibleButton/TagFlexibleButton';

const TutorItem = React.lazy(() => import('../common/TutorItem/TutorItem'));
import {useSelector, useDispatch} from 'react-redux';
import {searchSpecAsync} from '../../../redux/slices/tutor/searchSlice';
import {moreAsync} from '../../../redux/slices/tutor/moreSlice';

import axios from 'axios';
import { logout, initNew } from '../../../redux/slices/auth/loginSlice';

//import {Rating} from 'react-native-ratings';
//import { Rating } from 'react-native-elements';  // = cái ở dưới

const Home = props => {
  console.log("render Home");
  const dispatch = useDispatch(); 

  const current = useSelector(state => state.auth.current);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const langState = useSelector(state => state.lang);

  const [spec, setSpec] = useState(['']);
  const [array, setArray] = useState([]);
  const [listFav, setListFav] = useState([]);
  
  const axiosInstance1 = axios.create({
    baseURL: 'https://api.app.lettutor.com/',
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });
  useEffect(() => {
    if (
      new Date(current.tokens.access.expires).getTime() <= new Date().getTime()
    ) {
      if (
        new Date(current.tokens.refresh.expires).getTime() <= new Date().getTime()
      ) {
        dispatch(logout());
        props.navigation.navigate('Login');
      } else {
        (async () => {
          const resRefresh = await axiosInstance1.post('auth/refresh-token', {
            refreshToken: current.tokens.refresh.token,
            timezone: 7,
          });
          dispatch(
            initNew({
              current: resRefresh.data,
            }),
          );
        })();
      }
    }else{
      dispatch(
        moreAsync({
          page: 1,
          perPage: 9,
          accessToken: current.tokens.access.token,
        }),
      );
    }
  }, []);

  const listFavorite = useSelector(state => state.moretutor.rows);
  useEffect(() => {
    setListFav(listFavorite);
  }, [listFavorite]);
  

  useEffect(() => {
    dispatch(
      searchSpecAsync({
        accessToken: current.tokens.access.token,
        filters: {specialties: spec, date: new Date().toISOString()},
        page: 1,
        perPage: 12,
      }),
    );
  }, [spec]);

  const arrayState = useSelector(state => state.searchtutor.rows);
  useEffect(() => {
    setArray(arrayState);
  }, [arrayState]);

  const [state, setstate] = useState(true);

  // const arrTitle = [
  //   'EnglishforKids',
  //   'BusinessEnglish',
  //   'ConversationalEnglish',
  //   'STARTERS',
  //   'MOVERS',
  //   'FLYERS',
  //   'KET',
  //   'PET',
  //   'IELTS',
  //   'TOEFL',
  //   'TOEIC',
  // ];

  const renderTestScrollView = () => {
    let arrayFav = [];
    let arrayNoFav = [];

    array.forEach(item => 
      listFav.includes(item.userId) ? 
      arrayFav.push({...item}) : 
      arrayNoFav.push({...item}));
    
    const array1 = [...arrayFav, ...arrayNoFav];

    return array1.length == 0 ? 
    (<View style={{marginTop: 20}}>
       <Text style={{fontSize: 20, color: isDarkTheme ? "yellow": "blue", textAlign: 'center'}}>
           No Tutor !
       </Text>
    </View>) : 
    array1.map((tutor, index) => (
      <Suspense
        fallback={
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        }
        key={index}>
        <TutorItem
          onPress={
            () =>
              props.navigation.navigate('TutorDetailNew', {
                // uri: tutor.avatar,
                // name: tutor.name,
                tutor: tutor
              }) /*onPressTutor(index)*/
          }
          tutor={tutor}
        />
      </Suspense>
    ));
  };

  const renderFilterTag = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        <View style={{flexDirection: 'row', marginTop: 5}}>
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
        <View style={{flexDirection: 'row', marginTop: 3}}>
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
        <View style={{flexDirection: 'row', marginTop: 3}}>
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
        {/* <View style={{flexDirection: 'row'}}>
           </View> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Suspense fallback={<View></View>}>
        <Header navigation={props.navigation} />
      </Suspense>
      {/* <Suspense fallback={<View></View>}><HeadContent state={state} setstate={setstate}></HeadContent></Suspense> */}

      {/* <View style={{marginHorizontal: 18, marginTop: 20, marginBottom: 3}}>
          {renderFilterTag()}
      </View> */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 18,
          marginTop: 30,
          marginBottom: 3,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          Recommend Tutors
        </Text>
        <TouchableOpacity onPress={() => alert('Search Tutor')}>
          <Text style={{color: MAIN_COLOR, fontSize: 15}}>{`See All >`}</Text>
        </TouchableOpacity>
      </View> */}
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        data={array}
        renderItem={i => (
          <Suspense
            fallback={
              <View></View>
              // <View style={{alignItems: 'center'}}>
              //   <ActivityIndicator size="large" color="#00ff00" />
              // </View>
            }
            key={i.index}>
            <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
          </Suspense>
        )}
      /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Suspense fallback={<View></View>}>
          <HeadContent
            state={state}
            setstate={setstate}
            navigation={props.navigation}></HeadContent>
        </Suspense>

        <View style={{marginHorizontal: 18, marginTop: 20, marginBottom: 3}}>
          {renderFilterTag()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 18,
            marginTop: 30,
            marginBottom: 3,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: isDarkTheme ? 'white' : 'black',
            }}>
            {langState[langState.currentLang].Recommend_Tutors}
          </Text>
          <Pressable onPress={() => props.navigation.navigate('Tutors')}>
            <Text
              style={{
                color: isDarkTheme ? 'yellow' : MAIN_COLOR,
                fontSize: 16,
              }}>
              {langState[langState.currentLang].See_All} {'>'}
            </Text>
          </Pressable>
        </View>
        {renderTestScrollView()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  shadowProp: {
    //borderWidth: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 4,
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // 5: càng lớn càng nhạt
  },
});

export default Home;

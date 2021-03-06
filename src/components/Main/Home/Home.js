/* eslint-disable */
import React, {Suspense, useState, useEffect} from 'react';
import {MAIN_COLOR, BASE_URL} from '../../../globals/constant';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const Header = React.lazy(() => import('../../_common/Header/Header'));
const HeadContent = React.lazy(() => import('./HeadContent/HeadContent'));
import MyTag from '../../_common/FlexibleButton/TagFlexibleButton';

const TutorItem = React.lazy(() => import('../common/TutorItem/TutorItem'));
import {useSelector, useDispatch} from 'react-redux';
import {searchSpecAsync} from '../../../redux/slices/tutor/searchSlice';
import {moreAsync} from '../../../redux/slices/tutor/moreSlice';
import {handleAverage1} from '../../../utils/utils';
import axios from 'axios';
import {logout, initNew} from '../../../redux/slices/auth/loginSlice';

//import {Rating} from 'react-native-ratings';
//import { Rating } from 'react-native-elements';  // = cái ở dưới

const backAction = () => {
  Alert.alert('Hold on!', 'Do you want to exit app?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {text: 'YES', onPress: () => BackHandler.exitApp()},
  ]);
  return true;
};

const Home = props => {
  const dispatch = useDispatch();

  const current = useSelector(state => state.auth.current);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const langState = useSelector(state => state.lang);

  const [spec, setSpec] = useState(['']);
  const [array, setArray] = useState([]);
  const [listFav, setListFav] = useState([]);

  let backHandler = null;

  const axiosInstance1 = axios.create({
    baseURL: BASE_URL,
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
        new Date(current.tokens.refresh.expires).getTime() <=
        new Date().getTime()
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
    } else {
      dispatch(
        moreAsync({
          page: 1,
          perPage: 9,
          accessToken: current.tokens.access.token,
        }),
      );
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (backHandler) backHandler.remove();
      backHandler = BackHandler.addEventListener('backPress', backAction);
      return () => {
        if (backHandler) backHandler.remove();
      };
    }, []),
  );

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

  const renderTestScrollView = () => {
    let _array = [...array];
    let t;
    for (let i = 0; i < _array.length - 1; i++)
      for (let j = i + 1; j < _array.length; j++) {
        let mi = handleAverage1(_array[i].feedbacks);
        let mj = handleAverage1(_array[j].feedbacks);
        if (mi < mj) {
          t = _array[i];
          _array[i] = _array[j];
          _array[j] = t;
        }
      }

    let arrayFav = [];
    let arrayNoFav = [];

    _array.forEach(item =>
      listFav.includes(item.userId)
        ? arrayFav.push({...item})
        : arrayNoFav.push({...item}),
    );

    const array1 = [...arrayFav, ...arrayNoFav];

    return array1.length == 0 ? (
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontSize: 20,
            color: isDarkTheme ? 'yellow' : 'blue',
            textAlign: 'center',
          }}>
          No Tutor !
        </Text>
      </View>
    ) : (
      array1.map((tutor, index) => (
        <Suspense
          fallback={
            <View style={{alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          }
          key={index}>
          <TutorItem
            onPress={() =>
              props.navigation.navigate('TutorDetailNew', {
                tutor: tutor,
              })
            }
            tutor={tutor}
          />
        </Suspense>
      ))
    );
  };

  const renderFilterTag = () => {
    return (
      <View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: isDarkTheme ? 'white' : 'black',
            }}>
            {langState[langState.currentLang].Filter_Tutors}:{' '}
          </Text>
          <MyTag
            isActive
            title={spec != '' ? spec : 'All'}
            onPress={() => {}}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginBottom: 5}}>
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
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkTheme ? 'black' : 'white'},
      ]}>
      <Suspense fallback={<View></View>}>
        <Header navigation={props.navigation} />
      </Suspense>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Suspense fallback={<View></View>}>
          <HeadContent
            state={state}
            setstate={setstate}
            navigation={props.navigation}></HeadContent>
        </Suspense>

        <View style={{marginHorizontal: 18, marginTop: 15, marginBottom: 3}}>
          {renderFilterTag()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 18,
            marginTop: 20,
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
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 4,
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
});

export default Home;

/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import { MAIN_COLOR } from '../../../../globals/constant';
import {useSelector, useDispatch} from 'react-redux';
import TutorItem from '../../common/TutorItem/TutorItem';
import { searchSpecAsync } from '../../../../redux/slices/tutor/searchSlice';

export default function Favorites(props) {
  const dispatch = useDispatch();

  const [array, setArray] = useState([]);
  const listFavorite = useSelector(state => state.moretutor.rows);
  const current = useSelector(state => state.auth.current);

  useEffect(() => {
    dispatch(
      searchSpecAsync({
        accessToken: current.tokens.access.token,
        filters: {specialties: [''], date: new Date().toISOString()},
        page: 1,
        perPage: 12,
      }),
    );
  }, []);

  const arrayState = useSelector(state => state.searchtutor.rows);
  useEffect(() => {
    setArray(arrayState);
  }, [arrayState]);

  let arrayFav = [];
  array.forEach(item => {
    if (listFavorite.includes(item.userId)) {
      arrayFav.push({...item, isFavorite: true});
    }
  });

  return listFavorite.length == 0 ? (
    <View style={{marginTop: 40}}>
      <Text style={{color: MAIN_COLOR, textAlign: 'center', fontSize: 25}}>No Favorite</Text>
    </View>
  ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
      {arrayFav.map((tutor, index) => (
        <TutorItem
          onPress={
            () =>
              props.navigation.navigate('TutorDetailNew', {
                tutor: tutor,
              }) /*onPressTutor(index)*/
          }
          key={index}
          tutor={tutor}
        />
      ))}
    </ScrollView>
  );
}

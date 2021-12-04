/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  //TouchableOpacity,
  Pressable,
  ScrollView,
  FlatList,
  //SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TutorItem from '../../common/TutorItem/TutorItem';
import { searchSpecAsync } from '../../../../redux/slices/tutor/searchSlice';

export default function Favorites(props) {
  const dispatch = useDispatch();

  const [array, setArray] = useState([]);
  const listFavorite = useSelector(state => state.moretutor.rows);

  useEffect(() => {
    dispatch(
      searchSpecAsync({
        filters: {specialties: [''], date: '2021-12-04T06:03:15.995Z'},
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
    <View>
      <Text>No Favorite !</Text>
    </View>
  ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
      {arrayFav.map((tutor, index) => (
        <TutorItem
          onPress={
            () =>
              props.navigation.navigate('TutorDetailNew', {
                uri: tutor.avatar,
                name: tutor.name,
              }) /*onPressTutor(index)*/
          }
          key={index}
          tutor={tutor}
        />
      ))}
    </ScrollView>
  );
}

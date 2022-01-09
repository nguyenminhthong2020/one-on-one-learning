/* eslint-disable */
import React from 'react';
import {NUM_OF_LINES} from '../../../../globals/constant';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListTags from '../../../_common/ListTags/ListTags';
//import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFavAsync,
  removeFavAsync,
} from '../../../../redux/slices/tutor/moreSlice';
import {handleAverage} from '../../../../utils/utils';

const TutorItem = props => {
  const dispatch = useDispatch();
  let isFav = useSelector(state => state.moretutor.rows);
  let check = isFav.includes(props.tutor.userId);
  const current = useSelector(state => state.auth.current);
  const _rating = handleAverage(props.tutor.feedbacks);

  return (
    <Pressable
      onPress={props.onPress}
      style={{marginBottom: 10}}
    >
      <View style={styles.shadowProp}>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View>
            <FastImage
              style={{width: 50, height: 50, borderRadius: 25}}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: props.tutor.avatar,
                priority: FastImage.priority.normal,
              }}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                marginLeft: 6,
                fontWeight: 'bold',
              }}>
              {props.tutor.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 1,
                marginLeft: 10,
              }}>
              <Text style={{color: 'orange'}}>{_rating} </Text>
              {_rating != 'No reviews yet' && (
                <MaterialIcons name={'star'} size={16} color="orange"/>
              )}
            </View>
          </View>
          <View style={{position: 'absolute', right: 0}}>
            {check === false ? (
              <AntDesign
                name={'heart'}
                size={22}
                color={'gray'}
                onPress={() => {
                  dispatch(
                    addFavAsync({
                      tutorId: props.tutor.userId,
                      accessToken: current.tokens.access.token,
                    }),
                  );
                }}
              />
            ) : (
              <AntDesign
                name={'heart'}
                size={22}
                color={'rgb(240, 72, 72)'}
                onPress={() => {
                  dispatch(
                    removeFavAsync({
                      tutorId: props.tutor.userId,
                      accessToken: current.tokens.access.token,
                    }),
                  );
                }}
              />
            )}
          </View>
        </View>
        <ListTags arr={props.tutor.specialties.split(',')} />
        <Text
          numberOfLines={NUM_OF_LINES}
          style={{fontSize: 15, color: 'black', marginTop: 5}}>
          {props.tutor.bio}
        </Text>
      </View>
    </Pressable>
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
    elevation: 5, // 5: càng lớn càng nhạt
  },
});

export default TutorItem;

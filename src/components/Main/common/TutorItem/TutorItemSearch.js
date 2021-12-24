/* eslint-disable */
import React, {useState} from 'react';
import {
  MAIN_COLOR,
  SECOND_COLOR,
  NUM_OF_LINES,
} from '../../../../globals/constant';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import ListTags from '../../../_common/ListTags/ListTags';

//import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import { handleAverage } from '../../../../utils/utils';

const TutorItemSearch = props => {
  const _rating  = handleAverage(props.tutor.feedbacks);

  return (
    <Pressable onPress={props.onPress} style={{marginBottom: 10}}>
      <View style={styles.shadowProp}>
        <View>
          {/* {like === false ? (
            <AntDesign
              name={'heart'}
              size={22}
              color={'gray'}
              style={{textAlign: 'right', marginBottom: -15, marginRight: 10}}
              onPress={() => {
                setLike(!like);
              }}
            />
          ) : (
            <AntDesign
              name={'heart'}
              size={22}
              color={'rgb(240, 72, 72)'}
              style={{textAlign: 'right', marginBottom: -15, marginRight: 10}}
              onPress={() => {
                setLike(!like);
              }}
            />
          )} */}
        </View>
        <View style={{flexDirection: 'row', marginBottom: 5, marginTop: 0}}>
          <View>
            <FastImage
              style={{width: 60, height: 60, borderRadius: 30}}
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
                fontSize: 18,
                color: 'black',
                marginLeft: 6,
                fontWeight: 'bold',
              }}>
              {props.tutor.name}
            </Text>
            {/* <Rating 
                style={{marginLeft: 6}}
                ratingCount={5}
                imageSize={15}
                readonly={true}
                jumpValue={0.5}
                showRating={false}
                fractions={10}
                startingValue={props.tutor.startingValue}
                isDisabled={true}
              /> */}
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 1, marginLeft: 20}}>
            <Text style={{color: 'orange'}}>{_rating} </Text>
            {
              _rating != 'No reviews yet' && <Image 
              //style={{marginLeft: 30}}
              //resizeMode={FastImage.resizeMode.cover}
              source={require('../../../../../assets/rating.png')}
            />
            }
            </View>
          </View>
        </View>
         <ListTags arr={props.tutor.specialties.split(",")}/>
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

export default TutorItemSearch;

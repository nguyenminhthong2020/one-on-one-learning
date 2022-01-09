/* eslint-disable */
import React from 'react';
import {
  NUM_OF_LINES,
} from '../../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import ListTags from '../../../_common/ListTags/ListTags';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { handleAverage } from '../../../../utils/utils';

const TutorItemSearch = props => {
  const _rating  = handleAverage(props.tutor.feedbacks);

  return (
    <Pressable onPress={props.onPress} style={{marginBottom: 10}}>
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
                fontSize: 18,
                color: 'black',
                marginLeft: 6,
                fontWeight: 'bold',
              }}>
              {props.tutor.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 1, marginLeft: 10}}>
            <Text style={{color: 'orange'}}>{_rating} </Text>
            {
              _rating != 'No reviews yet' && 
              <MaterialIcons name={'star'} size={16} color="orange" />
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
    elevation: 5, 
  },
});

export default TutorItemSearch;

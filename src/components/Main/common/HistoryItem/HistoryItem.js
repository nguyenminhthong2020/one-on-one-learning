/* eslint-disable */
import React from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  //TextInput,
  StyleSheet,
  //FlatList,
} from 'react-native';

// import {useForm, Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { useSelector } from 'react-redux';

const HistoryItem = props => {
  const arrHistoryClass = props.arrHistoryClass;
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  return (
    <View>
    <View style={styles.container}>
      <View>
        <FastImage
          style={{width: 30, height: 30, borderRadius: 15}}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: arrHistoryClass.scheduleDetailInfo.scheduleInfo.tutorInfo
              .avatar,
            priority: FastImage.priority.normal,
          }}
        />
      </View>
      <View>
        <View style={{margin: 5}}>
          <Text style={{fontSize: 16, color: 'black'}}>
            {arrHistoryClass.scheduleDetailInfo.scheduleInfo.tutorInfo.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginHorizontal: 5}}>
            <Text>
              {moment(
                arrHistoryClass.scheduleDetailInfo.scheduleInfo.startTimestamp,
              ).format('YYYY-MM-DD')}
            </Text>
          </View>
          <View style={{marginLeft: 4}}>
            <Text style={{color: MAIN_COLOR}}>
              {new Date(
                arrHistoryClass.scheduleDetailInfo.scheduleInfo.startTimestamp,
              )
                .toLocaleTimeString()
                .substring(0, 5)}
            </Text>
          </View>
          <View>
            <Text> - </Text>
          </View>
          <View>
            <Text style={{color: 'red'}}>
              {new Date(
                arrHistoryClass.scheduleDetailInfo.scheduleInfo.endTimestamp,
              )
                .toLocaleTimeString()
                .substring(0, 5)}
            </Text>
          </View>
        </View>
      </View>
    </View>
    <Text style={{marginHorizontal: '12%', color: isDarkTheme?'white':'black'}} numberOfLines={3}>{arrHistoryClass.tutorReview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '12%',
    marginTop: 5,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingBottom: 1,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HistoryItem;

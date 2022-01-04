/* eslint-disable */
import React from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {useSelector} from 'react-redux';

const HistoryItemReview = props => {
  const arrHistoryClass = props.arrHistoryClass;
  const langState = useSelector(state => state.lang);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  return (
    <View
      style={{
        marginBottom: 10,
        backgroundColor: 'white',
        marginHorizontal: '8%',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 6,
      }}>
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
          <View style={{marginLeft: 5, marginBottom: 5}}>
            <Text style={{fontSize: 16, color: 'black'}}>
              {arrHistoryClass.scheduleDetailInfo.scheduleInfo.tutorInfo.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginHorizontal: 5}}>
              <Text>
                {moment(
                  arrHistoryClass.scheduleDetailInfo.scheduleInfo
                    .startTimestamp,
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
      <Text
        style={{color: isDarkTheme ? 'white' : 'black', fontWeight: 'bold'}}>
        {langState.currentLang == 'en'
          ? " Tutor's review: "
          : ' Giáo viên phản hồi: '}
      </Text>
      <Text
        style={{color: isDarkTheme ? 'white' : 'black', marginLeft: 4}}
        numberOfLines={3}>
        {arrHistoryClass.tutorReview}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginRight: 4,
          marginBottom: 1,
        }}>
        <Pressable
          style={{
            backgroundColor: MAIN_COLOR,
            width: 120,
            borderRadius: 5,
            paddingVertical: 3,
            marginTop: 2,
            marginBottom: 1,
          }}
          onPress={() =>
            props.navigation.navigate('WriteReview', {
              arrHistoryClass: arrHistoryClass,
            })
          }>
          <Text style={{textAlign: 'center', color: 'white'}}>
            {langState.currentLang == 'en' ? 'Send feedback' : 'Gửi phản hồi'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom: 1,
  },
});

export default HistoryItemReview;

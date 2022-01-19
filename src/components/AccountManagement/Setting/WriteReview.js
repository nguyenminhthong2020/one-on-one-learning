/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {BASE_URL} from '../../../globals/constant';
import {Text, View, Pressable, StyleSheet, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {getScheduleBooking} from '../../../api/booking/bookingApi';
import axios from 'axios';
import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

const WriteReview = props => {
  const current = useSelector(state => state.auth.current);
  const langState = useSelector(state => state.lang);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const [bookingId, setBookingId] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let mounted = true;
    getScheduleBooking({
      tutorId:
        props.route.params.arrHistoryClass.scheduleDetailInfo.scheduleInfo
          .tutorInfo.id,
      accessToken: current.tokens.access.token,
    }).then(data => {
      let vt = 0;
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].scheduleDetails[0].id ==
          props.route.params.arrHistoryClass.scheduleDetailId
        ) {
          vt = i;
          break;
        }
      }
      if (mounted) {
        setBookingId(data[vt].scheduleDetails[0].bookingInfo[0].id);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const postFeedback = () => {
    const axiosInstance1 = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        Authorization: 'Bearer ' + current.tokens.access.token,
      },
    });
    axiosInstance1
      .post('user/feedbackTutor', {
        bookingId: bookingId,
        content: content,
        userId:
          props.route.params.arrHistoryClass.scheduleDetailInfo.scheduleInfo
            .tutorInfo.id,
        rating: rating,
      })
      .then(res => {
        alert(res.data.message);
      })
      .catch(err => {
        if (JSON.stringify(err).includes('message')) {
          alert('FAIL: ' + err.reponse.data.message);
        } else {
          alert('FAIL: ' + err);
        }
      });
  };
  const ratingCompleted = _rating => {
    setRating(_rating);
  };
  return (
    <View>
      <View
        style={{
          marginBottom: 10,
          backgroundColor: 'white',
          marginHorizontal: '5%',
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
                uri: props.route.params.arrHistoryClass.scheduleDetailInfo
                  .scheduleInfo.tutorInfo.avatar,
                priority: FastImage.priority.normal,
              }}
            />
          </View>
          <View>
            <View style={{marginLeft: 5, marginBottom: 5}}>
              <Text style={{fontSize: 16, color: 'black'}}>
                {
                  props.route.params.arrHistoryClass.scheduleDetailInfo
                    .scheduleInfo.tutorInfo.name
                }
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginHorizontal: 5}}>
                <Text>
                  {moment(
                    props.route.params.arrHistoryClass.scheduleDetailInfo
                      .scheduleInfo.startTimestamp,
                  ).format('YYYY-MM-DD')}
                </Text>
              </View>
              <View style={{marginLeft: 4}}>
                <Text style={{color: MAIN_COLOR}}>
                  {new Date(
                    props.route.params.arrHistoryClass.scheduleDetailInfo.scheduleInfo.startTimestamp,
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
                    props.route.params.arrHistoryClass.scheduleDetailInfo.scheduleInfo.endTimestamp,
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
          numberOfLines={5}>
          {props.route.params.arrHistoryClass.tutorReview}
        </Text>
        <Rating
          style={{marginLeft: 6, marginTop: 10}}
          ratingCount={5}
          imageSize={30}
          jumpValue={1}
          // showRating={true}
          fractions={10}
          startingValue={rating}
          onFinishRating={ratingCompleted}
          //isDisabled={true}
        />
        <Text style={{color: 'black', textAlign: 'right', marginRight: 8}}>
          {langState.currentLang == 'en'
            ? 'Rating: '
            : 'Đánh giá: '}
          {`${rating} / 5`}
        </Text>
        <Text style={{color: MAIN_COLOR, fontWeight:'bold'}}>
          {langState.currentLang == 'en'
            ? '  Leave your comment: '
            : '  Bình luận: '}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            fontSize: 15,
            marginHorizontal: 7,
            borderRadius: 5
          }}
          numberOfLines={3}
          multiline
          onChangeText={value => setContent(value)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: 4,
            marginBottom: 5,
            marginTop: 5
          }}>
          <Pressable
            style={{
              backgroundColor: MAIN_COLOR,
              width: 120,
              borderRadius: 5,
              paddingVertical: 3,
            }}
            onPress={postFeedback}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 15}}>
              {langState.currentLang == 'en' ? 'Send' : 'Gửi'}
            </Text>
          </Pressable>
        </View>
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

export default WriteReview;

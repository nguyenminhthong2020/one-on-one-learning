/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import {BASE_URL, MAIN_COLOR} from '../../../../../globals/constant';
// import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {useSelector} from 'react-redux';
import {getScheduleBooking} from '../../../../../api/booking/bookingApi';
import moment from 'moment';
import axios from 'axios';

const _height = Dimensions.get('window').height;
const Booking = props => {
  const current = useSelector(state => state.auth.current);
  const langState = useSelector(state => state.lang);
  const [arrayDateTime, setArrayDateTime] = useState([]);
  const [isModalLoading, setModalIsLoading] = useState(false);

  useEffect(() => {
    let cancel = false;
    getScheduleBooking({
      tutorId: props.route.params.tutorId,
      accessToken: current.tokens.access.token,
    }).then(data => {
      const now = new Date().getTime();
      const schedule = data.filter(function (item) {
        if (
          now - 24 * 60 * 60 * 1000 <=
            item.scheduleDetails[0].startPeriodTimestamp &&
          item.scheduleDetails[0].startPeriodTimestamp <=
            now + 7 * 24 * 60 * 60 * 1000
        ) {
          return item;
        }
      });
      // let t;
      // for (let i = 0; i < schedule.length - 1; i++)
      //   for (let j = i + 1; j < schedule.length; j++)
      //     if(schedule[i].scheduleDetails[0].startPeriodTimestamp > schedule[j].scheduleDetails[0].startPeriodTimestamp)
      //       {
      //         t = schedule[i];
      //         schedule[i] = schedule[j];
      //         schedule[j] = t;
      //       }

      // schedule.forEach(item => {
      //   console.log(new Date(item.scheduleDetails[0].startPeriodTimestamp).toISOString().slice(0, 10)+", "+new Date(item.scheduleDetails[0].startPeriodTimestamp).toLocaleTimeString())
      // })

      let arrDate = [];
      for (let i = 0; i <= 6; i++) {
        let day;
        day = (new Date(now + i * 24 * 60 * 60 * 1000) + '').substring(0, 10);
        let arrTime = [];
        for (let j = 0; j < schedule.length; j++) {
          if (
            (
              new Date(schedule[j].scheduleDetails[0].startPeriodTimestamp) + ''
            ).substring(0, 10) == day
          ) {
            let check = false;
            if (schedule[j].scheduleDetails[0].bookingInfo.length > 0) {
              if (
                schedule[j].scheduleDetails[0].bookingInfo[0].userId ==
                current.user.id
              ) {
                check = true;
              }
            }
            arrTime.push({
              isBooked: schedule[j].scheduleDetails[0].isBooked,
              isBookedByMe: check,
              id: schedule[j].scheduleDetails[0].id,
              startEnd:
                new Date(schedule[j].scheduleDetails[0].startPeriodTimestamp)
                  .toLocaleTimeString()
                  .slice(0, 5) +
                '-' +
                new Date(schedule[j].scheduleDetails[0].endPeriodTimestamp)
                  .toLocaleTimeString()
                  .slice(0, 5),
            });
          }
        }
        arrDate.push({
          date: moment(now + i * 24 * 60 * 60 * 1000).format('YYYY-MM-DD'),
          time: arrTime,
          // startPeriodTimestamp: schedule[j].scheduleDetails[0].startPeriodTimestamp,
          // endPeriodTimestamp: schedule[j].scheduleDetails[0].endPeriodTimestamp,
        });
      }
      if (cancel) return;
      setArrayDateTime(arrDate);
    });
    return () => {
      cancel = true;
    };
  }, []);

  const arrayIsClick = arrayDateTime.map((v, i) => false);
  const [isClick, setIsClick] = useState(arrayIsClick);

  const setIsClickHandler = value =>
    setIsClick(arrayIsClick.map((v, i) => (i === value ? false : v)));

  // Modal Time
  const ModalTime = props => {
    //props: student, tutor, arrayDateTime, id, isVisible
    const [isModalVisibleTime, setModalVisibleTime] = useState(props.isVisible);

    const toggleModalTime = () => {
      setModalVisibleTime(!isModalVisibleTime);
    };
    onPressHandler = (
      student,
      name,
      tutor,
      arrayDateTime,
      id,
      time,
      timeId,
      accessToken,
    ) => {
      BookingDetailAlert(
        student,
        name,
        tutor,
        props.arrayDateTime[props.id].date,
        time,
        timeId,
        accessToken,
      );
    };

    const BookingDetailAlert = (
      student,
      name,
      tutor,
      date,
      time,
      timeId,
      accessToken,
    ) => {
      const axiosInstance1 = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      axiosInstance1
        .get('user/info')
        .then(res1 => {
          let price = res1.data.user.priceOfEachSession.price / 100000;
          let balance = Math.floor(res1.data.user.walletInfo.amount / 100000);
          price > balance
            ? Alert.alert(
                `BOOKING DETAILS: FAIL`,
                `Tutor: ${tutor}\n\n${date}   ${time}\n\nBalance: ${balance} lessons left\nPrice: ${price} lesson`,
                [
                  {
                    text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
                    style: 'Cancel',
                  },
                ],
                {cancelable: true},
              )
            : Alert.alert(
                `BOOKING DETAILS: `,
                `Tutor: ${tutor}\n\n${date}   ${time}\n\nBalance: ${balance} lessons left\nPrice: ${price} lesson`,
                [
                  {
                    text: 'Book',
                    onPress: () => {
                      axiosInstance1
                        .post(`booking`, {
                          note: '',
                          scheduleDetailIds: [timeId],
                        })
                        .then(res => {
                          // toggleModalTime();
                          // BookingSuccess(tutor, date, time);
                          setModalIsLoading(true);
                          getScheduleBooking({
                            tutorId: props.tutorId,
                            accessToken: props.accessToken,
                          }).then(data => {
                            const now = new Date().getTime();
                            const schedule = data.filter(function (item) {
                              if (
                                now - 24 * 60 * 60 * 1000 <=
                                  item.scheduleDetails[0]
                                    .startPeriodTimestamp &&
                                item.scheduleDetails[0].startPeriodTimestamp <=
                                  now + 7 * 24 * 60 * 60 * 1000
                              ) {
                                return item;
                              }
                            });

                            let arrDate = [];
                            for (let i = 0; i <= 6; i++) {
                              let day;
                              day = (
                                new Date(now + i * 24 * 60 * 60 * 1000) + ''
                              ).substring(0, 10);
                              let arrTime = [];
                              for (let j = 0; j < schedule.length; j++) {
                                if (
                                  (
                                    new Date(
                                      schedule[
                                        j
                                      ].scheduleDetails[0].startPeriodTimestamp,
                                    ) + ''
                                  ).substring(0, 10) == day
                                ) {
                                  let check = false;
                                  if (
                                    schedule[j].scheduleDetails[0].bookingInfo
                                      .length > 0
                                  ) {
                                    if (
                                      schedule[j].scheduleDetails[0]
                                        .bookingInfo[0].userId ==
                                      current.user.id
                                    ) {
                                      check = true;
                                    }
                                  }
                                  arrTime.push({
                                    isBooked:
                                      schedule[j].scheduleDetails[0].isBooked,
                                    isBookedByMe: check,
                                    id: schedule[j].scheduleDetails[0].id,
                                    startEnd:
                                      new Date(
                                        schedule[
                                          j
                                        ].scheduleDetails[0].startPeriodTimestamp,
                                      )
                                        .toLocaleTimeString()
                                        .slice(0, 5) +
                                      '-' +
                                      new Date(
                                        schedule[
                                          j
                                        ].scheduleDetails[0].endPeriodTimestamp,
                                      )
                                        .toLocaleTimeString()
                                        .slice(0, 5),
                                  });
                                }
                              }
                              arrDate.push({
                                date: moment(
                                  now + i * 24 * 60 * 60 * 1000,
                                ).format('YYYY-MM-DD'),
                                time: arrTime,
                              });
                            }
                            setArrayDateTime(arrDate);
                            setModalIsLoading(false);
                          });
                        })
                        .catch(err => {
                          if (JSON.stringify(err).includes('message')) {
                            //'Booking has already exists'
                            alert('FAIL:\n' + err.response.data.message);
                          } else {
                            alert('FAIL:\n' + err);
                          }
                        });
                    },
                    style: 'Cancel',
                  },
                  {
                    text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
                    style: 'Cancel',
                  },
                ],
                {cancelable: true},
              );
        })
        .catch(err1 => {
          alert('Fail: \n' + err1);
        });
    };

    // const BookingSuccess = (tutor, date, time) =>
    //   Alert.alert(
    //     `BOOKING SUCCESS`,
    //     `Booking details: \n${tutor}\n${date}, ${time}`,
    //     [
    //       {
    //         text: 'Done',
    //         //onPress: () => alert('Complete'),
    //         style: 'default',
    //       },
    //       // {
    //       //   text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
    //       //   style: 'destructive',
    //       // },
    //     ],
    //     {cancelable: true},
    //   );
    return isModalVisibleTime ? (
      <View>
        <Modal
          isVisible={isModalVisibleTime}
          animationType="slide"
          transparent={true}>
          <Pressable onPress={()=>setModalVisibleTime(!isModalVisibleTime)} style={{height: 250}}></Pressable>
          <View
            style={{backgroundColor: 'white', width: '100%'}}>
            {/* {(props != null) & (props != undefined) ? ( */}
              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View></View>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 25,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  marginTop: 5,
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {langState.currentLang=='en'?`Picking your time\n(${props.arrayDateTime[props.id].date})`:`Chọn giờ học\n(${props.arrayDateTime[props.id].date})`}
              </Text>
              <EvilIcons
                name={'close'}
                size={32}
                color={'gray'}
                style={{marginTop: 5, marginRight: 5, marginRight: 15}}
                onPress={toggleModalTime}
              />
            </View>
            {isModalLoading != true ? (
              <ScrollView showsHorizontalScrollIndicator={true} height={_height - 320}>
                {props.arrayDateTime[props.id].time
                  .sort((x, y) => x.startEnd.localeCompare(y.startEnd))
                  .map((time, index) => (
                    <View
                      style={{marginBottom: 7, marginHorizontal: 100}}
                      key={index}>
                      <Pressable
                        style={{
                          borderRadius: 40,
                          backgroundColor:
                            time.isBooked == true
                              ? time.isBookedByMe
                                ? 'rgb(46, 204, 113)'
                                : 'grey'
                              : MAIN_COLOR,
                          paddingVertical: 5,
                        }}
                        onPress={() => {
                          if (time.isBooked == false) {
                            onPressHandler(
                              props.student,
                              props.name,
                              props.tutor,
                              props.arrayDateTime,
                              props.id,
                              time.startEnd,
                              time.id,
                              props.accessToken,
                            );
                          } else {
                          }
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 16,
                          }}>
                          {time.isBooked == true && time.isBookedByMe == false
                            ? 'Reserved'
                            : time.startEnd}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
              </ScrollView>
            ) : (
              <View style={{height: '100%'}}>
                <View style={{alignItems: 'center'}}>
                  <ActivityIndicator
                    size="large"
                    color="#00ff00"
                    style={{marginTop: 30}}
                  />
                </View>
              </View>
            )}
          </View>
        </Modal>
      </View>
    ) : (
      <View></View>
    );
  };

  return (
    <View style={{marginTop: 0}}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              marginLeft: 5,
              marginBottom: 15,
              fontWeight: 'bold',
              marginTop: 15,
              fontSize: 18,
              textAlign: 'center',
            }}>
            Picking your date
          </Text>
          {arrayDateTime.length > 0 ? (
            arrayDateTime.map((datetime, index) => (
              <View style={{marginBottom: 6, width: 120}} key={index}>
                <Pressable
                  style={{
                    borderRadius: 40,
                    backgroundColor: MAIN_COLOR,
                    paddingVertical: 10,
                  }}
                  onPress={() =>
                    setIsClick(
                      arrayIsClick.map((v, i) => (i === index ? true : v)),
                    )
                  }>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    {datetime.date}
                  </Text>
                </Pressable>
                {isClick[index] == true ? (
                  <ModalTime
                    setIsClick={setIsClickHandler}
                    student={'Nguyễn Minh Thông'}
                    name={current.user.name}
                    accessToken={current.tokens.access.token}
                    tutor={props.route.params.name}
                    tutorId={props.route.params.tutorId}
                    arrayDateTime={arrayDateTime}
                    id={index}
                    isVisible={true}
                  />
                ) : (
                  <View></View>
                )}
              </View>
            ))
          ) : (
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 35,
                  fontSize: 25,
                  color: MAIN_COLOR,
                }}>
                Loading...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Booking;

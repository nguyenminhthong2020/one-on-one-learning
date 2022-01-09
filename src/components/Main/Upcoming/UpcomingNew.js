/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {MAIN_COLOR, THIRD_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {
  getSchedule,
  cancelBookingSchedule,
} from '../../../api/schedule/scheduleApi';
import moment from 'moment';
// import { sign, decode } from "react-native-pure-jwt";
const UpcomingNew = props => {
  const current = useSelector(state => state.auth.current);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const [arrSchedulePagination, setArrSchedulePagination] = useState({
    arrDate: [],
    arrSchedule: [],
    arrPagination: [],
    currentPage: 1,
  });

  useEffect(() => {
    let isMounted = true;
    const dateTimeLte = new Date().getTime()- 30 * 60 * 1000;;
    const str = `booking/list/student?page=1&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;
    getSchedule({str: str, accessToken: current.tokens.access.token}).then(
      data => {
        if (data.count > 0) {
          const _countPage = Math.ceil(data.count / 10);
          let arrCount = [];
          for (let i = 0; i < _countPage; i++) {
            arrCount.push(i);
          }
          if (isMounted) {
            setArrSchedulePagination({
              arrDate: [
                ...new Set(
                  data.rows.map(item =>
                    moment(
                      item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                    ).format('YYYY-MM-DD'),
                  ),
                ),
              ],
              currentPage: 1,
              arrSchedule: data.rows,
              arrPagination: arrCount.slice(0, 6),
            });
          }
        } else {
          if (isMounted) {
            setArrSchedulePagination({
              arrDate: [],
              currentPage: 1,
              arrSchedule: [],
              arrPagination: [0],
            });
          }
        }
      },
    );
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = props.navigation.addListener('focus', () => {
      const dateTimeLte = new Date().getTime() - 30 * 60 * 1000;
      const str = `booking/list/student?page=1&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;
      getSchedule({str: str, accessToken: current.tokens.access.token}).then(
        data => {
          if (data.count > 0) {
            const _countPage = Math.ceil(data.count / 10);
            let arrCount = [];
            for (let i = 0; i < _countPage; i++) {
              arrCount.push(i);
            }
            if (isMounted) {
              setArrSchedulePagination({
                arrDate: [
                  ...new Set(
                    data.rows.map(item =>
                      moment(
                        item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                      ).format('YYYY-MM-DD'),
                    ),
                  ),
                ],
                currentPage: 1,
                arrSchedule: data.rows,
                arrPagination: arrCount.slice(0, 6),
              });
            }
          } else {
            if (isMounted) {
              setArrSchedulePagination({
                arrDate: [],
                currentPage: 1,
                arrSchedule: [],
                arrPagination: [0],
              });
            }
          }
        },
      );
    });
    return () => {
      isMounted = false;
      return unsubscribe;
    };
  }, [props.navigation]);

  const handleCancel = Id => {
    cancelBookingSchedule({
      scheduleDetailId: Id,
      accessToken: current.tokens.access.token,
    })
      .then(res => {
        if (res.data.message == 'Cancel booking successful') {
          alert('Deleted successfully');
          const dateTimeLte = new Date().getTime() - 30 * 60 * 1000;
          const str = `booking/list/student?page=1&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;

          getSchedule({
            str: str,
            accessToken: current.tokens.access.token,
          }).then(data => {
            if (data.count > 0) {
              const _countPage = Math.ceil(data.count / 10);
              let arrCount = [];
              for (let i = 0; i < _countPage; i++) {
                arrCount.push(i);
              }
              setArrSchedulePagination({
                arrDate: [
                  ...new Set(
                    data.rows.map(item =>
                      moment(
                        item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                      ).format('YYYY-MM-DD'),
                    ),
                  ),
                ],
                currentPage: 1,
                arrSchedule: data.rows,
                arrPagination: arrCount.slice(0, 6),
              });
            } else {
              setArrSchedulePagination({
                arrDate: [],
                currentPage: 1,
                arrSchedule: [],
                arrPagination: [0],
              });
            }
          });
        }
      })
      .catch(err => {
        if (JSON.stringify(err).includes('message')) {
          alert('FAIL:\n' + err.response.data.message);
        } else {
          alert('FAIL:\n' + err);
        }
      });
  };

  const handleGotoMeeting = arrScheduleClass => {
    if (
      new Date().toDateString() ==
      new Date(
        arrScheduleClass.scheduleDetailInfo.scheduleInfo.startTimestamp,
      ).toDateString()
    ) {
        props.navigation.navigate('VideoCallNew', {
        arrScheduleClass: arrScheduleClass,
      });
    
    } else {
      //alert("grey")
    }
  };

  const langState = useSelector(state => state.lang);
  return (
    <ScrollView style={{backgroundColor: isDarkTheme? 'black':'white'}}>
      {arrSchedulePagination.arrSchedule.length > 0 ? (
        arrSchedulePagination.arrDate.map(function (date, index1) {
          return (
            <View key={index1} style={{paddingBottom: 18}}>
              <View style={{marginLeft: '12%'}}>
                <Text
                  style={{
                    color: THIRD_COLOR,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {date}
                </Text>
              </View>
              {arrSchedulePagination.arrSchedule
                .filter(
                  item =>
                    moment(
                      item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                    ).format('YYYY-MM-DD') == date,
                )
                .map((arrScheduleClass, index) => (
                  <View
                    style={[
                      styles.container,
                      {
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      },
                    ]}
                    key={index}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View>
                        <FastImage
                          style={{width: 30, height: 30, borderRadius: 15}}
                          resizeMode={FastImage.resizeMode.cover}
                          source={{
                            uri: arrScheduleClass.scheduleDetailInfo
                              .scheduleInfo.tutorInfo.avatar,
                            priority: FastImage.priority.normal,
                          }}
                        />
                      </View>
                      <View>
                        <View style={{margin: 5}}>
                          <Text style={{fontSize: 15, color: 'black'}}>
                            {
                              arrScheduleClass.scheduleDetailInfo.scheduleInfo
                                .tutorInfo.name
                            }
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{marginHorizontal: 5}}>
                            <Text>
                              {moment(
                                arrScheduleClass.scheduleDetailInfo.scheduleInfo
                                  .startTimestamp,
                              ).format('YYYY-MM-DD')}
                            </Text>
                          </View>
                          <View style={{marginLeft: 4}}>
                            <Text style={{color: MAIN_COLOR}}>
                              {new Date(
                                arrScheduleClass.scheduleDetailInfo.scheduleInfo.startTimestamp,
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
                                arrScheduleClass.scheduleDetailInfo.scheduleInfo.endTimestamp,
                              )
                                .toLocaleTimeString()
                                .substring(0, 5)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        justifyContent: 'center',
                      }}>
                      <Pressable
                        style={{width: '50%'}}
                        onPress={() =>
                          handleCancel(arrScheduleClass.scheduleDetailId)
                        }>
                        <View
                          style={{
                            backgroundColor: 'orange',
                            paddingVertical: 4,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              textAlign: 'center',
                              fontSize: 16,
                            }}>
                            {langState[langState.currentLang].Cancel}
                          </Text>
                        </View>
                      </Pressable>
                      <Pressable
                        style={{width: '50%'}}
                        onPress={() => handleGotoMeeting(arrScheduleClass)}>
                        <View
                          style={{
                            backgroundColor:
                              new Date().toDateString() ==
                              new Date(
                                arrScheduleClass.scheduleDetailInfo.scheduleInfo.startTimestamp
                              ).toDateString()
                              && new Date() <= arrScheduleClass.scheduleDetailInfo.scheduleInfo.endTimestamp
                                ? MAIN_COLOR
                                : 'grey',
                            paddingVertical: 4,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              textAlign: 'center',
                              fontSize: 16,
                            }}>
                            {langState[langState.currentLang].Go_to_meeting}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                ))}
            </View>
          );
        })
      ) : (
        <View style={{marginTop: 40}}>
          <Text style={{textAlign: 'center', color: MAIN_COLOR, fontSize: 25}}>
            No Data
          </Text>
        </View>
      )}
      {arrSchedulePagination.arrSchedule.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 10,
          }}>
          {arrSchedulePagination.arrPagination.map((item, index) =>
            index + 1 == arrSchedulePagination.currentPage ? (
              <View
                key={index}
                style={{
                  marginHorizontal: 5,
                  borderColor: MAIN_COLOR,
                  backgroundColor: MAIN_COLOR,
                  borderWidth: 1,
                  borderColor: MAIN_COLOR,
                  width: 30,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginBottom: 15,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {index + 1}
                </Text>
              </View>
            ) : (
              <Pressable
                key={index}
                onPress={() => {
                  const dateTimeLte = new Date().getTime() - 30 * 60 * 1000;
                  const str = `booking/list/student?page=${
                    index + 1
                  }&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;

                  getSchedule({
                    str: str,
                    accessToken: current.tokens.access.token,
                  }).then(data => {
                    if (data.count > 0) {
                      const _countPage = Math.ceil(data.count / 10);
                      let arrCount = [];
                      for (let i = 0; i < _countPage; i++) {
                        arrCount.push(i);
                      }

                      setArrSchedulePagination({
                        arrDate: [
                          ...new Set(
                            data.rows.map(item =>
                              moment(
                                item.scheduleDetailInfo.scheduleInfo
                                  .startTimestamp,
                              ).format('YYYY-MM-DD'),
                            ),
                          ),
                        ],
                        currentPage: index + 1,
                        arrSchedule: data.rows,
                        arrPagination: arrCount.slice(0, 6),
                      });
                    }
                  });
                }}
                style={{
                  marginHorizontal: 3,
                  borderColor: 'black',
                  backgroundColor: 'yellow',
                  borderWidth: 1,
                  borderColor: 'black',
                  width: 30,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginBottom: 15,
                }}>
                <Text style={{textAlign: 'center'}}>{index + 1}</Text>
              </Pressable>
            ),
          )}
        </View>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '12%',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingBottom: 0,
    marginBottom: 5,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});

export default UpcomingNew;

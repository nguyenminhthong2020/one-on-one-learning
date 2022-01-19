/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { MAIN_COLOR, BASE_URL } from '../../../../globals/constant';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const HeadContent = props => {
  const langState = useSelector(state => state.lang);
  const current = useSelector(state => state.auth.current);
  const axiosInstance1 = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });

  const [dataHeader, setDataHeader] = useState({
    total: 0,
    date: 0,
    startTime: '',
    endTime: '',
    arrScheduleClass: {},
  });

  useEffect(() => {
    axiosInstance1
      .get(`call/total`)
      .then(res => {
        (async () => {
          try {
            const dateTimeLte = new Date().getTime();// - 5*60*1000;
            const res1 = await axiosInstance1.get(
              `booking/list/student?page=1&perPage=1&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`,
            );
            // const dateTimeLte = new Date().getTime();
            // const res1 = await axiosInstance1.get(
            //   `booking/next?dateTime=${dateTimeLte}`,
            // );
            // Sort Ascend
            //let n = res1.data.data.length;
            let n = res1.data.data.count;
            if (n > 0) {
            //   let t;
            //   for (let i = 0; i < n - 1; i++)
            //     for (let j = i + 1; j < n; j++)
            //       if (
            //         res1.data.data[i].scheduleDetailInfo.scheduleInfo
            //           .startTimestamp >
            //         res1.data.data[j].scheduleDetailInfo.scheduleInfo
            //           .startTimestamp
            //       ) {
            //         t = res1.data.data[i];
            //         res1.data.data[i] = res1.data.data[j];
            //         res1.data.data[j] = t;
            //       }
              
            //   let index = n - 1;
            //   let vitri = index;
            //   while (
            //     res1.data.data[index].scheduleDetailInfo.scheduleInfo
            //       .startTimestamp > dateTimeLte
            //   ) {
            //     if (
            //       res1.data.data[index].scheduleDetailInfo.scheduleInfo
            //         .startTimestamp <= dateTimeLte &&
            //         dateTimeLte <=
            //       res1.data.data[index].scheduleDetailInfo.scheduleInfo
            //         .endTimestamp
            //     ) {
            //       vitri = index;
            //       break;
            //     }
            //     index--;
            //     vitri = index + 1;
            //   }
            //   if(res1.data.data[vitri].scheduleDetailInfo.scheduleInfo
            //     .endTimestamp < dateTimeLte){
            //       setDataHeader({
            //         ...dataHeader,
            //         arrScheduleClass: {},
            //         total: res.data.total,
            //         date: 0,
            //         startTime: '',
            //         endTime: '',
            //       });
            //     }else{
                  let vitri = 0;
                  setDataHeader({
                    total: res.data.total,
                    // arrScheduleClass: res1.data.data[vitri],
                    // date: res1.data.data[vitri].scheduleDetailInfo.scheduleInfo
                    //   .startTimestamp,
                    // startTime: new Date(
                    //   res1.data.data[
                    //     vitri
                    //   ].scheduleDetailInfo.scheduleInfo.startTimestamp,
                    // )
                    //   .toLocaleTimeString()
                    //   .substring(0, 5),
                    // endTime: new Date(
                    //   res1.data.data[
                    //     vitri
                    //   ].scheduleDetailInfo.scheduleInfo.endTimestamp,
                    // )
                    //   .toLocaleTimeString()
                    //   .substring(0, 5),
                    arrScheduleClass: res1.data.data.rows[vitri],
                    date: res1.data.data.rows[vitri].scheduleDetailInfo.scheduleInfo
                      .startTimestamp,
                    startTime: new Date(
                      res1.data.data.rows[
                        vitri
                      ].scheduleDetailInfo.scheduleInfo.startTimestamp,
                    )
                      .toLocaleTimeString()
                      .substring(0, 5),
                    endTime: new Date(
                      res1.data.data.rows[
                        vitri
                      ].scheduleDetailInfo.scheduleInfo.endTimestamp,
                    )
                      .toLocaleTimeString()
                      .substring(0, 5),
                  });
                //}
            } else {
              setDataHeader({
                ...dataHeader,
                arrScheduleClass: {},
                total: res.data.total,
                date: 0,
                startTime: '',
                endTime: '',
              });
            }
          } catch (err) {
            if (JSON.stringify(err).includes('message')) {
              alert('FAIL:\n' + err.response.data.message);
            } else {
              alert('FAIL:\n' + err);
            }
          }
        })();
      })
      .catch(err => {
        if (JSON.stringify(err).includes('message')) {
          alert('FAIL:\n' + err.response.data.message);
        } else {
          alert('FAIL:\n' + err);
        }
      }, []);
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      axiosInstance1
        .get(`call/total`)
        .then(res => {
          (async () => {
            try {
              const dateTimeLte = new Date().getTime();// - 5*60*1000;
            const res1 = await axiosInstance1.get(
              `booking/list/student?page=1&perPage=1&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`,
            );
              // const dateTimeLte = new Date().getTime();
              // const res1 = await axiosInstance1.get(
              //   `booking/next?dateTime=${dateTimeLte}`,
              // );

              // Sort Ascend
              let n = res1.data.data.count;
              //let n = res1.data.data.length;
              if (n > 0) {
              //   let t;
              // for (let i = 0; i < n - 1; i++)
              //   for (let j = i + 1; j < n; j++)
              //     if (
              //       res1.data.data[i].scheduleDetailInfo.scheduleInfo
              //         .startTimestamp >
              //       res1.data.data[j].scheduleDetailInfo.scheduleInfo
              //         .startTimestamp
              //     ) {
              //       t = res1.data.data[i];
              //       res1.data.data[i] = res1.data.data[j];
              //       res1.data.data[j] = t;
              //     }
              
              // let index = n - 1;
              // let vitri = index;
              // while (
              //   res1.data.data[index].scheduleDetailInfo.scheduleInfo
              //     .startTimestamp > dateTimeLte
              // ) {
              //   if (
              //     res1.data.data[index].scheduleDetailInfo.scheduleInfo
              //       .startTimestamp <= dateTimeLte &&
              //       dateTimeLte <=
              //     res1.data.data[index].scheduleDetailInfo.scheduleInfo
              //       .endTimestamp
              //   ) {
              //     vitri = index;
              //     break;
              //   }
              //   index--;
              //   vitri = index + 1;
              // }
              // if(res1.data.data[vitri].scheduleDetailInfo.scheduleInfo
              //   .endTimestamp < dateTimeLte){
              //     setDataHeader({
              //       ...dataHeader,
              //       arrScheduleClass: {},
              //       total: res.data.total,
              //       date: 0,
              //       startTime: '',
              //       endTime: '',
              //     });
              //   }else{
                let vitri = 0;
                  setDataHeader({
                    total: res.data.total,
                    // arrScheduleClass: res1.data.data[vitri],
                    // date: res1.data.data[vitri].scheduleDetailInfo.scheduleInfo
                    //   .startTimestamp,
                    // startTime: new Date(
                    //   res1.data.data[
                    //     vitri
                    //   ].scheduleDetailInfo.scheduleInfo.startTimestamp,
                    // )
                    //   .toLocaleTimeString()
                    //   .substring(0, 5),
                    // endTime: new Date(
                    //   res1.data.data[
                    //     vitri
                    //   ].scheduleDetailInfo.scheduleInfo.endTimestamp,
                    // )
                    //   .toLocaleTimeString()
                    //   .substring(0, 5),
                    arrScheduleClass: res1.data.data.rows[vitri],
                    date: res1.data.data.rows[vitri].scheduleDetailInfo.scheduleInfo
                      .startTimestamp,
                    startTime: new Date(
                      res1.data.data.rows[
                        vitri
                      ].scheduleDetailInfo.scheduleInfo.startTimestamp,
                    )
                      .toLocaleTimeString()
                      .substring(0, 5),
                    endTime: new Date(
                      res1.data.data.rows[
                        vitri
                      ].scheduleDetailInfo.scheduleInfo.endTimestamp,
                    )
                      .toLocaleTimeString()
                      .substring(0, 5),
                  });
                }
              else {
                setDataHeader({
                  ...dataHeader,
                  arrScheduleClass: {},
                  total: res.data.total,
                  date: 0,
                  startTime: '',
                  endTime: '',
                });
              }
            } catch (err) {
              if (JSON.stringify(err).includes('message')) {
                alert('FAIL:\n' + err.response.data.message);
              } else {
                alert('FAIL:\n' + err);
              }
            }
          })();
        })
        .catch(err => {
          if (JSON.stringify(err).includes('message')) {
            alert('FAIL:\n' + err.response.data.message);
          } else {
            alert('FAIL:\n' + err);
          }
        });
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={styles.headContent}>
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        {langState.currentLang == 'en' ? (
          <Text style={{ fontSize: 18, color: 'white' }}>
            Total lesson time is {Math.floor(dataHeader.total / 60)} hours{' '}
            {dataHeader.total % 60} minutes
          </Text>
        ) : (
          <Text style={{ fontSize: 18, color: 'white' }}>
            Tổng thời gian học là {Math.floor(dataHeader.total / 60)} giờ{' '}
            {dataHeader.total % 60} phút
          </Text>
        )}
      </View>
      {dataHeader.date != 0 ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 17, color: 'white' }}>
              {langState[langState.currentLang].Upcoming_Lesson}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 17, color: 'white' }}>
              {moment(dataHeader.date).format('YYYY-MM-DD')}
              {',  '}
              {dataHeader.startTime} - {dataHeader.endTime}
            </Text>
          </View>
        </>
      ) : (
        <View style={{ marginBottom: 34, marginTop: 20 }}>
          <Text style={{ fontSize: 17, color: 'white' }}>
            {langState[langState.currentLang].No_Upcoming_Lesson}
          </Text>
        </View>
      )}
      {dataHeader.date != '' && (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 8,
            marginBottom: 25,
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor: 'white',
          }}>
          <Pressable
            onPress={() =>
              props.navigation.navigate('VideoCallNew', {
                arrScheduleClass: dataHeader.arrScheduleClass
              })
            }>
            <Text style={{ fontSize: 16, color: MAIN_COLOR }}>
              {langState[langState.currentLang].Enter_lesson_room}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headContent: {
    backgroundColor: 'rgb(12, 61, 223)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeadContent;

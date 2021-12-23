/* eslint-disable */
import React, {useState, Suspense, useEffect} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  //TextInput,
  StyleSheet,
  Pressable,
  //FlatList,
  ScrollView,
} from 'react-native';

// import {useForm, Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {
  getSchedule,
  cancelBookingSchedule,
} from '../../../../api/schedule/scheduleApi';


const Schedule = () => {
  // console.log("render");
  const [arrSchedulePagination, setArrSchedulePagination] = useState({
    arrSchedule: [],
    arrPagination: [],
    currentPage: 1,
  });

  useEffect(() => {
    let isMounted = true;

    const dateTimeLte = new Date().getTime();
    const str = `booking/list/student?page=1&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;

    getSchedule({str: str}).then(data => {
      if (data.count > 0) {
        const _countPage = ~~(data.count / 10) + 1;
        let arrCount = [];
        for (let i = 0; i < _countPage; i++) {
          arrCount.push(i);
        }
        // setArrPagination(arrCount);
        // setArrHistory(data.rows);
        if(isMounted ){
        setArrSchedulePagination({
          currentPage: 1,
          arrSchedule: data.rows,
          arrPagination: arrCount.slice(0, 5),
        });
      }
      }
    });
    return () => {
      isMounted = false;
      };
  }, []);

  const handleCancel = Id => {
    cancelBookingSchedule({scheduleDetailId: Id}).then(res => {
      if (res.data.message == 'Cancel booking successful') {
        alert("Deleted successfully")
        const dateTimeLte = new Date().getTime();
        const str = `booking/list/student?page=1&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;

        getSchedule({str: str}).then(data => {
          if (data.count > 0) {
            const _countPage = ~~(data.count / 10) + 1;
            let arrCount = [];
            for (let i = 0; i < _countPage; i++) {
              arrCount.push(i);
            }
            setArrSchedulePagination({
              currentPage: 1,
              arrSchedule: data.rows,
              arrPagination: arrCount.slice(0, 5),
            });
          }
        });
      }
    });
  };

  const langState = useSelector(state => state.lang);
  return (
    <ScrollView>
      {arrSchedulePagination.arrSchedule.length > 0 ? (
        arrSchedulePagination.arrSchedule.map((arrScheduleClass, index) => (
          <View style={styles.container} key={index}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <FastImage
                  style={{width: 30, height: 30, borderRadius: 15}}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: arrScheduleClass.scheduleDetailInfo.scheduleInfo
                      .tutorInfo.avatar,
                    priority: FastImage.priority.normal,
                  }}
                />
              </View>
              <View>
                <View style={{margin: 5}}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    {
                      arrScheduleClass.scheduleDetailInfo.scheduleInfo.tutorInfo
                        .name
                    }
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginHorizontal: 5}}>
                    <Text>
                      {arrScheduleClass.scheduleDetailInfo.scheduleInfo.date}
                    </Text>
                  </View>
                  <View style={{marginLeft: 4}}>
                    <Text style={{color: MAIN_COLOR}}>
                      {
                          (new Date(arrScheduleClass.scheduleDetailInfo.scheduleInfo
                          .startTimestamp)).toLocaleTimeString().substring(0, 5)
                      }
                    </Text>
                  </View>
                  <View>
                    <Text> - </Text>
                  </View>
                  <View>
                    <Text style={{color: 'red'}}>
                      {
                        (new Date(arrScheduleClass.scheduleDetailInfo.scheduleInfo
                          .endTimestamp)).toLocaleTimeString().substring(0, 5)
                      }
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'space-around',
              }}>
              <Pressable
                style={{width: 75}}
                onPress={() => handleCancel(arrScheduleClass.scheduleDetailId)}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'orange',
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 16}}>
                    {langState[langState.currentLang].Cancel}
                  </Text>
                </View>
              </Pressable>
              {/* <Pressable style={{width: 130}}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: MAIN_COLOR,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 16}}>
                    {langState[langState.currentLang].Go_to_meeting}
                  </Text>
                </View>
              </Pressable> */}
            </View>
          </View>
        ))
      ) : (
        <View style={{marginTop: 40}}>
          <Text style={{textAlign: 'center', color: MAIN_COLOR, fontSize: 25}}>
            Loading...
          </Text>
        </View>
      )}
      {arrSchedulePagination.arrSchedule.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 20,
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
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {index + 1}
                </Text>
              </View>
            ) : (
              <Pressable
                key={index}
                onPress={() => {
                  const dateTimeLte = new Date().getTime();
                  const str = `booking/list/student?page=${index + 1}&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;

                  getSchedule({str: str}).then(data => {
                    if (data.count > 0) {
                      const _countPage = ~~(data.count / 10) + 1;
                      let arrCount = [];
                      for (let i = 0; i < _countPage; i++) {
                        arrCount.push(i);
                      }
                    
                      setArrSchedulePagination({
                        currentPage: index + 1,
                        arrSchedule: data.rows,
                        arrPagination: arrCount.slice(0, 5),
                      });
                    }
                  });
                }}
                style={{
                  marginHorizontal: 3,
                  borderColor: 'black',
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'black',
                  width: 30,
                  paddingVertical: 5,
                  borderRadius: 5,
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
    marginTop: 8,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingBottom: 1,
  },
});

export default Schedule;

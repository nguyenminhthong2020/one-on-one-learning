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
  ActivityIndicator,
  ScrollView,
} from 'react-native';

// import {useForm, Controller} from 'react-hook-form';
// import FastImage from 'react-native-fast-image';
import {getHistory} from '../../../../api/history/historyApi';
const HistoryItem = React.lazy(() =>
  import('../../common/HistoryItem/HistoryItem'),
);
import {useSelector} from 'react-redux';
import moment from 'moment';

const History = () => {
  const current = useSelector(state => state.auth.current);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const [arrHistoryPagination, setArrHistoryPagination] = useState({
    arrDate: [],
    arrHistory: [],
    arrPagination: [],
    currentPage: 1,
  });

  useEffect(() => {
    let isMounted = true;

    const dateTimeLte = new Date().getTime();
    const str = `booking/list/student?page=1&perPage=10&dateTimeLte=${dateTimeLte}&orderBy=meeting&sortBy=desc`;
    getHistory({str: str, accessToken: current.tokens.access.token}).then(
      data => {
        if (data.count > 0) {
          const _countPage = ~~(data.count / 10) + 1;
          let arrCount = [];
          for (let i = 0; i < _countPage; i++) {
            arrCount.push(i);
          }

          if (isMounted) {
            setArrHistoryPagination({
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
              arrHistory: data.rows,
              arrPagination: arrCount.slice(0, 5),
            });
          }
        }
      },
    );
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ScrollView>
      <View style={{marginHorizontal: 10}}></View>
      {arrHistoryPagination.arrHistory.length > 0 ? (
        arrHistoryPagination.arrDate.map(function (date, index1) {
          return (
            <View key={index1} style={{paddingBottom: 20}}>
              <View style={{marginLeft: '12%'}}>
                <Text style={{color: isDarkTheme ? 'white': 'black', fontSize: 20, fontWeight: 'bold'}}>{date}</Text>
              </View>
              {arrHistoryPagination.arrHistory.filter(
                  item =>
                    moment(
                      item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                    ).format('YYYY-MM-DD') == date,
                ).map((arrHistoryClass, index) => (
          <Suspense
            fallback={
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            }
            key={index}>
            <HistoryItem arrHistoryClass={arrHistoryClass} />
          </Suspense>
                ))
          }
          
              </View>
          )
        })
        ) : (
        <View style={{marginTop: 40}}>
          <Text style={{textAlign: 'center', color: MAIN_COLOR, fontSize: 25}}>
            Loading...
          </Text>
        </View>
      )
      }
      {arrHistoryPagination.arrHistory.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 20,
          }}>
          {arrHistoryPagination.arrPagination.map((item, index) =>
            index + 1 == arrHistoryPagination.currentPage ? (
              <View
                key={index}
                // onPress={onSetCurrentPage(index)}
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
                  //console.log("đổi page"+(index+1));
                  const dateTimeLte = new Date().getTime();

                  const str = `booking/list/student?page=${
                    index + 1
                  }&perPage=10&dateTimeLte=${dateTimeLte}&orderBy=meeting&sortBy=desc`;
                  // const data = getHistory({str: str});

                  getHistory({
                    str: str,
                    accessToken: current.tokens.access.token,
                  }).then(data => {
                    if (data.count > 0) {
                      setArrHistoryPagination({
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
                        arrHistory: data.rows,
                        arrPagination: arrHistoryPagination.arrPagination,
                        currentPage: index + 1,
                      });
                      // setCurrentPage(index + 1);
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
    margin: 15,
    marginHorizontal: 20,
    marginTop: 5,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingBottom: 1,
  },
});

export default History;

 
/* eslint-disable */
import React, {useState, Suspense, useEffect} from 'react';
import { MAIN_COLOR, THIRD_COLOR } from '../../../globals/constant';
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { getHistory } from '../../../api/history/historyApi';
const HistoryItemReview = React.lazy(() =>
  import('../../Main/common/HistoryItem/HistoryItemReview'),
);
import {useSelector} from 'react-redux';
import moment from 'moment';

const History = (props) => {
  const current = useSelector(state => state.auth.current);
  const [arrHistoryPagination, setArrHistoryPagination] = useState({
    arrDate: [],
    arrHistory: [],
    arrPagination: [],
    currentPage: 1,
  });

  useEffect(() => {
    let isMounted = true;

    const dateTimeLte = new Date().getTime();
    const str = `booking/list/student?page=1&perPage=8&dateTimeLte=${dateTimeLte}&orderBy=meeting&sortBy=desc`;
    getHistory({str: str, accessToken: current.tokens.access.token}).then(
      data => {
        if (data.count > 0) {
          const _countPage = ~~(data.count / 8) + 1;
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
              arrPagination: arrCount.slice(0, 6),
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
    <View style={{height: 10}}></View>
      <View style={{marginHorizontal: 10}}></View>
      {arrHistoryPagination.arrHistory.length > 0 ? (
        arrHistoryPagination.arrDate.map(function (date, index1) {
          return (
            <View key={index1} style={{marginBottom: 20}}>
              <View style={{marginLeft: '10%', marginBottom: 3}}>
                <Text
                  style={{
                    color: THIRD_COLOR,
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  {date}
                </Text>
              </View>
              {arrHistoryPagination.arrHistory
                .filter(
                  item =>
                    moment(
                      item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                    ).format('YYYY-MM-DD') == date,
                )
                .map((arrHistoryClass, index) => (
                  <Suspense
                    fallback={
                      <View style={{alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#00ff00" />
                      </View>
                    }
                    key={index}>
                    <HistoryItemReview arrHistoryClass={arrHistoryClass} navigation={props.navigation}/>
                  </Suspense>
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
                  const str = `booking/list/student?page=${
                    index + 1
                  }&perPage=8&dateTimeLte=${dateTimeLte}&orderBy=meeting&sortBy=desc`;
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

export default History;

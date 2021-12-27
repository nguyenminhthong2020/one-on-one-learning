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
import { useSelector } from 'react-redux';

const History = () => {
  const current = useSelector(state => state.auth.current);
  const [arrHistoryPagination, setArrHistoryPagination] = useState({
    arrHistory: [],
    arrPagination: [],
    currentPage: 1,
  });

  useEffect(() => {
    let isMounted = true;

    const dateTimeLte = new Date().getTime();
    const str = `booking/list/student?page=1&perPage=10&dateTimeLte=${dateTimeLte}&orderBy=meeting&sortBy=desc`;
    getHistory({str: str, accessToken: current.tokens.access.token}).then(data => {
      if (data.count > 0) {
        const _countPage = ~~(data.count / 10) + 1;
        let arrCount = [];
        for (let i = 0; i < _countPage; i++) {
          arrCount.push(i);
        }
        // setArrPagination(arrCount);
        // setArrHistory(data.rows);
        if(isMounted)
        {setArrHistoryPagination({
          currentPage: 1,
          arrHistory: data.rows,
          arrPagination: arrCount.slice(0, 5),
        });}
      }
    });
    return () => {
      isMounted = false;
      };
  }, []);

  return (
    <ScrollView>
      <View style={{marginHorizontal: 10}}>
      </View>
      {arrHistoryPagination.arrHistory.length > 0 ? (
        arrHistoryPagination.arrHistory.map((arrHistoryClass, index) => (
          <Suspense
            fallback={
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            }
            key={index}>
            <HistoryItem arrHistoryClass={arrHistoryClass}/>
          </Suspense>
        ))
      ) : (
        <View style={{marginTop: 40}}>
          <Text style={{textAlign: 'center', color: MAIN_COLOR, fontSize: 25}}>
            Loading...
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

                  getHistory({str: str, accessToken: current.tokens.access.token}).then(data => {
                    if (data.count > 0) {
                      setArrHistoryPagination({
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

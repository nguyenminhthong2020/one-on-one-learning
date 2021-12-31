/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL, NUM_OF_LINES, THIRD_COLOR} from '../../../globals/constant';
import FastImage from 'react-native-fast-image';

const FeedbackList = props => {
  const langState = useSelector(state => state.lang);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const current = useSelector(state => state.auth.current);
  const [data, setData] = useState({
    avgRating: 0,
    feedbacks: [],
  });
  const axiosInstance1 = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = props.navigation.addListener('focus', () => {
      axiosInstance1
        .get('user/info')
        .then(res => {
          if (isMounted) {
            setData({
              avgRating: res.data.user.avgRating,
              feedbacks: res.data.user.feedbacks,
            });
          }
        })
        .catch(err => {
          if (JSON.stringify(err).includes('message')) {
            alert('Error: ' + err.response.data.message);
          } else {
            alert('Error: ' + err);
          }
        });
    });
    return () => {
      isMounted = false;
      return unsubscribe;
    };
  }, [props.navigation]);

  return (
    <>
      {data.feedbacks.length == 0 ? (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: isDarkTheme ? 'yellow' : 'black',
              fontWeight: 'bold',
            }}>
            {langState[langState.currentLang].noData}
          </Text>
        </View>
      ) : (
        <View style={{marginBottom: 0}}>
          <FlatList
            getItemLayout={(_, index) => ({
              length: 200,
              offset: 200 * index,
              index,
            })}
            removeClippedSubviews={true}
            windowSize={7}
            style={{marginBottom: 0, margin: 5}}
            showsVerticalScrollIndicator={true}
            initialNumToRender={4}
            data={data.feedbacks}
            extraData={data.feedbacks}
            renderItem={({item, index}) => (
              <View style={{marginBottom: 5}}>
                <View style={styles.shadowProp}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                      marginTop: 8,
                    }}>
                    <View>
                      <FastImage
                        style={{width: 40, height: 40, borderRadius: 20}}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{
                          uri: item.firstInfo.avatar,
                          priority: FastImage.priority.normal,
                        }}
                      />
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          marginLeft: 6,
                          fontWeight: 'bold',
                        }}>
                        {item.firstInfo.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 1,
                          marginLeft: 5,
                        }}>
                        <Text style={{color: THIRD_COLOR}}>{(new Date(item.createdAt)).toLocaleString()}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 0
                      }}>
                      <Text style={{color: 'orange'}}>{item.rating} </Text>
                      <Image
                          source={require('../../../../assets/rating.png')}
                        />
                    </View>
                  </View>
                  <Text
                    numberOfLines={NUM_OF_LINES}
                    style={{fontSize: 15, color: 'black', marginTop: 5}}>
                    {item.content}
                  </Text>
                </View>
              </View>
            )}
            disableVirtualization={false}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  shadowProp: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 4,
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // 5: càng lớn càng nhạt
  },
});

export default FeedbackList;

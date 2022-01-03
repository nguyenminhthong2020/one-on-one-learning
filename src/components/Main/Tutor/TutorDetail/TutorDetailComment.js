/* eslint-disable */
import React, {Suspense, useState, useRef, useEffect} from 'react';
import {
  //ScrollView,
  // StatusBar,
  StyleSheet,
  //ActivityIndicator,
  Text,
  View,
  //Dimensions,
  //TouchableOpacity,
  //Pressable,
  Image,
  FlatList,
  //TextInput,

} from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { THIRD_COLOR, BASE_URL, NUM_OF_LINES } from '../../../../globals/constant';

const TutorDetailComment = (props) => {   
    const current = useSelector(state => state.auth.current);
    const [arraySort, setArraySort] = useState([]);

    useEffect(()=>{
      let isMounted = true;
      const axiosInstance1 = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
        headers: {
          Authorization: 'Bearer ' + current.tokens.access.token,
        },
      });
      axiosInstance1
      .post(`tutor/search`, {
        filters: {
          specialties: [], 
          date: new Date().toISOString(),
        },
        page: 1,
        perPage: 100,
      })
      .then(res => {
        if (res.data.count > 0) {
          let feedbacks;
          for(let i = 0 ; i < res.data.count; i++)
          {
              if(res.data.rows[i].userId == props.route.params.userId)
              {
                feedbacks = res.data.rows[i].feedbacks;
                break;
              }
          }
          let _arraySort = [...feedbacks].sort((y, x) => x.createdAt.localeCompare(y.createdAt));     
          if (isMounted) {
            setArraySort(_arraySort)
          }
        }
      }).catch(err => {
        if (JSON.stringify(err).includes('message')) {
          alert('FAIL:\n' + err.response.data.message);
        } else {
          alert('FAIL:\n' + err);
        }
      });
      return () => {
        isMounted = false;
      };
    }, [])
    return (
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
      data={arraySort}
      extraData={arraySort}
      renderItem={({item, index}) => (
        <View style={{marginBottom: 4}}>
          <View style={styles.shadowProp}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 0,
                marginTop: 8,
              }}>
              <View>
                <FastImage
                  style={{width: 30, height: 30, borderRadius: 15}}
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
                    source={require('../../../../../assets/rating.png')}
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
  )
}

const styles = StyleSheet.create({
    video: {
      width: '100%',
      height: 200,
      marginBottom: 30,
    },
    buttonControl: {
      width: '40%',
      left: '30%',
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
  
  export default TutorDetailComment;
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


//import { MAIN_COLOR } from '../../../../globals/constant';

const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          borderWidth: 1,
          marginBottom: 5,
        }}
      />
    );
  };
const TutorDetailComment = (props) => {   //props : feedbacks  (array)
    return (<View style={{marginHorizontal: 5, backgroundColor: 'white'}}>
        <FlatList
          style={{marginBottom: 20, marginTop: 15}}
          //ListHeaderComponentStyle={{marginBottom: -20}}
          ItemSeparatorComponent={FlatListItemSeparator}
          showsVerticalScrollIndicator={true}
          initialNumToRender={5}
          extraData={props.route.params.feedbacks}
          data={props.route.params.feedbacks}
          renderItem={i => (
            //<View><Text>{JSON.stringify(i.item)}</Text></View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 5,
                  marginTop: 8,
                  marginLeft: 5,
                }}>
                <View>
                  <FastImage
                    style={{width: 30, height: 30, borderRadius: 15, borderColor: 'black', borderWidth: 1}}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: `${i.item.firstInfo.avatar}`,
                      priority: FastImage.priority.normal,
                    }}
                  />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'black',
                      marginLeft: 6,
                      fontWeight: 'bold',
                    }}>
                    {i.item.firstInfo.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 1,
                      marginLeft: 20,
                    }}>
                    <Text style={{color: 'orange'}}>
                      {i.item.rating}/5{' '}
                    </Text>
                    <Image
                      source={require('../../../../../assets/rating.png')}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={{color: 'black'}}>{i.item.content}</Text>
              </View>
              <View>
                <Text style={{textAlign: 'right'}}>
                  {new Date(i.item.createdAt).toUTCString()}
                </Text>
              </View>
            </View>
          )}
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
  });
  
  export default TutorDetailComment;
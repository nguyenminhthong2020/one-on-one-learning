/* eslint-disable */

import React from 'react';
import {Text, View} from 'react-native';
import {MAIN_COLOR} from '../../../globals/constant';

const ListTags = props => {
  // return props.arr.length <= 3 ? (
  //   <View><Text style={{color: MAIN_COLOR, textAlign: 'center'}}>{props.arr.join(', ')}</Text></View>
  // ) : props.arr.length <= 7 ? (
  //   <View>
  //     <Text style={{color: MAIN_COLOR, textAlign: 'center'}}>{props.arr.slice(0, 3).join(', ')}</Text>
  //     <Text style={{color: MAIN_COLOR, textAlign: 'center'}}>{props.arr.slice(3, props.arr.length).join(', ')}</Text>
  //   </View>
  // ) : (
  //   <View>
  //       <Text style={{color: MAIN_COLOR, textAlign: 'center'}}>{props.arr.slice(0, 3).join(', ')}</Text>
  //       <Text style={{color: MAIN_COLOR, textAlign: 'center'}}>{props.arr.slice(3, 6).join(', ')}</Text>
  //       <Text style={{color: MAIN_COLOR, textAlign: 'center'}}>{props.arr.slice(6, props.arr.length).join(', ')}</Text>
  //   </View>
  // );
  return (
    <View>
      <Text style={{color: MAIN_COLOR}}>{props.arr.join(', ')}</Text>
    </View>
  );
};

export default ListTags;

/* eslint-disable */
import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Tag, TagActive} from '../FlexibleButton/FlexibleButton'

// const TagList = props =>{
//    return (
//     <ScrollView horizontal={true}>
//         {
//             props.arrTitle.map(title => <Tag></Tag>)
//         }
//     </ScrollView>
//    );
// };
const TagActiveList = props =>{
    return props.arrTitle.length < 4 ? (
       <ScrollView horizontal={true}>
           {
             props.arrTitle.map(title => <View style={{marginRight: 5}} key={title}><TagActive title={title} /></View>)
           }
       </ScrollView>
    ): (
       <View>
         <ScrollView horizontal={true}>
           {
             props.arrTitle.slice(0, 3).map(title => <View style={{marginRight: 5}} key={title}><TagActive title={title}/></View>)
           }
       </ScrollView>
       <ScrollView horizontal={true} style={{marginTop: 2}}>
           {
             props.arrTitle.slice(3, props.arrTitle.length).map(title => <View style={{marginRight: 5}} key={title}><TagActive title={title}/></View>)
           }
       </ScrollView>
       </View>
    )
 };


const styles = StyleSheet.create({
  
});

export {TagActiveList};

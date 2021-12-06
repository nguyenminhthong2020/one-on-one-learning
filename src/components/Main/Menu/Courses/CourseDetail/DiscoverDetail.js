/* eslint-disable */
import React, {useState} from 'react';
import {
  Text,
  View,
  //TextInput,
  //StyleSheet,
  //TouchableOpacity,
  //FlatList,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';


// import FastImage from 'react-native-fast-image';
import {MAIN_COLOR} from '../../../../../globals/constant';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';


const DiscoverDetail = props => (
  <ScrollView>

    <View style={{
        marginHorizontal: 10,
        marginTop: 10
    }}>
    <Text style={{fontSize: 18, color: MAIN_COLOR, fontWeight: 'bold', marginBottom: 5}}>{props.route.params.topic.name}</Text>
    <Text>{props.route.params.topic.nameFile}</Text>

    </View>
  </ScrollView>
);

// const CourseDetail = () => {
//   return (
//     <View>
//       <Item />
//     </View>
//   );
// };

//const styles = StyleSheet.create({});

export default DiscoverDetail;

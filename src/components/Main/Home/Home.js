/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
// /* eslint-disable no-trailing-spaces */
// /* eslint-disable quotes */
// /* eslint-disable prettier/prettier */
// /* eslint-disable semi */
// /* eslint-disable prettier/prettier */
// /* eslint-disable react/self-closing-comp */
// /* eslint-disable prettier/prettier */
import React from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';

import Header from '../../_common/Header/Header';

const Home = () => {

  return (
    <View style={styles.container}>
       <Header></Header>
       <View>
           <Text>This is Home</Text>
           <Text>123456</Text>
           <Text>9021</Text>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  
});

export default Home;

/* eslint-disable */
import React, {useState} from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';

import Header from '../../_common/Header/Header';
import HeadContent from './HeadContent/HeadContent';

const Home = () => {
  const [state, setstate] = useState(false);

  return (
    <View style={styles.container}>
      <Header state={state} setstate={setstate}></Header>
      <HeadContent></HeadContent>
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

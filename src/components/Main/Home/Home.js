/* eslint-disable */
import React, {useState} from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';

import Header from '../../_common/Header/Header';
import HeadContent from './HeadContent/HeadContent';

const Home = () => {
  const [state, setstate] = useState(false);
  
  const renderTestScrollView = () => {
    let array = [];
    for (let i = 0; i < 100; i++) {
      array.push({value: i * i, id: i});
    }

    return array.map((i, index) => <View key={index}><Text style={{fontSize: 25}}>{`Đây là render từng item cho scroll view, \ngia trị là ${i.value}`}</Text></View>)
  };

  return (
    <View style={styles.container}>
        <Header state={state} setstate={setstate}></Header>
        <ScrollView showsVerticalScrollIndicator={false}>
        <HeadContent></HeadContent>
        {renderTestScrollView()}
        </ScrollView>
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

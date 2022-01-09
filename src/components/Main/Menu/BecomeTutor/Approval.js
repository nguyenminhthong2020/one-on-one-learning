/* eslint-disable */
import React from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';

const Approval = (props) => {
  const langState = useSelector(state => state.lang);
  return (
    <View style={styles.container}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            margin: 10,
            color: MAIN_COLOR,
            marginTop: 35,
          }}>
          {langState.currentLang=='en'?`Done, please wait for\nthe Admin's approval`:`Hoàn tất, xin chờ\nquản trị viên duyệt`}
        </Text>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#35bb9b',
          borderWidth: 1,
          borderRadius: 15,
          width: '40%',
          left: '0%',
          marginBottom: '35%',
        }}>
        <TouchableOpacity onPress={()=>props.navigation.navigate("MainTabs")}>
          <Text style={{color: 'white', paddingVertical: 8, fontSize: 20}}>
            {langState.currentLang=='en'?'Back to Home':'Về trang chủ'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Approval;

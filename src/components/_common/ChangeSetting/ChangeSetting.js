/* eslint-disable */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {MAIN_COLOR} from '../../../globals/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../../redux/slices/setting/themeSlice';
import {change} from '../../../redux/slices/setting/langSlice1';

export default function ChangeSetting(props) {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme)
  const [state, setstate] = useState(true);


  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <View style={styles.rowbtn}>
          {props.type === 'AntDesign' ? (
            <AntDesign
              name={props.name}
              size={25}
              color={MAIN_COLOR}
              style={{paddingLeft: 15}}
            />
          ) : (
            <FontAwesome5
              name={props.name}
              size={25}
              color={MAIN_COLOR}
              style={{paddingLeft: 15}}
            />
          )}
          <Text style={[styles.text,{color: isDarkTheme?'white':'gray'}]}>{props.title}</Text>
          <View style={styles.switch}>
            <Switch 
  //             style={{transform: [{ scaleX:  moderateScale(1.5, 0.2) }, { scaleY:  
  //  moderateScale(1.5, 0.2) }]}}
              style={{transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}}
              value={state}
              onValueChange={value => {
                setstate(value)
                if(props.type=='theme'){
                  dispatch(changeTheme());
              }else{
                dispatch(change());
              }
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    // borderRadius: 10,
    // borderWidth: 2,
    paddingVertical: 5,
  },
  rowbtn: {
    flexDirection: 'row',
  },
  container: {
    left: '10%',
    width: '80%',
    margin: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    // paddingLeft: 15,
    position: 'absolute',
    left: '20%',
  },
  menuItemSwitch: {
    // width: '20%',
    // left: '80%',
    //marginLeft: 20,
  },
  switch: {
    marginLeft: '50%',
  },
});

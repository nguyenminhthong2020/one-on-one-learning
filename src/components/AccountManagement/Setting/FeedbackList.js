/* eslint-disable */
import React from 'react';
import {Text, View, Alert, StyleSheet, ScrollView, Linking} from 'react-native';
import { useSelector } from 'react-redux';

const FeedbackList = (props) => {
    const langState = useSelector(state => state.lang);
    const isDarkTheme = useSelector(state => state.theme.isDarkTheme);

    return (<View style={{flexDirection: 'column', alignItems: 'center', marginTop: 25}}>
        <Text style={{fontSize: 20, color: isDarkTheme ? 'yellow': 'black', fontWeight: 'bold'}}>{langState[langState.currentLang].noData}</Text>
    </View>)
}

const styles = StyleSheet.create({
  });
  
  export default FeedbackList;
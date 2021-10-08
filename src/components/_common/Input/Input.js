/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
//import {TextInput} from 'react-native-paper';
import {MailOutlined} from '@ant-design/icons';

export default function Input(props) {
  const {label, secureTextEntry, placeholder, value, onBlur, onChange} =
    props;
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 15}}>{label}</Text>
      <TextInput
        // left={<MailOutlined style={{fontSize: 20, color: 'black'}} />}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 2,
    paddingVertical: 3,
    paddingLeft: 15,
    marginTop: 5,
    fontSize: 15,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 15,
    color: 'black',
  },
  container: {
    marginTop: 20,
    width: '80%',
    left: '10%',
  },
});

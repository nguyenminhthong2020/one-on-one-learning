/* eslint-disable */
import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
//import {TextInput} from 'react-native-paper';

export default function Input(props) {
  const {label, secureTextEntry, placeholder, value, onBlur, onChange} =
    props;
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 15, color: 'black'}}>{label}</Text>
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
    paddingVertical: 5,
    paddingLeft: 15,
    marginTop: 5,
    fontSize: 15,
    backgroundColor: 'white'
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 15,
    color: 'black',
  },
  container: {
    marginTop: 8,
    width: '80%',
    left: '10%',
  },
});

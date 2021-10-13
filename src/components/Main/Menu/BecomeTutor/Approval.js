/* eslint-disable */
import React from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';


import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


const Approval = () => {

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
          Done, please wait for the Admin's approval
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
        <TouchableOpacity>
          <Text style={{color: 'white', paddingVertical: 8, fontSize: 20}}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
      {/* {errors.email && <Text style={styles.error}>{'please type gmail'}</Text>} */}
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

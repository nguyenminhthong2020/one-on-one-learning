/* eslint-disable */
import React, {Suspense} from 'react';
import {MAIN_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//const Icon = React.lazy(() => import('react-native-vector-icons/Ionicons'));

const Header = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <View>
          <Text style={styles.leftHeader}>LetTutor</Text>
        </View>
        <View
          style={{
            borderWidth: 1.5,
            borderRadius: 5,
            width: 35,
            height: 35,
            backgroundColor: 'red',
            borderColor: 'red',
          }}>
          <TouchableOpacity onPress={() => props.navigation.navigate("MenuNavigation")}>
            {/* <Suspense
              fallback={<ActivityIndicator size="small" color="#0000ff" />}> */}
              <Icon name="menu" size={30} color="white" />
            {/* </Suspense> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    //paddingBottom: 5,
  },
  shadow: {
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#fff',
    // width: 300,
    height: 51,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  leftHeader: {
    color: MAIN_COLOR,
    fontSize: 28,
    fontWeight: 'bold',
  },
  rightHeader: {
    fontSize: 22,
  },
});

export default Header;

/* eslint-disable */
import React from 'react';
import {MAIN_COLOR, THIRD_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  // ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
//const Icon = React.lazy(() => import('react-native-vector-icons/Ionicons'));

const Header = (props) => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  return (
    <View style={styles.container}>
      <View style={[styles.shadow, {backgroundColor: isDarkTheme?'black': 'white'}]}>
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
          <Pressable onPress={() => props.navigation.navigate("Menu")}>
            {/* <Suspense
              fallback={<ActivityIndicator size="small" color="#0000ff" />}> */}
              <Icon name="menu" size={30} color="white" />
            {/* </Suspense> */}
          </Pressable>
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

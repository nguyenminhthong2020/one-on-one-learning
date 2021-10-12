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
  ScrollView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
// import {useForm, Controller} from 'react-hook-form';

const ListMessage = () => {
  const [search, setSearch] = useState('');

  const renderTest = () => {
    let array = [];
    for (let i = 0; i < 100; i++) {
      array.push({value: i * i, id: i});
    }

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={array}
        renderItem={i => (
          <View>
            <Text
              style={{
                fontSize: 20,
              }}>{`Đây là hàng thứ ${i.index}, \nid là ${i.item.id}, giá trị là ${i.item.value}`}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        inputContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white'}}
        //lightTheme={true}
        placeholder="Search Message..."
        onChangeText={value => setSearch(value)}
        value={search}
      />
      {renderTest()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default ListMessage;

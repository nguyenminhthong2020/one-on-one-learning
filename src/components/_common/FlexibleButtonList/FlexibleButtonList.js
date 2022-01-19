/* eslint-disable */
import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {TagActive} from '../FlexibleButton/FlexibleButton';

const TagActiveList = props => {
  return props.arrTitle.length < 4 ? (
    <ScrollView horizontal={true}>
      {props.arrTitle.map(title => (
        <View style={{marginRight: 5}} key={title}>
          <TagActive title={title} />
        </View>
      ))}
    </ScrollView>
  ) : (
    <View>
      <ScrollView horizontal={true}>
        {props.arrTitle.slice(0, 3).map(title => (
          <View style={{marginRight: 5}} key={title}>
            <TagActive title={title} />
          </View>
        ))}
      </ScrollView>
      <ScrollView horizontal={true} style={{marginTop: 2}}>
        {props.arrTitle.slice(3, props.arrTitle.length).map(title => (
          <View style={{marginRight: 5}} key={title}>
            <TagActive title={title} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export {TagActiveList};

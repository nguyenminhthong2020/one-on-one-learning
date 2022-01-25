/* eslint-disable */
import React from 'react';
import {Avatar} from 'react-native-elements';

const AvatarAccessory = props => {
  return props.inColor ? (
    <Avatar
      rounded
      size={10 * props.nsize}
      activeOpacity={0.7}
      source={{
        uri: props.uri,
      }}>
      <Avatar.Accessory
        //onPress={props.onPress}
        size={2.5 * props.nsize}
        color={props.inColor}
        style={{backgroundColor: props.outColor}}
      />
    </Avatar>
  ) : (
    <Avatar
      rounded
      size={10 * props.nsize}
      activeOpacity={0.7}
      source={{
        uri: props.uri,
      }}>
      <Avatar.Accessory size={2.5 * props.nsize}/>
    </Avatar>
  );
};

export default AvatarAccessory;

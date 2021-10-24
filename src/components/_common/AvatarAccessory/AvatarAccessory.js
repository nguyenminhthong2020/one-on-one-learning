/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AvatarAccessory = props => {
  return props.inColor ? (
    // <AvatarAccessory 
    //        nsize={3}
    //        uri="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16145468-4695-4ccb-a8b6-fb7ed89c89f9/desjigm-c91290e8-94c7-4d79-b1ec-b93062950b43.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2MTQ1NDY4LTQ2OTUtNGNjYi1hOGI2LWZiN2VkODljODlmOVwvZGVzamlnbS1jOTEyOTBlOC05NGM3LTRkNzktYjFlYy1iOTMwNjI5NTBiNDMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0FXPgfZawTl_xoW1DWmOrzVgrw4HN44nQPYm_GwFeHw"
    //        onPress={()=>{}}
    //        inColor={'#5fdba7'}
    //        outColor={'#5fdba7'}
    //      />
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

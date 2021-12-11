/* eslint-disable */
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import {MAIN_COLOR} from '../../../../globals/constant';

const VideoIntroduction = (props) => {
  return (
      <View>
          <Pressable style={{width: '50%', borderWidth: 1, borderColor: MAIN_COLOR, marginTop: 30, marginLeft: '25%',
                            paddingVertical: 10, borderRadius: 10, backgroundColor: 'white'}}>
              <Text style={{textAlign: 'center', fontSize: 16, color: MAIN_COLOR}}>Choose video</Text>
          </Pressable>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginHorizontal: 15}}>
          <Pressable style={{width: '25%', borderWidth: 1, borderColor: MAIN_COLOR, marginTop: 30,
                            paddingVertical: 10, borderRadius: 10, backgroundColor: 'white'}} onPress={()=>props.navigation.navigate('BecomeTutor')}>
              <Text style={{textAlign: 'center', fontSize: 16, color: MAIN_COLOR}}>Previous</Text>
          </Pressable>
          <Pressable style={{width: '25%', borderWidth: 1, borderColor: MAIN_COLOR, marginTop: 30,
                            paddingVertical: 10, borderRadius: 10, backgroundColor: MAIN_COLOR}}>
              <Text style={{textAlign: 'center', fontSize: 16, color: 'white'}} onPress={()=>props.navigation.navigate('Approval')}>Done</Text>
          </Pressable>
          </View>
      </View>
  )
}

export default VideoIntroduction;
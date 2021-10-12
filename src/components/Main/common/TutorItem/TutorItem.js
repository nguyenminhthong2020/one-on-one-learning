/* eslint-disable */
import React, {useState} from 'react';
import {
  MAIN_COLOR,
  SECOND_COLOR,
  NUM_OF_LINES,
} from '../../../../globals/constant';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {TagActiveList} from '../../../_common/FlexibleButtonList/FlexibleButtonList';

import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';

const TutorItem = (props) => {
    /*
  const tutor = {
      id: 0,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/86248137-6f7d-4cf5-ad2e-34da42722b28avatar1628058042246.jpg',
      startingValue: 4.7,
      arrTitle: [
        'English',
        'Vietnamese',
        'Korean',
        'French',
        'Spanish',
        'Mandarin',
      ],
     like: false,
     description : `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`,
  }*/

  //const [score, setScore] = useState(5);
  const [like, setLike] = useState(false);

    return (
    <TouchableOpacity onPress={props.onPress} style={{marginBottom: 10}}>
      <View style={styles.shadowProp}>
        <View>
        {
               like === false ? (<AntDesign
                  name={'heart'}
                  size={22}
                  color={'gray'}
                  style={{textAlign: 'right', marginBottom: -15, marginRight: 10}}
                  onPress={() => {setLike(!like)}}
                />)
                : (<AntDesign
                  name={'heart'}
                  size={22}
                  color={'rgb(240, 72, 72)'}
                  style={{textAlign: 'right', marginBottom: -15, marginRight: 10}}
                  onPress={() => {setLike(!like)}}
                />)
             }
        </View>
        <View style={{flexDirection: 'row', marginBottom: 5, marginTop: 8}}>
          <View>
          <FastImage
            style={{width: 60, height: 60, borderRadius: 30}}
            resizeMode={FastImage.resizeMode.cover} 
            source={{
              uri: props.tutor.uri,
              priority: FastImage.priority.normal,
            }}
          />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: 'black', marginLeft: 6, fontWeight:'bold'}}>{props.tutor.name}</Text>
            <Rating 
                style={{marginLeft: 6}}
                ratingCount={5}
                imageSize={15}
                readonly={true}
                jumpValue={0.5}
                showRating={false}
                fractions={10}
                startingValue={props.tutor.startingValue}
                isDisabled={true}
              />
          </View>
          {/* <View style={{justifyContent: 'flex-start', marginLeft: 30, marginTop: -13}}>
             {
               like === false ? (<AntDesign
                  name={'heart'}
                  size={20}
                  color={'gray'}
                  style={{paddingLeft: 12}}
                  style={{textAlign: 'right'}}
                  //style={{marginRight: 0}}
                  onPress={() => {setLike(!like)}}
                />)
                : (<AntDesign
                  name={'heart'}
                  size={20}
                  color={'rgb(240, 72, 72)'}
                  style={{paddingLeft: 12}}
                  onPress={() => {setLike(!like)}}
                />)
             }
          </View> */}
        </View>
        <TagActiveList arrTitle={props.tutor.arrTitle} />
        <Text numberOfLines={NUM_OF_LINES} style={{fontSize: 15, color: 'black', marginTop: 5}}>
          {props.tutor.description}
        </Text>
      </View>
      </TouchableOpacity>
    );
  };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  shadowProp: {
    //borderWidth: 1,
    backgroundColor: 'white',
    marginHorizontal: 10, 
    marginVertical:4, 
    padding: 14, 
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius:  3.84,
    elevation: 5, // 5: càng lớn càng nhạt
  },
});

export default TutorItem;
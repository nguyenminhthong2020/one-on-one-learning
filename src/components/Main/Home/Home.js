/* eslint-disable */
import React, {useState} from 'react';
import {
  MAIN_COLOR,
  SECOND_COLOR,
  NUM_OF_LINES,
} from '../../../globals/constant';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../_common/Header/Header';
import HeadContent from './HeadContent/HeadContent';
import {TagActiveList} from '../../_common/FlexibleButtonList/FlexibleButtonList';
import { Tag, TagActive} from '../../_common/FlexibleButton/FlexibleButton';

import {Rating} from 'react-native-ratings';
//import { Rating } from 'react-native-elements';  // = cái ở dưới
import FastImage from 'react-native-fast-image';

const Home = () => {
  const [state, setstate] = useState(false);

  const arrTitle = [
    'EnglishforKids',
    'BusinessEnglish',
    'ConversationalEnglish',
    'STARTERS',
    'MOVERS',
    'FLYERS',
    'KET',
    'PET',
    'IELTS',
    'TOEFL',
    'TOEIC',
  ];

  const arrTitle1 = [
    'English',
    'Vietnamese',
    'Korean',
    'French',
    'Spanish',
    'Mandarin',
  ];



  const renderTestScrollView = () => {
    let array = [];
    for (let i = 0; i < 12; i++) {
      array.push({value: i * i, id: i});
    }

    const [score, setScore] = useState(5);
    const [like, setLike] = useState(false);

    const description = `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`;
    return array.map((i, index) => (
    <TouchableOpacity onPress={() => alert('link to tutor detail ' + index)} key={index}>
      <View style={[styles.shadowProp, {/*borderWidth: 1, */marginHorizontal: 10, marginVertical:4, padding: 14, borderRadius: 8}]}>
        <View style={{flexDirection: 'row', /*alignItems: 'center', */ marginBottom: 5, marginTop: 18}}>
          <FastImage
            style={{width: 60, height: 60, borderRadius: 30}}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: 'https://api.app.lettutor.com/avatar/86248137-6f7d-4cf5-ad2e-34da42722b28avatar1628058042246.jpg',
              priority: FastImage.priority.normal,
            }}
          />
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: 'black', marginLeft: 6}}>{`Nhi Lam`}</Text>
            <Rating 
                style={{marginLeft: 6}}
                ratingCount={5}
                imageSize={15}
                readonly={true}
                jumpValue={0.5}
                showRating={false}
                fractions={10}
                startingValue={score}
                isDisabled={true}
              />
          </View>
          <View style={{justifyContent: 'flex-start', marginLeft: 30, marginTop: -13}}>
             {
               like === false ? (<AntDesign
                  name={'heart'}
                  size={20}
                  color={'gray'}
                  style={{paddingLeft: 12}}
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
          </View>
        </View>
        <TagActiveList arrTitle={arrTitle1} />
        <Text numberOfLines={NUM_OF_LINES} style={{fontSize: 15, color: 'black', marginTop: 5}}>
          {description}
        </Text>
      </View>
      </TouchableOpacity>
    ));
  };

  const renderFilterTag = () => {
    return (
        <View>
           <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>Filter Tutors: </Text>
           <View style={{flexDirection: 'row', marginTop: 5}}>
              <Tag title={"All"} onPress={()=>alert("all")}/>
              <Tag title={"ConversationalEnglish"} onPress={()=>alert("filter")}/>
              <Tag title={"BusinessEnglish"} onPress={()=>alert("filter")}/>
           </View>
           <View style={{flexDirection: 'row', marginTop: 2}}>
              <Tag title={"EnglishforKids"} onPress={()=>alert("filter")}/>
              <Tag title={"STARTERS"} onPress={()=>alert("filter")}/>
              <Tag title={"FLYERS"} onPress={()=>alert("filter")}/>
              <Tag title={"KET"} onPress={()=>alert("filter")}/> 
           </View>
           <View style={{flexDirection: 'row', marginTop: 2}}>
              <Tag title={"MOVERS"} onPress={()=>alert("filter")}/>
              <Tag title={"PET"} onPress={()=>alert("filter")}/>
              <Tag title={"IELTS"} onPress={()=>alert("filter")}/>
              <Tag title={"TOEFL"} onPress={()=>alert("filter")}/>
              <Tag title={"TOEIC"} onPress={()=>alert("filter")}/>
           </View>
           {/* <View style={{flexDirection: 'row'}}>
           </View> */}
        </View>
    )
  } 

  return (
    <View style={styles.container}>
      <Header></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeadContent state={state} setstate={setstate}></HeadContent>

        <View style={{marginHorizontal: 18, marginTop: 20, marginBottom: 3}}>
           {renderFilterTag()}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginHorizontal: 18, marginTop: 30, marginBottom: 3}}>
           <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>Recommend Tutors</Text>
           <TouchableOpacity onPress={() => alert('Search Tutor')}>
              <Text style={{color: MAIN_COLOR, fontSize: 15}}>{`See All >`}</Text>
           </TouchableOpacity>
        </View>
        {renderTestScrollView()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // càng lớn càng nhạt
  },
});

export default Home;

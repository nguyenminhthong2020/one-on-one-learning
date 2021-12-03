/* eslint-disable */
import React, {Suspense, useState} from 'react';
import {
  MAIN_COLOR,
  // SECOND_COLOR,
  // NUM_OF_LINES,
} from '../../../globals/constant';
import {
  Text,
  View,
  //Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  //FlatList,
  ScrollView,
} from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import Input from '../../../components/_common/Input/Input';
// import Button from '../../../components/_common/Button/Button';
// import {SocialIcon} from 'react-native-elements';

//import AntDesign from 'react-native-vector-icons/AntDesign';
//import Header from '../../_common/Header/Header';
const Header = React.lazy(() => import('../../_common/Header/Header'));
//import HeadContent from './HeadContent/HeadContent';
const HeadContent = React.lazy(() => import('./HeadContent/HeadContent'));
//import {TagActiveList} from '../../_common/FlexibleButtonList/FlexibleButtonList';
//import {Tag, TagActive} from '../../_common/FlexibleButton/FlexibleButton';
import MyTag from '../../_common/FlexibleButton/TagFlexibleButton';
//import TutorItem from '../common/TutorItem/TutorItem';

const TutorItem = React.lazy(() => import('../common/TutorItem/TutorItem'));
import { useSelector } from 'react-redux';

//import {Rating} from 'react-native-ratings';
//import { Rating } from 'react-native-elements';  // = cái ở dưới
//import FastImage from 'react-native-fast-image';

const Home = (props) => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const langState = useSelector(state => state.lang);

  const [state, setstate] = useState(true);

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
  const array = [
    {
      id: 0,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      startingValue: 5,
      arrTitle: [
        'EnglishforKids',
        'BusinessEnglish',
        'ConversationalEnglish',
        'STARTERS',
        'MOVERS',
      ],
      like: false,
      description: `Hello there! I am an Industrial Engineer in the profession but chose to do online teaching because I love to meet different learners. I am an outgoing person and I have this passion for dealing with different people and seeing them progress with my help as their teacher. In fact, making friends is one of my best skills. I am very good at adapting to new environments and new situations. I am very friendly and can easily get along well with everyone. I have obtained a 120-Hour TEFL Certificate. I get a variety of teaching techniques. I know that there are fast and not so fast learners. So don't worry, I will be with you every step of the way going at your own pace. Let's practice what you already know and add something new each day. With my skills and experiences, I can assure you that I can provide adequate English learning effectively and efficiently. Together, let's make English learning fun.`,
    },
    {
      id: 1,
      name: 'Nhi Lam',
      uri: 'https://api.app.lettutor.com/avatar/86248137-6f7d-4cf5-ad2e-34da42722b28avatar1628058042246.jpg',
      startingValue: 4.5,
      arrTitle: ['EnglishforKids', 'ConversationalEnglish', 'IELTS'],
      like: false,
      description: `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`,
    },
    {
      id: 2,
      name: 'Joan Gacer',
      uri: 'https://api.app.lettutor.com/avatar/8c4e58c4-e9d1-4353-b64d-41b573c5a3e9avatar1632284832414.jpg',
      startingValue: 4,
      arrTitle: [
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
      ],
      like: false,
      description: `I was a customer service sales executive for 3 years before I become an ESL teacher I am trained to deliver excellent service to my clients so I can help you with business English dealing with customers or in sales-related jobs and a lot more, I also love to teach beginner, intermediate and advance I speak slowly and clearly so that the student can easily follow my instructions and pronunciation. In my class, I want environment-friendly fun and engaging I have many activities designed to help your enthusiasm in learning the language. I'm so excited to meet you in one of my classes let us have fun while learning English. See you there.`,
    },
    {
      id: 3,
      name: 'April Corpuz',
      uri: 'https://api.app.lettutor.com/avatar/cd0a440b-cd19-4c55-a2a2-612707b1c12cavatar1631029793834.jpg',
      startingValue: 5,
      arrTitle: [
        'EnglishforKids',
        'BusinessEnglish',
        'ConversationalEnglish',
        'STARTERS',
        'MOVERS',
      ],
      like: false,
      description: `Hello there! I am an Industrial Engineer in the profession but chose to do online teaching because I love to meet different learners. I am an outgoing person and I have this passion for dealing with different people and seeing them progress with my help as their teacher. In fact, making friends is one of my best skills. I am very good at adapting to new environments and new situations. I am very friendly and can easily get along well with everyone. I have obtained a 120-Hour TEFL Certificate. I get a variety of teaching techniques. I know that there are fast and not so fast learners. So don't worry, I will be with you every step of the way going at your own pace. Let's practice what you already know and add something new each day. With my skills and experiences, I can assure you that I can provide adequate English learning effectively and efficiently. Together, let's make English learning fun.`,
    },
    {
      id: 4,
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
      description: `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`,
    },
    {
      id: 5,
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
      description: `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`,
    },
    {
      id: 6,
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
      description: `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`,
    },
    {
      id: 7,
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
      description: `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`,
    },
    {
      id: 8,
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
      description: `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`,
    },
    {
      id: 9,
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
      description: `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`,
    },
    {
      id: 10,
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
      description: `Hi, I am teacher Nhi. I have been teaching English for 2 years. I used to study abroad in Sydney for 7 years. During my time as an overseas student, I had spoken with many people from diverse cultural backgrounds; therefore, I have strong listening and speaking skills. I love teaching English and I will devote to helping you improve your English skills if you book my class. I am also patient and understanding because I know for many people, English is a tough language to master. In my class, I will help you correct your pronunciation and deliver the lessons in a way that is easy for you to understand. If you book my class, you will have many chances to practice your speaking skills and also improve your pronunciation and grammatical knowledge. Besides that, if you need me to, I will share my personal tips to study English more effectively with you and show you the importance of having fun and practice while learning English. As an English teacher, I constantly update my English knowledge to better serve my career and students.`,
    },
    {
      id: 11,
      name: 'Ralf Bippert',
      uri: 'https://api.app.lettutor.com/avatar/49f9eafe-fe94-4eb4-83f9-bbe4ee5f6e24avatar1630907827384.jpg',
      startingValue: 4,
      arrTitle: ['EnglishforKids', 'ConversationalEnglish'],
      like: false,
      description: `Hello there, My name is Ralf I am a well-rounded teacher good at teaching communication classes as well as teaching younger kids. If you are a beginner or intermediate student I am here to help you learn. Hope to see you soon.`,
    },
  ];

  //const onPressTutor = index =>  //alert('link to tutor detail index ' + index);

  const renderTestScrollView = () => {
    return array.map((tutor, index) => (
      <Suspense
        fallback={
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        }
        key={index}>
        <TutorItem onPress={() => props.navigation.navigate("TutorDetailNew", {
          uri: tutor.uri,
          name: tutor.name,
        })/*onPressTutor(index)*/} tutor={tutor} />
      </Suspense>
    ));
  };

  const renderFilterTag = () => {
    return (
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: isDarkTheme ? 'white':'black'}}>
          {langState[langState.currentLang].Filter_Tutors}:{' '}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <MyTag title={'All'} onPress={() => alert('all')} />
          <MyTag
            title={'ConversationalEnglish'}
            onPress={() => alert('filter')}
          />
          <MyTag title={'BusinessEnglish'} onPress={() => alert('filter')} />
        </View>
        <View style={{flexDirection: 'row', marginTop: 3}}>
          <MyTag title={'EnglishforKids'} onPress={() => alert('filter')} />
          <MyTag title={'STARTERS'} onPress={() => alert('filter')} />
          <MyTag title={'FLYERS'} onPress={() => alert('filter')} />
          <MyTag title={'KET'} onPress={() => alert('filter')} />
        </View>
        <View style={{flexDirection: 'row', marginTop: 3}}>
          <MyTag title={'MOVERS'} onPress={() => alert('filter')} />
          <MyTag title={'PET'} onPress={() => alert('filter')} />
          <MyTag title={'IELTS'} onPress={() => alert('filter')} />
          <MyTag title={'TOEFL'} onPress={() => alert('filter')} />
          <MyTag title={'TOEIC'} onPress={() => alert('filter')} />
        </View>
        {/* <View style={{flexDirection: 'row'}}>
           </View> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Suspense fallback={<View></View>}>
        <Header navigation={props.navigation} />
      </Suspense>
      {/* <Suspense fallback={<View></View>}><HeadContent state={state} setstate={setstate}></HeadContent></Suspense> */}

      {/* <View style={{marginHorizontal: 18, marginTop: 20, marginBottom: 3}}>
          {renderFilterTag()}
      </View> */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 18,
          marginTop: 30,
          marginBottom: 3,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          Recommend Tutors
        </Text>
        <TouchableOpacity onPress={() => alert('Search Tutor')}>
          <Text style={{color: MAIN_COLOR, fontSize: 15}}>{`See All >`}</Text>
        </TouchableOpacity>
      </View> */}
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        data={array}
        renderItem={i => (
          <Suspense
            fallback={
              <View></View>
              // <View style={{alignItems: 'center'}}>
              //   <ActivityIndicator size="large" color="#00ff00" />
              // </View>
            }
            key={i.index}>
            <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
          </Suspense>
        )}
      /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        //</View>style={{marginBottom: 25}}
        >
        <Suspense fallback={<View></View>}>
          <HeadContent state={state} setstate={setstate} navigation={props.navigation}></HeadContent>
        </Suspense>

        <View style={{marginHorizontal: 18, marginTop: 20, marginBottom: 3}}>
          {renderFilterTag()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 18,
            marginTop: 30,
            marginBottom: 3,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: isDarkTheme ? 'white' : 'black'}}>
          {langState[langState.currentLang].Recommend_Tutors}
          </Text>
          <Pressable onPress={() => props.navigation.navigate("Tutors")}>
            <Text style={{color: isDarkTheme ? 'yellow' : MAIN_COLOR, fontSize: 16}}>
            {langState[langState.currentLang].See_All} {'>'}
            </Text>
          </Pressable>
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
    //borderWidth: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 4,
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // 5: càng lớn càng nhạt
  },
});

export default Home;

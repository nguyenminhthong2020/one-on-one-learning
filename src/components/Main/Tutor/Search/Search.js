/* eslint-disable */
import React, {useState, Suspense} from 'react';
import {MAIN_COLOR, SECOND_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  //ScrollView,
} from 'react-native';
//import {SearchBar} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';

// import {useForm, Controller} from 'react-hook-form';
import TutorItem from '../../common/TutorItem/TutorItem';
//const TutorItem = React.lazy(()=>{'../../common/TutorItem/TutorItem'});

const Search = () => {
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

  const [country, setCountry] = useState({name: 'Vietnam', cca2: 'VN'});

  const onPressTutor = index => alert('link to tutor detail index ' + index);

  const renderTest = array => {
    return (
      <View>
        <FlatList
          style={{marginBottom: 150, marginTop: 10}}
          //ListHeaderComponentStyle={{marginBottom: -20}}
          showsVerticalScrollIndicator={true}
          initialNumToRender={3}
          data={array}
          renderItem={i => (
            // <Suspense fallback={<View></View>} key={i.index}>
            //   <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
            // </Suspense>
            <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <SearchBar
        round={true}
        inputContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{backgroundColor: 'white', borderRadius: 15}}
        //lightTheme={true}
        placeholder="Search Name..."
        onChangeText={value => setSearch(value)}
        value={search}
      /> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 0,
          marginTop: 10,
        }}>
        <Text style={{fontSize: 17, color: MAIN_COLOR, fontWeight: 'bold'}}>
          *Name:{'   '}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 5,
            height: 40,
            fontSize: 14,
            width: '55%',
          }}
          placeholder="search name..."
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
          marginTop: 8,
          marginBottom: 15,
        }}>
        <Text style={{fontSize: 17, color: MAIN_COLOR, fontWeight: 'bold'}}>
          *Select country:{'  '}
        </Text>
        <CountryPicker
          withFlag
          withFilter
          withCountryNameButton
          countryCode={country.cca2}
          onSelect={country =>
            //console.log("\nĐây nữa nè: " + JSON.stringify(country))
            setCountry({cca2: country.cca2, name: country.name})
          }
        />
      </View>
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => alert('search tutor')}>
          <Text style={styles.text1}>Search</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={{borderWidth: 1, borderColor: 'black', backgroundColor: MAIN_COLOR, paddingHorizontal: 10}}>
        <Text style={{color: 'white'}}>Search</Text>
      </TouchableOpacity>
      </View> */}
      {renderTest(array)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 0,
  },
  button1: {
    borderRadius: 15,
    backgroundColor: MAIN_COLOR,
    paddingVertical: 8,
  },
  container1: {
    width: '30%',
    left: '35%',
  },
  text1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
});

export default Search;

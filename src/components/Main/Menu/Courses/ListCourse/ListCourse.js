/* eslint-disable */
import React, {Suspense, useCallback} from 'react';
import {
  //SafeAreaView,
  // ScrollView,
  // StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  // useColorScheme,
  View,
  FlatList,
  SectionList,
  useWindowDimensions,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

import {TabView, SceneMap} from 'react-native-tab-view';
import {MAIN_COLOR} from '../../../../../globals/constant';
import FastImage from 'react-native-fast-image';

const arrayCourse = [
  {
    title: 'English For Beginners',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Conversational English',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Business English',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'IELTS',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const arrayEbook = [
  {
    title: 'What a world 1',
  },
  {
    title: 'Let’s go starter',
  },
  {
    title: 'Let’s go begin',
  },
  {
    title: 'Family and friends starter',
  },
  {
    title: 'Everybody up starter',
  },
  {
    title: 'Cambridge story fun for starters (1)',
  },
  {
    title: 'NEW HEADWAY ELEMENTARY ',
  },
  {
    title: 'English world (Macmillan Young Learners) 1',
  },
  {
    title: 'Family and Friends 1',
  },
  {
    title: 'Family and Friends 2',
  },
];

const Item = props => (
  <View style={{margin: 5, borderRadius: 15}}>
    {/* <Text style={{fontSize: 20}}>{props.title}</Text> */}
    <View
      style={{
        backgroundColor: 'white',
        //   marginHorizontal: 5,
        //   marginVertical: 5,
        //padding: 5,
        margin: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <View>
        <FastImage
          style={{width: '100%', height: 200}}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: 'https://camblycurriculumicons.s3.amazonaws.com/5e2b895e541a832674533c18?h=d41d8cd98f00b204e9800998ecf8427e',
            priority: FastImage.priority.normal,
          }}
        />
      </View>
      <View style={{padding: 15}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{props.title}</Text>
        <Text style={{fontSize: 15, marginTop: 8, marginBottom: 18}}>
          Gain confidence speaking about familiar topics
        </Text>
        <Text style={{color: 'black'}}>Beginner 10 lessons</Text>
      </View>
    </View>
  </View>
);

const FirstRoute = props => {
  //console.log('First Route props: ' + JSON.stringify(props));
  return (
    <View /*style={{flex: 1, backgroundColor: 'white'}}*/>
      <SectionList
        sections={arrayCourse}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={
              () =>
                props.navigation.navigate(
                  'CourseDetail',
                ) /*alert(`Course thứ ${item}*/
            }>
            <Item title={item} />
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: 20,
            }}>
            {title}
          </Text>
        )}
      />
    </View>
  );
};

const SecondRoute = props => {
  //const handlePress =(url)=> useCallback(async () => {
  //   const supported = await Linking.canOpenURL(url);
  //   if (supported) {
  //     await Linking.openURL(url);
  //   } else {
  //     Alert.alert(`Don't know how to open this URL: ${url}`);
  //   }
  // }, [url]);
  // const handlePress = async (url) => {
  //   const supported = await Linking.canOpenURL(url);
  //   alert(supported);
  //   // if(supported){
  //   //   await Linking.openURL(url);
  //   // }else{
  //   //   alert(`Can't open this URL: ${url}`);
  //   // }
  // }

  return (
    <View /*style={{flex: 1, backgroundColor: 'white'}}*/>
      <FlatList
        style={{marginBottom: 30, margin: 5}}
        //ListHeaderComponentStyle={{marginBottom: -20}}
        showsVerticalScrollIndicator={true}
        initialNumToRender={2}
        data={arrayEbook}
        renderItem={i => (
          // <Suspense fallback={<View></View>} key={i.index}>
          //   <TutorItem onPress={() => onPressTutor(i.index)} tutor={i.item} />
          // </Suspense>
          <TouchableOpacity
            onPress={
              () => {
                Linking.openURL('https://drive.google.com/drive/folders/1vdnKwSEr9v5yc3gEX90mqeuPdXkx3RY7').catch(err => {
                  console.error('Failed opening page because: ', err);
                  alert('Failed to open page');
                });
              } /*alert(`E-book thứ ${i.index}`)*/
            }>
            <Item title={i.item.title} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// const renderScene = SceneMap({
//   course: FirstRoute,
//   ebook: SecondRoute,
// });

const ListCourse = props => {
  const layout = useWindowDimensions();
  //console.log('List Course prop: ' + JSON.stringify(props));
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'course':
        return <FirstRoute navigation={props.navigation} />;
      case 'ebook':
        return (
          <SecondRoute
            navigation={
              props.navigation
            } /*style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}}*/
          />
        );
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'course', title: 'Course'},
    {key: 'ebook', title: 'E-Book'},
  ]);

  return (
    <>
      <View>
        <Text style={{fontSize: 25, color: MAIN_COLOR, fontWeight: 'bold'}}>
          Discover Courses
        </Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};

export default ListCourse;

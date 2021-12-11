/* eslint-disable */
import React, {useState} from 'react';
import {
  Text,
  View,
  //TextInput,
  StyleSheet,
  //TouchableOpacity,
  //FlatList,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import Pdf from 'react-native-pdf';


// import RNFS from 'react-native-fs';
// import FileViewer from 'react-native-file-viewer';

// import FastImage from 'react-native-fast-image';
import {MAIN_COLOR} from '../../../../../globals/constant';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

const DiscoverDetail = props => {
  
  const url = props.route.params.topic.nameFile;
  const source = { uri: url, cache: true };
  // Feel free to change main path according to your requirements.
  // IMPORTANT: A file extension is always required on iOS.
  // You might encounter issues if the file extension isn't included
  // or if the extension doesn't match the mime type of the file.
  const openHanlde = () => {
    Linking.openURL(
      url,
    ).catch(err => {
      console.error('Failed opening page because: ', err);
      alert('Failed to open page');
    });
  };
  openHanlde();

  // const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.pdf`;
  
  // const options = {
  //   fromUrl: url,
  //   toFile: localFile
  // };
  // RNFS.downloadFile(options).promise
  // .then(() => FileViewer.open(localFile))
  // .then(() => {
  //   // success
  //   console.log("ok")
  // })
  // .catch(error => {
  //   // error
  //   console.log(error)
  // });

  return (
    <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        //console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        //console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        //console.log(error);
                    }}
                    onPressLink={(uri) => {
                        //console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
            </View>
  );
};
// const CourseDetail = () => {
//   return (
//     <View>
//       <Item />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
},
pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
}
});

export default DiscoverDetail;

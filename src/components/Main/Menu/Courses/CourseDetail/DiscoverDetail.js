/* eslint-disable */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import Pdf from 'react-native-pdf';
// import RNFS from 'react-native-fs';
// import FileViewer from 'react-native-file-viewer';

const DiscoverDetail = props => {
  const url = props.route.params.topic.nameFile;
  const source = { uri: url, cache: true };
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

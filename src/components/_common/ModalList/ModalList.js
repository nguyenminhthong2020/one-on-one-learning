/* eslint-disable prettier/prettier */
// /* eslint-disable */

// import React, { Suspense, useState } from 'react';
// import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity } from 'react-native';
// //import { arrLanguage } from '../../../globals/arr-language';

// const LanguageModal = (props) => {
//     const {arrModalList} = props;
//     const [modalVisible, setModalVisible] = useState(false);
//     const [language, setLanguage] = useState("English");
//     return (
//         <ScrollView>
//             <Text style={{fontSize: 20}}>Language: {language}</Text>
//             <View style={styles.centeredView}>
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={modalVisible}
//                     onRequestClose={() => {
//                         //alert("Modal has been closed.");
//                         setModalVisible(!modalVisible);
//                     }}
//                 >
//                     <View style={styles.centeredView}>
//                         <View style={styles.modalView}>
//                             <Text /*style={styles.modalText}*/>Hello World!</Text>
//                             <FlatList
//                             style={{ marginBottom: 20, marginTop: 10, borderWidth:2, }}
//                             showsVerticalScrollIndicator={true}
//                             initialNumToRender={10}
//                             data={arrLanguage}
//                             renderItem={i => (
//                                 <View>
//                                 <TouchableOpacity onPress={() => setLanguage(i.item.English)/*alert(i.index)*/}>
//                                 <Text style={{fontSize: 20}}>
//                                 {`       ${i.item.English}`}
//                                 </Text>
//                                 </TouchableOpacity>
//                                 </View>
//                             )}
//                             />
//                             <Pressable
//                                 style={[styles.button, styles.buttonClose]}
//                                 onPress={() => setModalVisible(!modalVisible)}
//                             >
//                                 <Text style={styles.textStyle}>Hide Modal</Text>
//                             </Pressable>
//                         </View>
//                     </View>
//                 </Modal>
//                 <Pressable
//                     style={[styles.button, styles.buttonOpen]}
//                     onPress={() => setModalVisible(true)}
//                 >
//                     <Text style={styles.textStyle}>Show Modal</Text>
//                 </Pressable>
//             </View>
//         </ScrollView>
//     );
// };
// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         backgroundColor: 'yellow',
//         // justifyContent: "center",
//         // alignItems: "center",
//         // width: '90%',
//         // height: '90%'
//         marginTop: 22
//     },
//     modalView: {
//         margin: 10,  // 20
//         backgroundColor: "white",
//         borderRadius: 20,
//         height: '100%',
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2
//     },
//     buttonOpen: {
//         backgroundColor: "#F194FF",
//     },
//     buttonClose: {
//         backgroundColor: "#2196F3",
//     },
//     textStyle: {
//         color: "white",
//         fontWeight: "bold",
//         textAlign: "center"
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: "center"
//     }
// });

// export default ModalList;

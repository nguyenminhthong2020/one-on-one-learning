/* eslint-disable */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, Modal, FlatList, TouchableOpacity } from 'react-native';
import { arrLanguage } from '../../../globals/arr-language';

const LanguageModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [language, setLanguage] = useState("English");
    return (
        <ScrollView>
            <Text style={{fontSize: 20}}>Language: {language}</Text>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Hello World!</Text>
                            <FlatList
                            style={{ marginBottom: 20, marginTop: 10, borderWidth:2, }}
                            showsVerticalScrollIndicator={true}
                            initialNumToRender={10}
                            data={arrLanguage}
                            renderItem={i => (
                                <View>
                                <TouchableOpacity onPress={() => setLanguage(i.item.English)}>
                                <Text style={{fontSize: 20}}>
                                {`       ${i.item.English}`}
                                </Text>
                                </TouchableOpacity>
                                </View>
                            )}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>1</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>2</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>3</Text>
                <Text style={{ fontSize: 30 }}>4</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>1</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>2</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>3</Text>
                <Text style={{ fontSize: 30 }}>8</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>1</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>2</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>3</Text>
                <Text style={{ fontSize: 30 }}>12</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>1</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>2</Text>
                <Text style={{ fontSize: 30, marginBottom: 20 }}>3</Text>
                <Text style={{ fontSize: 30 }}>16</Text>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'yellow',
        marginTop: 22
    },
    modalView: {
        margin: 10,  
        backgroundColor: "white",
        borderRadius: 20,
        height: '100%',
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default LanguageModal;

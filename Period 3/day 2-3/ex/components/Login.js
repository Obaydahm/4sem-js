import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
export default Login = (props) => {
    const {setModalVisible, modalVisible, userInput, setUserInput, getNearbyPlayers} = props;

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>
                    Please enter your credentials and a distance
						</Text>

                <View style={
                    {
                        backgroundColor: "#fff",
                        paddingHorizontal: 25,
                        paddingTop: 10,
                        paddingBottom: 40,
                        borderRadius: 5,
                        width: Dimensions.get("window").width - 40,
                    }
                }>
                    <TextInput value={userInput.distance} placeholder="Enter distance" autoCapitalize="none" style={styles.textInput} keyboardType="number-pad" onChangeText={distance => setUserInput({ ...userInput, distance })} />
                    <TextInput value={userInput.username} placeholder="Enter username" autoCapitalize="none" style={styles.textInput} onChangeText={username => setUserInput({ ...userInput, username })} />
                    <TextInput value={userInput.password} placeholder="Enter password" autoCapitalize="none" style={styles.textInput} secureTextEntry={true} onChangeText={password => setUserInput({ ...userInput, password })} />
                </View>


                <View style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginBottom: 30,
                }}>

                    <TouchableOpacity activeOpacity={.5} style={{ ...styles.modalButton, backgroundColor: "#2196F3" }} onPress={getNearbyPlayers}>
                        <Text style={styles.textStyle}>Find nearby players</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: "500", color: "red", paddingTop: 20 }} onPress={() => { setModalVisible(!modalVisible); }}>Cancel</Text>

                    <Text style={{ fontSize: 12, color: "#a1a1a1", paddingTop: 30 }}>
                        Created by Obaydah
							</Text>

                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "#f1f1f1",
        paddingVertical: Constants.statusBarHeight,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
    },
    modalButton: {
        backgroundColor: "#F194FF",
        borderRadius: 5,
        paddingHorizontal: 25,
        paddingVertical: 20,
        elevation: 2,
        width: Dimensions.get("screen").width - 40
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: "700",
        color: "#515151"
    },
    textInput: {
        height: 40,
        borderColor: '#f1f1f1',
        borderBottomWidth: 1,
        fontSize: 14,
        marginTop: 25
    }
});
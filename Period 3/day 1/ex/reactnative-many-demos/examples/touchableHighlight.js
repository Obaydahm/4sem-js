import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, Text, View } from "react-native";



TouchableHighlightExample = () => {
    return (
        <View style={{ backgroundColor: '#007bff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 3 }}>
            <Text style={{ color: "#fff", fontWeight: "bold" }} >Count</Text>
        </View>
    );
}

//https://reactnative.dev/docs/touchablehighlight
export default function TouchableHighlightScreen() {
    const [counter,setCounter] = useState(0);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24 }}>TouchableHighlight</Text>

            <View style={{
                backgroundColor: "#fff", alignItems: "center", width: "80%", padding: 20, borderRadius: 0, margin: 10
            }}>
                <Text style={{fontSize: 30, fontWeight: "bold"}} >{counter}</Text>
            </View>

            <TouchableHighlight
                style={{backgroundColor: "#DDDDDD", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 3}}
                activeOpacity={0.6}
                underlayColor="#007bff"
                onPress={() => setCounter(prevCount => prevCount+1)}>
                <Text>Press me</Text>
            </TouchableHighlight>
        </View>
    );
}
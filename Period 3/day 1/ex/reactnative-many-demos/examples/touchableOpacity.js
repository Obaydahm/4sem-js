import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

TouchableOpacityExample = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate TouchableOpacity</Text>
    </View>
  );
}


//https://reactnative.dev/docs/touchableopacity
export default function TouchableOpacityScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TouchableOpacity Demo</Text>
      <TouchableOpacity
        activeOpacity={.7}
        style={{backgroundColor: "#DDDDDD", paddingHorizontal: 20, paddingVertical: 10, margin: 20, borderRadius: 3}}
        //onPress={() => alert("hello")}
      >
        <Text>Press me</Text>
      </TouchableOpacity>
    </View>
  );
}
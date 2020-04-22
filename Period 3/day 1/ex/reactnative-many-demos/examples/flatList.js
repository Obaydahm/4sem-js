import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

FlatListBasics = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate basic use of Flatlist</Text>
    </View>
  );
}

//https://reactnative.dev/docs/using-a-listview
export default function FlatlistScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:24}}>Flatlist Basics</Text>
      <FlatListBasics />
    </View>
  );
}
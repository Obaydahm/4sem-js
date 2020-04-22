import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

SectionListBasics = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate FlatList used as a Section List</Text>
    </View>
  );
}


//https://reactnative.dev/docs/using-a-listview
//The second example with a Section List
export default function SectionlistScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SectionListBasics</Text>
      <SectionListBasics />
    </View>
  );
}
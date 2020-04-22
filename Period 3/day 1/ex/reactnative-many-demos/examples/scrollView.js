import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

ScrollDemo = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate basics of the ScrollView</Text>
    </View>
  );
}

export default function ScrollViewScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Scroll Demo</Text>
      <ScrollDemo />
    </View>
  );
}
import React from 'react';
import { View, Text } from 'react-native';


JustifyContentBasics = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate basics of JustifyContent</Text>
    </View>
  );
}


//https://reactnative.dev/docs/flexbox#justify-content
export default function JustifyContentScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Justify Content</Text>
      <JustifyContentBasics />
    </View>
  );
}
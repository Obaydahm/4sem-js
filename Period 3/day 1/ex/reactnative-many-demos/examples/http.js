import React, { useEffect, useState, } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';


FetchDemo = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate basic use of Fetch</Text>
    <Text style={{fontSize: 18}}>And IMPORTANT, also useEffect and useState</Text>
    </View>
  );
}

//https://reactnative.dev/docs/network
export default function HttpViewScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:24}}>Fetch Demo</Text>
      <FetchDemo />
    </View>
  );
}
import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

//https://reactnative.dev/docs/handling-text-input
export default function TextInputScreen() {
  const [isHungry, setIsHungry] = useState(true)

  const handleHunger = () => {
    if(isHungry){
      setIsHungry(false);
    }else{
      setIsHungry(true);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:36}}>TextInput Demo</Text>
      <Text style={{fontSize:24}}>
        I am {isHungry ? "hungryyyyyyyyyy!" : "full"}
      </Text>
      <Button title="EAT!" onPress={handleHunger}/>
    </View>
  );
}
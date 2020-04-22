import React, { useState } from "react";
import { Button, Text, View } from "react-native";


Cafe = (props) => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>{props.text}</Text>
    </View>
  );
}

//https://reactnative.dev/docs/touchableopacity
export default function StateScreen() {
  const [text, setText] = useState("Change me to demonstrate State in React with Hooks");

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:24}}>State Demo</Text>
      <Button title="Change" onPress={() => setText("New text")}/>
      <Cafe text={text}/>
    </View>
  );
}


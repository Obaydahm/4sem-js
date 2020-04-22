import React from 'react';
import { View, Text} from 'react-native';




Box = (props) => {
    return (
        <View style={{ flex:1, backgroundColor: props.color}}>
            <Text style={{ fontSize: 18, color: 'white' }}>{props.text}</Text>
        </View>
    );
}

//https://reactnative.dev/docs/flexbox#flex-direction
export default function FlexDirectionScreen() {
    return (
        <View style={{ flex: 1 }}>

            {/*ROW*/}
            <View style={{ flex: 1, backgroundColor: "#c1c1c1", padding: 10 }}>
                <Text style={{ fontSize: 24 }}>row</Text>

                <View style={{flex:1, flexDirection:'row', alignItems: 'center'}} >
                    <Box text="1" color="blue"/>
                    <Box text="2" color="red"/>
                    <Box text="3" color="green"/>
                </View>
            </View>

            {/*ROW-REVERSE*/}
            <View style={{ flex: 1, backgroundColor: "white", padding: 10}}>
                <Text style={{ fontSize: 24 }}>row-reverse</Text>

                <View style={{flex:1,flexDirection:'row-reverse', alignItems: 'center'}} >
                    <Box text="1" color="blue"/>
                    <Box text="2" color="red"/>
                    <Box text="3" color="green"/>
                </View>
            </View>

            {/*COLUMN*/}
            <View style={{ flex: 1, backgroundColor: "#c1c1c1", padding: 10}}>
                <Text style={{ fontSize: 24 }}>column</Text>

                <View style={{flex:1,flexDirection:'column', alignItems: 'center'}} >
                    <Box text="1" color="blue"/>
                    <Box text="2" color="red"/>
                    <Box text="3" color="green"/>
                </View>
            </View>

            {/*COLUMN-REVERSE*/}
            <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
                <Text style={{ fontSize: 24 }}>column-reverse</Text>

                <View style={{flex:1,flexDirection:'column-reverse', alignItems: 'center'}} >
                    <Box text="1" color="blue"/>
                    <Box text="2" color="red"/>
                    <Box text="3" color="green"/>
                </View>
            </View>


        </View>
    );
}
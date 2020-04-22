import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const GoalItem = props => {
    return (
        <View style={styles.listItem}>
            <Text>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        backgroundColor: "#f1f1f1",
        marginTop: -1,
        borderColor: "#c1c1c1",
        borderWidth: 1
    }
});


export default GoalItem;
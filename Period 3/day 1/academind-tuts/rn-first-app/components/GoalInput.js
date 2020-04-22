import React, {useState} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState("");

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Course goals" onChangeText={goalInputHandler} value={enteredGoal} />
            <Button title="Add" onPress={props.onAddGoal.bind(this, enteredGoal)} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        borderColor: '#c1c1c1',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        height: 50
    }
});

export default GoalInput;
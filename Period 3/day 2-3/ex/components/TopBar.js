import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faSignal } from '@fortawesome/free-solid-svg-icons'

export default TopBar = (props) => {
    const {setModalVisible, showActionSheet, serverIsUp} = props;
    return (
        <View style={{ position: "absolute", flexDirection: "row", marginTop: Constants.statusBarHeight, alignItems: "center", justifyContent: "center", width: Dimensions.get("window").width - 30, marginLeft: 15 }}>

            <TouchableOpacity style={[styles.userBar, styles.bRadiusLeft, { flex: .8 }]} activeOpacity={.8} onPress={() => { setModalVisible(true); }}>
                <Text style={styles.userBarText}>Find nearby players</Text>
            </TouchableOpacity>

            <View style={[styles.userBar, { flex: .10 }]}>
                <FontAwesomeIcon icon={faSignal} style={
                    serverIsUp ? ([styles.userBarText, { color: "lightgreen" }]) : ([styles.userBarText, { color: "#b1b1b1" }])

                } />
            </View>

            <TouchableOpacity style={[styles.userBar, styles.bRadiusRight, { flex: .10 }]} activeOpacity={.8} onPress={showActionSheet}>
                <FontAwesomeIcon icon={faBars} style={{ color: "#c1c1c1" }} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
	userBar: {
		height: 50,
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: "center",
		backgroundColor: "white",
		flexDirection: "row",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.15,
		shadowRadius: 2,
		elevation: 5,
	},
	userBarText: {
		color: "#b1b1b1",
		fontWeight: "500"
	},
	bRadiusLeft: {
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	bRadiusRight: {
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5
	}
});
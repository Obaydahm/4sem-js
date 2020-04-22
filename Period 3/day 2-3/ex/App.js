import React, { useState, useEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet, TouchableHighlight, Alert, Dimensions, StatusBar, TouchableOpacity, Modal, TextInput } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from 'expo-constants';
import facade from "./serverFacade";
import ActionSheet from 'react-native-actionsheet'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faSignal } from '@fortawesome/free-solid-svg-icons'

export default App = () => {

	//HOOKS
	const [modalVisible, setModalVisible] = useState(false);
	const [position, setPosition] = useState({ latitude: null, longitude: null })
	const [errorMessage, setErrorMessage] = useState(null);
	const [gameArea, setGameArea] = useState([]);
	const [region, setRegion] = useState(null);
	const [serverIsUp, setServerIsUp] = useState(false);
	const [status, setStatus] = useState("");
	let mapRef = useRef(null);
	//MYHOOKS
	const [nearByPlayersInput, setNearByPlayersInput] = useState({ username: "", password: "", distance: 0 })
	const [nearByPlayers, setNearByPlayers] = useState([]);

	useEffect(() => {
		getLocationAsync();
	}, [])

	useEffect(() => {
		getGameArea();
	}, [])

	async function getGameArea() {
		//Fetch gameArea via the facade, and call this method from within (top) useEffect
		try {
			const area = await facade.fetchGameArea();
			setGameArea(area)
			setServerIsUp(true)
		} catch (err) {
			setErrorMessage("Could not fetch GameArea")
		}

	}

	getLocationAsync = async () => {
		//Request permission for users location, get the location and call this method from useEffect
		let { status } = await Location.requestPermissionsAsync();
		if (status !== 'granted') {
			setErrorMessage('Permission to access location was denied');
			return
		}

		let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
		setPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude })
		setRegion({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		});
	};

	/*
	When a press is done on the map, coordinates (lat,lon) are provided via the event object
	*/
	onMapPress = async (event) => {
		//Get location from where user pressed on map, and check it against the server
	}

	onCenterGameArea = () => {
		// (RED) Center map around the gameArea fetched from the backend
		//Hardcoded, should be calculated as center of polygon received from server
		const latitude = 55.777055745928664;
		const longitude = 12.55897432565689;
		mapRef.current.animateToRegion({
			latitude,
			longitude,
			latitudeDelta: 0.002,
			longitudeDelta: 0.04,
		}, 1000);

	}

	sendRealPosToServer = async () => {
		//Upload users current position to the isuserinarea endpoint and present result
		const lat = position.latitude
		const lon = position.longitude;

		try {
			const status = await facade.isUserInArea(lon, lat);
			showStatusFromServer(setStatus, status);
		} catch (err) {
			setErrorMessage("Could not get result from server")
			setServerIsUp(false)

		}
	}

	getNearbyPlayers = async () => {

		try {
			const res = await facade.getNearbyPlayers(nearByPlayersInput.username, nearByPlayersInput.password, position.longitude, position.latitude, nearByPlayersInput.distance);
			if (res.code) {
				throw new Error("Wrong username or password")
			} else if(res.length < 1){
				throw new Error("No players nearby")
			} else {
				console.log(res)
				setNearByPlayers(current => [...res])
				setModalVisible(false)
			}
		} catch (e) {
			Alert.alert(
				'',
				e.message,
				[
					{ text: 'OK', onPress: () => setModalVisible(false) },
				],
				{ cancelable: false }
			);

		}
		//setModalVisible(false);


	}

	showActionSheet = () => {
		this.ActionSheet.show()
	}

	test = () => {
		console.log(nearByPlayers)
	}

	const info = serverIsUp ? status : " Server is not up";
	return (
		<View style={{ flex: 1 }}>

			<StatusBar barStyle="dark-content" />
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>
							Please enter your credentials and a distance
						</Text>

						<View style={
							{
								backgroundColor: "#fff",
								paddingHorizontal: 25,
								paddingTop: 10,
								paddingBottom: 40,
								borderRadius: 5,
								width: Dimensions.get("window").width - 40,
							}
						}>
							<TextInput placeholder="Enter distance" autoCapitalize="none" style={styles.textInput} keyboardType="number-pad" onChangeText={distance => setNearByPlayersInput({ ...nearByPlayersInput, distance })} />
							<TextInput placeholder="Enter username" autoCapitalize="none" style={styles.textInput} onChangeText={username => setNearByPlayersInput({ ...nearByPlayersInput, username })} />
							<TextInput placeholder="Enter password" autoCapitalize="none" style={styles.textInput} secureTextEntry={true} onChangeText={password => setNearByPlayersInput({ ...nearByPlayersInput, password })} />
						</View>


						<View style={{
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-around",
							marginBottom: 30,
						}}>

							<TouchableOpacity activeOpacity={.5} style={{ ...styles.modalButton, backgroundColor: "#2196F3" }} onPress={getNearbyPlayers}>
								<Text style={styles.textStyle}>Find nearby players</Text>
							</TouchableOpacity>
							<Text style={{ fontSize: 16, fontWeight: "500", color: "red", paddingTop: 20 }} onPress={() => { setModalVisible(!modalVisible); }}>Cancel</Text>

							<Text style={{fontSize: 12, color: "#a1a1a1", paddingTop: 30}}>
								Created by Obaydah
							</Text>

						</View>

					</View>
				</View>
			</Modal>


			<MapView style={styles.mapStyle} region={region} ref={mapRef} mapType="standard" showsCompass={false}>

				{//gameArea
					serverIsUp && <MapView.Polygon coordinates={gameArea}
						strokeWidth={1}
						onPress={onMapPress}
						fillColor="rgba(128, 153, 177, 0.5)" />
				}

				{
					position.latitude != null && position.latitude != null ? (
						<MapView.Marker
							title="me"
							coordinate={{ longitude: position.longitude, latitude: position.latitude }}
						/>
					) : null
				}

				{
					nearByPlayers.length > 0 ? (

						nearByPlayers.map(player =>

							<MapView.Marker
								key={player.username}
								title={player.name}
								coordinate={{ longitude: player.lon, latitude: player.lat }}
							/>

						)


					) : null
				}

			</MapView>

			<View style={{position: "absolute", flexDirection: "row", alignItems: "center", justifyContent: "center", width: Dimensions.get("window").width-30, marginLeft: 15 }}>

				<TouchableOpacity style={[styles.userBar, styles.bRadiusLeft, {flex: .8}]} activeOpacity={.8} onPress={() => { setModalVisible(true); }}>
					<Text style={styles.userBarText}>Find nearby players</Text>
				</TouchableOpacity>

				<View style={[styles.userBar, {flex: .10}]}>
					<FontAwesomeIcon icon={faSignal} style={
						serverIsUp ? ([styles.userBarText, { color: "lightgreen" }]) : ([styles.userBarText, { color: "#b1b1b1" }])

					} />
				</View>

				<TouchableOpacity style={[styles.userBar, styles.bRadiusRight, {flex: .10}]} activeOpacity={.8} onPress={this.showActionSheet}>
					<FontAwesomeIcon icon={faBars} style={{ color: "#c1c1c1" }} />
				</TouchableOpacity>

			</View>

			<ActionSheet
				ref={o => this.ActionSheet = o}
				options={['Update position', 'Show Game Area', 'cancel']}
				cancelButtonIndex={2}
				onPress={(index) => {
					switch (index) {
						case 0:
							sendRealPosToServer()
							break;
						case 1:
							onCenterGameArea()
							break;
					}
				}}
			/>
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
	},
	touchable: { backgroundColor: "#4682B4", margin: 3 },
	touchableTxt: { fontSize: 22, textAlign: "center", padding: 5 },

	fetching: {
		fontSize: 35, flex: 14,
		flexDirection: "row",
		alignItems: "center",
		paddingTop: Constants.statusBarHeight,
		textAlign: "center"
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		textAlign: 'center',
	},
	statusBar: {
		backgroundColor: "rgba(0,0,0,.5)",
		height: Constants.statusBarHeight,
	},
	mapStyle: {
		flex: 1
	},
	userBar: {
		height: 50,
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: "center",
		backgroundColor: "white",
		marginTop: Constants.statusBarHeight,
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
	modalView: {
		backgroundColor: "#f1f1f1",
		paddingVertical: Constants.statusBarHeight,
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "space-between",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width
	},
	modalButton: {
		backgroundColor: "#F194FF",
		borderRadius: 5,
		paddingHorizontal: 25,
		paddingVertical: 20,
		elevation: 2,
		width: Dimensions.get("screen").width - 40
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginTop: 30,
		fontSize: 24,
		fontWeight: "700",
		color: "#515151"
	},
	textInput: {
		height: 40,
		borderColor: '#f1f1f1',
		borderBottomWidth: 1,
		fontSize: 14,
		marginTop: 25
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

function showStatusFromServer(setStatus, status) {
	setStatus(status.msg);
	setTimeout(() => setStatus("- - - - - - - - - - - - - - - - - - - -"), 3000);
}

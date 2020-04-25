import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, Alert, StatusBar, Modal } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import facade from "./serverFacade";
import ActionSheet from 'react-native-actionsheet'
import Login from "./components/Login"
import TopBar from "./components/TopBar"
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
	const [userInput, setUserInput] = useState({ username: "", password: "", distance: 0 })
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
			if(userInput.username == "" || userInput.password == "" ||  userInput.distance == "") throw new Error("You may not leave any field empty")
			const res = await facade.getNearbyPlayers(userInput.username, userInput.password, position.longitude, position.latitude, userInput.distance);
			if (res.code) {
				throw new Error("Wrong username or password")
			} else if (res.length < 1) {
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
			{
				Platform.OS === 'ios' ? (
					<StatusBar barStyle="dark-content" />
				) : (
						<StatusBar barStyle="light-content" />
					)
			}

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => { }}
			>
				<Login setModalVisible={setModalVisible} modalVisible={modalVisible} userInput={userInput} setUserInput={setUserInput} getNearbyPlayers={getNearbyPlayers} />
			</Modal>


			<MapView style={{flex: 1}} region={region} ref={mapRef} mapType="standard" showsCompass={false}>

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

			<TopBar setModalVisible={setModalVisible} showActionSheet={showActionSheet} serverIsUp={serverIsUp} />

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

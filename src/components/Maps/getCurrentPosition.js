import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
const requestPermission = async () => {
	if(Platform.OS === 'ios') return Promise.resolve(true)
	return await PermissionsAndroid.request(
	  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
	).then(granted => {
		if(granted === PermissionsAndroid.RESULTS.GRANTED) {
		  return Promise.resolve("You can use the location")
		} else {
		  return Promise.reject("Location permission denied")
		}
	})
}

const getCoordinates = () => {
	return requestPermission().then(ok => {
		return new Promise((resolve, reject) => {
			const options = Platform.OS === 'android' ? { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 } : {enableHighAccuracy:true,timeout:80000,maximumAge:2000};
			Geolocation.getCurrentPosition(resolve, reject, options);
			// global.navigator.geolocation.getCurrentPosition(resolve, reject, options)
	  })
	})
}

const watchPosition = () => {
	return new Promise((resolve, reject) => {
		const options = Platform.OS === 'android' ? { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 } : {enableHighAccuracy:true,timeout:80000,maximumAge:2000};
		Geolocation.watchPosition(resolve, reject, options);
		// global.navigator.geolocation.getCurrentPosition(resolve, reject, options)
	})
}

export default getCoordinates
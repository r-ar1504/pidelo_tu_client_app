import { PermissionsAndroid, Platform } from 'react-native'

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
			const options = Platform.OS === 'android' ? { enableHighAccuracy: false, timeout:85000 } : {enableHighAccuracy:true,timeout:80000,maximumAge:2000};
			global.navigator.geolocation.getCurrentPosition(resolve, reject, options)
	  })
	})
}

export default getCoordinates
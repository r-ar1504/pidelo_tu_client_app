import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity ,  
} from 'react-native';



export default class Modal extends Component {

  constructor(props) {
    super(props);    
  }


	render(){
		return(
		  <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
		)
	}
}

const styles = StyleSheet.create({
 container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


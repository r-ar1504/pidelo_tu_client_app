import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image
} from 'react-native';

export default class Logo extends Component {
	render(){
		return(			
				<Image  style={{width:230, height: 70, marginVertical: 35, marginTop:80}}
          			source={require('src/assets/images/logo.png')}/>
			)
	}
}


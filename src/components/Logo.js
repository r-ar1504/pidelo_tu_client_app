import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image
} from 'react-native';

export default class Logo extends Component<{}> {
	render(){
		return(
			<View style={styles.container}>
				<Image  style={{width:230, height: 70, marginVertical: 35,}}
          			source={require('src/assets/images/logo.png')}/>
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
	  flexGrow:1,
    flexDirection: 'row',  
    alignItems: 'flex-end'
  },  
});

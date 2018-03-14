import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  Text,
  View,
   Image
} from 'react-native';



export default class Splash extends Component<{}> {
	componentDidMount() {
    	setTimeout(() => {
			   Navigation.startSingleScreenApp({
          screen: {
            screen: 'login.Login',
            navigatorStyle: {
            navBarHidden: true
            }
          }
        });
		},3000)
  }

	render(){
		return(
			<View style={styles.container}>
				  <Image  style={{width:70, height: 70}}
                source={require('src/assets/images/icon2.png')}/>
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
	  backgroundColor:'#455a64'
  },
});

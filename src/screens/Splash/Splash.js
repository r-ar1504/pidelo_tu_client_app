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
        if (this.props.action != 'maps') {
          this.props.navigator.resetTo({
            screen: 'login.Login',            
            animationType: 'slide-horizontal',
            navigatorStyle: {
              navBarHidden: true
            },             
          });
        }
        else {
          this.props.navigator.push({
            screen: 'maps.Map',            
            animationType: 'slide-horizontal',
            navigatorStyle: {
              navBarHidden: true
            },             
          });
        }          
		},2000)
  }

	render(){
		return(
			<View style={styles.container} >
          <Image source={require('src/assets/images/bg.png')} style={styles.image} />
				  <Image style={styles.logo} source={require('src/assets/images/icon3.png')} />
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
  image:{
    flex:1,
    resizeMode:'cover',
    position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
  },
  logo: {
    alignItems: 'flex-start',
    justifyContent:'center',
    resizeMode:'stretch',
  },
});

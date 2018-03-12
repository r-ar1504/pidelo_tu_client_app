import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity ,
  Image
} from 'react-native';



export default class Modal extends Component {

  componentDidMount(){
    setTimeout(() => {
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'register.verification',
            navigatorStyle: {
              navBarHidden: true
            }  
          }
        })
    },3000)
  }

	render(){
		return(
		  <View style={styles.container}>
        <Image source={require('../../images/gb-trans.png')} style={styles.image}/>
        <Image source={require('../../images/check.png')} style={styles.check}/>
        <Text style={styles.info}>Se ha enviado un código de verificación vía SMS a tu móvil</Text>
  		</View>
		)
	}
}

const styles = StyleSheet.create({  
 container: {
    flex: 1,
    alignItems: 'center',    
    justifyContent :'center'     
  },
  image:{
    flex:1,
    resizeMode:'cover',
    position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
  },
  check: {
    alignItems: 'flex-start',
    justifyContent:'center',
    resizeMode:'center',
    position:'absolute',
  },
   info: {    
    fontSize:16,
    color:'white',
    padding:20,
    marginTop:220    
  },
});
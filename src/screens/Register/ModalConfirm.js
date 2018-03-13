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

  comfirm(){
    Navigation.startSingleScreenApp({
          screen: {
            screen: 'register.form',
            navigatorStyle: {
              navBarHidden: true
            }  
          }
        });
  }

	render(){
		return(
		  <View style={styles.container}>
        <Image source={require('../../images/gb-trans.png')} style={styles.image}/>
        <Image source={require('../../images/check.png')} style={styles.check}/>
        <Text style={styles.info}>Tu código ha sido exitoso</Text>
        <TouchableOpacity style={styles.button} onPress={this.confirm}>
            <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
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
  button: {
    alignItems:'center',
    justifyContent :'center',    
    width:300,
    backgroundColor:'#00ffff',           
    paddingVertical: 13,
    marginTop: 20,    
    borderRadius:20,          
  },
  buttonText: { 
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',   
  },
});
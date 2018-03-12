 import React, { Component } from 'react';
 import { Navigation } from 'react-native-navigation';

 import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image   
} from 'react-native';

import Logo from '../../components/Logo';
import Form from './Form';
import Video from 'react-native-video';

 export default class Login extends Component {  
  
  signup(){
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'signup.Signup',
        navigatorStyle: {
          navBarHidden: true
        }    
      }
    });
  }

  register(){
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'register.Register',
        navigatorStyle: {
          navBarHidden: true
        }
      }
    })
  }	

   render() {
		return(          
      <ScrollView contentContainerStyle={styles.contentContainer}>			
			<View style={styles.container}>
        <Image source={require('../../images/background.png')} style={styles.image}/>
				{/*<Video
					source={require('../../video/broadchurch.mp4')}
          			rate={1.0}
          			volume={1.0}
          			muted={true}
          			resizeMode={"cover"}
					     repeat
          			style={styles.video}
        		/>*/}
				<Logo/>
				<Form type="Login"/>
        <View style={styles.signupTextCont}>          
          <TouchableOpacity onPress={this.fblogin}><Text style={styles.fb}> Facebook</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.register}><Text style={styles.movil}> Movil</Text></TouchableOpacity>
        </View> 
				<View style={styles.signupTextCont}>					
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Crear cuenta</Text></TouchableOpacity>
					<TouchableOpacity onPress={this.forgotpass}><Text style={styles.forgotpassButton}> ¿Olvidaste tu contraseña?</Text></TouchableOpacity>
				</View> 				 
			</View> 
      </ScrollView>         
		)
	}		
 }

 const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:'#455a64',    
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
	flex:1,
    alignItems:'flex-end',
    paddingVertical:16,
    flexDirection:'row'
  },  
  signupButton: {
  	color:'#ffffff',
  	fontSize:10,
  	fontWeight:'500',	
  },
  forgotpassButton: {
  	color:'#ffffff',
  	fontSize:10,
  	fontWeight:'500',
	marginLeft:120
  },
  contentContainer: {
    flexGrow: 1,        
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fb: {
    alignItems:'flex-end',        
    backgroundColor:'#3b5998',
    borderRadius:25,
    color:'#ffffff',
    padding:15,
  },
  movil: {
    alignItems:'flex-end',    
    backgroundColor:'#00aced',
    borderRadius:25,
    color:'#ffffff',
    padding:15,
    marginLeft:50
  },
  image:{
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
  }
});

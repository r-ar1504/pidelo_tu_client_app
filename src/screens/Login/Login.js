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
  Alert  
} from 'react-native';

import Logo from '../../components/Logo';
import Form from './Form';
import Video from 'react-native-video';

 export default class Login extends Component<Props> {  
 	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', function() {  			
    		BackHandler.exitApp()		
		});
	}

  signup(){
   this.props.navigator.push({
  screen: 'splash.Splash',
  title: 'Splash'
});
  }	

   render() {
		return(          
      <ScrollView contentContainerStyle={styles.contentContainer}>			
			<View style={styles.container}>
				<Video
					source={require('../../video/broadchurch.mp4')}
          			rate={1.0}
          			volume={1.0}
          			muted={false}
          			resizeMode={"cover"}
					     repeat
          			style={styles.video}
        		/>
				<Logo/>
				<Form type="Login"/>
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
	marginLeft:80
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
});

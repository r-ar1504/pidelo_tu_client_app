import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';

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
   static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }
   /*
   * Contructor , if a function other than render needs to use props it needs to be binded here.
   * example: this.signup = this.signup.bind(this); now signup can use props.navigator.
   */
  constructor(props){
    super(props);
    this.signup = this.signup.bind(this);
    this.register = this.register.bind(this);
    this.signIn = this.signIn.bind(this);

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
  /*
  * SignIn Function.
  * If user is valid, then initialize Home Screen.
  */
  signIn(){
      this.props.navigation.navigate('Home');
  }

  signup(){

  }

  register(){

  }

   render() {
		return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
			<View style={styles.container}>
        <Image source={require('src/assets/images/background.png')} style={styles.image}/>
				{/*<Video
					source={require('src/video/broadchurch.mp4')}
          			rate={1.0}
          			volume={1.0}
          			muted={true}
          			resizeMode={"cover"}
					     repeat
          			style={styles.video}
        		/>*/}
				<Logo/>
				<Form type="Login"/>
         <TouchableOpacity style={styles.button}>
           <Text style={styles.buttonText} onPress={this.signIn}>INGRESAR</Text>
         </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <TouchableOpacity onPress={this.fblogin}><Text style={styles.fb}><Icon size={30} name={'facebook'} /></Text></TouchableOpacity>
          <TouchableOpacity onPress={this.register}><Text style={styles.movil}><Icon size={30} name={'mobile'} /></Text></TouchableOpacity>
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
    flexDirection:'row',
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500',
  },
  forgotpassButton: {
  	color:'#ffffff',
  	fontSize:16,
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
    backgroundColor:'#3b5998',
    borderBottomLeftRadius:25,
    borderTopLeftRadius:25,
    color:'#ffffff',
    padding:10,
    width:150,
    textAlign:'center'
  },
  movil: {
    backgroundColor:'#00aced',
    borderBottomRightRadius:25,
    borderTopRightRadius:25,
    color:'#ffffff',
    padding:10,
    width:150,
    textAlign:'center'
  },
  image:{
    flex:1,
    resizeMode:'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
    button: {
    width:300,
    backgroundColor:'#00000000',
    paddingVertical: 13,
    marginTop: 60,
    borderWidth: 1.5,
    borderColor: 'white'
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
});

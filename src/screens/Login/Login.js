import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { View, BackHandler, Alert, AsyncStorage, ActivityIndicator } from 'react-native';

import Logo from '../../components/Logo';
import Form from './Form';
import Video from 'react-native-video';
import { Container } from 'native-base';
import styles from './LoginStyle';
import firebase from 'firebase';

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
    this.state = {email: "", password: "", loading:false, user: ""}; 

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated',
     'Warning: Failed prop type'
    ]);
  }
  componentWillMount() {
    /*try connect to the firebase 
    and then trying to get the current user that is log in*/
      if (!firebase.apps.length) {
          firebase.initializeApp({
          apiKey: 'AIzaSyDMjLkU36MBqIttrDnfPYY5fBEJsNHEhu4',
          authDomain: 'imperial-legacy-150804.firebaseapp.com',
          databaseURL: 'https://imperial-legacy-150804.firebaseio.com',
          projectId: 'imperial-legacy-150804',
          storageBucket: 'imperial-legacy-150804.appspot.com',
          messagingSenderId: '44425980713'
        });
      }

    try {
        const userData = this.props.firebaseApp.auth().currentUser;
        AsyncStorage.getItem('userData').then((user_data_json) => {
        let userData = JSON.parse(user_data_json);
        this.setState({
            user: userData,
            loading: false
          });
        });
        this.props.navigation.navigate('Home');                
      } catch (error) {
        this.setState({            
            loading: false
          });
      }      
  }  
  /*
  * SignIn Function.
  * If user is valid, then initialize Home Screen.
  */
  signIn(){
    this.setState({ loading: true });

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((userData) => {
        this.setState({ loading: false });
        AsyncStorage.setItem('userData', JSON.stringify(userData));
        this.props.navigation.navigate('Home')
      }
    ).catch((error) => {
        this.setState({ loading: false });
        alert('Login Failed. Please try again'+error);
    });      
  }

  signup(){
    this.props.navigation.navigate('Signup')
  }

  register(){
    this.props.navigation.navigate('Register')
  }
    
  render() {    
    if(this.state.loading) {
        return(    
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }    
		return(      			  
      <View style={styles.container}>        
        <Video
          source={require('src/video/video.mp4')}
                rate={1.0}
                volume={1.0}
                muted={true}
                resizeMode={"cover"}
               repeat
                style={styles.video}
            />
        <Logo/>                                           
        <Container>          
          <Form signIn={this.signIn} register={this.register} signup={this.signup} email={(email) => this.setState({email})} password={(password)=> this.setState({password})}/>       
        </Container>                                   
      </View>    
		)
	}
 }

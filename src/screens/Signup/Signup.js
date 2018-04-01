import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View, BackHandler, Alert, AsyncStorage, ActivityIndicator, YellowBox } from 'react-native';
import { Container } from 'native-base';

import Logo from 'src/components/Logo';
import Form from './Form';
import styles from './SignupStyle';
import firebase from 'firebase';


export default class Signup extends Component<{}> {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

   constructor(props){
    super(props);
    this.signup = this.signup.bind(this);
    this.state = { name: "", email: '', password: '', loading:false };  

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: Failed prop type'
    ]);   
  }

  componentWillMount() {
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
  }

  signup(){
    this.setState({ error: '', loading: true }); 
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: '', loading: false }); alert('Cuenta creada con éxito') })
            .catch((error) => {
                this.setState({ error: 'Authentication failed.', loading: false });
                alert('Hubo un problema'+error)
            });
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
        <Container>          
          <Form signup={this.signup} email={(email) => this.setState({email})} password={(password) => this.setState({password})} name={(name) => this.setState({name})}/>       
        </Container>                                   
      </View>   
		)
	}
}


import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View, BackHandler, Alert, AsyncStorage, ActivityIndicator, YellowBox, Image } from 'react-native';
import { Container } from 'native-base';

import Logo from 'src/components/Logo';
import Form from './Form';
import styles from './SignupStyle';
import firebase from 'react-native-firebase';


export default class Signup extends Component<{}> {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

   constructor(props){
    super(props);
    this.signup = this.signup.bind(this);
    this.state = { loading:false };  

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: Failed prop type'
    ]);     
  }  

  signup(name,email,password){
    this.setState({ loading: true });         
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {               
      this.setState({ loading: false });
    })
    .catch(error => {
      this.setState({ loading: false })
        alert(error)
    });
  }

	render() {
    if(this.state.loading) {
        return(    
          <View style={styles.body}>
            <Image source={require('src/assets/images/bg.png')} style={styles.image} />
            <ActivityIndicator size={50} color="white" animating={true}/>
          </View>
        )
      }  
		return(
     <View style={styles.container}>                
        <Container>          
          <Form signup={this.signup} deviceLocale="es"/>       
        </Container>                                   
      </View>   
		)
	}
}


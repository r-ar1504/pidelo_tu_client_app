import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View, BackHandler, Alert, AsyncStorage, ActivityIndicator, YellowBox } from 'react-native';
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
    this.state = { name: "", email: '', password: '', loading:false };  

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: Failed prop type'
    ]);     
  }  

  signup(){
    this.setState({ loading: true }); 
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { 
              this.setState({ loading: false });
              this.props.navigation.navigate('Login');
            })
            .catch((error) => {
              this.setState({ loading: false });
              alert(error)
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


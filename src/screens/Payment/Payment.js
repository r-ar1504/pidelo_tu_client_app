import React, { Component } from 'react';
import { View, BackHandler, Image, ImageBackground, Alert, Modal } from 'react-native';

import firebase from "react-native-firebase";
import styles from './PaymentStyle';
import Form from './Form';

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default class Payment extends Component {

  constructor(props){
    super(props);

    this.state = { user:firebase.auth().currentUser }     
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };  

  confirm(card) {
    this.store(card).then(response => {
      if (response.message === 'success') {
        this.setState({loading:false});
        this.props.navigation.navigate('Modal', {
          text: 'Tu forma de pago ha sido agregada',
          button:'Continuar',
          action: 'Payment',
        });
      }  
    }).catch((error) => { Alert.alert("Pídelo Tú", error.messages) });
  }

  async store(card) {
    this.setState({loading:true});
    return await fetch('http://pidelotu.azurewebsites.net/payment', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({        
        user_id:this.state.user.uid,
        card_number:card,        
      })
    }).then(response => response.json()).then(response => {            
      return response;      
    }).catch(error => {
      this.setState({loading:false});
      throw new Error(error.messages);
    })
  }

   render() {    
    if(this.state.loading) {
    return <LoadingScreen/>      
    }     
		return(      
			<View style={styles.container}>
        <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}/>
				<Form confirm={this.confirm.bind(this)}/>
			</View>      
		)
	}
 }

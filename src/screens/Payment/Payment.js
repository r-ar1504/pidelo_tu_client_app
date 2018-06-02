import React, { Component } from 'react';
import { View, BackHandler, Image, ImageBackground, Alert, Modal } from 'react-native';

import firebase from "react-native-firebase";
import styles from './PaymentStyle';
import Form from './Form';

export default class Payment extends Component {

  constructor(props){
    super(props);

    this.state = { user: null }
    this.confirm = this.confirm.bind(this);   
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

    this.setState({user: firebase.auth().currentUser})
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };  


  confirm(card,year,month,csv) {
    this.setState({loading:true});
    return fetch('http://192.168.100.13:8000/addPaymethod', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({        
        user_id:this.state.user.uid,
        card_number:card,
        year:year,
        month:month,
        csv:csv,
      })
    }).then(response => response.json()).then(response => {            
      if (response.message === 'success') {
        this.setState({loading:false});
        this.props.navigation.navigate('Modal', {
          text: 'Tu forma de pago ha sido aprobada',
          button:'Continuar',
          action: 'Payment',
        });
      }      
    }).catch(error => {
      this.setState({loading:false});
      Alert.alert("Pídelo Tú",error.message);
    })
  }

   render() {
    if(this.state.loading) {
      return(
        <Modal animationType="slide" transparent={true} visible={this.state.loading} onRequestClose={() => {console.log('close modal')}}>          
          <ImageBackground source={require('src/assets/images/bg.png')} style={styles.body}>
            <Image source={require('src/assets/images/ic.png')} style={{width: 105, height: 105}}/>          
          </ImageBackground>          
        </Modal>
      )
    }  
		return(      
			<View style={styles.container}>
        <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}/>
				<Form confirm={this.confirm}/>
			</View>      
		)
	}
 }

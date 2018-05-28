import React, { Component } from 'react';
import { View, BackHandler, Image, YellowBox, ImageBackground } from 'react-native';

import styles from './PaymentStyle';
import Form from './Form';



 export default class Payment extends Component {

  constructor(props){
    super(props);

    this.confirm = this.confirm.bind(this);

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
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


  confirm() {
    this.props.navigation.navigate('Modal', {
      text: 'Tu forma de pago ha sido aprobada',
      button:'Continuar',
      action: 'Payment',
    });
  }

   render() {
		return(      
			<View style={styles.container}>
        <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}/>
				<Form confirm={this.confirm}/>
			</View>      
		)
	}
 }

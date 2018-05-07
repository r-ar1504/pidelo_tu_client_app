import React from 'react';
import {  Text, View, StatusBar, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image, BackHandler } from 'react-native';
import {  Input, Item } from 'native-base';
import styles from './RegisterStyle';
import firebase from 'react-native-firebase'; 


export default class VerificationCode extends React.Component {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

  constructor(props){
    super(props);
    
    this.state = { codeInput1: '', codeInput2: '', codeInput3: '', loading: false }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    return true;
  };

  confirm(phoneAuthSnapshot, phoneNumber){
    const codeInput  = this.state.codeInput1+this.state.codeInput2+this.state.codeInput3;
    if (codeInput.length < 6){
      alert("Escribe un código válido");
    }
    else {
      /* Pass credential through the next forms until the register finish*/
      this.setState({ loading: true });
      const { verificationId } = phoneAuthSnapshot;
      
      //if (code == codeInput){
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeInput);          
          this.setState({ loading: false });
          this.props.navigation.navigate('Modal',{
            text:'Tu código ha sido exitoso',
            button:'Finalizar',
            action: 'Form',
            credential: credential,
            phoneNumber: phoneNumber
        });
      //}
      //else {
        //this.setState({ loading: false });
        //alert("El código no coincide, por favor intente de nuevo");
      //}                
    }       
  }

  render() {
    const { params } = this.props.navigation.state;
    const phoneAuthSnapshot = params ? params.phoneAuthSnapshot : null;
    const phoneNumber = params ? params.phoneNumber : null;

    if(this.state.loading) {
        return(    
          <View style={styles.body}>
            <Image source={require('src/assets/images/bg.png')} style={styles.image} />
            <ActivityIndicator size={50} color="white"/>
          </View>
        )
      }     

    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>INGRESA CODIGO DE VERIFICACIÓN</Text>
          <View style={styles.inputBox}>
            <Item regular style={{borderColor: 'gray', borderWidth: 1, width:35,  height:40, marginLeft: 20 }}>
              <Input                
                keyboardType="phone-pad" value={this.state.codeInput1} onChangeText={codeInput1 => this.setState({codeInput1})} maxLength={2}
              />
            </Item>
            <Item regular style={{borderColor: 'gray', borderWidth: 1, width: 35, height:40,  marginLeft: 20 }}>
              <Input
                keyboardType="phone-pad" value={this.state.codeInput2} onChangeText={codeInput2 => this.setState({codeInput2})} maxLength={2}
              />
            </Item>
            <Item regular style={{borderColor: 'gray', borderWidth: 1, width: 35, height:40,  marginLeft: 20 }}>
              <Input              
                keyboardType="phone-pad" value={this.state.codeInput3} onChangeText={codeInput3 => this.setState({codeInput3})} maxLength={2}
              />
            </Item>
          </View>


        <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this, phoneAuthSnapshot, phoneNumber)}>
            <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


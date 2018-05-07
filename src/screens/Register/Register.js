import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, View, TouchableOpacity, YellowBox, Alert, ActivityIndicator, Image, BackHandler, AsyncStorage } from 'react-native';
import { Container, Content, Footer, Input, Item } from 'native-base';
import PhoneInput from 'react-native-phone-input';
import ValidationComponent from 'react-native-form-validator';

import firebase from 'react-native-firebase';
import styles from './RegisterStyle';

export default class Register extends ValidationComponent {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

  constructor(props) {
    super(props);
    
    this.selectCountry = this.selectCountry.bind(this);
    this.state = { cca2: 'MX', number: '', loading: false };

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated',
     'Warning: Failed prop type'
    ]);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }  

  componentWillUnmount() {    
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);   
  }

  onBackButtonPressAndroid = () => {
    if (this.state.loading) {
      return true;
    }
    else {    
      this.props.navigation.goBack();
    }
  };
 
  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  confirm(){    
    this.validate({ number: {required: true} });

    const phoneNumber = this.phone.getCountryCode()+this.state.number;

    if(this.isFormValid()){
      this.setState({ loading: true }); 
      this.checkNumber(phoneNumber).then((response) => {        
        if (response.length == 0) {
            /* Send phone number to display in the next screen */ 
            firebase.auth().languageCode = 'es-419';             
            firebase.auth().verifyPhoneNumber(phoneNumber)
            .on('state_changed', (phoneAuthSnapshot) => {    
            switch (phoneAuthSnapshot.state) {
              // ------------------------
              //  IOS AND ANDROID EVENTS
              // ------------------------
              case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'                
                this.setState({ loading: false });                                          
                this.props.navigation.navigate('Modal',{        
                  text: 'Se ha enviado un código de verificación vía SMS a tu móvil',
                  button:'Continuar',
                  action: 'Verification',
                  phoneAuthSnapshot: phoneAuthSnapshot,
                  phoneNumber: phoneNumber        
                }); 
              break;
              case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                this.setState({ loading: false });
                this.props.navigation.navigate('Register');
                alert(phoneAuthSnapshot.error);                
              break;

              // ---------------------
              // ANDROID ONLY EVENTS
              // ---------------------
              case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                
              break;
              case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'                 
                 
              break;
            }
          }, (error) => {
            this.setState({ loading: false });
            alert(error + "Id:" + error.verificationId);
            this.props.navigation.goBack();             
          }, (phoneAuthSnapshot) => {
            
          });            
        }
        else {
          try {            
            AsyncStorage.getItem(response[0].firebase_id, (err, item) => {
              const emailCredential = firebase.auth.EmailAuthProvider.credential(response[0].email, JSON.parse(item.password));
              if (emailCredential !== null){
                firebase.auth().signInWithCredential(emailCredential);              
              }
            });                        
          } catch (error) {
              alert(error);
          }
        }
      });      
    }
    else {
      alert(this.getErrorMessages());
    }           
  }

  checkNumber(phoneNumber){
    const url = 'http://pidelotu.azurewebsites.net/checkNumber/'+phoneNumber;
    return fetch(url)      
      .then((response) => {              
        return response.json();
      }); 
  }

  render() {
    if(this.state.loading) {
        return(    
          <View style={styles.body}>
            <Image source={require('src/assets/images/bg.png')} style={styles.image} />
            <Image style={styles.logo} source={require('src/assets/images/ic.gif')} style={{width: 105, height: 105}}/>
          </View>
        )
      } 
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.signupText}>INGRESA TU MÓVIL</Text>
          <View style={styles.inputBox}>
            <PhoneInput ref={(ref) => { this.phone = ref; }}           
            initialCountry='mx'
            pickerItemStyle={{fontSize:18, height:30}}
            textProps={{borderWidth:0.7, borderColor:'black', editable:false}}
            textStyle={{fontSize:18, height:30, textAlign:'center'}}
            style={{padding:20,marginTop:16,marginBottom:16, width:125}}
            diabled={true}
            cancelText="Cancelar"
            confirmText="Confirmar"            
            />
            <Item regular style={{flex:1, borderColor: 'black', borderWidth: 0.7, width:100, height:30, fontSize:8 }}>
              <Input keyboardType="phone-pad" ref="number" value={this.state.number} onChangeText={(number) => {this.setState({number})}} maxLength={10}/>
            </Item>
          </View>
          <Text style={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta ex arcu, et scelerisque felis faucibus at. Aenean sit amet viverra mauris. Phasellus quis metus ac lectus ultrices lacinia sed ut tortor. Donec non dignissim metus, ac ornare augue. Aenean euismod velit nisl. Donec ullamcorper sagittis condimentum. Nullam pharetra lorem iaculis pharetra gravida. Nulla non pharetra ante. Aenean et libero dui. Nulla lacinia vestibulum ex sit amet elementum.</Text>
          <Footer style={{backgroundColor:'#00000000', alignItems:'center', justifyContent:'center', marginBottom: 16}}>
            <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this)}><Text style={styles.buttonText}>CONTINUAR</Text></TouchableOpacity>
          </Footer>
        </Content>
      </Container>
    );
  }
}

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, View, TouchableOpacity, YellowBox, Alert, ActivityIndicator } from 'react-native';
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
    this.confirm = this.confirm.bind(this);
    this.state = { cca2: 'MX', number: '', loading: false };

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: componentWillUpdate is deprecated',
     'Warning: Failed prop type'
    ]);
  }
 
  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  confirm(){
    this.validate({
      number: {required: true},         
    });

    const phoneNumber = this.phone.getCountryCode()+this.state.number;

    if(this.isFormValid()){
      /* Send phone number to display in the next screen */              
      firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then((confirmResult) => { 
        this.props.navigation.navigate('Modal',{        
          text: 'Se ha enviado un código de verificación vía SMS a tu móvil',
          button:'Continuar',
          action: 'Verification',
          confirmResult: confirmResult        
        });        
      })      
      .catch((error) => { alert(error) });  
    }
    else {
      alert(this.getErrorMessages());
    }           
  }

  render() {
    if(this.state.loading) {
        return(    
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        )
      } 
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.signupText}>REGISTRATE</Text>
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
              <Input                
                keyboardType="phone-pad" ref="number" value={this.state.number} onChangeText={(number) => {this.setState({number})}}                
              />
            </Item>
          </View>
          <Text style={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta ex arcu, et scelerisque felis faucibus at. Aenean sit amet viverra mauris. Phasellus quis metus ac lectus ultrices lacinia sed ut tortor. Donec non dignissim metus, ac ornare augue. Aenean euismod velit nisl. Donec ullamcorper sagittis condimentum. Nullam pharetra lorem iaculis pharetra gravida. Nulla non pharetra ante. Aenean et libero dui. Nulla lacinia vestibulum ex sit amet elementum.</Text>
          <Footer style={{backgroundColor:'#00000000', alignItems:'center', justifyContent:'center', marginBottom: 16}}>
            <TouchableOpacity style={styles.button} onPress={this.confirm}><Text style={styles.buttonText}>CONTINUAR</Text></TouchableOpacity>
          </Footer>
        </Content>
      </Container>
    );
  }
}

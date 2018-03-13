import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  Text,
  View,
  StatusBar , 
  ScrollView, 
  TouchableOpacity
} from 'react-native';

import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';

export default class Register extends Component {			
	constructor() {
    super();

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      cca2: 'MX',
    };
  }  

  onPressFlag() {
    this.countryPicker.openModal();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  confirm(){
    Navigation.startSingleScreenApp({
      screen: {
        screen:'register.modal',
        navigatorStyle: {
          navBarHidden: true
        }        
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>REGISTRATE</Text>
        <PhoneInput
          ref={(ref) => {
            this.phone = ref;
          }}
          onPressFlag={this.onPressFlag}
          initialCountry='mx'
          pickerItemStyle={{fontSize:16}}          
          textProps={{placeholder:'Numero', borderWidth:0.7, borderColor:'black'}}
          textStyle={{fontSize:16}}
          style={{flex:1,alignItems:'center',justifyContent:'center',padding:20,marginTop:16,marginBottom:16,}}
          pickerItemStyle={{borderWidth:0.7, borderColor:'black'}}
        />

        <CountryPicker
          ref={(ref) => {
            this.countryPicker = ref;
          }}
          onChange={value => this.selectCountry(value)}
          translation="eng"
          cca2={this.state.cca2}
        >
          <View />
        </CountryPicker>
        <Text style={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta ex arcu, et scelerisque felis faucibus at. Aenean sit amet viverra mauris. Phasellus quis metus ac lectus ultrices lacinia sed ut tortor. Donec non dignissim metus, ac ornare augue. Aenean euismod velit nisl. Donec ullamcorper sagittis condimentum. Nullam pharetra lorem iaculis pharetra gravida. Nulla non pharetra ante. Aenean et libero dui. Nulla lacinia vestibulum ex sit amet elementum.</Text>
        <TouchableOpacity style={styles.button} onPress={this.confirm}>
            <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,    
  },
  signupText: {    
    alignItems:'flex-start',
    justifyContent :'center',
    marginTop:16,
    fontSize:20,
    marginBottom:16
  },
  button: {
    alignItems:'center',
    justifyContent :'center',    
    width:300,
    backgroundColor:'#00ffff',           
    paddingVertical: 13,
    marginTop: 20,    
    borderRadius:20,          
  },
  buttonText: { 
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',   
  },
  info: {
    flexGrow:1,
    fontSize:8,
    color:'gray',
    textAlign:'center'
  },
  phone: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:20,
    marginTop:16,
    marginBottom:16,
  }
});

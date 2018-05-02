import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text,View, TouchableOpacity, Alert  } from 'react-native';
import { Content, Item, Footer } from 'native-base';
import { Hoshi } from 'react-native-textinput-effects';

import ValidationComponent from 'react-native-form-validator';
import styles from './SignupStyle';


export default class Form extends ValidationComponent {
  constructor(props) {
    super(props);  
    this.state = { name: "", email: "", password: "", confirmpass:"" }        
  }  

  signup(name,email,password, confirmpass){
    this.validate({
      name: {required: true},   
      email: {required: true, email: true},   
      password: {required: true, minlength: 6},
      confirmpass: {required: true}
    });


    if(this.isFormValid()){
      if (password == confirmpass) {
        this.props.signup(name,email,password);
      }
      else {
        alert ("Las contraseñas no coinciden");  
      }
    }
    else {
      alert(this.getErrorMessages());
    }    
  }  

	render(){
    const name = this.state.name;
    const email = this.state.email; 
    const password = this.state.password; 
    const confirmpass = this.state.confirmpass;    
		return(		    
          <Content scrollEnabled={false} disableKBDismissScroll={false} bounces={false}>            
            <Text style={styles.signupText}>REGISTRATE</Text>
            <Hoshi
              style={styles.inputBox}
              label={'NOMBRE'}
              ref="name"            
              onChangeText={(name) => {this.setState({name});}}                                
              onSubmitEditing={()=> this.correo.focus()}
              borderColor={'#00000000'}             
            />
            <Hoshi
              style={styles.inputBox}
              label={'CORREO ELECTRONICO'}              
              keyboardType="email-address"
              ref={(email) => this.correo = email}              
              onChangeText={(email)=> {this.setState({email});}}
              onSubmitEditing={()=> this.password.focus()}
              borderColor={'#00000000'}
            />
            <Hoshi
              style={styles.inputBox}
              label={'CONTRASEÑA'}              
              secureTextEntry={true}                
              ref={(password) => this.password = password}              
              onChangeText={(password) => {this.setState({password});}}
              onSubmitEditing={()=> this.confirmpass.focus()}
              borderColor={'#00000000'}
            />
            <Hoshi
              style={styles.inputBox}
              label={'CONFIRMACIÓN DE CONTRASEÑA'}              
              secureTextEntry={true}                
              ref={(confirmpass) => this.confirmpass = confirmpass}
              onChangeText={(confirmpass)=> {this.setState({confirmpass});}}              
              borderColor={'#00000000'}
            />
            <View style={styles.signupTextCont}>              
              <TouchableOpacity><Text style={styles.signupButton}> Conoce nuestros terminos y condiciones</Text></TouchableOpacity>      
            </View>            
            <Footer style={{backgroundColor:'#00000000', alignItems:'center', justifyContent:'center'}}>            
              <TouchableOpacity style={styles.button} onPress={this.signup.bind(this, name, email, password, confirmpass)}><Text style={styles.buttonText}>CREAR CUENTA</Text></TouchableOpacity>    
            </Footer>            
          </Content>     
			)
	}
}

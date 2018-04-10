import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, TouchableOpacity } from 'react-native';
import { Content, Item, Label, Input, Icon, Footer } from 'native-base';
import ValidationComponent from 'react-native-form-validator';
import styles from './LoginStyle';

export default class Form extends ValidationComponent {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }
  constructor(props) {
    super(props);
    this.state = {email: "", password: ""};      
  }

  signIn(email,password){
    this.validate({      
      email: {required: true, email: true},   
      password: {required: true},      
    });


    if(this.isFormValid()){
      this.props.signIn(email,password);
    }
    else {
      alert(this.getErrorMessages());
    }    
  }  

	render(){ 
    const email = this.state.email; 
    const password = this.state.password;    
		return(		    
          <Content>            
            <Item floatingLabel style={styles.inputBox}>              
              <Label style={{marginLeft: 15, marginTop: 5, color: 'white'}}>Correo Electronico</Label>              
              <Input style={styles.input} ref={(email) => this.correo = email} onChangeText={(email)=> {this.setState({email});}} onSubmitEditing={()=> this.password.focus()} keyboardType="email-address"/>
              <Icon active name='person' style={{color:'white'}} />
            </Item>
            <Item floatingLabel style={styles.inputBox}>              
              <Label style={{marginLeft: 15, marginTop: 5, color: 'white'}}>Contraseña</Label>              
              <Input style={styles.input} ref={(password) => this.password = password} onChangeText={(password) => {this.setState({password});}} secureTextEntry={true}/>
              <Icon active name='lock' style={{color:'white'}} />
            </Item>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={this.signIn.bind(this,email,password)}>INGRESAR</Text>
            </TouchableOpacity>
            <Item style={styles.signupTextCont}>
              <TouchableOpacity onPress={this.fblogin}><Text style={styles.fb}><Icon size={30} active name={'logo-facebook'} style={{color:'white'}} /></Text></TouchableOpacity>
              <TouchableOpacity onPress={this.props.register}><Text style={styles.movil}><Icon size={30} active name={'phone-portrait'} style={{color:'white'}} /></Text></TouchableOpacity>
            </Item>
            <Footer style={{backgroundColor:'#00000000', flexDirection:'row', justifyContent:'space-between'}}>            
              <TouchableOpacity onPress={this.props.signup}><Text style={styles.signupButton}> Crear cuenta</Text></TouchableOpacity>                        
              <TouchableOpacity onPress={this.forgotpass}><Text style={styles.forgotpassButton}> ¿Olvidaste tu contraseña?</Text></TouchableOpacity>                                
            </Footer>            
          </Content>               		  
			)
	}
}


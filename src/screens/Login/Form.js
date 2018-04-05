import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text, TouchableOpacity } from 'react-native';
import { Content, Item, Label, Input, Icon, Footer } from 'native-base';
import ValidationComponent from 'react-native-form-validator';
import styles from './LoginStyle';

export default class Form extends Component {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }
  constructor(props) {
    super(props);
    this.state = {email: "", password: ""};      
  }  
	render(){    
		return(		    
          <Content scrollEnabled={false}>            
            <Item floatingLabel style={styles.inputBox}>              
              <Label style={{marginLeft: 15, marginTop: 5, color: 'white'}}>Correo Electronico</Label>              
              <Input style={styles.input} ref="email" onChangeText={this.props.email} keyboardType="email-address"/>
              <Icon active name='person' style={{color:'white'}} />
            </Item>
            <Item floatingLabel style={styles.inputBox}>              
              <Label style={{marginLeft: 15, marginTop: 5, color: 'white'}}>Contraseña</Label>              
              <Input style={styles.input} ref="password" onChangeText={this.props.password} secureTextEntry={true}/>
              <Icon active name='lock' style={{color:'white'}} />
            </Item>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={this.props.signIn}>INGRESAR</Text>
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


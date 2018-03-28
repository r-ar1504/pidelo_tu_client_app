import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Item, Label, Input, Icon, Left, Right } from 'native-base';

export default class Form extends Component {
	render(){
		return(
		    <View>            
            <Content>            
            <Item floatingLabel style={styles.inputBox}>              
              <Label style={{marginLeft: 15, marginTop: 5, color: 'white'}}>Correo Electronico</Label>              
              <Input style={styles.inputBox}/>
              <Icon active name='ios-mail' style={{color:'white'}} />
            </Item>
            <Item floatingLabel style={styles.inputBox}>              
              <Label style={{marginLeft: 15, marginTop: 5, color: 'white'}}>Contraseña</Label>              
              <Input style={styles.inputBox}/>
              <Icon active name='lock' style={{color:'white'}} />
            </Item>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={this.signIn}>INGRESAR</Text>
            </TouchableOpacity>
            <Item style={styles.signupTextCont}>
              <TouchableOpacity onPress={this.fblogin}><Text style={styles.fb}><Icon size={30} active name={'logo-facebook'} style={{color:'white'}} /></Text></TouchableOpacity>
              <TouchableOpacity onPress={this.register}><Text style={styles.movil}><Icon size={30} active name={'phone-portrait'} style={{color:'white'}} /></Text></TouchableOpacity>
            </Item>
            <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Crear cuenta</Text></TouchableOpacity>
            <TouchableOpacity onPress={this.forgotpass}><Text style={styles.forgotpassButton}> ¿Olvidaste tu contraseña?</Text></TouchableOpacity>                    
          </Content>   
  		  </View>
			)
	}
}

const styles = StyleSheet.create({  
  inputBox: {
    width:300,
    paddingHorizontal:13,
    marginVertical: 10,
  },
  button: {
    width:300,
    backgroundColor:'#00000000',
    paddingVertical: 13,
    marginTop: 60,
    borderWidth: 1.5,
    borderColor: 'white'
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
   fb: {
    backgroundColor:'#3b5998',
    borderBottomLeftRadius:25,
    borderTopLeftRadius:25,
    color:'#ffffff',
    padding:10,
    width:150,
    textAlign:'center'
  },
  movil: {
    backgroundColor:'#00aced',
    borderBottomRightRadius:25,
    borderTopRightRadius:25,
    color:'#ffffff',
    padding:10,
    width:150,
    textAlign:'center'
  },
  signupTextCont : {
    flex:1,
    alignItems:'flex-end',
    paddingVertical:36,
    flexDirection:'row',
  },
  signupButton: {
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500',
    alignItems:'flex-start',
  },
  forgotpassButton: {
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500', 
    alignItems:'flex-end',  
  },  
});

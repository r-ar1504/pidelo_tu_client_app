import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { Content, Item, Label, Input, Icon } from 'native-base';
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
      Alert.alert("PídeloTú","Ops, tienes campos vacíos");
    }    
  }
    

	render(){ 
    const email = this.state.email; 
    const password = this.state.password;    
		return(		    
          <Content scrollEnabled={false}>            
            <Item floatingLabel style={styles.inputBox}>              
              <Label style={{marginLeft: 15, marginTop: 5, color: 'white', fontFamily: 'Lato-Regular'}}>Correo Electrónico</Label>              
              <Input style={styles.input} ref={(email) => this.correo = email} onChangeText={(email)=> {this.setState({email});}} keyboardType="email-address"/>
              <Icon active name='person' style={{color:'white'}} />
            </Item>
            <Item floatingLabel style={styles.inputBox}>              
              <Label style={{marginLeft: 15, marginTop: 5, color: 'white', fontFamily: 'Lato-Regular'}}>Contraseña</Label>              
              <Input style={styles.input} ref={(password) => this.password = password} onChangeText={(password) => {this.setState({password});}} secureTextEntry={true}/>
              <Icon active name='lock' style={{color:'white'}} />
            </Item>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={this.signIn.bind(this,email,password)}>INGRESAR</Text>
            </TouchableOpacity>
            <Item style={styles.signupTextCont}>
              <TouchableOpacity onPress={this.props.fblogin}><Text style={styles.fb}><Icon active name={'logo-facebook'} style={{color:'white', fontSize:20}} /> FACEBOOK</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.props.register}><Text style={styles.movil}><Icon active name={'phone-portrait'} style={{color:'white', fontSize:21}} /> MOVIL</Text></TouchableOpacity>
            </Item>
        {/*<Footer style={{backgroundColor:'#00000000', flexDirection:'row', justifyContent:'space-between'}}>            
              <TouchableOpacity onPress={this.props.signup}><Text style={styles.signupButton}> Crear cuenta</Text></TouchableOpacity>                        
              <TouchableOpacity onPress={this.forgotpass}><Text style={styles.forgotpassButton}> ¿Olvidaste tu contraseña?</Text></TouchableOpacity>                                
            </Footer>*/}            
          </Content>               		  
			)
	}
}


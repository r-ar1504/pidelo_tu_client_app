import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Text,View, TouchableOpacity  } from 'react-native';
import { Content, Item, Footer } from 'native-base';
import { Hoshi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import ValidationComponent from 'react-native-form-validator';
import styles from './SignupStyle';


export default class Form extends Component<{}> {

	render(){
		return(		    
          <Content scrollEnabled={false}>            
            <Text style={styles.signupText}>REGISTRATE</Text>
            <Hoshi
              style={styles.inputBox}
              label={'NOMBRE'}                            
              onSubmitEditing={()=> this.correo.focus()}
              borderColor={'#00000000'}             
            />
            <Hoshi
              style={styles.inputBox}
              label={'CORREO ELECTRONICO'}              
              keyboardType="email-address"
              ref={(input) => this.correo = input}
              value={this.props.email} 
              onChangeText={this.props.email}
              onSubmitEditing={()=> this.password.focus()}
              borderColor={'#00000000'}
            />
            <Hoshi
              style={styles.inputBox}
              label={'CONTRASEÑA'}              
              secureTextEntry={true}                
              ref={(input) => this.password = input}
              value={this.props.password} 
              onChangeText={this.props.password}
              onSubmitEditing={()=> this.confirm.focus()}
              borderColor={'#00000000'}
            />
            <Hoshi
              style={styles.inputBox}
              label={'CONFIRMACIÓN DE CONTRASEÑA'}              
              secureTextEntry={true}                
              ref={(input) => this.confirm = input}
              borderColor={'#00000000'}
            />
            
            <View style={styles.signupTextCont}>
              <TouchableOpacity><Text style={styles.signupButton}> Conoce nuestros terminos y condiciones</Text></TouchableOpacity>      
            </View>
            <Footer style={{backgroundColor:'#00000000', alignItems:'center', justifyContent:'center'}}>            
              <TouchableOpacity style={styles.button} onPress={this.props.signup}><Text style={styles.buttonText}>CREAR CUENTA</Text></TouchableOpacity>    
            </Footer>            
          </Content>     
			)
	}
}

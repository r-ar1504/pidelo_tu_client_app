import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity 
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default class Form extends Component<{}> {

	render(){
		return(
		    <View>
            <Text style={styles.signupText}>REGISTRATE</Text>
            <Hoshi
				      style={styles.inputBox}
            	label={'NOMBRE'}				      
              keyboardType="email-address"
              onSubmitEditing={()=> this.correo.focus()}
          	/>
            <Hoshi
              style={styles.inputBox}
              label={'CORREO ELECTRONICO'}              
              keyboardType="email-address"
              ref={(input) => this.password = input}
              onSubmitEditing={()=> this.password.focus()}
            />
          	<Hoshi
            	style={styles.inputBox}
				      label={'CONTRASEÑA'}				      
				      secureTextEntry={true}  				      
              ref={(input) => this.password = input}
              onSubmitEditing={()=> this.confirm.focus()}
          	/>
            <Hoshi
              style={styles.inputBox}
              label={'CONFIRMACIÓN DE CONTRASEÑA'}              
              secureTextEntry={true}                
              ref={(input) => this.confirm = input}
            />
            <View style={styles.signupTextCont}>          
              <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Conoce nuestros terminos y condiciones</Text></TouchableOpacity>      
            </View>
            
           <TouchableOpacity style={styles.button}>
             <Text style={styles.buttonText}>CREAR CUENTA</Text>
           </TouchableOpacity>     
  		</View>
			)
	}
}

const styles = StyleSheet.create({  
  signupText: {    
    alignItems:'flex-start',
    justifyContent :'center',
    marginTop:16,
    fontSize:20
  },
  inputBox: {
    width:300,        
    paddingHorizontal:13,        
    marginVertical: 10,    
  },
  button: {
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
    textAlign:'center'
  },
  signupTextCont : {    
    alignItems:'center',
    justifyContent :'center',
    paddingVertical:10,    
  },
  signupButton: {
    color:'#00ffff',
    fontSize:16,
    fontWeight:'500'
  },  
});
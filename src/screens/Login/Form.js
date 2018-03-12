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


export default class Logo extends Component<{}> {

	render(){
		return(
		<View>
            <Sae
				style={styles.inputBox}
            	label={'Correo Electrónico'}
            	iconClass={FontAwesomeIcon}
            	iconName={'user'}
            	iconColor={'white'}			
				labelStyle={{ color: 'white' }}            	
              	keyboardType="email-address"
              	onSubmitEditing={()=> this.password.focus()}
          	/>
          	<Sae
            	style={styles.inputBox}
				label={'Contraseña'}
				iconClass={FontAwesomeIcon}
            	iconName={'lock'}
				iconColor={'white'}				
				secureTextEntry={true}  
				labelStyle={{ color: 'white' }}            	
              	ref={(input) => this.password = input}
          	/>
           <TouchableOpacity style={styles.button}>
             <Text style={styles.buttonText}>INGRESAR</Text>
           </TouchableOpacity>     
  		</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',	
  },

  inputBox: {
    width:300,        
    paddingHorizontal:13,        
    marginVertical: 10
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
});
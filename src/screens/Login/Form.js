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


export default class Form extends Component {
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
});

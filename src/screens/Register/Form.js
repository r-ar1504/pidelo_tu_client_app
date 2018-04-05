import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, YellowBox } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from './RegisterStyle';


export default class Form extends React.Component {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }
  constructor(props){    
    super(props);
    
    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
  }


  render(){
    return(
        <View style={styles.container}>
            <Text style={styles.signupText}>REGISTRATE</Text>
            <Hoshi
              style={styles.input}
              label={'NOMBRE'}                            
              onSubmitEditing={()=> this.correo.focus()}
              borderColor={'#00ffff'}
            />
            {/*<Hoshi
              style={styles.inputBox}
              label={'CORREO ELECTRONICO'}                            
              keyboardType="email-address"
              ref={(input) => this.correo = input}
              onSubmitEditing={()=> this.password.focus()}
              borderColor={'#00ffff'}
            />*/}
            <Hoshi
              style={styles.input}
              label={'CONTRASEÑA'}              
              secureTextEntry={true}                
              ref={(input) => this.password = input}
              onSubmitEditing={()=> this.confirm.focus()}
              borderColor={'#00ffff'}
            />
            <Hoshi
              style={styles.input}
              label={'CONFIRMACIÓN DE CONTRASEÑA'}              
              secureTextEntry={true}                
              ref={(input) => this.confirm = input}
              borderColor={'#00ffff'}
            />            
            <View style={styles.movilTextCont}>          
              <Text> Móvil: </Text><Text style={styles.lada}>(871)</Text><Text>1453061</Text><Icon size={12} name="check" color="grey"/>      
            </View>
            
           <TouchableOpacity style={styles.button} onPress={this.confirm}>
             <Text style={styles.buttonText}>CREAR CUENTA</Text>
           </TouchableOpacity>     
      </View>
      )
  }
}

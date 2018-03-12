import React from 'react';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput, 
  TouchableOpacity
} from 'react-native';


export default class VerificationCode extends React.Component {				

  confirm(){
    Navigation.startSingleScreenApp({
      screen: {
        screen:'register.modal',
        navigatorStyle: {
          navBarHidden: true
        }        
      }

    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>INGRESA CODIGO DE VERIFICACIÓN</Text>
          <View style={styles.inputBox}> 
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft:20}}              
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft:20}}              
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft:20}}              
            />
          </View>
          
              
        <TouchableOpacity style={styles.button} onPress={this.confirm}>
            <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,    
  },
  signupText: {    
    alignItems:'flex-start',
    justifyContent :'center',
    marginTop:16,
    fontSize:16,
    marginBottom:16
  },
  button: {
    alignItems:'center',
    justifyContent :'center',    
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
  },
  inputBox: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent :'center', 
    padding:20
  },  
});

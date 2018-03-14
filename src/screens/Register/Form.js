import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  YellowBox
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default class Form extends React.Component {

  constructor(props){
    super(props);

    this.confirm = this.confirm.bind(this);
    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

  confirm(){
    this.props.navigator.push({      
        screen: 'register.location',        
        navigatorStyle: {
          navBarHidden: true,          
        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)   
    });
  }

  render(){
    return(
        <View style={styles.container}>
            <Text style={styles.signupText}>REGISTRATE</Text>
            <Hoshi
              style={styles.inputBox}
              label={'NOMBRE'}                            
              onSubmitEditing={()=> this.correo.focus()}
              borderColor={'#00ffff'}
            />
            <Hoshi
              style={styles.inputBox}
              label={'CORREO ELECTRONICO'}                            
              keyboardType="email-address"
              ref={(input) => this.correo = input}
              borderColor={'#00ffff'}
            />            
            <View style={styles.signupTextCont}>          
              <Text> Móvil: </Text><Text style={styles.lada}>(871)</Text><Text>1453061</Text>      
            </View>
            
           <TouchableOpacity style={styles.button} onPress={this.confirm}>
             <Text style={styles.buttonText}>CREAR CUENTA</Text>
           </TouchableOpacity>     
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'flex-start',  
  },
  contentContainer: {
    flexGrow: 1,
  },
  signupText: {    
    marginTop:16,
    fontSize:20,
    marginBottom:16
  },    
  inputBox: {          
    paddingHorizontal:13,        
    marginVertical: 10,  
    width:300 
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
  signupTextCont : {        
    paddingVertical:10, 
    flexDirection: 'row'   
  },
  lada: {
    color:'#00ffff'
  }  
});
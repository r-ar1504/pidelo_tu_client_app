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


export default class Form extends React.Component {

  constructor(props){
    super(props);

    this.confirm = this.confirm.bind(this);
  }

  confirm(){
    this.props.navigator.push({
        screen: 'splash.Splash',
        navigatorStyle: {
          navBarHidden: true,
        },
        passProps:{
          action:'maps'
        } // override the navigator style for the screen, see "Styling the navigator" below (optional)
    });
  }

  render(){
    return(
        <View style={styles.container}>
            <Hoshi
              style={styles.inputBox}
              label={'INGRESA TU DIRECCION'}
              onSubmitEditing={()=> this.dep.focus()}
              borderColor={'#00ffff'}
            />
            <Hoshi
              style={styles.inputBox}
              label={'DEPT/APT'}
              ref={(input) => this.dep = input}
              borderColor={'#00ffff'}
            />

           <TouchableOpacity style={styles.button} onPress={this.confirm}>
             <Text style={styles.buttonText}>CONTINUAR</Text>
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
  lada: {
    color:'#00ffff'
  }
});

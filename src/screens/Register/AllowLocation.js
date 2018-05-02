import React, { Component } from 'react';
import { Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import ValidationComponent from 'react-native-form-validator';
import styles from './RegisterStyle';


export default class Form extends ValidationComponent {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }
   
  constructor(props){
    super(props);  

    this.state = { address: '', dept: ''}  
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);  
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  confirm(){
    this.validate({ address: {required: true}, dept: {required: true} });
    if(this.isFormValid()){
      this.props.navigation.navigate('Maps', { address: this.state.address });
    }
    else {
      alert(this.getErrorMessages());
    }
  }

  render(){
    return(
        <View style={styles.container}>
            <Hoshi
              style={styles.input}
              label={'INGRESA TU DIRECCION'}
              onSubmitEditing={()=> this.dep.focus()}
              borderColor={'#00000000'}
              ref="dirección"
              value={this.state.address} 
              onChangeText={(address) => {this.setState({address})}}
            />
            <Hoshi
              style={styles.input}
              label={'DEPT/APT'}
              ref={(input) => this.dep = input}
              borderColor={'#00000000'}
              value={this.state.dept} 
              onChangeText={(dept) => {this.setState({dept})}}
            />

           <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this)}>
             <Text style={styles.buttonText}>CONTINUAR</Text>
           </TouchableOpacity>
      </View>
      )
  }
}


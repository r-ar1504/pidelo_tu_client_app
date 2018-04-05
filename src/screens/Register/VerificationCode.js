import React from 'react';
import {  Text, View, StatusBar, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import {  Input, Item } from 'native-base';
import styles from './RegisterStyle';


export default class VerificationCode extends React.Component {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

  constructor(props){
    super(props);
    
    this.state = { codeInput1: '', codeInput2: '', codeInput3: '', loading: false }
  }

  confirm(confirmResult){
    this.setState({ loading: true });
    const codeInput = this.state.codeInput1+this.state.codeInput2+this.state.codeInput3;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ loading: false });
          this.props.navigation.navigate('Modal',{
          text:'Tu código ha sido exitoso',
          button:'Finalizar',
          action: 'Form'});
        })
        .catch((error) => { 
          this.setState({ loading: false });
          alert('Code Confirm Error:'+error);
        });
    }    
  }

  render() {
    const { params } = this.props.navigation.state;
    const confirmResult = params ? params.confirmResult : null;

    if(this.state.loading) {
        return(    
          <View style={styles.body}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }     

    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>INGRESA CODIGO DE VERIFICACIÓN</Text>
          <View style={styles.inputBox}>
            <Item regular style={{borderColor: 'gray', borderWidth: 1, width:40,  height:40, marginLeft: 20 }}>
              <Input                
                keyboardType="phone-pad" value={this.state.codeInput1} onChangeText={codeInput1 => this.setState({codeInput1})}
              />
            </Item>
            <Item regular style={{borderColor: 'gray', borderWidth: 1, width: 40, height:40,  marginLeft: 20 }}>
              <Input
                keyboardType="phone-pad" value={this.state.codeInput2} onChangeText={codeInput2 => this.setState({codeInput2})}
              />
            </Item>
            <Item regular style={{borderColor: 'gray', borderWidth: 1, width: 40, height:40,  marginLeft: 20 }}>
              <Input              
                keyboardType="phone-pad" value={this.state.codeInput3} onChangeText={codeInput3 => this.setState({codeInput3})}
              />
            </Item>
          </View>


        <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this, confirmResult)}>
            <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


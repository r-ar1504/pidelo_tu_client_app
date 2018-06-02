import React from 'react';
import { Text, View, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import { Item } from 'native-base';
import styles from './RegisterStyle';
import firebase from 'react-native-firebase'; 

export default class VerificationCode extends React.Component {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

  constructor(props){
    super(props);
    
    this.confirm = this.confirm.bind(this);
    this.state = { codeInput1: '', codeInput2: '', codeInput3: '' }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    return true;
  };

  confirm(){
    const codeInput  = this.state.codeInput1+this.state.codeInput2+this.state.codeInput3;
    this.props.validCode(codeInput);
  }

  render() {  
    return (
      <View style={styles.verficationContainer}>
        <Text style={styles.signupText}>INGRESA CODIGO DE VERIFICACIÓN</Text>
          <View style={styles.inputBox}>
            <Item regular style={{borderColor: 'gray', borderWidth: 1, width:35,  height:40, marginLeft: 20, alignSelf:'center' }}>
              <TextInput style={{alignSelf:'center', fontSize: 20}}               
                keyboardType="phone-pad" value={this.state.codeInput1} onChangeText={(codeInput1) => {if(codeInput1.length == 2) {this.secondInput.focus() } this.setState({codeInput1})}} maxLength={2}
              />
            </Item>
            <Item regular style={{borderColor: 'gray', borderWidth: 1, width: 35, height:40,  marginLeft: 20, alignSelf:'center'}}>
              <TextInput style={{alignSelf:'center', fontSize: 20}} ref={(input) => this.secondInput = input}
                keyboardType="phone-pad" value={this.state.codeInput2} onChangeText={(codeInput2) => {if(codeInput2.length == 2) {this.thirdInput.focus() } this.setState({codeInput2})}} maxLength={2}
              />
            </Item>
            <Item regular style={{borderColor: 'gray', borderWidth: 1, width: 35, height:40,  marginLeft: 20, alignSelf:'center' }}>
              <TextInput style={{alignSelf:'center', fontSize: 20}} ref={(input) => this.thirdInput = input}           
                keyboardType="phone-pad" value={this.state.codeInput3} onChangeText={codeInput3 => this.setState({codeInput3})} maxLength={2}
              />
            </Item>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.confirm}>
            <Text style={styles.buttonText}>CONTINUAR</Text>
          </TouchableOpacity>
      </View>
    );
  }
}


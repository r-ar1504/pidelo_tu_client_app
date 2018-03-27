import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';


export default class VerificationCode extends React.Component {

  constructor(props){
    super(props);

    this.confirm = this.confirm.bind(this);
  }

  confirm(){
    this.props.navigator.push({
        screen: 'register.modal',
        passProps:{
          text:'Tu código ha sido exitoso',
          button:'Finalizar',
          action: 'Form'
        },
        navigatorStyle: {
          navBarHidden: true,
        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>INGRESA CODIGO DE VERIFICACIÓN</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft:20}}
              keyboardType="phone-pad"
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft:20}}
              keyboardType="phone-pad"
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft:20}}
              keyboardType="phone-pad"
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
    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'flex-start',
    flexDirection: 'column',
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

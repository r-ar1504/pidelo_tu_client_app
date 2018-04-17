import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, YellowBox, BackHandler} from 'react-native';

export default class Modal extends Component {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

  constructor(props) {
    super(props);    
    
    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',     
    ]);
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

  confirm(action, phoneAuthSnapshot, phoneNumber, credential){
    
    switch(action){
      case 'Verification': {
        this.props.navigation.navigate('VerificationCode', { phoneAuthSnapshot: phoneAuthSnapshot, phoneNumber: phoneNumber });
      } break;
      case 'Form': {
          this.props.navigation.navigate('RegisterForm', { phoneNumber: phoneNumber, credential: credential});
      } break;
      case 'Payment': {
        this.props.navigation.navigate('Payment');
      } break;      
    }        
  }  

	render(){    
    const { params } = this.props.navigation.state;
    const text = params ? params.text : null;
    const button = params ? params.button : null;
    const action = params ? params.action : null;
    const phoneAuthSnapshot = params ? params.phoneAuthSnapshot : null;
    const phoneNumber = params ? params.phoneNumber : null;
    const credential = params ? params.credential : null;

		return(
		  <View style={styles.container}>
        <Image source={require('src/assets/images/gb-trans.png')} style={styles.image}/>
        <Image source={require('src/assets/images/check.png')} style={styles.check}/>
        <Text style={styles.info}>{text}</Text>
        <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this, action, phoneAuthSnapshot, phoneNumber, credential)}>
            <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>                
  		</View>
		)
	}
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent :'center'
  },
  image:{
    flex:1,
    resizeMode:'cover',
    position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
  },
  check: {
    alignItems: 'flex-start',
    justifyContent:'center',
    resizeMode:'center',
  },
   info: {    
    fontSize:16,
    color:'white',
    padding:20,   
  },
  button: {
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
    textAlign:'center'
  },
});

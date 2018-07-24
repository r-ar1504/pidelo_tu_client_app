import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, YellowBox, BackHandler} from 'react-native';
import firebase from 'react-native-firebase';
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

  confirm(action, phoneAuthSnapshot, phoneNumber, credential, screen){
    
    switch(action){
      case 'Verification': {
        this.props.navigation.navigate('VerificationCode', { phoneAuthSnapshot: phoneAuthSnapshot, phoneNumber: phoneNumber });
      } break;
      case 'Form': {
          this.props.navigation.navigate('RegisterForm', { phoneNumber: phoneNumber, credential: credential});
      } break;
      case 'Payment': {
        this.props.navigation.navigate(screen, {user: firebase.auth().currentUser});
      } break;      
    }        
  }  

	render(){    
    const { params } = this.props.navigation.state;
    const text = params ? params.text : null;
    const button = params ? params.button : null;
    const action = params ? params.action : null;
    const screen = params ? params.screen : null;
    const phoneAuthSnapshot = params ? params.phoneAuthSnapshot : null;
    const phoneNumber = params ? params.phoneNumber : null;
    const credential = params ? params.credential : null;

		return(
		  <View style={styles.container}>
        <Image source={require('src/assets/images/gb-trans.png')} style={styles.image}/>
        <View style={styles.circle}>
          <Image source={require('src/assets/images/check.png')} style={styles.check}/>
        </View>
        <Text style={styles.info}>{text}</Text>
        <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this, action, phoneAuthSnapshot, phoneNumber, credential, screen)}>
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
    height: 80,
    width: 80
  },
   info: {    
    fontSize:16,
    color:'white',
    padding:20, 
    fontFamily: 'Lato-Light'  
  },
  button: {
    width:300,
    backgroundColor:'#11c0f6',           
    paddingVertical: 13,
    marginTop: 20,    
    borderRadius:20,          
  },
  buttonText: {
    fontSize:16,
    color:'#ffffff',
    textAlign:'center',
    fontFamily: 'Lato-Light'
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#11c0f6',
    backgroundColor: 'rgba(17,191,245,.9)'
  }
});

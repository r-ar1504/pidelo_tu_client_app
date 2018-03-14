import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity ,
  Image
} from 'react-native';



export default class Modal extends Component {

  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this);
  }

  confirm(){
    if (this.props.action == 'Verification'){
          this.props.navigator.push({      
            screen: 'register.verification',
            navigatorStyle: {
            navBarHidden: true
          },          
          animationType: 'slide-horizontal',      
        });
    }
    else {
          this.props.navigator.push({      
            screen: 'register.form',
            navigatorStyle: {
              navBarHidden: true
            },            
            animationType: 'slide-horizontal',      
        });
    }
  }  

	render(){
		return(
		  <View style={styles.container}>
        <Image source={require('src/assets/images/gb-trans.png')} style={styles.image}/>
        <Image source={require('src/assets/images/check.png')} style={styles.check}/>
        <Text style={styles.info}>{this.props.text}</Text>
        <TouchableOpacity style={styles.button} onPress={this.confirm}>
            <Text style={styles.buttonText}>{this.props.button}</Text>
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

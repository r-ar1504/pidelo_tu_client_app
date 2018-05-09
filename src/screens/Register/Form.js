import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, Image, TouchableOpacity, YellowBox, ActivityIndicator, Alert, BackHandler, AsyncStorage } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import styles from './RegisterStyle';
import firebase from 'react-native-firebase'; 


export default class Form extends React.Component {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }
  constructor(props){    
    super(props);

    this.state = {name: '', email: '', password: '', loading: false, user: null, phoneNumber: '' }
    
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

  confirm(credential, phoneNumber){
    this.setState({ loading: true, phoneNumber: phoneNumber }); 
    /* SignIn with phone credential, then link with 
    email credential and finally save data to local storage and server */    
    firebase.auth().signInWithCredential(credential)
      .then((user) => {
        user.updateProfile({ displayName: this.state.name });
        this.setState({ user });         
        const emailCredential = firebase.auth.EmailAuthProvider.credential(this.state.email, this.state.password);
         if (user) {              
              user.linkWithCredential(emailCredential);
              this.saveData();
              this.sendData().then((response) => { this.setState({loading: false})});                                                       
          }
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert(error);
      });   
      /********/
  }

  saveData(){
      try {
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const firebaseId = this.state.user.uid;

        let user = {
          name: name,
          email: email.toLowerCase(),
          password: password.toString()
        }
                
        AsyncStorage.setItem(firebaseId,JSON.stringify(user));
      } catch (error) {
        alert(error);
      }
  }

  sendData(){
    return fetch('http://pidelotu.azurewebsites.net/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firebaseId: this.state.user.uid,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phoneNumber
      })
    }).then(response => response.json())
      .then(json => {
        return json;    
    }).catch((error) => {
      return error;
    });
  }


  render(){
    const { params } = this.props.navigation.state;
    const phoneNumber = params ? params.phoneNumber : null;
    const credential = params ? params.credential : null;

    if(this.state.loading) {
        return(    
          <View style={styles.body}>
            <Image source={require('src/assets/images/bg.png')} style={styles.image} />
            <ActivityIndicator size={50} color="white"/>
          </View>
        )
      }  

    return(
        <View style={styles.container}>
            <Text style={styles.signupText}>REGISTRATE</Text>
            <Hoshi
              style={styles.input}
              label={'NOMBRE'}
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}                            
              onSubmitEditing={()=> this.correo.focus()}
              borderColor={'#00000000'}
            />
            <Hoshi
              style={styles.input}
              label={'CORREO ELECTRONICO'}                            
              keyboardType="email-address"
              ref={(input) => this.correo = input}
              onSubmitEditing={()=> this.password.focus()}
              borderColor={'#00000000'}
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
            />
            <Hoshi
              style={styles.input}
              label={'CONTRASEÑA'}              
              secureTextEntry={true}                
              ref={(input) => this.password = input}
              onSubmitEditing={()=> this.confirm.focus()}
              borderColor={'#00000000'}
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
            />
            {/*
            <Hoshi
              style={styles.input}
              label={'CONFIRMACIÓN DE CONTRASEÑA'}              
              secureTextEntry={true}                
              ref={(input) => this.confirm = input}
              borderColor={'#00ffff'}
            />*/}            
            <View style={styles.movilTextCont}>          
              <Text> Móvil: </Text><Text style={styles.lada}>{phoneNumber}</Text><Text></Text><Icon size={12} name="check" color="grey"/>      
            </View>
            
           <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this, credential, phoneNumber)}>
             <Text style={styles.buttonText}>CREAR CUENTA</Text>
           </TouchableOpacity>     
      </View>
      )
  }
}

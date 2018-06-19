import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, Image, TouchableOpacity, YellowBox, Alert, BackHandler, } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import styles from './RegisterStyle';
import firebase from 'react-native-firebase'; 
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

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
    firebase.auth().signInWithCredential(credential)
      .then((user) => {
        user.updateProfile({ displayName: this.state.name });
        let data = { firebaseId: user.uid, name: this.state.name, email: this.state.email.toLowerCase(), password: this.state.password, phone:phoneNumber }                
        const emailCredential = firebase.auth.EmailAuthProvider.credential(this.state.email, this.state.password);
         if (user) {              
            user.linkWithCredential(emailCredential);              
            this.sendData(data).then((response) => { this.setState({loading: false})}).catch((error)=> {
              Alert.alert("Pídelo Tú",error.messages);
            });                                                       
          }
      })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert("Pídelo Tú",error.messages);
      });         
  }

  async sendData(data){
    return await fetch('http:/pidelotu.azurewebsites.net/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(json => {
        return json;    
    }).catch(error => {
      throw new Error(error.messages);
    });
  }


  render(){
    const { loading } = this.state;
    const { params } = this.props.navigation.state;
    const phoneNumber = params ? params.phoneNumber : null;
    const credential = params ? params.credential : null;

    if(loading) {
        return <LoadingScreen/>
      }  

    return(
        <View style={styles.verficationContainer}>
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
              //onSubmitEditing={()=> this.confirm.focus()}
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

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { BackHandler, AsyncStorage, ActivityIndicator, YellowBox, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Container, Header, Icon, Left, Body, Right } from 'native-base';
import firebase from 'react-native-firebase';

import Logo from 'src/components/Logo';
import Form from './Form';
import styles from './SignupStyle';

const messages = {
    en: {
      numbers: "Ingresa un número valido.",
      email: "Ingresa una dirección de correo valida.",
      required: "El campo es requerido.",
      minlength: "La longitud del campo debe ser más grande"
    },    
  };

export default class Signup extends React.Component {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

  constructor(props){
    super(props);
    this.signup = this.signup.bind(this);
    this.state = { loading: false };  

    YellowBox.ignoreWarnings([     
     'Warning: Failed prop type'
    ]);     
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

  signup(name,email,password){
    this.setState({ loading: true });         
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {               
      user.updateProfile({ displayName: name });           
      let data = { firebaseId: user.uid, name: name, email: email.toLowerCase(), password: password }         
      this.saveData(user.uid,data);                  
      this.sendData(data).then((response) => {                           
          this.setState({loading: false})
        }); 
    })
    .catch(error => {
      this.setState({ loading: false })
        alert(error)
    });
  }

  sendData(data){
    return fetch('http://pidelotu.azurewebsites.net/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(json => {
        return json;    
    }).catch((error) => {
      alert(error);
      return error;
    });
  }

  async saveData(key,data){    
      try {                                
        await AsyncStorage.setItem(key,JSON.stringify(data));
      } catch (error) {
        alert(error.message);
      }
  }

	render() {
    if(this.state.loading) {
        return(    
         <ImageBackground source={require('src/assets/images/bg.png')} style={styles.body}>
            <ActivityIndicator size={50} color="#11c0f6" animating={true}/>
          </ImageBackground>
        )
      }  
		return(                  
        <Container style={styles.container}> 
          <Header backgroundColor={'#fff'} style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'transparent', elevation: 0, width: '100%'}}>
            <Left style={{ flex: 1 }} >
              <TouchableWithoutFeedback onPress={() => {this.props.navigation.goBack()}}>
                <Icon name='arrow-back' />
              </TouchableWithoutFeedback>
            </Left>
            <TouchableWithoutFeedback>
            <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
              
            </Body>
            </TouchableWithoutFeedback>
            <Right style={{ flex: 1 }}>
              
            </Right>
          </Header>                     
          <Form signup={this.signup} messages={messages}/>       
        </Container>                                         
		)
	}
}


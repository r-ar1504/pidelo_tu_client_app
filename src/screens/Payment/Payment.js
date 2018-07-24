import React, { Component } from 'react';
import { View, BackHandler, ImageBackground, Alert, TouchableOpacity, Text } from 'react-native';
import { Header, Left, Body, Right, Icon } from "native-base";
import firebase from "react-native-firebase";
import styles from './PaymentStyle';
import Form from './Form';
import { NavigationActions } from "react-navigation";
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default class Payment extends Component {

  constructor(props){
    super(props);

    this.state = { user:firebase.auth().currentUser }   
    
    
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate(params.screen);
  };  

  confirm(card) {
    const { params } = this.props.navigation.state;
    this.store(card).then(response => {
      if (response.message === 'success') {
        this.setState({loading:false});
        this.props.navigation.navigate(params.screen);
      }  
    }).catch((error) => { Alert.alert("PídeloTú", error.message) });
  }

  async store(card) {
    this.setState({loading:true});
    return await fetch('http://pidelotu.azurewebsites.net/payment', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({        
        user_id:this.state.user.uid,
        card_number:card,        
      })
    }).then(response => response.json()).then(response => {            
      return response;      
    }).catch(error => {
      this.setState({loading:false});
      throw new Error(error.message);
    })
  }

   render() { 
    const { params } = this.props.navigation.state;

    if(this.state.loading) {
    return <LoadingScreen/>      
    }     
		return(      
			<View style={styles.container}>
        <ImageBackground source={require('src/assets/images/background.png')} style={styles.background}>
        <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
          <Left>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate(params.screen) }}>
                  <Icon name="arrow-back" style={{color:'white', fontSize: 25}} />                  
              </TouchableOpacity>
          </Left>
          <Body>              
          </Body>
          <Right>
                        
          </Right>
        </Header>
				  <Form confirm={this.confirm.bind(this)}/>
        </ImageBackground>
			</View>      
		)
	}
 }

import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, BackHandler, Alert, ActivityIndicator, Image, YellowBox, ImageBackground } from 'react-native';

import Logo from '../../components/Logo';
import Form from './Form';
import Video from 'react-native-video';
import { Container } from 'native-base';
import styles from './LoginStyle';
import firebase from 'react-native-firebase';

 export default class Login extends React.Component {
   static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }
   /*
   * Contructor , if a function other than render needs to use props it needs to be binded here.
   * example: this.signup = this.signup.bind(this); now signup can use props.navigator.
   */
  constructor(props){
    super(props);
    this.signup = this.signup.bind(this);
    this.register = this.register.bind(this);
    this.signIn = this.signIn.bind(this);
    this.state = { email: "", password: "", loading:false, user: null }; 

    YellowBox.ignoreWarnings([
     'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader',         
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
  /*
  * SignIn Function.
  * If user is valid, then initialize Home Screen.
  */
  signIn(email,password){
    this.setState({ loading: true });    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ loading: false });         
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert(error);
    });

  }

  signup(){
    this.props.navigation.navigate('Signup')
  }

  register(){
    this.props.navigation.navigate('Register')
  }
    
  render() {    
    if(this.state.loading) {
        return(              
            <ImageBackground source={require('src/assets/images/bg.png')} style={styles.body}>
              <ActivityIndicator size={50} color="#11c0f6"/>
            </ImageBackground>          
        )
      }    
		return(      			  
      <View style={styles.container}>        
        <Video source={require('src/video/video.mp4')} rate={1.0} resizeMode={"cover"} muted={true} repeat style={styles.video}/>
        <Logo/>                                           
        <Container>          
          <Form signIn={this.signIn} register={this.register} signup={this.signup} deviceLocale="es"/>       
        </Container>                                   
      </View>    
		)
	}
 }

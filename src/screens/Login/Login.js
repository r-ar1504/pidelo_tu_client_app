import React from 'react';
import { View, BackHandler, YellowBox, Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import Logo from '../../components/Logo';
import Form from './Form';
import Video from 'react-native-video';
import { Container } from 'native-base';
import styles from './LoginStyle';
import firebase from 'react-native-firebase';
import Splash from '../Splash/Splash';

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
    this.fblogin = this.fblogin.bind(this);
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
  async fblogin(){
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        Alert.alert('Pídelo Tú', 'Acción cancelada por el usuario', [ {text: 'Entendido', onPress: () => console.log("Cerrar")} ], { cancelable: false })     
      }
      else {        
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          Alert.alert('Pídelo Tú', 'Hubo un error al tratar de obtener tus datos', [ {text: 'Entendido', onPress: () => console.log("Cerrar")} ], { cancelable: false })     
        }
        else {          
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          
          this.props.navigation.navigate('Register',{ fbcredential:credential })
        }
      }
    }
    catch (e) {
      Alert.alert('Pídelo Tú', e.message, [ {text: 'Entendido', onPress: () => console.log("Cerrar")} ], { cancelable: false })     
    }    
  }  

  signup(){
    this.props.navigation.navigate('Signup')
  }

  register(){
    this.props.navigation.navigate('Register')
  }
    
  render() {    
    if(this.state.loading) {
      return <Splash/>
    }    
		return(      			  
      <View style={styles.container}>        
        <Video source={require('src/video/video.mp4')} rate={1.0} resizeMode={"cover"} muted={true} repeat style={styles.video}/>
        <Logo/>                                           
        <Container>          
          <Form signIn={this.signIn} register={this.register} signup={this.signup} fblogin={this.fblogin} deviceLocale="es"/>       
        </Container>                                   
      </View>    
		)
	}
 }

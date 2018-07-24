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
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

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
  async signIn(email,password){
    this.setState({ loading: true });        
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ loading: false });         
      })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert("PídeloTú",error.message);
    });
  }
  async fblogin(){
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        Alert.alert('PídeloTú', 'Acción cancelada por el usuario', [ {text: 'Entendido', onPress: () => console.log("Cerrar")} ], { cancelable: false })     
      }
      else {        
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          Alert.alert('PídeloTú', 'Hubo un error al tratar de obtener tus datos', [ {text: 'Entendido', onPress: () => console.log("Cerrar")} ], { cancelable: false })     
        }
        else {          
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          
          this.initUser(credential.token).then(response => {
            this.checkEmail(response.email.toLowerCase()).then(async (res) => {
              if (res.count == 0) {
                this.props.navigation.navigate('Register',{ fbcredential:credential })
              }
              else {
                await firebase.auth().signInWithCredential(credential)
              }
            }).catch((err) => {
              Alert.alert("PídeloTú",err.message)
            })
          })          
        }
      }
    }
    catch (e) {
      Alert.alert('PídeloTú', e.message, [ {text: 'Entendido', onPress: () => console.log("Cerrar")} ], { cancelable: false })     
    }    
  }
  
  async initUser(token) {
    return await fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
    .then((response) => { return response.json() })
    .then((json) => {      
      return json;      
    })
    .catch(error => {
      throw new Error(error.message)
    })
  }

  async checkEmail(email){
    const url = 'http://pidelotu.azurewebsites.net/checkEmail/'+email
    return await fetch(url)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      throw new Error(err.message)
    })
  }

  register(){
    this.props.navigation.navigate('Register')
  }
    
  render() {    
    let { loading } = this.state;
    if(loading) {
      return <LoadingScreen/>
    }    
		return(      			  
      <View style={styles.container}>        
        <Video source={require('src/video/video.mp4')} rate={1.0} resizeMode={"cover"} muted={true} repeat style={styles.video}/>
        <Logo/>                                           
        <Container>          
          <Form signIn={this.signIn} register={this.register}  fblogin={this.fblogin}/>       
        </Container>                                   
      </View>    
		)
	}
 }

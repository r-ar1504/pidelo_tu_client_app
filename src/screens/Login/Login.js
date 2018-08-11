import React from 'react';
import { View, BackHandler, YellowBox, Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Container } from 'native-base';
import Logo from '../../components/Logo';
import Form from './Form';
import Video from 'react-native-video';
import styles from './LoginStyle';
import firebase from 'react-native-firebase';
import UserService from "../../services/user-service/user-services";
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { URL} from "../../config/env";
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

  async initUser(token) {
    return await fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
    .then((response) => { return response.json() })    
    .catch(error => {
      throw new Error(error.message)
    })
  }

  async checkEmail(email){    
    return await fetch(`${URL}/checkEmail/${email}`)
    .then(res => { return res.json() })    
    .catch(err => {
      throw new Error(err.message)
    })
  }

  fblogin = async () =>{
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        Alert.alert("PídeloTú", "Acción cancelada por el usuario", [ {text: 'Entendido', onPress: () => console.log("Cerrar")} ], { cancelable: false })     
      }
      else {        
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          Alert.alert("Facebook", "Hubo un error al tratar de obtener tus datos", [ {text: 'Entendido', onPress: () => console.log("Cerrar")} ], { cancelable: false })     
        }
        else {          
        	this.setState({loading:true})
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);                    
          this.initUser(credential.token).then(response => {
          	// Alert.alert(JSON.stringify(response))
            this.checkEmail(response.email.toLowerCase()).then(async (res) => {              
              if (res.count == 0) {
                // this.setState({loading:false})
                this.props.navigation.navigate('Register',{ fbcredential:credential })
              }
              else {
                // this.setState({loading:false})
                await firebase.auth().signInWithCredential(credential)
              }
            }).catch((err) => {
              Alert.alert("Error",err.message)
              this.setState({loading:false})
            })
          }).catch(error => {
            Alert.alert("Facebook",error.message)
            this.setState({loading:false})
          })          
        }
      }
    }
    catch (e) {
      Alert.alert('PídeloTú', e.message, [ {text: 'Entendido', onPress: () => console.log("Cerrar")} ], { cancelable: false })     
    }    
  }
  
  register(){
    this.props.navigation.navigate('Register')
  }
    
  render() {    
    let { loading } = this.state;        
		return(      			  
      <View style={styles.container}>        
        <Video source={require('src/video/video.mp4')} rate={1.0} resizeMode={"cover"} muted={true} repeat style={styles.video}/>
        <Logo/>                                           
        { loading ? <LoadingScreen/> : <Container>          
          <Form signIn={this.signIn} register={this.register}  fblogin={this.fblogin}/> 
        </Container>                                   
        }
      </View>    
		)
	}
 }

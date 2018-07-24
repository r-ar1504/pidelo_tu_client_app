import React from 'react';
import { Text, View, TouchableOpacity, Alert, Image, TouchableWithoutFeedback, ImageBackground, Modal, BackHandler } from 'react-native';
import { Container, Content, Footer, Input, Item, Header, Body, Right, Left, Icon  } from 'native-base';
import VerificationCode from "./VerificationCode";
import PhoneInput from 'react-native-phone-input';
import ValidationComponent from 'react-native-form-validator';

import firebase from 'react-native-firebase';
import styles from './RegisterStyle';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default class Register extends ValidationComponent {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

  constructor(props) {
    super(props);
            
    this.state = { phoneAuthSnapshot: null, phoneNumber: '', loading: false, showModal: false, verificationCode: false };    
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

  async validCode(codeInput){    
    if (codeInput.length < 6){
      Alert.alert("PídeloTú","Escribe un código válido");
    }
    else {      
      this.setState({ loading: true });
      const { verificationId } = this.state.phoneAuthSnapshot; 
      const { params } = this.props.navigation.state;
      const fbcredential  = params ? params.fbcredential : null;
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeInput) 
      let { phoneNumber } = this.state;                
      this.checkNumber(phoneNumber).then(async (response) => {            
        if (response.length == 0) {  
          if (fbcredential) {                  
            await firebase.auth().signInWithCredential(fbcredential).then(user => {
              user.linkWithCredential(credential);
              this.initUser(fbcredential.token).then((response) => {
                let data = { firebaseId: user.uid, name: response.name, email: response.email.toLowerCase(), password: Math.random().toString(36).slice(2), phone:phoneNumber } 
                this.sendData(data).then((response) => { this.setState({loading: false})}).catch((error)=> {
                  this.setState({loading: false})
                  Alert.alert("PídeloTú",error.message);
                }).catch((error) => {
                  this.setState({loading: false})
                  Alert.alert("PídeloTú",error.message);
                }); 
              });
            });
          }                     
          else {
            this.props.navigation.navigate('RegisterForm',{ credential: credential, phoneNumber: phoneNumber });
          }          
        }
        else {                    
          await firebase.auth().signInWithCredential(credential)
        }
      }).catch((error) => {
        this.setState({ loading: false });
        Alert.alert("PídeloTú",error.message);
      });                       
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
      throw new Error(error.message);
    });
  }
   
  async confirm(){    
    this.validate({ phoneNumber: {required: true} });
    const { params } = this.props.navigation.state;
    const fbcredential  = params ? params.fbcredential : null;
    const phoneNumber = this.phone.getCountryCode()+this.state.phoneNumber;
    
    if(this.isFormValid()){
      this.setState({ loading: true });           
      await firebase.auth().verifyPhoneNumber(phoneNumber)
        .on('state_changed', async (phoneAuthSnapshot) => {    
          switch (phoneAuthSnapshot.state) {
              // ------------------------
              //  IOS AND ANDROID EVENTS
              // ------------------------
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'                
              this.setState({ loading: false, phoneAuthSnapshot: phoneAuthSnapshot, phoneNumber: phoneNumber, showModal: true});
            break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'                                          
              this.setState({ loading: false });                                
            break;
              // ---------------------
              // ANDROID ONLY EVENTS
              // ---------------------
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'  
                                                            
            break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              this.setState({loading:true});                  
              let { verificationId, code } = phoneAuthSnapshot;
              let credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);                                              
              this.checkNumber(phoneNumber).then(async (response) => {    
                this.setState({verificationCode: false});        
                if (response.length == 0) {     
                  if (fbcredential) {                  
                    await firebase.auth().signInWithCredential(fbcredential).then(user => {
                      user.linkWithCredential(credential);
                      this.initUser(fbcredential.token).then((response) => {
                        let data = { firebaseId: user.uid, name: response.name, email: response.email.toLowerCase(), password: Math.random().toString(36).slice(2), phone:phoneNumber } 
                        this.sendData(data).then((response) => { this.setState({loading: false})}).catch((error)=> {
                          this.setState({loading: false})
                          Alert.alert("Pídelo Tú",error.message);
                        }).catch((error) => {
                          this.setState({loading: false})
                          Alert.alert("Pídelo Tú",error.message);
                        }); 
                      });
                    });
                  }
                  else {  
                    this.setState({loading: false})      
                    this.props.navigation.navigate('RegisterForm',{ credential: credential, phoneNumber: phoneNumber });
                  }
                }
                else {          
                  if (fbcredential) {                  
                    await firebase.auth().signInWithCredential(fbcredential).then(user => {
                      user.linkWithCredential(credential);
                    });
                  }
                  await firebase.auth().signInWithCredential(credential)
                }
              }).catch((error) => {
                this.setState({ loading: false, verificationCode: false });
                Alert.alert("Pídelo Tú","Hubo un error, por favor inténtalo más tarde");
              });                                                                          
            break;
          }
        }, (error) => {          
          Alert.alert("PídeloTú",error.message);                  
        }, (phoneAuthSnapshot) => {
            
        });                        
    }
    else {
      Alert.alert("PídeloTú","Ops, Tienes campos vacíos");
    }           
  }

  async checkNumber(phoneNumber){
    const url = 'http://pidelotu.azurewebsites.net/checkNumber/'+phoneNumber;
    return await fetch(url)      
      .then(response => { return response.json() })
      .catch(error => {
        throw new Error(error.message);
      });     
  }

  render() {
    const { loading, showModal, verificationCode, phoneNumber } = this.state;
    if(loading) {
        return <LoadingScreen/>
      }
    if (showModal) {
      return (     
        <Modal animationType="slide" transparent={true} style={styles.container} visible={showModal} onRequestClose={() => {console.log('close modal')}}>
          <ImageBackground source={require('src/assets/images/gb-trans.png')} style={styles.body}>
            <View style={styles.circle}>
              <Image source={require('src/assets/images/check.png')} style={styles.check}/>
            </View>
            <Text style={styles.text}>Se ha enviado un código de verificación vía SMS a tu móvil</Text>
            <TouchableOpacity style={styles.button} onPress={() => {this.setState({showModal: false,  verificationCode:true})}}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>     
          </ImageBackground>
        </Modal>      
      )
    }
    if (verificationCode) {
      return <VerificationCode validCode={this.validCode.bind(this)} goBack={()=>{this.setState({verificationCode:false})}}/>      
    } 
    return (
      <Container style={styles.container}>
        <Header backgroundColor={'#fff'} style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'transparent', elevation: 0, width: '100%'}}>
            <TouchableWithoutFeedback onPress={() => {this.props.navigation.goBack()}}>
              <Left style={{ flex: 1 }} >                
                <Icon name='arrow-back' />                
              </Left>        
            </TouchableWithoutFeedback>
              <Body style={{ flex: 1 }}>
              
              </Body>              
              <Right style={{ flex: 1 }}>
                
              </Right>
            </Header>
        <Content>
          <Text style={styles.signupText}>INGRESA TU MÓVIL</Text>
          <View style={styles.inputBox}>
            <PhoneInput ref={(ref) => { this.phone = ref; }} 
              initialCountry='mx'
              pickerItemStyle={{fontSize:18, height:30}}
              textProps={{borderWidth:0.7, borderColor:'black', editable:false}}
              textStyle={{fontSize:18, height:30, textAlign:'center'}}
              style={{marginTop:16,marginBottom:16, width:100}}
              diabled={true}
              cancelText="Cancelar"
              confirmText="Confirmar"            
            />
            <Item regular style={{flex:1, borderColor: 'black', borderWidth: 0.7, width:300, height:30 }}>
              <Input keyboardType="phone-pad" ref="number" value={this.state.phoneNumber} onChangeText={(phoneNumber) => {this.setState({phoneNumber})}} maxLength={10}/>
            </Item>
          </View>                    
        </Content>
        <Footer style={{backgroundColor:'#00000000', alignItems:'center', justifyContent:'center', marginBottom: 16}}>
          <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this)}><Text style={styles.buttonText}>CONTINUAR</Text></TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

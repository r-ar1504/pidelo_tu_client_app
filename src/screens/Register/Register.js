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
        
    this.validCode = this.validCode.bind(this);
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

  validCode(codeInput){    
    if (codeInput.length < 6){
      Alert.alert("Pídelo Tú","Escribe un código válido");
    }
    else {      
      this.setState({ loading: true });
      const { verificationId, code } = this.state.phoneAuthSnapshot;          
      //if (code == codeInput){
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeInput);          
          this.setState({ loading: false });
          this.props.navigation.navigate('Modal',{
            text:'Tu código ha sido exitoso',
            button:'Finalizar',
            action: 'Form',
            credential: credential,
            phoneNumber: this.state.phoneNumber
        });
      //}
      //else {
        //this.setState({ loading: false });
        //alert("El código no coincide, por favor intente de nuevo");
      //}                
    }       
  }
   
  confirm(){    
    this.validate({ phoneNumber: {required: true} });

    const phoneNumber = this.phone.getCountryCode()+this.state.phoneNumber;

    if(this.isFormValid()){
      this.setState({ loading: true }); 
      this.checkNumber(phoneNumber).then((response) => {            
        if (response.length == 0) {             
            firebase.auth().languageCode = 'es-419';             
            firebase.auth().verifyPhoneNumber(phoneNumber)
            .on('state_changed', (phoneAuthSnapshot) => {    
            switch (phoneAuthSnapshot.state) {
              // ------------------------
              //  IOS AND ANDROID EVENTS
              // ------------------------
              case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'                
                this.setState({ loading: false, phoneAuthSnapshot: phoneAuthSnapshot, phoneNumber: phoneNumber, showModal: true});
              break;
              case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                this.setState({ loading: false });                                
                Alert.alert("Pídelo Tú",phoneAuthSnapshot.error.toString());                
              break;
              // ---------------------
              // ANDROID ONLY EVENTS
              // ---------------------
              case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                this.setState({verificationCode: true, loading:false});
              break;
              case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'  
                const { verificationId, code } = phoneAuthSnapshot;
                const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
                this.setState({verificationCode: false, loading:false});
                this.props.navigation.navigate('RegisterForm',{ credential: credential, phoneNumber: phoneNumber });                      
              break;
            }
          }, (error) => {
            this.setState({ loading: false });
            alert(error + "Id:" + error.verificationId);
            this.props.navigation.goBack();             
          }, (phoneAuthSnapshot) => {
            
          });            
        }
        else {
          const emailCredential = firebase.auth.EmailAuthProvider.credential(response[0].email, response[0].password);          
          firebase.auth().signInWithCredential(emailCredential);                        
        }
      }).catch((error) => {
        this.setState({ loading: false });
        Alert.alert("Pídelo Tú","Hubo un error, por favor inténtalo más tarde");
      });      
    }
    else {
      Alert.alert("Pídelo Tú",this.getErrorMessages());
    }           
  }

  async checkNumber(phoneNumber){
    const url = 'http://pidelotu.azurewebsites.net/checkNumber/'+phoneNumber;
    return await fetch(url)      
      .then(response => response.json())
      .then(json => {
        return json;
      }).catch(error => {
        throw new Error(error);
      });     
  }

  render() {
    const { loading, showModal, verificationCode, phoneAuthSnapshot, phoneNumber } = this.state;
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
            <TouchableOpacity style={styles.button} onPress={() => {this.setState({showModal: false, loading:true})}}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>     
          </ImageBackground>
        </Modal>      
      )
    }
    if (verificationCode) {
      return <VerificationCode validCode={this.validCode}/>      
    } 
    return (
      <Container style={styles.container}>
        <Header backgroundColor={'#fff'} style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'transparent', elevation: 0, width: '100%'}}>
              <Left style={{ flex: 1 }} >
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.goBack()}}>
                  <Icon name='arrow-back' />
                </TouchableWithoutFeedback>
              </Left>        
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
            <Item regular style={{flex:1, borderColor: 'black', borderWidth: 0.7, width:100, height:30 }}>
              <Input keyboardType="phone-pad" ref="number" value={this.state.phoneNumber} onChangeText={(phoneNumber) => {this.setState({phoneNumber})}} maxLength={10}/>
            </Item>
          </View>
          <Text style={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta ex arcu, et scelerisque felis faucibus at. Aenean sit amet viverra mauris. Phasellus quis metus ac lectus ultrices lacinia sed ut tortor. Donec non dignissim metus, ac ornare augue. Aenean euismod velit nisl. Donec ullamcorper sagittis condimentum. Nullam pharetra lorem iaculis pharetra gravida. Nulla non pharetra ante. Aenean et libero dui. Nulla lacinia vestibulum ex sit amet elementum.</Text>
          <Footer style={{backgroundColor:'#00000000', alignItems:'center', justifyContent:'center', marginBottom: 16}}>
            <TouchableOpacity style={styles.button} onPress={this.confirm.bind(this)}><Text style={styles.buttonText}>CONTINUAR</Text></TouchableOpacity>
          </Footer>
        </Content>
      </Container>
    );
  }
}

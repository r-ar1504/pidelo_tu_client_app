import React, { Component } from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {  Text, View, Image, BackHandler, AsyncStorage, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Alert} from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import style from './ProfileStyle';
import firebase from 'react-native-firebase';

import { YellowBox } from 'react-native';

export default class Profile extends Component{
  static navigationOptions ={
      headerTransparent: true
  }
  constructor(props){
    super(props);

    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    this.state = { user: user, email: '', password: '', showPassword: true, eyeIcon: 'eye', action: '', text: 'Editar', return: 'Regresar', cancel: '', editable: false, title: '' }    
    
    /*
    * Binded Functions:
    */
    this.confirm = this.confirm.bind(this);
    YellowBox.ignoreWarnings([     
     'Warning: Failed prop type',
    ]);
  }

  componentWillMount(){      
    this.setState({loading: true})
    this.getCurrentUser(this.state.user.uid).then((item) => { 
      this.setState({ email: item.email });          
      this.setState({ password: item.password });
      this.setState({loading: false})
    });
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

  async getCurrentUser(id) {
    let url = 'http://192.168.100.4:8000/getCurrentUser/'+id;
    let data = await fetch(url)
          .then(res => res.json())
          .then(json => {
            return json[0];
          }).catch(error => {
            throw new Error(error.messages);
          }); 
      return data;    
  }

  showPassword() {
    if (this.state.showPassword) {    
        this.setState({ showPassword: false });
        this.setState({ eyeIcon: 'eye-off' });
    }
    else {
      this.setState({ showPassword: true });
      this.setState({ eyeIcon: 'eye' })
    }
  }

  confirm(){
    this.setState({ loading: true });             
    firebase.auth().currentUser.updateEmail(this.state.email)
    .then((user) => {               
      user.updatePassword(this.state.password);           
      let data = { firebaseId: user.uid, email: this.state.email.toLowerCase(), password: this.state.password }                              
      this.sendData(data).then((response) => {
          alert(JSON.stringify({response}));
          if (response == 1){
            Alert.alert("Pídelo Tú","Se han actulizado tus datos");
          }                           
          this.setState({loading: false});
        }).catch((error) => {
          alert(error);
          this.setState({loading: false})
        }); 
    })
    .catch(error => {
      this.setState({ loading: false })
        alert(error)
    });
  }

  sendData(data){    
    return fetch('http://192.168.100.4:8000/update', {
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

  back(){
    if (this.state.cancel == 'close') {
                  this.setState({action: ''});
                  this.setState({text: 'Editar'});
                  this.setState({return: 'Regresar'});
                  this.setState({cancel: ''});
                  this.setState({editable: false});
                  this.setState({title: ''});
                  this.setState({pencil: ''})           
                }
              else {
                  this.props.navigation.goBack();
                }
  }

  edit(){
    if(this.state.text == 'Editar'){
                  this.setState({action: 'checkmark'}); 
                  this.setState({text: ''});
                  this.setState({return: ''});
                  this.setState({cancel: 'close'});
                  this.setState({editable: true});
                  this.setState({title: 'Editar Perfil'});
                  this.setState({pencil: 'create'})
                }
                else {                  
                  this.confirm();
                }
  }
 
  render(){
     if(this.state.loading) {
        return(    
         <ImageBackground source={require('src/assets/images/bg.png')} style={style.body}>
            <Image style={style.logo} source={require('src/assets/images/ic.png')} style={{width: 105, height: 105}}/>          
          </ImageBackground>
        )
      }  
    return(
			<Container>        
        <Image source={require('src/assets/images/background.png')} style={style.image}/>
        <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
          <Left>
            <TouchableOpacity onPress={this.back.bind(this)}>                            
              <Text style={{fontSize:12, color: '#fff', padding: 10, fontFamily: 'Lato-Light'}}>                
                <Icon name={this.state.cancel} style={{color:'white', fontSize: 25}} />
                {this.state.return}
              </Text>
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{fontSize:12, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Light', alignSelf:'center', marginLeft: 75}}>{this.state.title}</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={this.edit.bind(this)}>              
              <Text style={{fontSize:12, color: '#fff', padding: 10, fontFamily: 'Lato-Light'}}>                     
                <Icon name={this.state.action} style={{color:'white', fontSize: 25}} />         
                {this.state.text}
              </Text>
            </TouchableOpacity>
          </Right>                       
        </Header>         
        <View style={style.avatar_section} >
            <Image source={require('src/assets/images/ic.png')} style={style.profile}/>
            <Text style={{color: '#fff', fontSize:15, paddingTop:10, fontFamily:'Lato-Light'}}>Mi Perfil</Text>
          </View>
        <Content scrollEnabled={false} disableKBDismissScroll={true} padder style={style.profile_data}>          
          <View style={[style.profile_element,{paddingTop: 10}]}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30, fontFamily: 'Lato-Light'}}>Correo Electronico</Text>
            <View style={style.profile_input}>
              <FontIcon name="envelope-open" size={25} color="#fff" style={{ paddingRight:10, paddingTop: 8}} />
              <TextInput style={{fontSize: 15, color: '#11c0f6', fontFamily: 'Lato-Light', width: 200}} underlineColorAndroid={'transparent'} editable={this.state.editable} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
              <Icon name={this.state.pencil} style={{color:'white', fontSize: 25, paddingTop: 8}} />
            </View>
          </View>
          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30, fontFamily: 'Lato-Light'}}>Celular</Text>
            <View style={style.profile_input}>
              <FontIcon name="phone" size={25} color="#fff" style={{ paddingRight:10, paddingTop: 8}} />
              <TextInput style={{fontSize: 15, color: '#11c0f6', fontFamily: 'Lato-Light', width: 200}} underlineColorAndroid={'transparent'} editable={false} value={this.state.user.providerData[0].phoneNumber}/>
              {/*<Icon name={this.state.pencil} style={{color:'white', fontSize: 25, paddingTop: 8}} onPress={() => {}} />*/}
            </View>
          </View>          
          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30, fontFamily: 'Lato-Light'}}>Contraseña Actual</Text>
            <View style={style.profile_input}>
              <FontIcon name="lock" size={25} color="#fff" style={{ marginRight:10, paddingTop: 8 }} />              
              <TextInput style={{fontSize: 15, color: '#11c0f6', fontFamily: 'Lato-Light', width: 200 }} underlineColorAndroid={'transparent'} editable={this.state.editable} secureTextEntry={this.state.showPassword} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
              <Icon name={this.state.eyeIcon} style={{color:'white', fontSize: 25, paddingTop: 8}} onPress={this.showPassword.bind(this)} />              
            </View>
          </View>
        </Content>
			</Container>
    );
  }

}

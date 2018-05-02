import React, { Component } from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {  StyleSheet,  Text, View, Image, BackHandler, AsyncStorage, TextInput, TouchableOpacity} from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import style from './ProfileStyle';


import { YellowBox } from 'react-native';

export default class Profile extends Component{
  static navigationOptions ={
      headerTransparent: true
  }
  constructor(props){
    super(props);

    this.state = { password: '', showPassword: true, eyeIcon: 'eye', action: '', text: 'Editar', return: 'Regresar', cancel: '', editable: false, title: '' }    
    /*
    * Binded Functions:
    */
    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);      
    
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;    

    AsyncStorage.getItem(user.email, (err, item) => {          
      this.setState({ password: item });
    });                        
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }  

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  showPassword(user) {
    if (this.state.showPassword) {    
        this.setState({ showPassword: false });
        this.setState({ eyeIcon: 'eye-off' });
    }
    else {
      this.setState({ showPassword: true });
      this.setState({ eyeIcon: 'eye' })
    }
  }
 
  render(){
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    return(
			<Container>        
        <Image source={require('src/assets/images/background.png')} style={style.image}/>
        <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
          <Left>
            <TouchableOpacity onPress={() => {
              this.setState({ action: ''});
              this.setState({text: 'Editar'});
              this.setState({return: 'Regresar'});
              this.setState({cancel: ''});
              this.setState({editable: false});
              this.setState({title: ''})}}>                            
              <Text style={{fontSize:15, color: '#fff', padding: 10, fontFamily: 'Lato-Light'}}>                
                <Icon name={this.state.cancel} style={{color:'white', fontSize: 25}} />
                {this.state.return}
              </Text>
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{fontSize:15, color: '#fff', padding: 10, fontFamily: 'Lato-Light', alignSelf:'center'}}>{this.state.title}</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => {
              if (this.state.cancel == 'close') {
                  this.setState({action: 'checkmark'}); 
                  this.setState({text: ''});
                  this.setState({return: ''});
                  this.setState({cancel: 'close'});
                  this.setState({editable: true});
                  this.setState({title: 'Editar Perfil'})        
                }
              else {
                  this.props.navigation.goBack();
                }
              }}>              
              <Text style={{fontSize:15, color: '#fff', padding: 10, fontFamily: 'Lato-Light'}}>                     
                <Icon name={this.state.action} style={{color:'white', fontSize: 25}} />         
                {this.state.text}
              </Text>
            </TouchableOpacity>
          </Right>                       
        </Header> 

        <View style={style.avatar_section} >
        <Image source={require('src/assets/images/ic.png')} style={style.profile}/>
        <Text style={{color: '#fff', fontSize:15, paddingTop:30, fontFamily:'Lato-Light'}}>Mi Perfil</Text>
        </View>

        <Content style={style.profile_data}>

          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30, fontFamily: 'Lato-Light'}}>Correo Electronico</Text>
            <View style={style.profile_input}>
              <FontIcon name="envelope-open" size={25} color="#fff" style={{ paddingRight:10, paddingTop: 8}} />
              <TextInput style={{fontSize: 15, color: '#11c0f6', fontFamily: 'Lato-Light'}} underlineColorAndroid={'transparent'} editable={this.state.editable} value={user.email}/>
            </View>
          </View>
          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30, fontFamily: 'Lato-Light'}}>Celular</Text>
            <View style={style.profile_input}>
              <FontIcon name="phone" size={25} color="#fff" style={{ paddingRight:10, paddingTop: 8}} />
              <TextInput style={{fontSize: 15, color: '#11c0f6', fontFamily: 'Lato-Light'}} underlineColorAndroid={'transparent'} editable={this.state.editable} value={user.providerData[0].phoneNumber}/>
            </View>
          </View>
          {/*<View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30}}>Sexo</Text>
            <View style={style.profile_input}>
              <Icon name="user" size={25} color="#fff" style={{ paddingRight:10}} />
              <Text style={{fontSize: 15, color: '#00FFFF', paddingTop: 5}}>masculino</Text>

            </View>
          </View>*/}
          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30, fontFamily: 'Lato-Light'}}>Contraseña Actual</Text>
            <View style={style.profile_input}>
              <FontIcon name="lock" size={25} color="#fff" style={{ marginRight:10, paddingTop: 8 }} />              
              <TextInput style={{fontSize: 15, color: '#11c0f6', fontFamily: 'Lato-Light' }} underlineColorAndroid={'transparent'} editable={this.state.editable} secureTextEntry={this.state.showPassword} value={this.state.password}/>
              <Icon name={this.state.eyeIcon} style={{color:'white', fontSize: 25, paddingTop: 8, marginLeft: 100}} onPress={this.showPassword.bind(this, user)} />              
            </View>
          </View>
        </Content>
			</Container>
    );
  }

}

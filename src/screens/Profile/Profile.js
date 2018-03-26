import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Navigation } from 'react-native-navigation';
import {  StyleSheet,  Text, View, Image} from 'react-native';
import style from './ProfileStyle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { YellowBox } from 'react-native';

export default class Profile extends Component{
  static navigationOptions ={
      headerTransparent: true
  }
  constructor(props){
    super(props);
    /*
    * Binded Functions:
    */
    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

  render(){
    return(
			<View style={{height: '100%'}}>
        <Image source={require('src/assets/images/background.png')} style={style.image}/>

        <View style={style.avatar_section} >
        <Image source={require('src/assets/images/icon.gif')} style={style.profile}/>
        <Text style={{color: '#fff', fontSize:15, paddingTop:30}}>Mi Perfil</Text>
        </View>

        <View style={style.profile_data}>

          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30}}>Correo Electronico</Text>
            <View style={style.profile_input}>
              <Icon name="envelope-open" size={25} color="#fff" style={{ paddingRight:10}} />
              <Text style={{fontSize: 15, color: '#00FFFF', paddingTop: 5}}>rodolforios@gmail.com</Text>
            </View>
          </View>
          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30}}>Celular</Text>
            <View style={style.profile_input}>
              <Icon name="phone" size={25} color="#fff" style={{ paddingRight:10}} />
              <Text style={{fontSize: 15, color: '#00FFFF', paddingTop: 5}}>+528711095423</Text>
            </View>
          </View>
          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30}}>Sexo</Text>
            <View style={style.profile_input}>
              <Icon name="user" size={25} color="#fff" style={{ paddingRight:10}} />
              <Text style={{fontSize: 15, color: '#00FFFF', paddingTop: 5}}>masculino</Text>

            </View>
          </View>
          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30}}>Contraseña Actual</Text>
            <View style={style.profile_input}>
              <Icon name="lock" size={25} color="#fff" style={{ paddingRight:10}} />
              <Text style={{fontSize: 15, color: '#00FFFF', paddingTop: 5}}>*********</Text>

            </View>
          </View>
        </View>
			</View>
    );
  }

}

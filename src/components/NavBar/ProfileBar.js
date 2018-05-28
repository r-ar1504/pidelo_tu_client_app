import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Hideo } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import{
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image
  } from 'react-native';

import style from './NavStyle';

export default class ProfileBar extends Component{
  constructor(props){
    super(props);
    /*
    * Binded Functions:
    */
    this.goBack = this.goBack.bind(this);
  }

  /* Go Back On Navigation Stack */
  goBack(){
    this.props.navigator.pop({
      animated: true
    });
  }

  render(){
    return(

      <View style={style.profile_bar}>

        <Text style={{color: '#fff', fontSize: 13, padding: 5}} >Regresar</Text>
        <View style={style.empty}/>
        <Text style={{color: '#fff', fontSize: 13, paddingRight: 15}}>Editar</Text>

      </View>
    );
  }

}

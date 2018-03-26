import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  StyleSheet,  Text, View, Image} from 'react-native';
import style from './HomeStyle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';



export default class LeftTittleNav extends Component {

  constructor(props){
    super(props);
  }


  render(){
    return(
      <View style={style.leftHead} >
        <Image source={require('src/assets/images/menu.png')} style={{width: 30,  height: 30 }}/>
      </View>
    );
  }

}

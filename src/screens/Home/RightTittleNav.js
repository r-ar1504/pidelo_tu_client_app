import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  StyleSheet,  Text, View, Image} from 'react-native';
import style from './HomeStyle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class SearchButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: true
    }
  }


  render(){
    return(
      <View style={style.rightHead}>
        <Image source={require('src/assets/images/icon3.png')} style={{width: 30,  height: 30 }}/>
      </View>
    );
  }

}

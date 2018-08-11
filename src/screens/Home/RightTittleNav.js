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
        {/* <Icon name="shopping-cart" size={35} color="#999999" style={{ paddingRight:10}} /> */}
        <Image source={require('src/assets/images/ic.png')} style={{width: 30,  height: 30 }}/>
      </View>
    );
  }

}

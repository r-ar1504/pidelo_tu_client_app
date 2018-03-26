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
      <View style={style.searchBox}>
        <Icon name="search" size={15} color="#999999" style={{ paddingRight:10}} />
        <Text style={{fontSize: 15, color: '#999999'}}> BUSCAR</Text>
      </View>
    );
  }

}

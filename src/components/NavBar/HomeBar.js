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

import SideMenu from '../SideMenu/SideMenu';


export default class HomeBar extends Component{
  constructor(props){
    super(props);
    /*
    * Binded Functions:
    */
    this.openSideMenu = this.openSideMenu.bind(this);
  }

  /* Open side menu. */
  openSideMenu(){
    Navigation.showModal({
      screen: 'nav.SideMenu',
      navigatorStyle: {
        navBarHidden: true
      },
      animationType: 'fade'

    })
  }

  /* Open discounts and coupons. */
  searchFood(){

  }

  /* Open notifications dashboard. */
  openNotificatios(){

  }

  /*
  * Render Function.
  */
  render(){
    return(



        <View style={style.home_bar}> 
          <Icon size={30} name="bars" color="#000" onPress={this.openSideMenu}/>
          
          <View style={style.empty}/>

          <Hideo
            style={style.search_food}
            iconClass={FontAwesomeIcon}
            iconName={'search'}
            iconColor={'grey'}
            iconBackgroundColor={'#fff'}
            inputStyle={{ color: '#455a64' }}
            labelStyle={{ fontSize: 15 }}
          />

          <View style={style.empty}/>

          <Image source={require('src/assets/images/icon3.png')} style={style.notification_image}/>
        </View>
     
    );
  }

}

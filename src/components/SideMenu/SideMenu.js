import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SideMenu } from 'react-native-side-menu';
import { Navigation } from 'react-native-navigation';
import {  StyleSheet,  Text, View, Image} from 'react-native';
import style from './SideStyle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class HomeBar extends Component{
  constructor(props){
    super(props);

    /*
    * Binded Functions:
    */
    this.dissmisSideMenu = this.dissmisSideMenu.bind(this)
    this.openPromos = this.openPromos.bind(this)
    this.accountSettings = this.accountSettings.bind(this)
    this.currentLocation = this.currentLocation.bind(this)
    this.orderHistory = this.orderHistory.bind(this)
    this.logOut = this.logOut.bind(this)
    this.openHelp = this.openHelp.bind(this)
  }

  /* Close side menu. */
  dissmisSideMenu(){
    Navigation.dismissModal({
      screen: 'nav.SideBar',
      animationType: 'fade'
    })
  }

  /* Open discounts and coupons. */
  openPromos(){

  }

  /* Go to user settings. */
  accountSettings(){

  }

  /* Search by current location. */
  currentLocation(){

  }

  /* User order history. */
  orderHistory(){

  }

  /* Sign Out. */
  logOut(){

  }

  /* Help Section. */
  openHelp(){

  }

  /*
  * Render Function.
  */
  render(){
    return(
      <View style={style.sidebar_container}>

          <View style={style.sidebar_section_arrow}>
            <Icon size={30} name="arrow-left" color="#fff" onPress={this.dissmisSideMenu}/>
          </View>
          <View style={style.sidebar_section}>
          <Image source={require('src/assets/images/icon3.png')} style={style.side_profile}/>
          </View>
          <View style={style.sidebar_section}>
            <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Rodolfo Ríos</Text>
          </View>
          <View style={style.sidebar_section}>
            <Text style={{fontSize: 15, color: '#fff', textAlign: 'left', borderBottomWidth: 1, borderBottomColor: '#fff', paddingTop: 20, width: 200, paddingBottom: 10}}>Mi Perfil</Text>
          </View>
          <View style={style.sidebar_links}>

            <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Rodolfo Ríos</Text>
          </View>

      </View>
    );
  }

}

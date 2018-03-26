import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  StyleSheet,  Text, View, Image} from 'react-native';
import style from './SideStyle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class SideMenu extends Component{
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    }
  }
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

          <View style={style.sidebar_section_arrow} onPress={this.props.navigation.navigate('DrawerToggle')}>
            <Icon size={20} name="arrow-left" color="#fff" />
          </View>
          <View style={style.sidebar_section}>
          <Image source={require('src/assets/images/profile.jpg')} style={style.side_profile}/>
          </View>
          <View style={style.sidebar_section}>
            <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Rodolfo Ríos</Text>
          </View>
          <View style={style.sidebar_section} onPress={this.props.navigation.navigate('Profile')}>
            <Text style={{fontSize: 15, color: '#fff', textAlign: 'left', borderBottomWidth: 1, borderBottomColor: '#fff', paddingTop: 20, width: 200, paddingBottom: 10}}>Mi Perfil</Text>
          </View>
          <View style={style.sidebar_links}>

            <View style={style.sidebar_link}>
              <Icon name="ticket" size={15} color="#fff" style={{marginTop: 2, paddingRight:4}} />
              <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Promociones</Text>
            </View>
            <View style={style.sidebar_link}>
              <Icon name="cogs" size={15} color="#fff"  style={{marginTop: 2, paddingRight:3}} onPress={this.accountSettings}/>
              <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}} onPress={this.accountSettings}>Ajustes de perfil</Text>
            </View>
            <View style={style.sidebar_link}>
              <Icon name="map-marker" size={15} color="#fff"  style={{marginTop: 2, paddingRight:6, paddingLeft: 3}}/>
              <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Ubicación Actual</Text>
            </View>
            <View style={style.sidebar_link}>
              <Icon name="list-ol" size={15} color="#fff" style={{marginTop: 2, paddingRight:4}} />
              <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Historial de pedidos</Text>
            </View>

          </View>

          <View style={style.sidebar_bottom}>
            <Text style={{fontSize: 15, color: '#fff', textAlign: 'left', borderTopWidth: 1, borderTopColor: '#fff', paddingTop: 10, width: 200, paddingBottom: 10}}>Cerrar Sesión</Text>
          </View>
      </View>
    );
  }

}

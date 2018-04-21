import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  StyleSheet,  Text, View, Image, TouchableWithoutFeedback,} from 'react-native';
import style from './SideStyle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {  Item, Footer } from 'native-base';
import firebase from 'react-native-firebase';
export default class SideMenu extends Component{
  static navigationOptions = {
    gesturesEnabled: false,
    headerStyle:{
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
    this.props.navigation.navigate('DrawerClose');
  }

  /* Open discounts and coupons. */
  openPromos(){
    this.props.navigation.navigate('Discounts');
  }

  /* Go to user settings. */
  accountSettings(){
    this.props.navigation.navigate('Profile');
  }

  /* Search by current location. */
  currentLocation(){
    this.props.navigation.navigate('Maps',{ address: null });
  }

  /* User order history. */
  orderHistory(){
    this.props.navigation.navigate('Payment');
  }

  /* Sign Out. */
  logOut(){
    firebase.auth().signOut(); 
  }

  /* Help Section. */
  openHelp(){

  }  

  /*
  * Render Function.
  */
  render(){
    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    return(
      <View style={style.sidebar_container}>

          <View style={style.sidebar_section_arrow} >
            <TouchableWithoutFeedback onPress={this.dissmisSideMenu}>
              <Icon size={20} name="arrow-left" color="#fff" />
            </TouchableWithoutFeedback>
          </View>
          <View style={style.sidebar_section}>
          <Image source={require('src/assets/images/profile.jpg')} style={style.side_profile}/>
          </View>
          <View style={style.sidebar_section}>
            <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Rodolfo Ríos</Text>
          </View>
          <View style={style.sidebar_section} >
          <TouchableWithoutFeedback onPress={this.accountSettings}>
            <Text style={{fontSize: 15, color: '#fff', textAlign: 'left', borderBottomWidth: 1, borderBottomColor: '#fff', paddingTop: 20, width: 200, paddingBottom: 10}}>Mi Perfil</Text>
          </TouchableWithoutFeedback>
          </View>
          <View style={style.sidebar_links}>
          <TouchableWithoutFeedback onPress={this.openPromos}>
            <View style={style.sidebar_link}>
              <Icon name="ticket" size={15} color="#fff" style={{marginTop: 2, paddingRight:4}} />
              <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Promociones</Text>
            </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.accountSettings}>
            <View style={style.sidebar_link}>
              <Icon name="cogs" size={15} color="#fff"  style={{marginTop: 2, paddingRight:3}} />
              <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Ajustes de perfil</Text>


            </View>
                  </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.currentLocation}>
            <View style={style.sidebar_link}>

              <Icon name="map-marker" size={15} color="#fff"  style={{marginTop: 2, paddingRight:6, paddingLeft: 3}}/>
              <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Ubicación Actual</Text>

            </View>
                </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.orderHistory}>
              <View style={style.sidebar_link}>
                <Icon name="list-ol" size={15} color="#fff" style={{marginTop: 2, paddingRight:4}} />
                <Text style={{fontSize: 15, color: '#fff', paddingTop: 10}}>Historial de pedidos</Text>

              </View>
            </TouchableWithoutFeedback>
            <Footer style={{backgroundColor: 'transparent'}}>
              <Item style={style.sidebar_bottom}>
                <Text style={{fontSize: 15, color: '#fff', textAlign: 'left', paddingTop: 10, paddingBottom: 10}} onPress={this.logOut}>Cerrar Sesión</Text>
              </Item>              
            </Footer>
          </View>          
      </View>
    );
  }

}

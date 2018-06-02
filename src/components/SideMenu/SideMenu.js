import React, { Component } from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {  StyleSheet,  Text, View, Image, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import style from './SideStyle';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import {  Item, Footer, Icon } from 'native-base';
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
    this.currentLocation = this.currentLocation.bind(this)
    this.orderHistory = this.orderHistory.bind(this)
    this.paymentMethod = this.paymentMethod.bind(this)
    this.logOut = this.logOut.bind(this)
    this.openCart = this.openCart.bind(this)
  }  

  /* Close side menu. */
  dissmisSideMenu(){
    this.props.navigation.navigate('DrawerClose');
  }

  /* Open discounts and coupons. */
  home(user){
    this.props.navigation.navigate('Home', { user: user });
  }

  /* Go to user settings. */
  accountSettings(user){
    this.props.navigation.navigate('Profile', { user: user });
  }

  /* Search by current location. */
  currentLocation(){
    this.props.navigation.navigate('Maps', { address: null });
  }

  /* User order history. */
  orderHistory(){
    this.props.navigation.navigate('Orders');
  }

  /* Add Payment method */
  paymentMethod(){
    this.props.navigation.navigate('Payment');
  }

  /* Sign Out. */
  logOut(){
    firebase.auth().signOut();
  }

  /* Cart Shop Section. */
  openCart(){
    this.props.navigation.navigate('CartShop')
  }

  /*
  * Render Function.
  */
  render(){
    const { params } = this.props.navigation.state.routes[0];
    const user = params ? params.user : null;

    return(
      <View style={style.sidebar_container}>

          <View style={style.sidebar_section_arrow} >
            <TouchableWithoutFeedback onPress={this.dissmisSideMenu}>
              <FontIcon size={20} name="arrow-left" color="#fff" />
            </TouchableWithoutFeedback>
          </View>
          <View style={style.sidebar_section}>
          <Image source={require('src/assets/images/ic.png')} style={style.side_profile}/>
          </View>
          <View style={style.sidebar_section}>
            <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Light'}}>{(user.displayName != null) ? user.displayName : user.providerData[0].phoneNumber}</Text>
          </View>
          <View style={style.sidebar_section} >
          <TouchableWithoutFeedback>
            <Text style={{fontSize: 20, color: '#fff', textAlign: 'left', borderBottomWidth: 1, borderBottomColor: '#fff', paddingTop: 20, width: 200, paddingBottom: 10, fontFamily: 'Lato-Light'}}>Mi Perfil</Text>
          </TouchableWithoutFeedback>
          </View>
          <View style={style.sidebar_links}>
            <TouchableWithoutFeedback onPress={this.home.bind(this,user)}>
              <View style={style.sidebar_link}>
                <FontIcon name="home" size={15} color="#fff" style={{marginTop: 8, paddingRight:4}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Light'}}>Inicio</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.accountSettings.bind(this,user)}>
              <View style={style.sidebar_link}>
                <FontIcon name="cogs" size={15} color="#fff"  style={{marginTop: 8, paddingRight:3}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Light'}}>Ajustes de perfil</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.orderHistory}>
              <View style={style.sidebar_link}>
                <FontIcon name="list-ol" size={15} color="#fff" style={{marginTop: 8, paddingRight:4}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Light'}}>Historial de pedidos</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.paymentMethod}>
              <View style={style.sidebar_link}>
                <Icon active name="cash" style={{marginTop: 8, paddingRight:4, fontSize: 15, color: '#fff'}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Light'}}>Agregar método pago</Text>
              </View>
            </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={this.openCart}>
              <View style={style.sidebar_link}>
                <Icon active name="cart" style={{marginTop: 8, paddingRight:4, fontSize: 15, color: '#fff'}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Light'}}>Carrito de compras</Text>
              </View>
            </TouchableWithoutFeedback>
            <Footer style={{backgroundColor: 'transparent'}}>
                <Text style={{fontSize: 20, color: '#fff', textAlign: 'left', borderBottomWidth: 1, borderBottomColor: '#fff', paddingTop: 20,  paddingBottom: 10, fontFamily: 'Lato-Light'}}onPress={this.logOut}>Cerrar Sesión</Text>
            </Footer>
          </View>
      </View>
    );
  }

}

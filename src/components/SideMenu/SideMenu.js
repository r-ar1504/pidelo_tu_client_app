import React, { Component } from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import style from './SideStyle';
import {  Footer, Icon } from 'native-base';
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
    this.props.navigation.navigate('Orders', { screen: 'OrdersHistory' });
  }

  /* Add Payment method */
  paymentMethod(){
    this.props.navigation.navigate('Payment', { screen: 'Home' });
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
              <Icon name="arrow-back" style={{color:'white', fontSize: 35, alignSelf:'center', }} />                                
            </TouchableWithoutFeedback>
          </View>
          <View style={style.sidebar_section}>
            {(user.photoURL) ? <Image source={{uri:user.photoURL}} style={style.side_profile}/> : <Image source={require('src/assets/images/ic.png')} style={style.side_profile}/> }
          </View>
          <View style={style.sidebar_section}>
            <Text style={{fontSize: 25, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Regular'}}>{(user.displayName != null) ? user.displayName : user.providerData[0].phoneNumber}</Text>
          </View>
          <View style={style.sidebar_section} >
          <TouchableWithoutFeedback>
            <Text style={{fontSize: 25, color: '#fff', textAlign: 'left', borderBottomWidth: 1, borderBottomColor: '#fff', paddingTop: 20, width: 200, paddingBottom: 10, fontFamily: 'Lato-Regular'}}>Mi Perfil</Text>
          </TouchableWithoutFeedback>
          </View>
          <View style={style.sidebar_links}>
            <TouchableWithoutFeedback onPress={this.home.bind(this,user)}>
              <View style={style.sidebar_link}>
                <Icon name="home" style={{marginTop: 8, paddingRight:4, fontSize: 25, color: '#fff'}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Regular'}}>Inicio</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.accountSettings.bind(this,user)}>
              <View style={style.sidebar_link}>
                <Icon name="cog" style={{marginTop: 8, paddingRight:4, fontSize: 25, color: '#fff'}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Regular'}}>Ajustes de perfil</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.orderHistory}>
              <View style={style.sidebar_link}>
                <Icon name="list" style={{marginTop: 8, paddingRight:4, fontSize: 25, color: '#fff'}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Regular'}}>Historial pedidos</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.paymentMethod}>
              <View style={style.sidebar_link}>
                <Icon active name="cash" style={{marginTop: 8, paddingRight:4, fontSize: 25, color: '#fff'}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Regular'}}>Formas de pago</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.openCart}>
              <View style={style.sidebar_link}>
                <Icon active name="cart" style={{marginTop: 8, paddingRight:4, fontSize: 25, color: '#fff'}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Regular'}}>Carrito</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.logOut}>
              <View style={style.sidebar_link}>
                <Icon active name="log-out" style={{marginTop: 8, paddingRight:4, fontSize: 25, color: '#fff'}} />
                <Text style={{fontSize: 20, color: '#fff', paddingTop: 10, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#fff', fontFamily: 'Lato-Regular'}}>Cerrar Sesión</Text>
              </View>
            </TouchableWithoutFeedback>
            <Footer style={{backgroundColor: 'transparent'}}>
                
            </Footer>
          </View>
      </View>
    );
  }

}

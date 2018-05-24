/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';
import { Icon } from 'react-native-elements'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { StyleSheet, ImageBackground, TouchableWithoutFeedback, TouchableOpacity, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert } from 'react-native';
import { Container, Header, Body,Footer, Left, Right, Content, Button } from 'native-base';
import OneSignal from 'react-native-onesignal';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';

/*-----------------------------------------------------------------
* Style Component                                                 |
*-----------------------------------------------------------------*/
import Styles from './ActiveOrderStyle';



export default class ActiveOrder extends Component{
  constructor(props){
    super(props);

    /*State definition*/
      this.state = {
        id: this.props.navigation.getParam("id"),
        user_name:this.props.navigation.getParam("user_name"),
        user_lat: this.props.navigation.getParam("user_lat"),
        user_lng: this.props.navigation.getParam("user_lng"),
        res_lat: this.props.navigation.getParam("res_lat"),
        res_lng: this.props.navigation.getParam("res_lng"),

      delivery_man_coordinates:{
        latitude: parseFloat(this.props.navigation.getParam("res_lat")),
        longitude: parseFloat(this.props.navigation.getParam("res_lng")),
      },
      region:{
        latitude: parseFloat(this.props.navigation.getParam("res_lat")),
        longitude: parseFloat(this.props.navigation.getParam("res_lng")),
        latitudeDelta: 0.0142,
        longitudeDelta: 0.0011
      },
      restaurant_location:{
        latitude: parseFloat(this.props.navigation.getParam("res_lat")),
        longitude: parseFloat(this.props.navigation.getParam("res_lng")),
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0011
      },
      client_location:{
        latitude: parseFloat(this.props.navigation.getParam("user_lat")),
        longitude: parseFloat(this.props.navigation.getParam("user_lng")),
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0011
      },
      current_destination: {
        latitude: parseFloat(this.props.navigation.getParam("res_lat")),
        longitude: parseFloat(this.props.navigation.getParam("res_lng")),
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0011
      },
      order_status: 0
    }
    /*Method binding*/
    this.changeStatus = this.changeStatus.bind(this);
  }//Constructor End

  changeStatus(){
    switch (this.state.order_status) {
      case 0:
      alert(this.state.order_status)
        this.setState({
          order_status: this.state.order_status + 1,
          current_destination: this.state.client_location
        });// Change destination and draw route.
        break;
      case 1:
      alert(this.state.order_status)
        this.setState({
          order_status: this.state.order_status + 1,
          current_destination: this.state.client_location
        });// Notify user.
        break;
      case 2:
      alert(this.state.order_status)
        this.props.navigation.navigate('Home');
        this.setState({
          order_status: this.state.order_status + 1
        });// End order adn return another screen.
        break;
    }
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.setState({
          delivery_man_coordinates : {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
          },
          region:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0012,
            longitudeDelta: 0.0011
          },
        });

      },//Succes callback
      (error) => {
        { alert("Error Calling plugin " + error) }
      }//Error callback
    );
  }

  componentDidMount(){
    navigator.geolocation.watchPosition((position)=>{

      this.setState({
        delivery_man_coordinates:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        region:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0012,
          longitudeDelta: 0.0011
        }
      })
    },(error) => {
      alert(error)
    },{
      maximumAge: 2000,
      timeout: 3000
    })
  }
  render(){
    return(
      <View style={{height: '100%'}}>
        <MapView
            style={styles.map}
            region={this.state.region}
            customMapStyle={mapStyle}
            zoomEnabled = {true}
          >
          <MapView.Marker
            coordinate={this.state.delivery_man_coordinates}>
            <Image
              source={require('src/assets/images/icon.gif')}
              style={{width: 25, height: 25}}
              />
          </MapView.Marker>
          <MapView.Marker
            coordinate={this.state.current_destination}>
            <Image
              source={require('src/assets/images/food_pickup.png')}
              style={{width: 35, height: 35}}
              />
          </MapView.Marker>
        <MapViewDirections
          origin={this.state.delivery_man_coordinates}
          destination={this.state.current_destination}
          strokeWidth={4}
          strokeColor={'blue'}
          />
        </MapView>
        <Header noShadow style={{
            backgroundColor: 'transparent',
            zIndex:6
          }}>
        <Left>
          <Image source={require('src/assets/images/icon.gif')} style={{
              width: 30,
              height: 30,
              marginLeft: 20
            }}/>
        </Left>
        <Body>

        </Body>
        </Header>
        <Content>

        </Content>
        <Footer style={{height: 120, backgroundColor: 'transparent', zIndex:30}} noShadow>
          <ImageBackground source={require('src/assets/images/sidebar-background.png')}
            style={{height: 120, width: '100%', backgroundColor: 'transparent'}}>
          <View style={{
              flex: 1,
              zIndex:25,
              flexDirection: 'row',
              flexWrap: 'nowrap'
            }}>
            <View
              style={{
                width:'60%',
                height: '100%'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 90
                }}>
              <Icon name="user" type='feather' color={'#fff'}  size={18} containerStyle={{
                  width:'15%'
                }}/>
              <Text
                style={{
                  width: '70%',
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: 'Lato-Regular'
                }}>
                Ernesto Sanchez
              </Text>
            </View>
            </View>
            <View
              style={{
                width:'40%',
                height: '100%'
              }}>
            <OrderButton status={this.state.order_status} statusChange={this.changeStatus}/>
            </View>
          </View>
          </ImageBackground>
        </Footer>
      </View>
    )
  }
}

/*-----------------------------------------------------------------
* Button Components                                               |
*-----------------------------------------------------------------*/
class OrderButton extends Component{
  constructor(props){
    super(props);

  }//Constructor end

  render(){
      switch (this.props.status) {
        case 0:
          return(
            <TouchableOpacity onPress={this.props.statusChange}>
              <View style={Styles.order_button_accept}>
                <Text style={Styles.button_text}>
                  Notificar Restaurante
                </Text>
              </View>
            </TouchableOpacity>
          );

        case 1:
        return(
          <TouchableOpacity onPress={this.props.statusChange}>
            <View style={Styles.order_button_accept}>
              <Text style={Styles.button_text}>
                Notificar Cliente
              </Text>
            </View >
          </TouchableOpacity>
        );
        case 2:
        return(
          <TouchableOpacity onPress={this.props.statusChange}>
            <View style={Styles.order_button_accept}>
              <Text style={Styles.button_text}>
                Finalizar Pedido
              </Text>
            </View>
          </TouchableOpacity>
        );

    }
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex:5
  },
  overlay:{
    flex:1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1.3)'
  }
});

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }]

  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

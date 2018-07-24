import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, TitlTrackButtone, Segment, Content, Text } from 'native-base';
import { View, BackHandler, Image, ImageBackground, Alert } from 'react-native';
import styles from './OrderHistoryStyle'
import TrackButton from './TrackButton'

export default class OrderComming extends Component {  
  constructor(props){
    super(props);
    this.getOrderLocation = this.getOrderLocation.bind(this);
    this.sendID = this.sendID.bind(this);
  }

  getOrderLocation(ord_id){
    this.sendID(ord_id);
  }

  sendID(order_id){
    fetch('http://pidelotu.azurewebsites.net/get_order/'+order_id)
    .then( (response) => response.json() )
    .then( (response) =>{
        let resp = response;
        this.props.navigation.navigate('ActiveOrder', {
          order: resp.order, 
          res: resp.restaurant,
          user_lat: resp.order.latitude,
          user_lng: resp.order.longitude,
          res_lat: resp.restaurant.latitude,
          res_lng: resp.restaurant.longitude})
    });
  }
  
  renderOrders() {
    return this.props.orders.map((order,i) => {
      return (
        <View style={{paddingBottom: 20}} key={order.order_id}>
          <ImageBackground source={{uri:'http://pidelotu.azurewebsites.net/images/meals/'+order.image}} style={styles.food}>
            <View style={styles.foodCont}>
              <Text style={styles.textPromo}>{order.restaurant}</Text>
            </View>                    
          </ImageBackground>
          <View style={styles.deliveryProgress}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Pedido #{order.order_id}</Text>              
              <Icon active name='time' style={{color:'white', fontSize: 15, marginLeft: 150}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>00:20:00</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>{order.quantity}</Text>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>{order.name}</Text>     
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff', fontSize: 12, flex: 1, flexWrap:'wrap'}}>(Aquí va la información adicional)</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Bold', color:'#fff'}}>Total ${order.total}</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Icon active name='person' style={{marginLeft: 10, color:'white', fontSize: 15}} /> 
              <Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff', flex: 1, flexWrap: 'wrap'}}>Tu entrega por Jose Fernando</Text>                                            
              <TrackButton rest_id={order.order_id} openMap={this.getOrderLocation} />
            </View>            
          </View>             
        </View>  
        )
      });    
  }
  render() {
    return (      
      <Content padder style={{backgroundColor: '#3f51b5'}}>                                
         {this.renderOrders()}        
      </Content>
    );
  }
}

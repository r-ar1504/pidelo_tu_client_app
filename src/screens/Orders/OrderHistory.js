import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { View, BackHandler, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './OrderHistoryStyle';
import moment from 'moment';
import { URL } from '../../config/env';

export default class OrderHistory extends Component { 
  constructor(props){
    super(props);
  }
  rederOrders() {
    return this.props.orders.map((order,i) => {      
      return (
        <View style={{paddingBottom: 20}} key={order.order_id}>
          <ImageBackground source={{uri:`${URL}/images/meals/${order.image}`}} style={styles.food}>
            <View style={styles.foodCont}>
              <Text style={styles.textPromo}>{order.restaurant}</Text>
              <Text style={styles.description}>Ver Menu</Text>              
            </View>                    
          </ImageBackground>
          <View style={styles.deliveryDetails}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <View style={styles.circle}>
                <Image source={require('src/assets/images/check.png')} style={styles.check}/>              
              </View>
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Regular', color:'#fff'}}>Pedido Entregado</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Regular', color:'#fff'}}>{moment(order.date).format('LLL')}</Text>              
              <Button rounded small style={styles.button} onPress={() => {this.props.openMeal(order, order.restaurant_id,order.open_time,order.close_time,order.not_working )}}><Text style={styles.buttonText}>Volver a ordenar</Text></Button>    
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>              
              <Text style={{fontFamily: 'Lato-Regular', color:'#fff'}}>Pedido #{order.order_id}</Text>                            
            </View>
          </View>  
          <View style={[styles.deliveryDetails, {'borderBottomWidth': 1}]}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Text style={{fontFamily: 'Lato-Regular', color:'#fff'}}>{order.quantity}</Text>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Regular', color:'#fff'}}>{order.name}</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Icon active name='person' style={{color:'white', fontSize: 15}} /> 
              <Text style={{marginLeft: 5, fontFamily: 'Lato-Regular', color:'#fff'}}>Tu entrega por Luis Fernando</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 25, paddingTop: 10, paddingBottom: 10}}>              
              <Text style={{fontFamily: 'Lato-Bold', color:'#fff'}}>Total ${order.total}</Text>                            
            </View>
          </View>       
        </View>
      )
    })
  }
  
  render() {    
    return (  
      <Content padder style={{backgroundColor: '#3f51b5'}}>        
        {this.rederOrders()}                      
      </Content>
    );
  }
}
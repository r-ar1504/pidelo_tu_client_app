import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { View, BackHandler, Image, ImageBackground } from 'react-native';
import styles from './OrderHistoryStyle'

export default class OrderComming extends Component {  
  constructor(props){
    super(props);
  }
  renderOrders() {
    return this.props.orders.map((order,i) => {
      return (
        <View style={{paddingBottom: 20}} key={order.order_id}>
          <ImageBackground source={{uri:'http://pidelotu.azurewebsites.net/images/meals/'+order.image}} style={styles.food}>
            <View style={styles.foodCont}>
              <Text style={styles.textPromo}>{order.restaurant}</Text>
              <Text style={styles.description}>Ver Menu</Text>              
            </View>                    
          </ImageBackground>
          <View style={styles.deliveryProgress}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Pedido #{order.order_id}</Text>              
              <Icon active name='time' style={{color:'white', fontSize: 15, marginLeft: 150}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>00:20:00</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>{order.total / order.price}</Text>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>{order.description}</Text>     
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff', fontSize: 12}}>(Aquí va la información adicional)</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Bold', color:'#fff'}}>Total ${order.total}</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Icon active name='person' style={{color:'white', fontSize: 15}} /> 
              <Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>Tu entrega por Jose Fernando</Text>                            
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
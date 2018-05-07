import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { View, BackHandler, Image, ImageBackground } from 'react-native';
import styles from './OrderHistoryStyle'

export default class OrderComming extends Component {  
  render() {
    return (      
      <Content padder style={{backgroundColor: '#3f51b5'}}>                                
        <View style={{paddingBottom: 20}}>
          <ImageBackground source={require('src/assets/images/menu2.jpeg')} style={styles.food}>
            <View style={styles.foodCont}>
              <Text style={styles.textPromo}>Bistro Garden</Text>
              <Text style={styles.description}>Ver Menu</Text>              
            </View>                    
          </ImageBackground>
          <View style={styles.deliveryProgress}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Pedido #1B613</Text>              
              <Icon active name='time' style={{color:'white', fontSize: 15, marginLeft: 150}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>00:20:00</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>1</Text>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Carne Asada</Text>     
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff', fontSize: 12}}>(Aquí va la información adicional)</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Bold', color:'#fff'}}>Total $120.00</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Icon active name='person' style={{color:'white', fontSize: 15}} /> 
              <Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>Tu entrega por Jose Fernando</Text>                            
            </View>
          </View>             
        </View>   
        <View style={{paddingBottom: 20}}>
          <ImageBackground source={require('src/assets/images/sugar.jpeg')} style={styles.food}>
            <View style={styles.foodCont}>
              <Text style={styles.textPromo}>Bistro Garden</Text>
              <Text style={styles.description}>Ver Menu</Text>              
            </View>                    
          </ImageBackground>
          <View style={styles.deliveryProgress}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Pedido #1B613</Text>              
              <Icon active name='time' style={{color:'white', fontSize: 15, marginLeft: 150}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>00:20:00</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>1</Text>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Carne Asada</Text>     
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff', fontSize: 12}}>(Aquí va la información adicional)</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Bold', color:'#fff'}}>Total $120.00</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Icon active name='person' style={{color:'white', fontSize: 15}} /> 
              <Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>Tu entrega por Jose Fernando</Text>                            
            </View>
          </View>             
        </View>             
      </Content>
    );
  }
}
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { View, BackHandler, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './OrderHistoryStyle'

export default class OrderHistory extends Component {  
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
          <View style={styles.deliveryDetails}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <View style={styles.circle}>
                <Image source={require('src/assets/images/check.png')} style={styles.check}/>              
              </View>
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Pedido Entregado</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>Oct 3, 2017 2:44 P.M</Text>              
              <Button rounded small style={styles.button}><Text style={styles.buttonText}>Volver a ordenar</Text></Button>    
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>Pedido #1B613</Text>                            
            </View>
          </View>  
          <View style={[styles.deliveryDetails, {'borderBottomWidth': 1}]}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>1</Text>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Carne Asada</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Icon active name='person' style={{color:'white', fontSize: 15}} /> 
              <Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>Tu entrega por Luis Fernando</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 25, paddingTop: 10, paddingBottom: 10}}>              
              <Text style={{fontFamily: 'Lato-Bold', color:'#fff'}}>Total $120.00</Text>                            
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
          <View style={styles.deliveryDetails}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <View style={styles.circle}>
                <Image source={require('src/assets/images/check.png')} style={styles.check}/>              
              </View>
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Pedido Entregado</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>Oct 3, 2017 2:44 P.M</Text>              
              <Button rounded small style={styles.button}><Text style={styles.buttonText}>Volver a ordenar</Text></Button>    
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10}}>              
              <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>Pedido #1B613</Text>                            
            </View>
          </View>  
          <View style={[styles.deliveryDetails, {'borderBottomWidth': 1}]}>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Text style={{fontFamily: 'Lato-Light', color:'#fff'}}>1</Text>              
              <Text style={{marginLeft: 10, fontFamily: 'Lato-Light', color:'#fff'}}>Carne Asada</Text>              
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>              
              <Icon active name='person' style={{color:'white', fontSize: 15}} /> 
              <Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>Tu entrega por Luis Fernando</Text>                            
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 25, paddingTop: 10, paddingBottom: 10}}>              
              <Text style={{fontFamily: 'Lato-Bold', color:'#fff'}}>Total $120.00</Text>                            
            </View>
          </View>       
        </View>            
      </Content>
    );
  }
}
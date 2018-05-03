import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { View, BackHandler, Image, ImageBackground } from 'react-native';
import styles from './OrderHistoryStyle'

export default class OrderHistory extends Component {  
  render() {
    return (  
      <Content padder style={{backgroundColor: '#3f51b5'}}>        
          <ImageBackground source={require('src/assets/images/chicken.jpeg')} style={styles.food}>
            <View style={styles.foodCont}>
              <Text style={styles.textPromo}>20 % </Text><Text style={styles.description}>en la compra de la segunda orden</Text>
              <Text style={{color: '#fff', marginTop:95, marginRight: 15}}>Alitas</Text>
            </View>                    
          </ImageBackground>                   
      </Content>
    );
  }
}
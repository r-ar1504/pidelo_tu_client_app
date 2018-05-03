import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';
import { View, BackHandler, Image, ImageBackground } from 'react-native';
import styles from './OrderHistoryStyle'

export default class OrderComming extends Component {  
  render() {
    return (      
      <Content padder style={{backgroundColor: '#3f51b5'}}>                      
          <ImageBackground source={require('src/assets/images/salad.jpeg')} style={styles.food}>
            <View style={styles.foodCont}>
              <Text style={styles.textPromo}>2 x 1 </Text><Text style={styles.description}>en todas las ensaladas</Text>                      
              <Text style={{color: '#fff', marginTop:95, marginRight: 15}}>Ensaladas</Text>
            </View>                    
          </ImageBackground> 
      </Content>
    );
  }
}